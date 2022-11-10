const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const engine = require("ejs-mate")
const methodOverride = require("method-override")
const plans = require("./routes/plans")
const Plan = require("./schemas/plan")
const catchAsync = require("./helpers/CatchAsync")
const session = require("express-session")
const {PlanSchema} = require("./Joi")
const ExpressError = require("./helpers/ExpressError")
const validatePlan = require("./helpers/validatePlan")
const User = require("./schemas/user")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');


mongoose.connect('mongodb://127.0.0.1:27017/gym-plans',{
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})

app.engine("ejs",engine)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static("public"));


app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"public")))

app.use(mongoSanitize());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(cookieParser("1234"));

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    //  cookie:{
    //     httpOnly: true,
    //     expires: Date.now() + 1000 *60*60*24*7,
    //     maxAge: 1000 *60*60*24*7
    // } 
  }))
app.use(passport.initialize());
app.use(passport.session());
  
app.use(flash());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success=req.flash("success")
    res.locals.error = req.flash("error")
    next()
})
app.get("/home",(req,res)=>{
    res.render("mainhub")
})
app.use("/allPlans",plans)

app.get("/userPanel/register",(req,res)=>{
    res.render("user/register")
})

app.post("/userPanel/register",catchAsync(async(req,res)=>{
    try{
        const {username,password,email} = req.body
        const u = await new User({email,username})
        const registeredUser = await User.register(u,password)
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }else{
                return res.redirect("/allPlans")
            }
            
        })
    }catch{
        req.flash("error","You type something wrong")
        res.redirect("/register")
    }
}))

app.get("/userPanel/login",async(req,res)=>{
    res.render("user/login")
})
app.post("/userPanel/login",(req,res,next)=>{
    passport.authenticate('local', (err, user,info)=>{
        if(err){
            return next(err)
        }
        if(! user){
            req.flash("error", "You typed something wrong")
            return res.redirect("/userPanel/login")
            
        }
        req.login(user,loginEr=>{
            if(loginEr){
                return next(loginEr)
            }
            res.redirect("/allPlans")
        })
    })(req,res,next)
})  

app.get("/userPanel/profile",catchAsync(async(req,res)=>{
    console.log(req.user._id)
    userPlans = await Plan.find({author: req.user._id})
    console.log(userPlans.length)
    res.render("user/profile",{userPlans})
}))

app.post("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        res.redirect("/allPlans")
    })
})

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page not found",404))
})

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err
    if(!err.message) err.message = "Oh No, Something went Wrong, Try Again!"
    res.status(statusCode).render("error",{err})
})




app.listen(3000,()=>{
    console.log("connected to port 3000")
})


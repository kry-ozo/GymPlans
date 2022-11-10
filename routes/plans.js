const express = require("express")
const router = express.Router()
const Plan = require("../schemas/plan")
const catchAsync = require("../helpers/CatchAsync")
const validatePlan = require("../helpers/validatePlan")

router.get("/",catchAsync(async(req,res)=>{
    const plans = await Plan.find({}).populate({path:"author"})
    res.render("plans/index.ejs",{plans})
}))

router.get("/create",catchAsync(async(req,res)=>{
    if(req.isAuthenticated()){
    res.render("plans/createPlan")
    }else{
        req.flash("error","You need to login first to see that")
        return res.redirect("/allPlans")
    }
}))
router.post("/", catchAsync(async(req,res)=>{
    const plan = new Plan(req.body)
    plan.author = req.user
    plan.likes = 0
    plan.img = "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    await plan.save()
    res.redirect(`/allPlans/${plan._id}`)
}))

router.get("/:id",catchAsync(async(req,res)=>{
    if(req.isAuthenticated()){
        const {id} = req.params;
        const plan = await Plan.findById(id).populate({path: "author"})
        res.render("plans/showPlan.ejs",{plan})
    }
    else{
        req.flash("error","You need to login first to see that")
        return res.redirect("/allPlans")
    }
}))

router.post("/:id", catchAsync(async(req,res)=>{
    const {id} = req.params
    const update = req.body
    const updatedPlan = await Plan.findByIdAndUpdate(id,update)
    res.redirect(`/allPlans/${updatedPlan._id}`)
}))

router.get("/:id/edit",catchAsync(async(req,res)=>{
    if(req.isAuthenticated()){
        const {id} = req.params
        const plan = await Plan.findById(id)
        res.render("plans/edit",{plan})
    }else{
        req.flash("error","You need to login first to see that")
        return res.redirect("/allPlans")
    }
    
}))


router.post("/:id/delete",catchAsync(async(req,res)=>{
    const {id} = req.params
    await Plan.findByIdAndRemove(id)
    res.redirect("/allPlans")
}))

module.exports = router;


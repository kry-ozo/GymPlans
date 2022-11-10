const Gymplan = require("../schemas/plan")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/gym-plans',{
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})

function sample(arr){
      return arr[Math.floor(Math.random()*arr.length)]
}

const seedDB = async()=>{
    await Gymplan.deleteMany({})
    for(let i = 0; i<=50;i++){
        const g = new Gymplan({
            author: "6328cfd0cb1999cc88d6583e",
            gender:"Male",
            days: 4,
            planName: "My plan",
            description: "A mass building routine that features a great combination of effective compound and isolation movements along with intense, high impact five minute burn sets.",
            difficultyLevel: "Beginner",
            type:"Push-Pull"
        })
        await g.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})
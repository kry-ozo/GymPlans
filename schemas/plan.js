const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const PlanSchema = new Schema({
    planName:{
        type: String
    },
    gender:{
        type: String,
        enum:["Male","Female"]
    },
    difficultyLevel:{
        type: String,
        enum:["Beginner","Advanced",'Professional']
    },
    days:{
        type: Number,
        enum:[3,4,5,6]
    },
    type:{
        type:String,
        enum:["Push-Pull","Split","Push-Pull-Legs","Upper-Down","Full-Body-Workout"]
    },
    description:{
        type:String
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = new mongoose.model("Plan", PlanSchema)
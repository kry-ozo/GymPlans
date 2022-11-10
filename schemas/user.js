const mongoose = require("mongoose")
const passportMongoose = require("passport-local-mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
})

UserSchema.plugin(passportMongoose)

module.exports = new mongoose.model("User", UserSchema)
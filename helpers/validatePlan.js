const {PlanSchema} = require("../Joi")
const ExpressError = require("./ExpressError")

const valdateCampground = (req,res,next)=>{
    const {error} = PlanSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el=>el.msg).join(",")
        throw new ExpressError(msg,400)
    } else{
        next()
    }
}

module.exports = valdateCampground
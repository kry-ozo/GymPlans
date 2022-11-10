const Joi = require("joi")

module.exports.PlanSchema = Joi.object({
    difficultyLevel: Joi.string().required(),
    days: Joi.number().required(),
    type: Joi.string().required(),
    img: Joi.string().required(),
    description: Joi.string().alphanum().min(15).max(150).required()
})
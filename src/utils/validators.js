const Joi=require('joi');


const noteSchema = Joi.object({
    title:Joi.string().min(3).max(100).required(),
    content:Joi.string().min(10).required(),
})

const userSchema=Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8) .pattern(/^[A-Z]/).pattern(/[!@#$%^&*(),.?":{}|<>]/).messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must start with a capital letter and contain at least one special symbol",
      })
})
module.exports={noteSchema,userSchema};
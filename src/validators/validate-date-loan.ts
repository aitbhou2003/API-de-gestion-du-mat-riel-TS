import Joi from "joi";


export const dateSchema = Joi.object({
    from : Joi.date().iso().required()
})
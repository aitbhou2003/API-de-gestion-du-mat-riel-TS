import Joi from "joi";

export const updateEquipmentSchema = Joi.object({
  dailyLateFeeCents: Joi.number().min(0).integer().strict(),
  name: Joi.string().trim().min(1),
}).min(1);

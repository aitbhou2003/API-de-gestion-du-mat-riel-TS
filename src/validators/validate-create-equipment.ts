import Joi from "joi";

export const createEquipmentSchema = Joi.object({
  assetTag: Joi.string().trim().uppercase().required(),
  name: Joi.string().trim().required().min(1),
  category: Joi.string().required().valid("audio", "video", "informatique"),
  dailyLateFeeCents: Joi.number().min(0).integer().required().strict(),
});

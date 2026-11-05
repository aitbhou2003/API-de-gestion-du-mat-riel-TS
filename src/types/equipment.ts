import { type Iequipment } from "../models/equipment.model.js";

export type EquipmentCategory = Iequipment["category"];

export const isEquipmentCategory = (
  category: string,
): category is EquipmentCategory => {
  return ["video", "audio", "informatique"].includes(category);
};

import Equipment, { type Iequipment } from "../models/equipment.model.js";

export const getEquipments = async (category: Iequipment["category"]) => {
  try {
    const equipments = await Equipment.find({ category: category });
    return equipments;
  } catch (error) {}
};

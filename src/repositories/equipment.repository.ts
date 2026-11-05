import Equipment, { type Iequipment } from "../models/equipment.model.js";

export const getEquipments = async (category?: Iequipment["category"]) => {
  const filter: any = { isArchived: false };

  if (category) {
    filter.category = category;
  }
  const equipments = await Equipment.find(filter);
  return equipments;
};

export const getStats = async (): Promise<number> => {
  return await Equipment.countDocuments({ isArchived: false });
};

export const getEquipmentById = async (id: string) => {
  return await Equipment.findById(id);
};

export const createEquipment = async(data : Iequipment)=>{
    return await Equipment.create(data);
}

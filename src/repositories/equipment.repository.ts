import Equipment, { type Iequipment } from "../models/equipment.model.js";
import { type updateEquipmentData } from "../types/equipment.js";

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

export const createEquipment = async (data: Iequipment) => {
  return await Equipment.create(data);
};

export const updateEquipment = async (
  id: string,
  data: updateEquipmentData,
) => {
  return await Equipment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const incrimentCheckoutCount = async (id: string) => {
  return await Equipment.findByIdAndUpdate(
    id,
    {
      $inc: { checkoutCount: 1 },
    },
    {
      new: true,
    },
  );
};

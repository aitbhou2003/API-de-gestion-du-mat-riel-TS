import {
  getEquipments,
  getStats,
} from "../repositories/equipment.repository.js";
import { AppError } from "../utils/app-error.js";
import { isEquipmentCategory } from "../types/equipment.js";

export const getEquipmentsService = async (category?: string) => {
  if (category !== undefined) {
    if (category.trim() === "") {
      throw new AppError("La catégorie ne peut pas être vide", 400);
    }
    if (!isEquipmentCategory(category)) {
      return [];
    }
  }

  const equipment = await getEquipments(category);

  return equipment;
};

export const getStatsService = async (): Promise<number> => {
  return await getStats();
};

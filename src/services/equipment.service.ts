import {
  getEquipmentById,
  getEquipments,
  getStats,
} from "../repositories/equipment.repository.js";
import { AppError } from "../utils/app-error.js";
import { isEquipmentCategory } from "../types/equipment.js";
import mongoose from "mongoose";

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

export const getEquipmentByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("id pas valid", 400);
  }
  const equipment = await getEquipmentById(id);

  if (!equipment || equipment.isArchived == true) {
    throw new AppError("equipment introuvable", 404);
  }

  return equipment;
};

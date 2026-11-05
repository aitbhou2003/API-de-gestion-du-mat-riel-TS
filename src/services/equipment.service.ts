import {
  createEquipment,
  getEquipmentById,
  getEquipments,
  getStats,
  incrimentCheckoutCount,
  updateEquipment,
} from "../repositories/equipment.repository.js";
import { AppError } from "../utils/app-error.js";
import {
  isEquipmentCategory,
  updateEquipmentData,
} from "../types/equipment.js";
import mongoose from "mongoose";
import Equipment, { Iequipment } from "../models/equipment.model.js";
import { threadId } from "node:worker_threads";

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

export const createEquipmentService = async (data: Iequipment) => {
  if (data.name.trim() == "") {
    throw new AppError("name invalid", 400);
  }
  if (!isEquipmentCategory(data.category)) {
    throw new AppError("category invalide", 400);
  }

  if (data.dailyLateFeeCents < 0 || !Number.isInteger(data.dailyLateFeeCents)) {
    throw new AppError("dailyLateFeeCents invalide", 400);
  }

  const check = await Equipment.findOne({ assetTag: data.assetTag });

  if (check) {
    throw new AppError("comflit equipmemt deja exist", 409);
  }

  const equipment = await createEquipment(data);
  return equipment;
};

export const updateEquipmentService = async (
  id: string,
  data: updateEquipmentData,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("id invalid", 400);
  }

  const check = await getEquipmentById(id);
  if (!check) {
    throw new AppError("equipment introuvalbe", 404);
  }

  if (check.isArchived) {
    throw new AppError(
      "conflir interdit de modifier un equipment archive",
      409,
    );
  }

  return await updateEquipment(id, data);
};

export const incrimentCheckoutCountService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("id invalid", 400);
  }
  const check = await getEquipmentById(id);
  if (!check) {
    throw new AppError("equipment introuvalbe", 404);
  }

  if (check.isArchived) {
    throw new AppError(
      "conflir interdit de modifier un equipment archive",
      409,
    );
  }

  return await incrimentCheckoutCount(id);
};

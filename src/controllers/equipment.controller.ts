import {
  createEquipmentService,
  getEquipmentByIdService,
  getEquipmentsService,
  getStatsService,
  incrimentCheckoutCountService,
  updateEquipmentService,
} from "../services/equipment.service.js";
import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { NullExpression } from "mongoose";
import { error } from "node:console";
import { any } from "joi";

export const getEquipmentsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = req.query.category;
    if (typeof category !== "string" && category !== undefined) {
      throw new AppError("Invalid category", 400);
    }

    const equipments = await getEquipmentsService(category);

    res.status(200).json({
      success: true,
      data: equipments,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stats = await getStatsService();
    res.status(200).json({
      success: true,
      count: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getEquipmentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    if (typeof id !== "string") {
      throw new AppError("id invalid", 400);
    }
    const equipment = await getEquipmentByIdService(id);

    res.status(200).json({
      success: true,
      data: equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const createEquipmentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const equipmemt = await createEquipmentService(req.body);
    res.status(201).json({
      seccess: true,
      message: "equipment cree avec succee",
      data: equipmemt,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEquipmentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.params.id !== "string") {
      throw new AppError("id invalide", 400);
    }
    const equipmemt = await updateEquipmentService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "equipment modifier avec sucee",
      data: equipmemt,
    });
  } catch (error) {
    next(error);
  }
};

export const incrimentCheckoutCountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.params.id !== "string") {
      throw new AppError("id invalide", 400);
    }

    const equipmemt = await incrimentCheckoutCountService(req.params.id);

    res.status(200).json({
      success: true,
      data: equipmemt,
    });
  } catch (error) {
    next(error);
  }
};

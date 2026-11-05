import { getEquipmentsService } from "../services/equipment.service.js";
import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/app-error.js";

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

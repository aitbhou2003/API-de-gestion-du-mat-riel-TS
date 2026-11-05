import {
    getEquipmentByIdService,
  getEquipmentsService,
  getStatsService,
} from "../services/equipment.service.js";
import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { NullExpression } from "mongoose";
import { error } from "node:console";

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

export const getEquipmentByIdController = async(req:Request,res:Response,next : NextFunction)=>{
    try {
        const id = req.params.id
        if(typeof id !== "string"){
            throw new AppError("id invalid",400)
        }
        const equipment = await getEquipmentByIdService(id)

        res.status(200).json({
            success : true ,
            data : equipment
        })
    } catch (error) {
        next(error)
    }
}

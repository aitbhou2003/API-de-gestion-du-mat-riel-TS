import { type Request, type Response, type NextFunction } from "express";
import { getLoansService } from "../services/loan.service.js";
import { AppError } from "../utils/app-error.js";

export const getLoansController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (typeof req.query.from !== "string") {
      throw new AppError("date insvalide", 400);
    }
    const loans =await getLoansService(req.query.from);
    res.status(200).json({
        success : true,
        data : loans
    })
  } catch (error) {
    next(error);
  }
};

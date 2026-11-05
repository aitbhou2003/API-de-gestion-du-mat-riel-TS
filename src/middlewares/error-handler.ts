import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/app-error.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return; 
  }

  console.log(err);

  res.status(500).json({
    success: false,
    message: "internal server error",
  });
};

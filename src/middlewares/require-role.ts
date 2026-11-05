import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { error } from "node:console";

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("tu besoin de authentifie", 401);
    }

    if (!roles.includes(req.user?.userRole)) {
      throw new AppError("your not access", 403);
    }

    next();
  };
};

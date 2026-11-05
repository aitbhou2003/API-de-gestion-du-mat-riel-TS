import { verifyToken } from "../utils/jwt.js";
import { type Request, type Response, type NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader == undefined) {
      return res.status(401).json({
        message: "token absent ou format invalid",
      });
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token absent ou format invalide" });
    }

    const token = authHeader?.split(" ")[1];

    const VToken = verifyToken(token);

    req.user = {
      userId: VToken.userId,
      userRole: VToken.userRole,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "token absent ou format invalid",
    });
  }
};

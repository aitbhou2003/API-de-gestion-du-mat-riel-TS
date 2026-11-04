import { type Request, type Response, type NextFunction } from "express";

import User from "../models/user.model.js";
import { comparePass } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "identifiants invalide",
      });
    }
    const passMatch = await comparePass(password, user.password);

    if (!passMatch) {
      return res.status(401).json({
        message: "identifiants invalide",
      });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: "login with success",
      token : token
    });
  } catch (error) {
    console.error(error);
    
    throw error;
  }
};

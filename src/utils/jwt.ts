import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (userId: string, userRole: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("jwt secret key indefide");
  }
  const token = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    jwtSecret,
    {
      expiresIn: "1h",
    },
  );

  return token;
};

export const verifyToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("jwt secret key indefide");
  }

  return jwt.verify(token, jwtSecret);
};

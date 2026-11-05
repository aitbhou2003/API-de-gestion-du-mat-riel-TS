import jwt from "jsonwebtoken";
import "dotenv/config";

interface TokenPayload {
  userId: string;
  userRole: "admin" | "member";
}

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

export const verifyToken = (token: string): TokenPayload => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("jwt secret key indefide");
  }

  const verify = jwt.verify(token, jwtSecret);
  if (
    typeof verify === "string" ||
    typeof verify.userId !== "string" ||
    !["admin", "member"].includes(verify.userRole as string)
  ) {
    throw new Error("token invalide");
  }

  return {
    userId: verify.userId,
    userRole: verify.userRole,
  };
};

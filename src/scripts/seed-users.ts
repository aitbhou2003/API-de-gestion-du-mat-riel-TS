import mongoose from "mongoose";
import User from "../models/user.model.js";
import { hashPass } from "../utils/password.js";
import "dotenv/config";

const seedUsers = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("mngo uri is not defined");
    }

    await mongoose.connect(uri);

    await User.deleteMany({});
    const adminPass = await hashPass("admin1234@");
    const membrPass = await hashPass("membr1234@");

    await User.create({
      email: "admine@gmail.com",
      password: adminPass,
      role: "admin",
    });

    await User.create({
      email: "membre@gmail.com",
      password: membrPass,
      role: "member",
    });

    console.log("users seed seccessfuly");
  } catch (error) {
    console.error("user seed error : ", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedUsers();

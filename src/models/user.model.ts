import { number } from "joi";
import mongoose, { Schema, type Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "membr";
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "membr"],
      required: true,
      default: "membr",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default  User ;

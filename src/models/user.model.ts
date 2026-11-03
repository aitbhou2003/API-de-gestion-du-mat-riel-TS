import { number } from "joi";
import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "member";
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
      enum: ["admin", "member"],
      required: true,
      default: "member",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default  User ;

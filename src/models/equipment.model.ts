import { string } from "joi";
import mongoose, { Schema, type Document } from "mongoose";

export interface Iequipment extends Document {
  assetTag: string;
  name: string;
  category: "video" | "audio" | "informatique";
  dailyLateFeeCents: number;
  isArchived: boolean;
  checkoutCount: number;
}

const equipmentSchema = new Schema<Iequipment>({
  assetTag: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["video", "audio", "informatique"],
    required: true,
  },
  dailyLateFeeCents: {
    type: Number,
    min: 0,
    required: true,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },
  checkoutCount: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const Equipment = mongoose.model<Iequipment>("Equipment", equipmentSchema);

export default Equipment;

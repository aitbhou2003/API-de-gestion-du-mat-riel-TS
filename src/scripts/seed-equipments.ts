import mongoose from "mongoose";
import "dotenv/config";
import Equipment from "../models/equipment.model.js";

const equipmentSeed = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("mongo uri pas definie");
    }
    await mongoose.connect(uri);

    await Equipment.deleteMany({});

    await Equipment.create({
      assetTag: "VID-001",
      name: "Vidéoprojecteur",
      category: "video",
      isArchived: false,
      dailyLateFeeCents: 150,
      checkoutCount: 0,
    });

    await Equipment.create({
      assetTag: "AUD-001",
      name: "Enceinte",
      category: "audio",
      isArchived: false,
      dailyLateFeeCents: 100,
      checkoutCount: 0,
    });

    await Equipment.create({
      assetTag: "VID-OLD",
      name: "Ancien projecteur",
      category: "video",
      isArchived: true,
      dailyLateFeeCents: 80,
      checkoutCount: 0,
    });
  } catch (error) {
    console.error("equipment seed error : ", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

equipmentSeed();

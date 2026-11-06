import mongoose from "mongoose";
import Loan from "../models/loan.model.js";
import "dotenv/config";
import Equipment from "../models/equipment.model.js";

const seedLoan = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("mongo uri pas definie");
    }
    await mongoose.connect(uri);

    await Loan.deleteMany({});

    const E1 = await Equipment.findOne({ assetTag: "VID-001" }).select("_id");
    const E2 = await Equipment.findOne({ assetTag: "AUD-001" }).select("_id");

    const fakeId = new mongoose.Types.ObjectId();

    const loans = [
      {
        equipmentId: E1,
        status: "returned",
        returnedAt: new Date("2026-10-01T00:00:00Z"),
      },
      {
        equipmentId: E2,
        status: "returned",
        returnedAt: new Date("2026-10-03T00:00:00Z"),
      },
      {
        equipmentId: E1,
        status: "ongoing",
        returnedAt: null,
      },
      {
        equipmentId: E2,
        status: "returned",
        returnedAt: new Date("2026-09-30T00:00:00Z"),
      },
      {
        equipmentId: fakeId,
        status: "returned",
        returnedAt: new Date("2026-10-02T00:00:00Z"),
      },
    ];

    const ls = await Loan.insertMany(loans);

    console.log("loans seed successfuly");
  } catch (error) {
    console.log("loan seed error : ", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedLoan();

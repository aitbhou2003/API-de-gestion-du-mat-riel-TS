import { fileURLToPath } from "node:url";
import Loan from "../models/loan.model.js";

export const getLoans = async (date?: string) => {
  const filter: any = {
    status: "returned",
  };

  if (date) {
    filter.returnedAt = { $gte: new Date(date) };
  }

  return await Loan.find(filter);
};

import { getLoans } from "../repositories/loan.repository.js";

export const getLoansService = async (date?: string) => {
  return await getLoans(date);
};

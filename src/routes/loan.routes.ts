import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { requireRole } from "../middlewares/require-role.js";
import { validate } from "../middlewares/validation.js";
import { dateSchema } from "../validators/validate-date-loan.js";
import { getLoansController } from "../controllers/loan.controller.js";

const router = Router();

router.get(
  "/returned",
  authenticate,
  requireRole("admin", "member"),
  validate({ query: dateSchema }),
  getLoansController,
);

export default router;

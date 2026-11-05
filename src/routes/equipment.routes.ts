import { Router } from "express";
import {
  createEquipmentController,
  getEquipmentByIdController,
  getEquipmentsController,
  getStatsController,
} from "../controllers/equipment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireRole } from "../middlewares/require-role.js";
import { validate } from "../middlewares/validation.js";
import { createEquipmentSchema } from "../validators/validate-create-equipment.js";

const router = Router();

router.get("/", authenticate, getEquipmentsController);
router.get("/stats", authenticate, getStatsController);
router.get("/:id", authenticate, getEquipmentByIdController);
router.post(
  "/",
  authenticate,
  requireRole("admin"),
  validate(createEquipmentSchema),

  createEquipmentController,
);

export default router;

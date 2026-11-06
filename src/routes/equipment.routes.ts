import { Router } from "express";
import {
  createEquipmentController,
  getEquipmentByIdController,
  getEquipmentsController,
  getStatsController,
  incrimentCheckoutCountController,
  updateEquipmentController,
} from "../controllers/equipment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireRole } from "../middlewares/require-role.js";
import { validate } from "../middlewares/validation.js";
import { createEquipmentSchema } from "../validators/validate-create-equipment.js";
import { updateEquipmentSchema } from "../validators/validate-update-equipment.js";

const router = Router();

router.get(
  "/",
  authenticate,
  requireRole("admin", "member"),
  getEquipmentsController,
);
router.get(
  "/stats",
  authenticate,
  requireRole("admin", "member"),
  getStatsController,
);
router.get(
  "/:id",
  authenticate,
  requireRole("admin", "member"),
  getEquipmentByIdController,
);
router.post(
  "/",
  authenticate,
  requireRole("admin"),
  validate({body : createEquipmentSchema}),
  createEquipmentController,
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  validate({body : updateEquipmentSchema}),
  updateEquipmentController,
);

router.post(
  "/:id/checkouts",
  authenticate,
  requireRole("admin"),
  incrimentCheckoutCountController,
);
export default router;

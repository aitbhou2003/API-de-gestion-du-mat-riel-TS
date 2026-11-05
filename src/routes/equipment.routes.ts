import { Router } from "express";
import {
    getEquipmentByIdController,
  getEquipmentsController,
  getStatsController,
} from "../controllers/equipment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, getEquipmentsController);
router.get("/stats", authenticate, getStatsController);
router.get('/:id',authenticate,getEquipmentByIdController)

export default router;

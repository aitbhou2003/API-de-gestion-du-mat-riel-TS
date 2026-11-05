import { Router } from "express";
import { getEquipmentsController } from "../controllers/equipment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router()

router.get('/',authenticate,getEquipmentsController)

export default router
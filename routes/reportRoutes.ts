import { Router } from "express";
import reportController from "../controllers/reportController";

const router = Router();

router.get("/getAllPositions", reportController.getReport);

export default router;
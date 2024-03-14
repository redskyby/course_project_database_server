import { Router } from "express";
import positionController from "../controllers/positionController";

const router = Router();

router.post("/add", positionController.addPosition);

export default router;

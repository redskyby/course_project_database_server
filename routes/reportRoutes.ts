import { Router } from "express";
import reportController from "../controllers/reportController";

const router = Router();

router.get("/report", reportController.getReport);
//http://localhost:5000/api/report/report/?id=1

export default router;

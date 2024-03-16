import { Router } from "express";
import vaccinationController from "../controllers/vaccinationController";

const router = Router();

router.post("/add" , vaccinationController.addVaccination);
router.get("/getAllVaccinations" , vaccinationController.getAllVaccinations);

export default router;

import { Router } from "express";
import vaccinationController from "../controllers/vaccinationController";

const router = Router();

router.post("/add", vaccinationController.addVaccination);
router.get("/getAllVaccinations", vaccinationController.getAllVaccinations);
router.delete("/deleteVaccination", vaccinationController.deleteVaccination);
router.get("/sortBy", vaccinationController.sortBy);
router.put("/editVaccinationById", vaccinationController.editVaccinationById);

export default router;

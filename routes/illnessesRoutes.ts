import { Router } from "express";
import vaccinationController from "../controllers/vaccinationController";

const router = Router();
router.post("/add", vaccinationController.addVaccination);
router.get("/getAllIllnesses", vaccinationController.getAllVaccinations);
router.delete("/deleteIllnesses", vaccinationController.deleteVaccination);
router.get("/sortBy", vaccinationController.sortBy);
router.put("/editIllnessesnById", vaccinationController.editVaccinationById);

export default router;
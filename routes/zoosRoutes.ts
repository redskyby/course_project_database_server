import { Router } from "express";
import vaccinationController from "../controllers/vaccinationController";

const router = Router();

router.post("/add", vaccinationController.addVaccination);
router.get("/getAllZoos", vaccinationController.getAllVaccinations);
router.delete("/deleteZoo", vaccinationController.deleteVaccination);
router.get("/sortBy", vaccinationController.sortBy);
router.put("/editVaccinationById", vaccinationController.editVaccinationById);
export default router;

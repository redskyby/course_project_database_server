import { Router } from "express";
import illnessesController from "../controllers/illnessesController";
const router = Router();

router.post("/add", illnessesController.addIllnesses);
router.get("/getAllIllnesses", illnessesController.getAllIllnesses);
router.delete("/deleteIllness", illnessesController.deleteIllIllness);
router.get("/sortBy", illnessesController.sortBy);
router.put("/editIllnessById", illnessesController.editIllnessById);

export default router;

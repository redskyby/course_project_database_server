import { Router } from "express";
import illnessesController from "../controllers/illnessesController";
const router = Router();

router.post("/add", illnessesController.addIllnesses);
router.get("/getAllIllnesses", illnessesController.getAllIllnesses);
router.delete("/deleteIllnesses", illnessesController.deleteIllIllnesses);
router.get("/sortBy", illnessesController.sortBy);
router.put("/editIllnessesById", illnessesController.editIllnessesById);

export default router;

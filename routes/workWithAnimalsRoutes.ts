import { Router } from "express";
import workWithAnimalsController from "../controllers/workWithAnimalsController";

const router = Router();

router.post("/add", workWithAnimalsController.addZoo);
router.get("/getAllWorkWithAnimals", workWithAnimalsController.getAllZoos);
router.delete("/deleteWorkWithAnimals", workWithAnimalsController.deleteZoo);
router.get("/sortBy", workWithAnimalsController.sortBy);
router.put("/editWorkWithAnimalsById", workWithAnimalsController.editZooById);
export default router;

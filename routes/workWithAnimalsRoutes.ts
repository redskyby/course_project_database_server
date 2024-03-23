import { Router } from "express";
import workWithAnimalsController from "../controllers/workWithAnimalsController";

const router = Router();

router.post("/add", workWithAnimalsController.addWorkWithAnimal);
router.get("/getAllWorkWithAnimals", workWithAnimalsController.getAllWorkWithAnimal);
router.delete("/deleteWorkWithAnimals", workWithAnimalsController.deleteWorkWithAnimals);
router.get("/sortBy", workWithAnimalsController.sortBy);
router.put("/editWorkWithAnimalsById", workWithAnimalsController.editWorkWithAnimalById);
export default router;

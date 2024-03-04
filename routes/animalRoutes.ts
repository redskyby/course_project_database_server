import { Router } from "express";
import animalController from "../controllers/animalController";

const router = Router();

router.post("/add", animalController.addAnimal);
router.get("/getAll", animalController.getAllAnimals);
router.delete("/delete", animalController.deleteAnimal);
router.get("/sortBy", animalController.sortBy);
export default router;

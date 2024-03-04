import { Router } from "express";
import animalController from "../controllers/animalController";

const router = Router();

router.post("/add", animalController.addAnimal);
router.get("/getAll", animalController.getAllAnimals);
export default router;

import { Router } from "express";
import animalController from "../controllers/animalController";

const router = Router();

router.post("/add", animalController.addAnimal);
export default router;

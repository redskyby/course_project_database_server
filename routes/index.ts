import { Router } from "express";
import animalRoutes from "./animalRoutes";
const router = Router();

router.use("/animal", animalRoutes);

export default router;

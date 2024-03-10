import { Router } from "express";
import animalRoutes from "./animalRoutes";
import feedRoutes from "./feedRoutes";
const router = Router();

router.use("/animal", animalRoutes);
router.use("/feed", feedRoutes);

export default router;

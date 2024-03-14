import { Router } from "express";
import animalRoutes from "./animalRoutes";
import feedRoutes from "./feedRoutes";
import positionRoutes from "./positionRoutes";
const router = Router();

router.use("/animal", animalRoutes);
router.use("/feed", feedRoutes);
router.use("/position", positionRoutes);

export default router;

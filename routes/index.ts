import { Router } from "express";
import animalRoutes from "./animalRoutes";
import feedRoutes from "./feedRoutes";
import positionRoutes from "./positionRoutes";
import vaccinationRoutes from "./vaccinationRoutes";
const router = Router();

router.use("/animal", animalRoutes);
router.use("/feed", feedRoutes);
router.use("/position", positionRoutes);
router.use("/vaccination", vaccinationRoutes);

export default router;

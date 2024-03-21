import { Router } from "express";
import animalRoutes from "./animalRoutes";
import feedRoutes from "./feedRoutes";
import positionRoutes from "./positionRoutes";
import vaccinationRoutes from "./vaccinationRoutes";
import illnessesRoutes from "./illnessesRoutes";
import zoosRoutes from "./zoosRoutes";
const router = Router();

router.use("/animal", animalRoutes);
router.use("/feed", feedRoutes);
router.use("/position", positionRoutes);
router.use("/vaccination", vaccinationRoutes);
router.use("/illnesses", illnessesRoutes);
router.use("/zoos", zoosRoutes);

export default router;

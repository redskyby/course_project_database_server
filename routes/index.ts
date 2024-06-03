import { Router } from "express";
import animalRoutes from "./animalRoutes";
import feedRoutes from "./feedRoutes";
import positionRoutes from "./positionRoutes";
import vaccinationRoutes from "./vaccinationRoutes";
import illnessesRoutes from "./illnessesRoutes";
import zoosRoutes from "./zoosRoutes";
import workWithAnimalsRoutes from "./workWithAnimalsRoutes";
import employeesRoutes from "./employeesRoutes";
import reportRoutes from "./reportRoutes";

const router = Router();

router.use("/animal", animalRoutes);
router.use("/feed", feedRoutes);
router.use("/position", positionRoutes);
router.use("/vaccination", vaccinationRoutes);
router.use("/illnesses", illnessesRoutes);
router.use("/zoos", zoosRoutes);
router.use("/workWithAnimals", workWithAnimalsRoutes);
router.use("/employees", employeesRoutes);
router.use("report", reportRoutes);

export default router;

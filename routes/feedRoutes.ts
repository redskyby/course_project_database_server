import { Router } from "express";
import feedController from "../controllers/feedController";

const router = Router();

router.post("/add", feedController.addFeed);
router.get("/getAllFeed", feedController.getAllFeed);

export default router;

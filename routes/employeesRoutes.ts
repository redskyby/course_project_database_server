import { Router } from "express";
import employeesController from "../controllers/employeesController";

const router = Router();

router.post("/add", employeesController.addAnimal);
router.get("/getAll", employeesController.getAllAnimals);
router.delete("/delete", employeesController.deleteAnimal);
router.get("/sortBy", employeesController.sortBy);
router.get("/getOne", employeesController.getAnimalById);
router.put("/editEmployeeById", employeesController.editAnimalById);
export default router;

import { Router } from "express";
import employeesController from "../controllers/employeesController";

const router = Router();

router.post("/add", employeesController.addEmployee);
router.get("/getAll", employeesController.getAllEmployees);
router.delete("/delete", employeesController.deleteEmployee);
router.get("/sortBy", employeesController.sortBy);
router.get("/getOne", employeesController.getEmployeeById);
router.put("/editEmployeeById", employeesController.editAnimalById);
export default router;

import { Router } from "express";
import { protect } from "../auth/auth.middleware";
import { getTasks, createTask, toggleTaskStatus, deleteTask } from "./task.controller";

const router = Router();

// Secure all planner routes with your verified auth gateway protect middleware
router.use(protect);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").patch(toggleTaskStatus).delete(deleteTask);

export default router;
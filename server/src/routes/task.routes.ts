import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TaskController } from "../modules/tasks/controller";

const taskRoutes = Router();

taskRoutes.use(authMiddleware);
taskRoutes.get("/", new TaskController().getUserTasks);
taskRoutes.get("/search", new TaskController().searchByTitle);
taskRoutes.get("/:id", new TaskController().getTaskById);
taskRoutes.post("/", new TaskController().create);
taskRoutes.patch("/:id", new TaskController().UpdateStateTaskById);
taskRoutes.patch("/:id", new TaskController().editTaskById);
taskRoutes.delete("/:id", new TaskController().deleteTaskById);

export { taskRoutes };

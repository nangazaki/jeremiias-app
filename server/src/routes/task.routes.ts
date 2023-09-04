import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TaskController } from "../modules/tasks/controller";

const taskRoutes = Router();

taskRoutes.use(authMiddleware);
taskRoutes.get("/", new TaskController().getUserTasks);
taskRoutes.get("/:id", new TaskController().getTaskById);
taskRoutes.get("/search", new TaskController().filterByTitle);
taskRoutes.get("/s", new TaskController().searchByTitle);
taskRoutes.post("/", new TaskController().create);
taskRoutes.post("/:id", new TaskController().UpdateStateTaskById);
taskRoutes.put("/:id", new TaskController().editTaskById);
taskRoutes.delete("/:id", new TaskController().deleteTaskById);

export { taskRoutes };

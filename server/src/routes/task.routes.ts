import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TaskController } from "../modules/tasks/controller";

const taskRoutes = Router();

taskRoutes.use(authMiddleware);
taskRoutes.post("/", new TaskController().create);

export { taskRoutes };

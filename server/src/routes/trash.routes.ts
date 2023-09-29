import { Router } from "express";
import { TrashController } from "../modules/trash/controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const trashRoutes = Router();

trashRoutes.use(authMiddleware);
trashRoutes.get("/", new TrashController().getAllTasks);
trashRoutes.post("/:id", new TrashController().restoreTask);
trashRoutes.post("/delete/:id", new TrashController().deleteTaskPermanently);

export { trashRoutes };

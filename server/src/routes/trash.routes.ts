import { Router } from "express";
import { TrashController } from "../modules/trash/controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const trashRoutes = Router();

trashRoutes.use(authMiddleware);

export { trashRoutes };

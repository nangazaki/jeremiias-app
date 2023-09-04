import { Router } from "express";
import { UserController } from "../modules/users/controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/", new UserController().create);

userRoutes.use(authMiddleware);
userRoutes.get("/", new UserController().getAllUsers);
userRoutes.get("/:id", new UserController().getById);
userRoutes.put("/:id", new UserController().editById);
userRoutes.delete("/:id", new UserController().deleteById);

export { userRoutes };

import { Router } from "express";

import { AuthController } from "../modules/auth/controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/login", new AuthController().login);
authRoutes.post("/register", new AuthController().register);

authRoutes.use(authMiddleware);
authRoutes.get("/profile", new AuthController().getProfile);

export { authRoutes };

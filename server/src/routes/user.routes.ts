import { Router } from "express";
import { UserController } from "../modules/users/controller";

const userRoutes = Router();

userRoutes.post('/', new UserController().create)

export { userRoutes }


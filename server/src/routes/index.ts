import { Router } from "express";
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routes";
import { priorityRoutes } from "./priority.routes";
import { authRoutes } from "./auth.routes";
import { statisticRoutes } from "./statistic.routes";

const routes = Router();

routes.use('/api/auth', authRoutes)
routes.use('/api/users', userRoutes);
routes.use('/api/tasks', taskRoutes);
routes.use('/api/priorities', priorityRoutes);
routes.use('api/statistics', statisticRoutes);

export { routes };
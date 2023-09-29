import { Router } from "express";
import { StatisticController } from "../modules/statistic/controller";

const statisticRoutes = Router();

statisticRoutes.get(
  "/most-commom-priorities/:limit",
  new StatisticController().mostCommomPriorities
);

export { statisticRoutes };

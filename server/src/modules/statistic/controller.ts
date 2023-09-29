import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import HttpStatusCodes from "../../constantes/HttpStatusCode";

export class StatisticController {
  async mostCommomPriorities(req: Request, res: Response): Promise<Response> {
    const { limit } = req.params;

    const mostCommomPriorities = await prisma.$queryRaw`
      SELECT
        priority,
        COUNT(*) AS count
      FROM
        task
      WHERE
        userId = ${req.user.id}
      GROUP BY
        priority
      ORDER BY
        count DESC
      LIMIT
        ${Number(limit)};
    `;

    return res.status(HttpStatusCodes.CREATED).json(mostCommomPriorities);
  }
}

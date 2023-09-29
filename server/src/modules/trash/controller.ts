import { Request, Response } from "express";
import HttpStatusCodes from "../../constantes/HttpStatusCode";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";

export class TrashController {
  async getAllTasks(req: Request, res: Response): Promise<Response> {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
        is_deleted: true,
      },
    });

    return res.status(HttpStatusCodes.OK).json(tasks);
  }

  async restoreTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { restore } = req.body;

    const taskAlreadyExists = await prisma.task.findUnique({
      where: {
        userId: req.user.id,
        is_deleted: true,
        id: id,
      },
    });

    if (!taskAlreadyExists) {
      throw new AppError(
        "A Tarefa não foi encontrada.",
        HttpStatusCodes.NOT_FOUND
      );
    }

    await prisma.task.update({
      where: {
        userId: req.user.id,
        is_deleted: true,
        id: id,
      },
      data: {
        is_deleted: restore,
      },
    });

    return res.status(HttpStatusCodes.OK).json();
  }

  async deleteTaskPermanently(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await prisma.task.delete({
      where: {
        id: id,
        userId: req.user.id,
        is_deleted: true,
      },
    });

    return res.status(HttpStatusCodes.OK).json();
  }
}

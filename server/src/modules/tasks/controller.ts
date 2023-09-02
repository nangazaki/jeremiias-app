import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, description, due_date, priorityId } = req.body;

    const userAlreadyTaskCreated = await prisma.task.findFirst({
      where: {
        AND: [{ title: title }, { userId: req.user.id }],
      },
    });

    if (userAlreadyTaskCreated) {
      throw new AppError(
        "O usuário já tem essa tarefa criada e incompleta!",
        409
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed: false,
        due_date,
        priorityId,
        userId: req.user.id,
      },
    });

    return res.status(201).json(task);
  }
}

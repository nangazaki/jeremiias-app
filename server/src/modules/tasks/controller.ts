import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import HttpStatusCodes from "../../constantes/HttpStatusCode";
import { CreateTaskDTO } from "./task.dto";

export class TaskController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description, due_date, priorityId }: CreateTaskDTO =
      req.body;

    const taskAlreadyTaskCreated = await prisma.task.findMany({
      where: {
        title,
        userId: req.user.id,
        is_deleted: false,
      },
    });

    if (taskAlreadyTaskCreated) {
      for (let task of taskAlreadyTaskCreated) {
        if (!task.completed) {
          console.log(task);
          throw new AppError(
            "O usuário já tem essa tarefa criada e incompleta!",
            HttpStatusCodes.CONFLICT
          );
        }
      }
    }

    await prisma.task.create({
      data: {
        title,
        description,
        completed: false,
        due_date,
        priorityId,
        userId: req.user.id,
      },
    });

    return res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Tarefa criada com sucesso!" });
  }

  async getUserTasks(req: Request, res: Response): Promise<Response> {
    const id = req.user.id;

    const userTasks = await prisma.task.findMany({
      where: { is_deleted: false },
    });

    return res.status(HttpStatusCodes.OK).json(userTasks);
  }

  async getTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id, is_deleted: false },
    });

    if (!task) {
      throw new AppError("Tarefa não encontrada.", 404);
    }

    return res.json(task);
  }

  async editTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, due_date, priority } = req.body;

    const taskToUpdate = await prisma.task.findUnique({
      where: { id },
    });

    if (!taskToUpdate) {
      throw new AppError("Tarefa não encontrada", HttpStatusCodes.NOT_FOUND);
    }

    await prisma.task.update({
      where: { id },
      data: { title, description, due_date, priority },
    });

    return res.status(HttpStatusCodes.OK).json();
  }

  async UpdateStateTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { completed } = req.body;

    await prisma.task.update({
      where: { id, userId: req.user.id },
      data: { completed },
    });

    return res.status(HttpStatusCodes.OK).json();
  }

  async deleteTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const taskToUpdate = await prisma.task.findUnique({
      where: { id, userId: req.user.id, is_deleted: false },
    });

    if (!taskToUpdate) {
      throw new AppError("Tarefa não encontrada", HttpStatusCodes.NOT_FOUND);
    }

    await prisma.task.update({
      where: { id, userId: req.user.id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });

    return res.status(HttpStatusCodes.OK).json();
  }

  async searchByTitle(req: Request, res: Response): Promise<Response> {
    const { titulo } = req.query;

    const title = titulo as string;

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
        is_deleted: false,
        title: {
          contains: title,
        },
      },
    });

    if (tasks.length === 0) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ status: 404, message: "Nenhuma tarefa encontrada!" });
    }

    return res.status(HttpStatusCodes.OK).json(tasks);
  }
}

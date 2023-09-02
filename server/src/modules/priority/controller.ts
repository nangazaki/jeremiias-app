import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import { CreatePriorityDTO } from "./priority.dto";
import { Priority } from "@prisma/client";

export class PriorityController {
  async create(req: Request, res: Response) {
    const { name }: CreatePriorityDTO = req.body;

    const priorityAlreadyExists = await prisma.priority.findUnique({
      where: {
        name,
      },
    });

    if (priorityAlreadyExists) {
      throw new AppError("A prioridade já existe", 409);
    }

    const priority = await prisma.priority.create({
      data: {
        name,
      },
    });

    return res.json(priority);
  }

  async GetAllPriorities(req: Request, res: Response) {
    const priorities = await prisma.priority.findMany();

    return res.status(200).json(priorities);
  }

  async deleteById(req: Request, res: Response) {
    const id: string = req.params.id;

    const priority = await prisma.priority.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Prioridade deletada com sucesso!",
    });
  }
}

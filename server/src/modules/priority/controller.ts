import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import { CreatePriorityDTO } from "./priority.dto";
import HttpStatusCodes from "../../constantes/HttpStatusCode";

export class PriorityController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name }: CreatePriorityDTO = req.body;

    const priorityAlreadyExists = await prisma.priority.findUnique({
      where: {
        name,
      },
    });

    if (priorityAlreadyExists) {
      throw new AppError("A prioridade já existe", HttpStatusCodes.CONFLICT);
    }

    const priority = await prisma.priority.create({
      data: {
        name,
      },
    });

    return res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Prioridade criada!" });
  }

  async GetAllPriorities(req: Request, res: Response): Promise<Response> {
    const priorities = await prisma.priority.findMany();

    return res.json(priorities);
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    const id: string = req.params.id;

    const priority = await prisma.priority.delete({
      where: {
        id,
      },
    });

    return res.status(HttpStatusCodes.OK).json({
      status: "success",
      message: "Prioridade deletada com sucesso!",
    });
  }
}

import bcrypt from "bcrypt";
import { CreateUserDTO, UserInfoEditDTO } from "./user.dto";
import { Request, Response } from "express";
import EnvVars from "../../constantes/EnvVars";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import HttpStatusCodes from "../../constantes/HttpStatusCode";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, password, username }: CreateUserDTO =
      req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError(
        "O e-mail já está a ser usado por outro usuário",
        HttpStatusCodes.CONFLICT
      );
    }

    const passwordEncrypted = await bcrypt.hash(password, EnvVars.Bcrypt.Salt);

    const userCreated = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: passwordEncrypted,
      },
    });

    const { password: _, ...user } = userCreated;

    return res.status(201).json(user);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        emailVerifiedAt: true,
        teams: true,
      }
    });

    if (!user) {
      throw new AppError("Usuário não encontrado!", HttpStatusCodes.NOT_FOUND);
    }

    return res.json(user);
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const { isSuperAdmin } = req.user;

    if (!isSuperAdmin) {
      throw new AppError(
        "Usuário não autorizado!",
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        teams: true,
        password: false,
      },
    });

    return res.json(users);
  }

  async editById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { firstName, lastName, email }: UserInfoEditDTO = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado!", HttpStatusCodes.NOT_FOUND);
    }

    return res.json({ message: "Edição feita com sucesso!" });
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    return res.json({
      message: "Implementando!",
    });
  }
}

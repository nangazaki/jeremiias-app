import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcrypt";
import { CreateUserDTO } from "./user.dto";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, surname, email, password, username }: CreateUserDTO =
      req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("O e-mail já está a ser usado por outro usuário", 409);
    }

    const passwordEncrypted = await bcrypt.hash(
      password,
      process.env.ENCRYPT ?? 10
    );

    const userCreated = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        username,
        password: passwordEncrypted,
      },
    });

    const { password: _, ...user } = userCreated;

    return res.status(201).json(user);
  }
}

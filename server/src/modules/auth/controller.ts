import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Login } from "./auth.dto";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";
import HttpStatusCodes from "../../constantes/HttpStatusCode";
import EnvVars from "../../constantes/EnvVars";
import { CreateUserDTO } from "../users/user.dto";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password }: Login = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new AppError("Usuario não encontrado.", HttpStatusCodes.NOT_FOUND);
    }

    const isMatched = await bcrypt.compare(
      password,
      userAlreadyExists.password
    );

    if (!isMatched) {
      throw new AppError("Senha inválida.", HttpStatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: userAlreadyExists.id }, EnvVars.Jwt.Secret, {
      expiresIn: EnvVars.Jwt.Exp,
    });

    const { password: _, ...user } = userAlreadyExists;

    return res.json({
      user,
      token,
    });
  }

  async register(req: Request, res: Response): Promise<Response> {
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

    return res.status(HttpStatusCodes.CREATED).json(user);
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

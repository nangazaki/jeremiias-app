import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Login } from "./auth.dto";
import { prisma } from "../../lib/prisma/client";
import { AppError } from "../../errors/AppError";

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password }: Login = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new AppError("Usuario não encontrado.", 404);
    }

    const isMatched = await bcrypt.compare(
      password,
      userAlreadyExists.password
    );

    if (!isMatched) {
      throw new AppError("Senha inválida.", 401);
    }

    const token = jwt.sign(
      { id: userAlreadyExists.id },
      process.env.JWT_PASS ?? "",
      { expiresIn: "24h" }
    );

    const { password: _, ...user } = userAlreadyExists;

    return res.json({
      user,
      token,
    });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

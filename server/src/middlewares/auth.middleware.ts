import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma/client";
import EnvVars from "../constantes/EnvVars";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Usuário não autorizado.", 401);
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, EnvVars.Jwt.Secret) as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado ou token inválido.", 404);
  }

  const { password, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};

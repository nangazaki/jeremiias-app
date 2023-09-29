import { Request, Response } from "express";

export class TrashController {
  async getAllTasks(req: Request, res: Response): Promise<Response> {}
  async restoreTask(req: Request, res: Response): Promise<Response> {}
  async deleteTaskPermanently(req: Request, res: Response): Promise<Response> {}
}

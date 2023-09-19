import * as cron from "node-cron";
import { prisma } from "../lib/prisma/client";

cron.schedule('0 0 * * *', async (): Promise<T> => {
  const retentionDateLimit = new Date();
  retentionDateLimit.setDate(retentionDateLimit.getDate() - 7)
  
  const tasksToDelete = await prisma.task.findMany({
    is_deleted: true,
    retention_period: {
      lt: retentionDateLimit,
    },
  })

  if (!tasksToDelete) {
    return ;
  }

  for(task of tasksToDelete) {
    await prisma.task.delete({
      where: {
        id: task.id
      }
    })
  }

  return ;
})

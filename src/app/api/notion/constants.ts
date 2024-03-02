import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export const getDbSessionBotId = async () => {
  const botId = cookies().get("bot_id")?.value;
  const prisma = new PrismaClient();

  const dbSession = await prisma.session.findUnique({
    where: {
      bot_id: botId,
    },
  });

  prisma.$disconnect();

  return dbSession;
};

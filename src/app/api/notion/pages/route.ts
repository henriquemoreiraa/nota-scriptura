import { errorResponse } from "@/utils/error-responses";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const botId = cookies().get("bot_id");

  if (!botId?.value) {
    return errorResponse({
      message: "'bot_id' not found.",
      status: 400,
    });
  }

  if (!body.book) {
    return errorResponse({
      message: "'book' is missing in the request body.",
      status: 400,
    });
  }

  const prisma = new PrismaClient();

  try {
    const dbSession = await prisma.session.findUnique({
      where: {
        bot_id: botId.value,
      },
    });

    if (!dbSession) {
      return errorResponse({
        message: "Session not found",
        status: 400,
      });
    }

    const year = new Date().getFullYear();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        Authorization: `Bearer ${dbSession.access_token}`,
      },
    };

    const { data: databaseData } = await axios.post(
      "https://api.notion.com/v1/databases",
      {
        parent: {
          type: "page_id",
          page_id: dbSession.duplicated_template_id,
        },
        title: [
          {
            type: "text",
            text: {
              content: `Leituras ${year}`,
              link: null,
            },
          },
        ],
        icon: {
          type: "emoji",
          emoji: "📖",
        },
        properties: {
          Livro: {
            title: {},
          },
          Abreviação: {
            rich_text: {},
          },
          "Hora da última edição": {
            last_edited_time: {},
          },
        },
      },
      config
    );

    await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: {
          database_id: databaseData.id,
        },
        properties: {
          Livro: {
            title: [
              {
                text: {
                  content: body.book.name,
                },
              },
            ],
          },
          Abreviação: {
            rich_text: [
              {
                text: {
                  content: body.book.abbrev.pt,
                },
              },
            ],
          },
        },
      },
      config
    );

    return new Response("Page created successfully!", {
      status: 200,
    });
  } catch (error) {
    return errorResponse(error as any);
  } finally {
    prisma.$disconnect();
  }
}

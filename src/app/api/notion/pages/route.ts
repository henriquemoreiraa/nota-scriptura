import { errorResponse } from "@/utils/error-responses";
import { Client } from "@notionhq/client";
import { getDbSessionBotId } from "../constants";

export async function GET() {
  try {
    const dbSession = await getDbSessionBotId();

    if (!dbSession) {
      return errorResponse({
        message: "Session not found",
        status: 400,
      });
    }

    const notion = new Client({
      auth: dbSession.access_token,
    });

    const { results: blockResults } = await notion.blocks.children.list({
      block_id: dbSession.duplicated_template_id,
      page_size: 1,
    });

    const { results: databaseResults } = await notion.databases.query({
      database_id: blockResults[0].id,
      sorts: [
        {
          property: "Hora da última edição",
          direction: "descending",
        },
      ],
      page_size: 1,
    });

    if (!databaseResults.length) {
      return errorResponse({
        message: "No books found.",
        status: 400,
      });
    }

    return Response.json(databaseResults[0], { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.book) {
    return errorResponse({
      message: "'book' is missing in the request body.",
      status: 400,
    });
  }

  try {
    const dbSession = await getDbSessionBotId();

    if (!dbSession) {
      return errorResponse({
        message: "Session not found",
        status: 400,
      });
    }

    const notion = new Client({
      auth: dbSession.access_token,
    });

    const year = new Date().getFullYear();

    const databaseData = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: dbSession.duplicated_template_id,
      },
      title: [
        {
          type: "text",
          text: {
            content: `Leituras ${year}`,
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
    });

    await notion.pages.create({
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
    });

    return new Response("Page created successfully!", {
      status: 200,
    });
  } catch (error) {
    return errorResponse(error as any);
  }
}

import { errorResponse } from "@/utils/error-responses";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { getDbSessionBotId } from "../../constants";

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

    const n2m = new NotionToMarkdown({ notionClient: notion });

    const { results: blockResults } = await notion.blocks.children.list({
      block_id: dbSession.duplicated_template_id,
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

    const { results: pageResults } = await notion.blocks.children.list({
      block_id: databaseResults[0].id,
    });

    const x = await n2m.blocksToMarkdown(pageResults);

    return Response.json(n2m.toMarkdownString(x), { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

import { errorResponse } from "@/utils/api/error-responses";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NextRequest } from "next/server";
import { getDbSessionBotId } from "@/utils/api/get-db-session";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pageId = params.slug;

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

    const { results: pageResults } = await notion.blocks.children.list({
      block_id: pageId,
    });

    const x = await n2m.blocksToMarkdown(pageResults);

    return Response.json(n2m.toMarkdownString(x), { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pageId = params.slug;
  const { blocks } = await request.json();

  if (!blocks) {
    return errorResponse({
      message: "'block' is missing in the request body.",
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

    await notion.blocks.children.append({
      block_id: pageId,
      children: blocks,
    });

    return new Response("Block appended successfully", { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

import { errorResponse } from "@/utils/api/error-responses";
import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";
import { getDbSessionBotId } from "@/utils/api/get-db-session";

export async function PATCH(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get("page_id");
  const { block } = await request.json();

  if (!pageId) {
    return errorResponse({
      message: "Page ID is required",
      status: 400,
    });
  }

  if (!block) {
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
      children: [block],
    });

    return new Response("Block appended successfully", { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

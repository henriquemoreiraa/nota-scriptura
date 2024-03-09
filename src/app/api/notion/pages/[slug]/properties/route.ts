import { errorResponse } from "@/utils/api/error-responses";
import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";
import { getDbSessionBotId } from "@/utils/api/get-db-session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pageId = params.slug;
  const { properties } = await request.json();

  if (!properties) {
    return errorResponse({
      message: "'properties' is missing in the request body.",
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

    await notion.pages.update({
      page_id: pageId,
      properties,
    });

    return new Response("Block appended successfully", { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

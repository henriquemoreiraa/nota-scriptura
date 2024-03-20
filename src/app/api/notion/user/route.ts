import { errorResponse } from "@/utils/api/error-responses";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NextRequest } from "next/server";
import { getDbSessionBotId } from "@/utils/api/get-db-session";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    const user = await notion.users.retrieve({
      user_id: dbSession.user_id,
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

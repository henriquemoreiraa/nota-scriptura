import { errorResponse } from "@/utils/api/error-responses";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return errorResponse({
      message: "Missing 'code' parameter.",
      status: 400,
    });
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return errorResponse({
      message: "Missing OAuth environment variables",
      status: 500,
    });
  }

  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const prisma = new PrismaClient();

  try {
    const { data } = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
        },
      }
    );

    const dataSession = {
      bot_id: data.bot_id,
      access_token: data.access_token,
      workspace_id: data.workspace_id,
      duplicated_template_id: data.duplicated_template_id,
      user_id: data.owner.user.id,
    };

    const dbSession = await prisma.session.findUnique({
      where: {
        user_id: dataSession.user_id,
        AND: { workspace_id: dataSession.workspace_id },
      },
    });

    if (
      !dbSession?.duplicated_template_id &&
      !dataSession.duplicated_template_id
    ) {
      return errorResponse({
        message: "Template not provided",
        status: 400,
      });
    }

    if (dbSession) {
      await prisma.session.update({
        data: {
          ...dataSession,
          duplicated_template_id: dbSession.duplicated_template_id,
        },
        where: { user_id: dataSession.user_id },
      });
    } else {
      await prisma.session.create({
        data: dataSession,
      });
    }

    cookies().set("bot_id", dataSession.bot_id, {
      httpOnly: true,
      secure: true,
    });

    return new Response("Token set successfully!", {
      status: 200,
    });
  } catch (error) {
    return errorResponse(error as any);
  } finally {
    prisma.$disconnect();
  }
}

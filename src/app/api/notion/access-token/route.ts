import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  //TODO: req notion with tmp code
  //TODO: res -> set access token as cookie

  cookies().set("notion-access-token", `access-token-example`, {
    httpOnly: true,
    secure: true,
  });

  return new Response("Token set successfully", {
    status: 200,
  });
}
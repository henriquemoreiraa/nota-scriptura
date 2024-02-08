import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  //TODO: req notion with tmp code
  //TODO: res -> set access token as cookie

  cookies().set("notion-token", `access-token-example`, {
    httpOnly: true,
    secure: true,
  });

  cookies().set("notion-token-exists", "true");

  return new Response("Token set successfully", {
    status: 200,
  });
}

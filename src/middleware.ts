import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { errorResponse } from "./utils/api/error-responses";

export async function middleware(request: NextRequest) {
  const botIdExists = request.cookies.get("bot_id")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname.endsWith("/")) {
    const absoluteURL = new URL("/ler", request.nextUrl.origin);

    if (botIdExists) return NextResponse.redirect(absoluteURL.toString());
  }
  if (pathname.endsWith("/livros")) {
    const absoluteURL = new URL("/", request.nextUrl.origin);

    if (!botIdExists) return NextResponse.redirect(absoluteURL.toString());
  }

  // api
  if (pathname.includes("/api/notion") && !pathname.endsWith("/access-token")) {
    if (!botIdExists) {
      return errorResponse({
        message: "'bot_id' not found.",
        status: 400,
      });
    }
  }
}

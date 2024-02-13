import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith("/")) {
    const botIdExists = request.cookies.get("bot_id")?.value;
    const absoluteURL = new URL("/ler", request.nextUrl.origin);

    if (botIdExists) return NextResponse.redirect(absoluteURL.toString());
  }
}

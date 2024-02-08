import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith("/")) {
    const notionTokenExists = request.cookies.get("notion-token-exists")?.value;
    const absoluteURL = new URL("/ler", request.nextUrl.origin);

    if (notionTokenExists) return NextResponse.redirect(absoluteURL.toString());
  }
}

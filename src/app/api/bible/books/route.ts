import { errorResponse } from "@/utils/api/error-responses";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const author = searchParams.get("author")?.split(",");
  const testament = searchParams.get("testament")?.split(",");
  const group = searchParams.get("group")?.split(",");

  const prisma = new PrismaClient();

  try {
    const books = await prisma.book.findMany({
      where: {
        author: {
          in: author,
        },
        testament: {
          in: testament,
        },
        group: {
          in: group,
        },
      },
    });

    return new Response(JSON.stringify(books), {
      status: 200,
    });
  } catch (error) {
    return errorResponse(error as any);
  } finally {
    prisma.$disconnect();
  }
}

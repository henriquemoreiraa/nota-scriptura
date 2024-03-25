import { errorResponse } from "@/utils/api/error-responses";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = process.env.ABIBLIADIGITAL_TOKEN;
  const abbrev = params.slug;

  try {
    const { data } = await axios.get(
      `https://www.abibliadigital.com.br/api/books/${abbrev}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return Response.json(data, { status: 200 });
  } catch (error) {
    return errorResponse(error as any);
  }
}

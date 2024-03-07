import { errorResponse } from "@/utils/api/error-responses";
import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = process.env.ABIBLIADIGITAL_TOKEN;
  const slugs = params.slug;

  try {
    const { data } = await axios.get(
      `https://www.abibliadigital.com.br/api/verses/${slugs[0]}/${slugs[1]}/${slugs[2]}`,
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

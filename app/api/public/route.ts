import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const mostRecentJsonDocument = await prisma.jsonData.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    return NextResponse.json(mostRecentJsonDocument);
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

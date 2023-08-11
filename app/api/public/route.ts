import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 1; //revalidate api every 1 second

// Get the most recent json file
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

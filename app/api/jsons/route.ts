import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(options);
    if (!session) return NextResponse.json({ message: "Access Denied" }, { status: 403 });

    const jsonData = await prisma.jsonData.findMany();
    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ msg: "Something is wrong", error });
  }
}
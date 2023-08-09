import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getServerSession(options);
  if (session?.user.role !== "admin")
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

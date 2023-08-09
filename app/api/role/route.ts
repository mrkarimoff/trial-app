import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(options);
    if (!session) return NextResponse.json({ message: "Access Denied" }, { status: 403 });

    const { email, role } = await req.json();
    const updateUser = await prisma.user.update({ where: { email }, data: { role } });
    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

// Update user role
export async function PUT(req: Request) {
  const session = await getServerSession(options);
  if (!session) return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  try {
    const { email, role } = await req.json();
    const updateUser = await prisma.user.update({ where: { email }, data: { role } });
    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

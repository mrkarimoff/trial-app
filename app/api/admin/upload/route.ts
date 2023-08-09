import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

type JsonFile = {
  data: string;
  name: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(options);
  if (session?.user.role !== "admin")
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  const jsonFiles: JsonFile[] = await req.json();

  try {
    if (!jsonFiles.length) return NextResponse.json({ message: "No file here" }, { status: 400 });

    await prisma.jsonData.createMany({
      data: jsonFiles,
    });

    return NextResponse.json({ message: "Files uploaded successfully!" });
  } catch (error) {
    console.error("Error reading the file:", error);
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

type Params = {
  params: {
    id: string;
  };
};

// Get single json file
export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession(options);
  if (!session) return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  const { id } = params;

  try {
    const jsonData = await prisma.jsonData.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!jsonData) {
      return NextResponse.json({ message: "JSON data not found" }, { status: 404 });
    }

    // Convert the JSON string to a JSON object
    const jsonObject = JSON.parse(jsonData.data);

    return NextResponse.json({ id: jsonData.id, name: jsonData.name, data: jsonObject });
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

// Delete single json file
export async function DELETE(req: Request, { params }: Params) {
  const session = await getServerSession(options);
  if (session?.user.role !== "admin")
    return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  const { id } = params;

  try {
    const deletedJsonData = await prisma.jsonData.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(deletedJsonData);
  } catch (error) {
    return NextResponse.json({ message: "Something is wrong", error });
  }
}

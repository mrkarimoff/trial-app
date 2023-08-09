import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  try {
    const session = await getServerSession(options);
    if (!session) return NextResponse.json({ message: "Access Denied" }, { status: 403 });

    // Fetch the JSON data by id
    const jsonData = await prisma.jsonData.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!jsonData) {
      return NextResponse.json({ error: "JSON data not found" }, { status: 404 });
    }

    // Convert the JSON string to a JSON object
    const jsonObject = JSON.parse(jsonData.data);

    return NextResponse.json({ id: jsonData.id, name: jsonData.name, data: jsonObject });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;

  try {
    const deletedJsonData = await prisma.jsonData.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(deletedJsonData);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

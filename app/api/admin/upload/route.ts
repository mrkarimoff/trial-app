import prisma from "@/lib/prisma";
import fs, { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { join } from "path";
import { options } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
  //   const session = await getServerSession(options);
  //   if (session?.user.role !== "admin")
  //     return NextResponse.json({ message: "Access Denied" }, { status: 403 });

  const body: FormData = await req.formData();
  const files: FormDataEntryValue[] = body.getAll("jsonFile");

  const jsonFiles = files.map((item) => item as File);

  try {
    // if (!jsonFiles.length) return NextResponse.json({ message: "No file here" }, { status: 400 });

    // jsonFiles.forEach(async (jsonFile) => {
    //   const bytes = await jsonFile.arrayBuffer();
    //   const buffer = Buffer.from(bytes);

    //   const path = join("./", "tmp", jsonFile.name);
    //   await writeFile(path, buffer);

    //   const data: string = await fs.readFile(path, "utf8");
    //   await prisma.jsonData.create({
    //     data: {
    //       data: data,
    //       name: jsonFile.name,
    //     },
    //   });
    //   await fs.unlink(path);
    // });

    return NextResponse.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error reading the file:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

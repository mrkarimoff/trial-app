import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    return NextResponse.json({ data: "The most recently uploaded JSON." });
  } catch (error) {
    return NextResponse.json({ data: error });
  }
}

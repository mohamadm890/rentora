import { NextResponse } from "next/server";
import { createProperty, getProperties } from "@/services/property.service";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await createProperty(body);

  return NextResponse.json({
    success: true,
    data: result
  });
}

export async function GET() {
  const result = await getProperties();

  return NextResponse.json(result);
}
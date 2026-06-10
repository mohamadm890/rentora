import { storage } from "../../lib/appwrite";
import { ID } from "appwrite";
import { NextResponse } from "next/server";
import { uploadImage } from "@/services/upload.service";

export async function POST(req: Request) {
  const formData = await req.formData();

  console.log("formData", formData);
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return Response.json(
      { message: "No files received" },
      { status: 400 }
    );
  }
  const uploadedFiles = [];

  for (const file of files) {
    const result = await uploadImage(file);
    uploadedFiles.push(result.$id);
  }

  return NextResponse.json({
    success: true,
    imageIds: uploadedFiles
  });
}
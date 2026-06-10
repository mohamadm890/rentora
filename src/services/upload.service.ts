import { storage } from "../app/lib/appwrite";
import { ID } from "appwrite";

const BUCKET_ID = "6a25887900030b3c3b9c";

export async function uploadImage(file: File) {
  const uploaded = await storage.createFile(
    BUCKET_ID,
    ID.unique(),
    file
  );

  return uploaded;
}
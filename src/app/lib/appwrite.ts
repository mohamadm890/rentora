import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const BUCKET_ID = '6a25887900030b3c3b9c'
export const databases = new Databases(client);
export const storage = new Storage(client);

export function getImageUrl(imageId: string) {
  return storage.getFileView(BUCKET_ID, imageId);
}
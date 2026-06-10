import { ID } from "appwrite";
import { databases } from "../app/lib/appwrite";
import { Property } from "@/types/property";

const DATABASE_ID = "6a258999003bb9fccfa8";
const COLLECTION_ID = "properties";

export async function createProperty(data: Property) {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    data
  );
}

export async function getProperties() {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID
  );
}
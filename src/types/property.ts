export type PropertyType =
  | "studio"
  | "apartment"
  | "villa"
  | "room"
  | "office";

export interface Property {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;

  title: string;
  type: PropertyType;

  city: string;
  location?: string;

  description?: string;

  price: number;

  contact: string;

  imageIds: string[];

  coverImageId?: string;
}

export type PropertyForm = {
  title: string;
  type: PropertyType;
  city: string;
  location?: string;
  description?: string;
  price: number;
  contact: string;
};
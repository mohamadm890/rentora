import { Property } from "@/types/property";

export async function createListing(data: Property) {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    return res.json();
  }


export async function getListings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/properties`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  return res.json();
}

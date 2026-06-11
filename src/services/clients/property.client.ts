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
    const res = await fetch("https://rentora.ma/api/properties", {
      method: "GET"
    });
  
    return res.json();
  }

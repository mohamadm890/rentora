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
    const res = await fetch("https://3000-firebase-rentora-1780334307641.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev/api/properties", {
      method: "GET"
    });
  
    return res.json();
  }
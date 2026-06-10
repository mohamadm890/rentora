export function filterListings(listings: any, city: any, type: any) {
    return listings.filter((item: any) => {
      const cityMatch = city === "All" || item.city === city;
      const typeMatch = type === "All" || item.type === type;
      return cityMatch && typeMatch;
    });
  }
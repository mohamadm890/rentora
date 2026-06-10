export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")        // spaces → -
      .replace(/[^\w\-]+/g, "")    // remove special chars
      .replace(/\-\-+/g, "-");     // remove double --
  }
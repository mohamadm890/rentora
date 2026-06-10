"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log("REAL ERROR:", error);
  }, [error]);

  return (
    <div>
      <h2>Something broke 🚨</h2>
      <pre>{error.message}</pre>

      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
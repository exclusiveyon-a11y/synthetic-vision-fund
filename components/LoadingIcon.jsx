"use client";

import { useEffect } from "react";

export default function LoadingIcon() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.safeInit) {
      window.safeInit();
    }
  }, []);

  return (
    <div
      id="svf-loading-icon"
      style={{
        width: "72px",
        height: "72px",
        margin: "20px auto",
      }}
    />
  );
}
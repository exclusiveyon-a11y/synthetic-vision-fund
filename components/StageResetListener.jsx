"use client";
import { useEffect, useRef } from "react";
import { resetStage } from "../lib/growthStage";

export default function StageResetListener() {
  const timer = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "R" && e.shiftKey && !timer.current) {
        timer.current = setTimeout(() => {
          resetStage();
          window.location.href = "/";
        }, 3000);
      }
    };

    const up = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return null;
}
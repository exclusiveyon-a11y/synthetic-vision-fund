"use client";

import { useEffect, useRef, useState } from "react";
import { getStage, resetStage } from "../lib/growthStage";

// Exhibition wrapper:
// - Applies `stage-1|2|3` class for global CSS effects
// - Stage>=2: disables browser back + Escape
// - Hold `R` for 3 seconds: reset to stage 1 and go Home
export default function ClientStageWrapper({ children }) {
  const [stage, setStage] = useState(1);
  const resetTimer = useRef(null);

  useEffect(() => {
    setStage(getStage());
  }, []);

  // Disable Back/Escape for exhibition mode (stage 2/3)
  useEffect(() => {
    if (stage < 2) return;

    // 1) Back button trap
    const trap = () => {
      try {
        window.history.pushState(null, "", window.location.href);
      } catch {
        // ignore
      }
    };

    const onPopState = (e) => {
      e.preventDefault?.();
      trap();
    };

    trap();
    window.addEventListener("popstate", onPopState);

    // 2) ESC / Backspace (when not typing)
    const onKeyDown = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;

      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }

      // Prevent accidental browser back in some contexts
      if (e.key === "Backspace" && !isTyping) {
        e.preventDefault();
      }

      // Exhibition reset: hold R 3 seconds
      if ((e.key === "r" || e.key === "R") && !resetTimer.current) {
        resetTimer.current = window.setTimeout(() => {
          resetStage();
          window.location.href = "/";
        }, 3000);
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "r" || e.key === "R") {
        if (resetTimer.current) {
          clearTimeout(resetTimer.current);
          resetTimer.current = null;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp, { capture: true });

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp, { capture: true });
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };
  }, [stage]);

  return <div className={`stage-${stage}`}>{children}</div>;
}

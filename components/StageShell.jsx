"use client";

import { useEffect, useRef, useState } from "react";
import { getStage, resetStage } from "../lib/growthStage";

/**
 * StageShell
 * - Adds body class: stage-1 / stage-2 / stage-3
 * - Exhibition reset gesture: hold "R" for 3 seconds (Shift not required)
 * - Stage 3: blocks browser Back button via popstate trap
 */
export default function StageShell({ children }) {
  const [stage, setStage] = useState(1);
  const holdTimer = useRef(null);
  const popstateBound = useRef(false);

  // Sync stage from localStorage
  useEffect(() => {
    const sync = () => setStage(getStage());
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  // Apply stage class to body
  useEffect(() => {
    const cls1 = "stage-1";
    const cls2 = "stage-2";
    const cls3 = "stage-3";
    document.body.classList.remove(cls1, cls2, cls3);
    document.body.classList.add(`stage-${stage}`);
  }, [stage]);

  // Reset gesture: hold R for 3 seconds
  useEffect(() => {
    const onDown = (e) => {
      if (e.repeat) return;
      if (String(e.key).toLowerCase() !== "r") return;
      if (holdTimer.current) return;

      holdTimer.current = window.setTimeout(() => {
        resetStage();
        window.location.href = "/";
      }, 3000);
    };

    const onUp = (e) => {
      if (String(e.key).toLowerCase() !== "r") return;
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // Stage 3: block Back button
  useEffect(() => {
    if (stage !== 3) return;

    const trap = () => {
      // keep the user on the same history entry
      history.pushState(null, "", window.location.href);
    };

    if (!popstateBound.current) {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", trap);
      popstateBound.current = true;
    }

    return () => {
      window.removeEventListener("popstate", trap);
      popstateBound.current = false;
    };
  }, [stage]);

  return children;
}

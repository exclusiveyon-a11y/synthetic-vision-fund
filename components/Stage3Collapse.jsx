"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Stage 3: "infinite payment" illusion — safe, capped window proliferation.
// - Spawns processing windows that jitter around the viewport
// - Closing a window spawns more (up to a cap)
// - Uses timeouts/intervals with cleanup (no memory leak)

const MAX_WINDOWS = 12;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Stage3Collapse({ seedKey = "default" }) {
  const [windows, setWindows] = useState(() => [1, 2, 3]);
  const counter = useRef(3);

  // keep positions stable per id
  const positions = useMemo(() => {
    const map = new Map();
    for (const id of windows) {
      map.set(id, {
        top: rand(80, 360),
        left: rand(40, 520),
        rotate: rand(-2, 2),
      });
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedKey, windows.join(",")]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWindows((prev) => {
        if (prev.length >= MAX_WINDOWS) return prev;
        // gently grow over time
        counter.current += 1;
        return [...prev, counter.current];
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const spawn = (n = 1) => {
    setWindows((prev) => {
      if (prev.length >= MAX_WINDOWS) return prev;
      const out = [...prev];
      for (let i = 0; i < n; i += 1) {
        if (out.length >= MAX_WINDOWS) break;
        counter.current += 1;
        out.push(counter.current);
      }
      return out;
    });
  };

  const onClose = (id) => {
    // closing creates more (illusion). remove the clicked one and spawn 2.
    setWindows((prev) => prev.filter((x) => x !== id));
    spawn(2);
  };

  return (
    <div className="svf-stage3-overlay" aria-hidden>
      {windows.map((id) => {
        const pos = positions.get(id) || { top: 120, left: 80, rotate: 0 };
        return (
          <div
            key={id}
            className="svf-modal-window"
            style={{
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            <div className="svf-modal-titlebar">
              <span>Processing payment…</span>
              <button
                type="button"
                className="svf-modal-close"
                onClick={() => onClose(id)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="svf-modal-body">
              <div className="svf-modal-spinner" />
              <div className="svf-modal-lines">
                <div className="svf-modal-line" />
                <div className="svf-modal-line short" />
              </div>
              <p className="svf-modal-note">
                Retrying… connection unstable. Do not refresh.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

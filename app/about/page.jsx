"use client";

import { useState, useEffect } from "react";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="svf-page">
      <h1 className="svf-page-title">About Us</h1>

      {/* 🎥 Promo Video */}
      {!loading && (
        <div className="svf-video-wrapper">
          <video
            className="svf-video"
            src="/video/svf-promo.mp4"
            controls
            loop
            playsInline
            style={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "16px",
              outline: "none",
              border: "2px solid #c9ff5c", // 네온그린 테두리
              backgroundColor: "#000",
            }}
          />
        </div>
      )}

      <p className="svf-page-description">
        Synthetic Vision Fund is a fictional AI investment platform that mimics
        the language, interfaces, and interaction flows of contemporary startup
        and venture capital culture.
      </p>

      <p className="svf-page-description">
        By simulating familiar actions — reading articles, clicking investment
        buttons, entering checkout flows, and receiving confirmation screens —
        the website creates the illusion of participation in a legitimate
        financial system.
      </p>

      <p className="svf-page-description">
        Rather than critiquing AI as a technology, the project examines how
        interfaces, terminology, and design conventions manufacture trust and
        belief.
      </p>

      <p className="svf-page-description svf-page-emphasis">
        The system does not record actions or outcomes.
      </p>

      <p className="svf-page-description svf-page-emphasis">
        To restart the experience at any time, keep holding "Shift + R" to reset
        the interface.
      </p>
    </main>
  );
}
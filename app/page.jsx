"use client";

import { useEffect, useState } from "react";
import cards from "../data/cards";
import Card from "../components/Card";
import { getStage } from "../lib/growthStage";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(1);
  const [filter, setFilter] = useState("all"); // 'all' | 'audio'

  useEffect(() => {
    setStage(getStage());
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const filteredCards = cards.filter((c) =>
    filter === "all" ? true : !!c.audio
  );

  return (
      <main className={`svf-main stage-${stage}`}>
        <section className="svf-hero">
          {loading ? (
            <div className="skeleton-line" style={{ height: 80, width: 600 }} />
          ) : (
            <>
              <h1>Invest in Visionaries. Even the Synthetic Ones.</h1>

              <div className="filter-button-group">
                <button
                  className={`filter-button ${
                    filter === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  Show All
                </button>
                <button
                  className={`filter-button ${
                    filter === "audio" ? "active" : ""
                  }`}
                  onClick={() => setFilter("audio")}
                >
                  🎧 Audio Episodes
                </button>
              </div>
            </>
          )}
        </section>

        <section className="svf-grid">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} isSkeleton />
              ))
            : shuffleArray(filteredCards).map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                  images={item.images}
                  growthStage={stage}
                />
              ))}
        </section>
      </main>
  );
}
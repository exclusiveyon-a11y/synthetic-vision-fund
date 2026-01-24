"use client";

import { useEffect, useState } from "react";
import cards from "../../data/cards";
import Card from "../../components/Card";
import { getStage } from "../../lib/growthStage";

export default function ArticlesPage() {
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    setStage(getStage());
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="svf-page">
      <h1 className="svf-page-title">Articles</h1>
      <p className="svf-page-description">
        Explore the visionaries and synthetic founders behind our portfolio.
        Real or synthetic — we invest in conviction, ambition, and exponential potential.
      </p>

      <section className="svf-grid svf-grid-3">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <Card key={i} isSkeleton />)
          : cards.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                // ✅ stage에 맞는 이미지가 있으면 그것을 사용
                image={item.images?.[stage - 1] || item.image}
              />
            ))}
      </section>
    </main>
  );
}
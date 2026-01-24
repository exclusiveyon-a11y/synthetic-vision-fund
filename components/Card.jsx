"use client";

import Link from "next/link";

export default function Card({
  id,
  title,
  subtitle,
  image,
  images = [],
  growthStage = 1,
  isSkeleton = false,
}) {
  if (isSkeleton) {
    return (
      <div className="svf-card svf-card-skeleton">
        <div className="svf-card-skeleton-image" />
      </div>
    );
  }

  const finalImage =
    images.length > 0
      ? images[Math.min(growthStage - 1, images.length - 1)]
      : image;

  return (
    <Link
      href={`/detail/${id}`}
      className="svf-card"
      style={{
        backgroundImage: `url(${finalImage})`,
        textDecoration: "none",
        color: "#fff",
      }}
    >
      <div className="svf-card-meta">
        <span className="dot" />
        <span>Episode {id}</span>
        <div className="spacer" />
        <span>READ</span>
      </div>

      <div className="svf-card-text">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
}
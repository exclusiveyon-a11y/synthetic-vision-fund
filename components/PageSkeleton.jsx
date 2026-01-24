import Card from "./Card";

export default function PageSkeleton({ count = 6 }) {
  return (
    <div className="svf-grid">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} isSkeleton={true} />
      ))}
    </div>
  );
}
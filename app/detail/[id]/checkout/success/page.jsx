"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { nextStage } from "../../../../../lib/growthStage";


export default function SuccessPage({ params }) {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode 2회 실행 방지
    ran.current = true;

    const stage = nextStage();

    // Stage progression:
    // 1 -> 2 : go Home (cards can swap images)
    // 2 -> 3 : go back to Checkout (collapse loop)
    const to = stage === 3 ? `/detail/${params.id}/checkout` : "/";
    const delay = stage === 3 ? 1100 : 1400;
    const t = setTimeout(() => router.push(to), delay);
    return () => clearTimeout(t);

  }, []);

  return (
    <div className="success-page">
      <h1>Processing investment…</h1>
      <p>System unstable.</p>
    </div>
  );
}
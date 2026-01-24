"use client";

import { useRouter } from "next/navigation";
import { nextStage } from "../lib/growthStage";

export default function SuccessCard() {
  const router = useRouter();

  const handleClick = () => {
    nextStage();       // 🔼 stage 증가
    router.push("/");  // 🏠 홈으로 이동
  };

  return (
    <div className="svf-processing-card">
      <div className="success-icon">✓</div>

      <h1>Payment Successful</h1>
      <p>Thank you for investing in synthetic futures.</p>

      <button
        onClick={handleClick}
        className="pay-button"
        style={{ marginTop: "24px" }}
      >
        ← Go Back
      </button>
    </div>
  );
}
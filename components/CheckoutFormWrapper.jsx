"use client";

import { useState } from "react";
import PayPalCheckout from "./PayPalCheckout";
import ProcessingModal from "./ProcessingModal";
import SuccessCard from "./SuccessCard";

export default function CheckoutFormWrapper({ amount, onComplete }) {
  const [step, setStep] = useState("processing");

  return (
    <div>
      {/* ✅ Processing overlay */}
      {step === "processing" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <ProcessingModal />
          </div>
        </div>
      )}

      {/* ✅ Success overlay */}
      {step === "success" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <SuccessCard />
          </div>
        </div>
      )}

      {/* ✅ PayPal 버튼 */}
      <PayPalCheckout
        amount={amount}
        onSuccess={() => {
          setStep("success"); // 🔁 로딩 → 성공으로 바꿈
          setTimeout(() => {
            onComplete(); // 외부 로직 (예: stage 증가)
          }, 2000);
        }}
      />
    </div>
  );
}
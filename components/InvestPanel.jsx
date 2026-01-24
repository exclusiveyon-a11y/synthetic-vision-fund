"use client";

import { useState, useEffect, useRef } from "react";
import PayPalCheckout from "./PayPalCheckout";
import ProcessingModal from "./ProcessingModal";
import SuccessCard from "./SuccessCard";
import { nextStage } from "../lib/growthStage";
import { useRouter } from "next/navigation";

export default function InvestPanel({ invested, supporters, marketcap, ipo, onInvest }) {
  const [amount, setAmount] = useState(1000);
  const [step, setStep] = useState("select");
  const router = useRouter();
  const rangeRef = useRef(null);

  // 채워진 슬라이더 배경 업데이트
  useEffect(() => {
    if (!rangeRef.current) return;
    const el = rangeRef.current;
    const percent = ((amount - 100) / (10000 - 100)) * 100;
    el.style.background = `linear-gradient(to right, #c9ff5c ${percent}%, #444 ${percent}%)`;
  }, [amount]);

  const handlePaymentDone = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 1200);
  };

  return (
    <div className="invest-panel">
      {/* 📊 투자 메타 정보 */}
      {step === "select" && (
        <div className="invest-stats">
          <div>
            <span className="label">Invested</span>
            <span className="value">{invested}</span>
          </div>
          <div>
            <span className="label">Supporters</span>
            <span className="value">{supporters}</span>
          </div>
          <div>
            <span className="label">Market Cap</span>
            <span className="value">{marketcap}</span>
          </div>
          <div>
            <span className="label">IPO</span>
            <span className="value">{ipo}</span>
          </div>
        </div>
      )}

      {/* 💵 STEP 1: 금액 선택 */}
      {step === "select" && (
        <div className="amount-select">
          <label>Amount to Invest</label>

          <div className="amount-display">${amount}</div>

          <input
            ref={rangeRef}
            type="range"
            min="100"
            max="10000"
            step="100"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <button
            className="pay-button"
            onClick={() => setStep("checkout")}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {/* 💳 STEP 2: PayPal 결제 */}
      {step === "checkout" && (
        <div className="paypal-step">
          <div className="paypal-amount-display">
            <span className="paypal-amount-label">You're investing</span>
            <span className="paypal-amount-value">${amount.toLocaleString()}</span>
            <p className="checkout-belowtext">Choose your payment method</p>

          </div>

          <PayPalCheckout
            amount={amount}
            onSuccess={handlePaymentDone}
          />
        </div>
      )}

      {/* ⏳ STEP 3: Processing */}
      {step === "processing" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <ProcessingModal />
          </div>
        </div>
      )}

      {/* ✅ STEP 4: Success */}
      {step === "success" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <SuccessCard
              onGoBack={() => {
                onInvest();
                setStep("select");
                router.push("/");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
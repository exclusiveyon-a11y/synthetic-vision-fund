// CheckoutPage.jsx (최종 수정본)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import cards from "../../../../data/cards";
import InvestPanel from "../../../../components/InvestPanel";
import ProcessingModal from "../../../../components/ProcessingModal";
import { getStage } from "../../../../lib/growthStage";

export default function CheckoutPage({ params }) {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const { id } = params;
    const target = cards.find((c) => c.id === id);
    setItem(target);
    setLoading(false);
    setStage(getStage());
  }, [params]);

  if (!item) {
    return (
      <main className="svf-detail checkout-layout">
        <h1>404 — Deal Not Found</h1>
      </main>
    );
  }

  return (
    <main className={`svf-detail checkout-layout stage-${stage}`}>
      {/* 왼쪽 영역 */}
      <div className="checkout-main">
        {/* 기존 결제 단계 UI */}
        {(stage === 1 || stage === 2) && (
          <>
            <h2 className="checkout-step">1. Amount</h2>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              defaultValue={item.invested}
              className="amount-slider"
            />

            <h2 className="checkout-step">2. Payment Info</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="form-group">
              <label>Expiration</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input type="text" placeholder="123" />
            </div>
            <button
              className="pay-button"
              onClick={() => router.push(`/detail/${item.id}/checkout/success`)}
            >
              Pay
            </button>
          </>
        )}

        {/* Stage 3에서는 기존 UI + 무한 결제 모달 */}
        {stage === 3 && <ProcessingModal infinite={true} />}
      </div>

      {/* 오른쪽 요약 카드 */}
      <div className="checkout-summary">
        <InvestPanel
          invested={item.invested}
          supporters={item.supporters}
          marketcap={item.marketcap}
          ipo={item.ipo}
          onInvest={() => router.push(`/detail/${item.id}/checkout/success`)}
        />
      </div>
    </main>
  );
}
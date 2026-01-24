"use client";

import { useState } from "react";
import cards from "../data/cards";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutForm from "./CheckoutForm";
import ProcessingModal from "./ProcessingModal";
import SuccessCard from "./SuccessCard";

export default function InvestAllPage() {
  const [amounts, setAmounts] = useState(cards.map(() => 0));
  const [step, setStep] = useState("form"); // 'form' | 'checkout' | 'processing' | 'success'
  const router = useRouter();

  const total = amounts.reduce((sum, a) => sum + a, 0);

  const handleChange = (index, value) => {
    const updated = [...amounts];
    updated[index] = Number(value);
    setAmounts(updated);    
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const stage = 1; // or getStage() if needed

  return (
    <main className="svf-page">
      {step === "form" && (
        <>
          <h1 className="svf-page-title">Invest With Us</h1>
          <p className="svf-page-description">
            Choose how much you want to invest in each founder.
          </p>

          <section className="invest-list">
            {cards.map((card, index) => (
              <div key={card.id} className="invest-row">
                <div className="invest-info">
                  <div className="invest-avatar">
                  <Image
                    src={card.images?.[stage - 1] || card.image}
                    alt={card.title}
                    width={56}
                    height={56}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  </div>
                  <div className="invest-text">
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                </div>

                <div className="invest-slider">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={amounts[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="amount-slider"
                    style={{
                      "--progress": `${(amounts[index] / 10000) * 100}%`,
                    }}
                  />
                  <span>${amounts[index]}</span>
                </div>
              </div>
            ))}
          </section>

          <div className="invest-summary-wrapper">
            <div className="invest-summary-sticky">
              <h3>Total Invest Amount</h3>
              <p className="total-amount">${total}</p>
              <button className="pay-button" onClick={() => setStep("checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {step === "checkout" && (
        <CheckoutForm amount={total} onSubmit={handlePay} onCancel={() => setStep("form")} />
      )}

      {step === "processing" && <ProcessingModal />}

      {step === "success" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <SuccessCard />
        </div>
      )}
    </main>
  );
}
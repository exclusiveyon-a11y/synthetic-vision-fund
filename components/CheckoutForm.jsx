"use client";

import { useState } from "react";
import PayPalCheckout from "./PayPalCheckout";
import ProcessingModal from "./ProcessingModal";
import SuccessCard from "./SuccessCard";

export default function CheckoutForm({ amount = 1000, onSuccess = () => {} }) {
  const [method, setMethod] = useState("paypal");
  const [step, setStep] = useState("checkout"); // checkout → processing → success

  const handleSuccess = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        if (typeof onSuccess === "function") onSuccess(); // 안전 호출
      }, 1000);
    }, 1500);
  };

  return (
    <div className="checkout-container">
 
      {/* ✅ 모달 상태 처리 */}
      {step === "processing" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <ProcessingModal />
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="svf-overlay">
          <div className="svf-overlay-card">
            <SuccessCard onGoBack={onSuccess} />
          </div>
        </div>
      )}

      {step === "checkout" && (
        <div className="checkout-amount-block">
        <p className="checkout-subtext">You're investing</p>
        <h1 className="checkout-amount">${amount.toLocaleString("en-US")}</h1>
        <p className="checkout-belowtext">Choose your payment method</p>
      </div>
      )}

      {/* ✅ 결제 방식별 처리 */}
      {method === "paypal" && step === "checkout" && (
        <div className="paypal-wrapper">
          <PayPalCheckout amount={amount} onSuccess={handleSuccess} />
        </div>
      )}

      {method === "card" && step === "checkout" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSuccess();
          }}
          className="card-form"
        >
          <label>
            NAME ON CARD
            <input type="text" placeholder="John Doe" required />
          </label>

          <label>
            CARD NUMBER
            <input type="text" placeholder="1234 5678 9012 3456" required />
          </label>

          <label>
            EXPIRATION
            <input type="text" placeholder="MM/YY" required />
          </label>

          <label>
            CVV
            <input type="text" placeholder="123" required />
          </label>

          <button type="submit" className="pay-button">
            Pay
          </button>
        </form>
      )}

      {method === "applepay" && step === "checkout" && (
        <div className="applepay-info">
          <p>Apple Pay selected. Complete the payment on your device.</p>
          <button onClick={handleSuccess} className="pay-button">
            Pay
          </button>
        </div>
      )}
    </div>
  );
}
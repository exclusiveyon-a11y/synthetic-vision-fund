"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// 환경변수로 관리되는 PayPal 클라이언트 ID
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

export default function PayPalCheckout({ amount = 10, onSuccess }) {
  const formattedAmount = Number(amount).toFixed(2); // "100.00" 형식 유지

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: formattedAmount },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            await actions.order.capture();
            onSuccess?.(); // 성공 시 호출
          } catch (err) {
            console.error("Capture Error", err);
            onSuccess?.(); // 실패해도 진행
          }
        }}
        onCancel={() => {
          console.warn("User canceled payment.");
          onSuccess?.(); // 취소되어도 진행
        }}
        onError={(err) => {
          console.error("PayPal Error", err);
          onSuccess?.(); // 에러 발생해도 일단 진행
        }}
      />
    </PayPalScriptProvider>
  );
}
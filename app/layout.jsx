// app/layout.jsx
import "../styles/globals.css"; // ✅ 스타일 유지
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import StageResetListener from "../components/StageResetListener";

export const metadata = {
  title: "Synthetic Vision Fund",
  description: "Invest in synthetic visionaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Parkinsans:wght@300..800&family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* 🔁 전시 리셋용 키보드 리스너 */}
        <StageResetListener />

        {/* ✅ 공통 레이아웃 */}
        <Header />
        {children}
        <Footer />

        {/* ✅ 전시용 인터랙션 */}
        <Script
          src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"
          strategy="afterInteractive"
        />
        <Script src="/sketch.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
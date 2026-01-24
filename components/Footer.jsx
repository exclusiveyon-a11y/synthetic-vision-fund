"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="svf-footer">
      {/* p5.js 패턴 캔버스 들어가는 영역 */}
      <div className="svf-footer-pattern" id="svf-footer-pattern"></div>

      <div className="svf-footer-content">
        <span className="svf-footer-copy">© 2025 Synthetic Vision Fund</span>
        <Link href="/invest" className="svf-footer-cta">INVEST WITH US</Link>
      </div>
    </footer>
  );
}
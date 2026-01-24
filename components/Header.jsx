"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="svf-header">
      <Link href="/" className="svf-logo">
        <div className="svf-logo-mark" id="svf-logo-mark"></div>
        <div className="svf-logo-text">
         <span>Synthetic</span>
         <span>Vision Fund</span>
        </div>
     </Link>

      <nav className="svf-nav">
        <Link href="/articles">Articles</Link>
        <Link href="/founders">Founders</Link>
        <Link href="/about">About us</Link>
        <Link href="/invest" className="nav-cta">INVEST WITH US
</Link>
      </nav>
    </header>
  );
}
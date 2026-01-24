// ======================================================
//  Synthetic Vision Fund - p5.js Integration (Next.js)
//  - logoSketch()     → 헤더 로고
//  - patternSketch()  → footer 패턴
// ======================================================

// ------------------------------------------------------
//   1) LOGO SKETCH  (네 최신 sketch.js 기반 따로 넣음)
// ------------------------------------------------------
const logoSketch = (p) => {
  let t = 0;

  p.setup = () => {
    const parent = document.getElementById("svf-logo-mark");
    const w = parent.offsetWidth || 100;
    const h = parent.offsetHeight || 100;

    const canvas = p.createCanvas(w, h);
    canvas.parent("svf-logo-mark");

    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.clear();
    p.background(0, 0); // ensure full transparency
    p.translate(p.width / 2, p.height / 2);

    let circleResolution = 40 + p.sin(t) * 20;
    let radius = (p.width * 0.45) + p.sin(t * 1.5) * 4;
    let angle = p.TAU / circleResolution;

    p.strokeWeight(2 + p.sin(t * 2) * 0.8);
    p.stroke(255);

    for (let i = 0; i <= circleResolution; i++) {
      let x = p.cos(angle * i) * radius;
      let y = p.sin(angle * i) * radius;
      p.line(0, 0, x, y);
    }

    t += 0.015;
  };
};

// ------------------------------------------------------
//   2) FOOTER PATTERN SKETCH (네가 지금 준 코드 기반 변환)
// ------------------------------------------------------
const patternSketch = (p) => {
  const dotSize = 8;
  const gridSpacing = 130;
  let t = 0;

  p.setup = () => {
    const parent = document.getElementById("svf-footer-pattern");

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;

    const canvas = p.createCanvas(w, h);
    canvas.parent("svf-footer-pattern");
    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.clear();
    p.background(0, 0); // fully transparent

    const cols = Math.ceil(p.width / gridSpacing) + 1;
    const rows = Math.ceil(p.height / gridSpacing) + 1;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const cx = col * gridSpacing;
        const cy = row * gridSpacing;

        p.push();
        p.translate(cx, cy);

        // 로고와 동일한 애니메이션 로직
        let circleResolution = 40 + p.sin(t) * 20;
        let radius = (gridSpacing * 0.45) + p.sin(t * 1.5) * 4;
        let angle = p.TAU / circleResolution;

        p.strokeWeight(2 + p.sin(t * 2) * 0.8);
        p.stroke(255);

        for (let i = 0; i <= circleResolution; i++) {
          let x = p.cos(angle * i) * radius;
          let y = p.sin(angle * i) * radius;
          p.line(0, 0, x, y);
        }

        // 중앙 점도 로고처럼 흰색
        p.noStroke();
        p.fill(255);
        p.circle(0, 0, dotSize);

        p.pop();
      }
    }

    t += 0.015;
  };
};

// ------------------------------------------------------
// ======================================================
//   3) LOADING ICON SKETCH — 로고와 동일한 애니메이션 버전
// ======================================================
const loadingSketch = (p) => {
  let t = 0;

  p.setup = () => {
    const parent = document.getElementById("svf-loading-icon");
    const size =
      (parent && Math.min(parent.offsetWidth, parent.offsetHeight)) || 80;

    const canvas = p.createCanvas(size, size);
    canvas.parent("svf-loading-icon");

    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.clear();
    p.background(0, 0);
    p.translate(p.width / 2, p.height / 2);

    // 로고와 동일한 로직
    let circleResolution = 40 + p.sin(t) * 20;
    let radius = (p.width * 0.45) + p.sin(t * 1.5) * 4;
    let angle = p.TAU / circleResolution;

    p.strokeWeight(2 + p.sin(t * 2) * 0.8);
    p.stroke(255);

    for (let i = 0; i <= circleResolution; i++) {
      let x = p.cos(angle * i) * radius;
      let y = p.sin(angle * i) * radius;
      p.line(0, 0, x, y);
    }

    // 중앙 원
    p.noStroke();
    p.fill(255);
    p.circle(0, 0, 6);

    t += 0.02;
  };
};

// ------------------------------------------------------
// ------------------------------------------------------
/// ================================================
// Next.js 환경에서 모든 타겟 요소가 등장할 때마다
// p5 스케치를 mount하는 안정적인 방식
// ================================================

function safeInit() {
  const logo = document.getElementById("svf-logo-mark");
  const footer = document.getElementById("svf-footer-pattern");
  const loading = document.getElementById("svf-loading-icon");

  if (logo && !logo.dataset.p5mounted) {
    new p5(logoSketch, logo.id);
    logo.dataset.p5mounted = "true";
  }

  if (footer && !footer.dataset.p5mounted) {
    new p5(patternSketch, footer.id);
    footer.dataset.p5mounted = "true";
  }

  if (loading && !loading.dataset.p5mounted) {
    new p5(loadingSketch, loading.id);
    loading.dataset.p5mounted = "true";
  }
}

if (typeof window !== "undefined") {
  function wait() {
    const found =
      document.getElementById("svf-logo-mark") ||
      document.getElementById("svf-footer-pattern") ||
      document.getElementById("svf-loading-icon");

    if (found) {
      safeInit();
    }

    // Re-run continuously to catch elements that appear later
    requestAnimationFrame(wait);
  }

  wait();
}
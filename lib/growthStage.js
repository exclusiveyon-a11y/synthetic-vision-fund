const KEY = "svf-growth-stage";

/**
 * Stage:
 * 1 = normal
 * 2 = image change
 * 3 = system collapse
 */

export function getStage() {
  if (typeof window === "undefined") return 1;
  return Number(localStorage.getItem(KEY) || 1);
}

export function nextStage() {
  if (typeof window === "undefined") return 1;

  const current = getStage();
  const next = Math.min(current + 1, 3);

  localStorage.setItem(KEY, String(next));
  return next;
}

export function resetStage() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, "1");
}
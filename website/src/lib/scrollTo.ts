/* Prompt 13 — anchor navigation helper shared by nav pill + footer */
export function scrollToSection(hash: string, offset = -80) {
  const target = document.querySelector(hash);
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis && !reduced) {
    window.__lenis.scrollTo(target as HTMLElement, { offset, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "auto", block: "start" });
  }
}

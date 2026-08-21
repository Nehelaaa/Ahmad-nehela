/** Smooth-scroll to a hash target (works with fixed header + scroll-margin). */
export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = "smooth"
): void {
  if (typeof window === "undefined") return;

  const id = hash.replace(/^#/, "").trim();
  if (!id) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const tryScroll = (attemptsLeft: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
      return;
    }
    if (attemptsLeft > 0) {
      window.requestAnimationFrame(() => tryScroll(attemptsLeft - 1));
    }
  };

  tryScroll(40);
}

/** Build a homepage section href that works from any route. */
export function homeHash(id: string): string {
  return `/#${id.replace(/^#/, "")}`;
}

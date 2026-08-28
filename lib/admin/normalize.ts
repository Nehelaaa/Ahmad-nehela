/** Normalize user-entered URL/domain to a clean hostname (e.g. westneuro.com). */
export function normalizeDomain(input: string | null | undefined): string | null {
  if (!input?.trim()) return null;
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//i, "");
  d = d.split("/")[0] ?? d;
  d = d.replace(/^www\./i, "");
  d = d.replace(/\/+$/, "");
  return d || null;
}

/** Build https URL from stored domain. */
export function domainToUrl(domain: string | null | undefined): string | null {
  const clean = normalizeDomain(domain);
  if (!clean) return null;
  return `https://${clean}`;
}

/** Display-friendly domain label. */
export function displayDomain(domain: string | null | undefined): string {
  return normalizeDomain(domain) ?? domain ?? "—";
}

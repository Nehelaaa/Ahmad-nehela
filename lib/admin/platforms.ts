export const PLATFORMS = [
  { id: "wordpress", label: "WordPress" },
  { id: "nextjs", label: "Next.js / Custom" },
  { id: "squarespace", label: "Squarespace" },
  { id: "wix", label: "Wix" },
  { id: "shopify", label: "Shopify" },
  { id: "webflow", label: "Webflow" },
  { id: "other", label: "Other" },
] as const;

export type PlatformId = (typeof PLATFORMS)[number]["id"];

export function platformLabel(id: string | null | undefined): string {
  return PLATFORMS.find((p) => p.id === id)?.label ?? id ?? "—";
}

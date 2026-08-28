/**
 * Stripe catalog for TopWebDeveloper (test mode).
 * When you go live: recreate products in live mode and update these IDs/URLs.
 */
export const STRIPE_MODE = "test" as const;

export type StripeOffer = {
  id: string;
  name: string;
  summary: string;
  paymentLinkUrl: string;
  priceIds: string[];
  /** Shown on public site vs admin proposals only */
  visibility: "public" | "admin";
};

export const STRIPE_OFFERS: StripeOffer[] = [
  {
    id: "launch",
    name: "Launch Website",
    summary: "$799 one-time",
    paymentLinkUrl: "https://buy.stripe.com/test_eVqaEX75eb9WewW1vReAg00",
    priceIds: ["price_1U9RnzGAvixzD7N9V69FtMwg"],
    visibility: "public",
  },
  {
    id: "grow",
    name: "Grow Website",
    summary: "$2,999 one-time",
    paymentLinkUrl: "https://buy.stripe.com/test_9B600j75e4LyagGcaveAg01",
    priceIds: ["price_1U9Ro4GAvixzD7N9LwiV6TEH"],
    visibility: "public",
  },
  {
    id: "scale",
    name: "Scale Website",
    summary: "$7,999 one-time",
    paymentLinkUrl: "https://buy.stripe.com/test_9B6dR9ahqdi44Wm7UfeAg02",
    priceIds: ["price_1U9Ro6GAvixzD7N9Ax0VxeNe"],
    visibility: "public",
  },
  {
    id: "site_care",
    name: "Site Care",
    summary: "$59/mo",
    paymentLinkUrl: "https://buy.stripe.com/test_bJe00j4X6ce04Wm3DZeAg03",
    priceIds: ["price_1U9Ro7GAvixzD7N9QArafIRA"],
    visibility: "public",
  },
  {
    id: "starter",
    name: "Starter proposal",
    summary: "$399 down + $59/mo",
    paymentLinkUrl: "https://buy.stripe.com/test_14A5kDexG4LybkKgqLeAg04",
    priceIds: [
      "price_1U9Ro8GAvixzD7N9VXiUDIkw",
      "price_1U9Ro7GAvixzD7N9QArafIRA",
    ],
    visibility: "admin",
  },
  {
    id: "standard",
    name: "Standard proposal",
    summary: "$799 down + $79/mo",
    paymentLinkUrl: "https://buy.stripe.com/test_bJe9AT61agug1Ka6QbeAg05",
    priceIds: [
      "price_1U9Ro9GAvixzD7N9bpJebUh3",
      "price_1U9RoDGAvixzD7N9d0SIolOW",
    ],
    visibility: "admin",
  },
  {
    id: "full_access",
    name: "Full Access proposal",
    summary: "$2,000 down + $99/mo",
    paymentLinkUrl: "https://buy.stripe.com/test_3cIcN5blugug60q4I3eAg06",
    priceIds: [
      "price_1U9RoBGAvixzD7N9bn9wadLm",
      "price_1U9RoDGAvixzD7N912lrhGAw",
    ],
    visibility: "admin",
  },
];

export function getOffer(id: string): StripeOffer | undefined {
  return STRIPE_OFFERS.find((o) => o.id === id);
}

export function publicOffers(): StripeOffer[] {
  return STRIPE_OFFERS.filter((o) => o.visibility === "public");
}

export function adminProposalOffers(): StripeOffer[] {
  return STRIPE_OFFERS.filter((o) => o.visibility === "admin");
}

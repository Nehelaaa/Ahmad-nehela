/**
 * Admin-only proposal plans — not shown on the public site.
 * Use these when sending a custom offer (down payment + monthly care).
 */
export type ProposalPlan = {
  id: string;
  name: string;
  tagline: string;
  downPayment: number;
  monthly: number;
  bestFor: string;
  includesClientAdmin: boolean;
  features: string[];
};

export const PROPOSAL_PLANS: ProposalPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Simple site, light ongoing care",
    downPayment: 399,
    monthly: 59,
    bestFor: "Local businesses that need a clean site live fast",
    includesClientAdmin: false,
    features: [
      "Website build scoped for a standard brochure / service site",
      "Launch support",
      "$59/mo Site Care after go-live",
      "I handle updates & maintenance",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "More pages, SEO, and structure",
    downPayment: 799,
    monthly: 79,
    bestFor: "Businesses that need stronger SEO and more pages",
    includesClientAdmin: false,
    features: [
      "Larger build (more pages, SEO, forms / booking)",
      "Launch + training walkthrough",
      "$79/mo care with more included changes",
      "I handle the technical side",
    ],
  },
  {
    id: "full_access",
    name: "Full Access",
    tagline: "Complex builds + client admin access",
    downPayment: 2000,
    monthly: 99,
    bestFor: "Complex projects where the client wants their own login",
    includesClientAdmin: true,
    features: [
      "Complex / custom scope",
      "Client admin access (WordPress or CMS login)",
      "Training so they can edit content",
      "$99/mo care with priority support",
    ],
  },
];

export function formatProposalPlan(plan: ProposalPlan): string {
  return `${plan.name}: $${plan.downPayment.toLocaleString()} down + $${plan.monthly}/mo`;
}

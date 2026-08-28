export type ClientStatus = "lead" | "active" | "past";
export type SiteStage = "lead" | "building" | "review" | "live" | "paused";
export type SitePackage = "launch" | "grow" | "scale" | "custom";
export type ProjectPaymentStatus =
  | "not_invoiced"
  | "sent"
  | "paid"
  | "partial";
export type CareStatus = "none" | "sent" | "active" | "past_due" | "canceled";

export interface Client {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  tags: string[];
  status: ClientStatus;
  source: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  client_id: string;
  name: string;
  domain: string | null;
  staging_url: string | null;
  stage: SiteStage;
  package: SitePackage;
  platform: string | null;
  admin_url: string | null;
  login_username: string | null;
  login_password_enc: string | null;
  hosting_provider: string | null;
  site_notes: string | null;
  project_price_quoted_cents: number | null;
  project_price_final_cents: number | null;
  project_payment_status: ProjectPaymentStatus;
  care_plan_id: string | null;
  care_price_monthly_cents: number | null;
  care_status: CareStatus;
  tech_stack: string | null;
  launch_date: string | null;
  checklist: Record<string, boolean>;
  stripe_invoice_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

/** Site data safe to pass to client components (no encrypted password blob). */
export type SitePublic = Omit<Site, "login_password_enc">;

export interface ClientWithSites extends Client {
  site_count: number;
  primary_domain: string | null;
  primary_stage: SiteStage | null;
}

export interface SiteWithClient extends Site {
  business_name: string;
  contact_name: string | null;
  client_email: string | null;
  client_phone: string | null;
}

export interface CarePlan {
  id: string;
  name: string;
  default_price_cents: number;
  description: string | null;
  stripe_price_id: string | null;
  is_active: boolean;
}

export interface DashboardStats {
  activeClients: number;
  liveSites: number;
  inBuild: number;
  unpaidProjects: number;
  unpaidProjectCents: number;
  activeCare: number;
  pastDueCare: number;
  mrrCents: number;
  leadsInPipeline: number;
}

export interface ActivityItem {
  id: string;
  client_id: string | null;
  site_id: string | null;
  type: string;
  description: string;
  created_at: string;
  business_name?: string | null;
}

export const SITE_STAGES: { id: SiteStage; label: string; color: string }[] = [
  { id: "lead", label: "Lead", color: "bg-slate-600" },
  { id: "building", label: "Building", color: "bg-blue-600" },
  { id: "review", label: "Review", color: "bg-violet-600" },
  { id: "live", label: "Live", color: "bg-emerald-600" },
  { id: "paused", label: "Paused", color: "bg-amber-700" },
];

export const PACKAGE_LABELS: Record<SitePackage, string> = {
  launch: "Launch",
  grow: "Grow",
  scale: "Scale",
  custom: "Custom",
};

export function formatCents(cents: number | null | undefined): string {
  if (cents == null) return "—";
  return `$${(cents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

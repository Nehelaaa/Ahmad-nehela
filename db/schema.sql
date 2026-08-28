-- Admin dashboard schema (Neon project: ahmadnehela-admin)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'past')),
  source TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS care_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  default_price_cents INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  stripe_price_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT,
  staging_url TEXT,
  stage TEXT NOT NULL DEFAULT 'lead' CHECK (stage IN ('lead', 'building', 'review', 'live', 'paused')),
  package TEXT DEFAULT 'launch' CHECK (package IN ('launch', 'grow', 'scale', 'custom')),
  project_price_quoted_cents INTEGER,
  project_price_final_cents INTEGER,
  project_payment_status TEXT NOT NULL DEFAULT 'not_invoiced'
    CHECK (project_payment_status IN ('not_invoiced', 'sent', 'paid', 'partial')),
  care_plan_id UUID REFERENCES care_plans(id) ON DELETE SET NULL,
  care_price_monthly_cents INTEGER,
  care_status TEXT NOT NULL DEFAULT 'none'
    CHECK (care_status IN ('none', 'sent', 'active', 'past_due', 'canceled')),
  tech_stack TEXT,
  launch_date DATE,
  checklist JSONB NOT NULL DEFAULT '{}',
  stripe_invoice_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sites_client_id ON sites(client_id);
CREATE INDEX IF NOT EXISTS idx_sites_stage ON sites(stage);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

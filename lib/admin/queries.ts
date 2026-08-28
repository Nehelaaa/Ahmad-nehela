import { getSql } from "@/lib/db";
import { decryptPassword, encryptPassword } from "@/lib/credentials";
import type {
  ActivityItem,
  CarePlan,
  Client,
  ClientWithSites,
  DashboardStats,
  Site,
  SiteStage,
  SiteWithClient,
} from "@/lib/admin/types";

export async function listClients(): Promise<Client[]> {
  const rows = await listClientsWithSites();
  return rows;
}

export async function listClientsWithSites(): Promise<ClientWithSites[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT c.*,
      COUNT(s.id)::int AS site_count,
      (SELECT domain FROM sites WHERE client_id = c.id ORDER BY updated_at DESC LIMIT 1) AS primary_domain,
      (SELECT stage FROM sites WHERE client_id = c.id ORDER BY updated_at DESC LIMIT 1) AS primary_stage
    FROM clients c
    LEFT JOIN sites s ON s.client_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `;
  return rows as ClientWithSites[];
}

export async function getClient(id: string): Promise<Client | null> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM clients WHERE id = ${id} LIMIT 1`;
  return (rows[0] as Client) ?? null;
}

export async function createClient(data: {
  business_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  source?: string;
  status?: string;
}): Promise<Client> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO clients (
      business_name, contact_name, email, phone, address, notes, source, status
    ) VALUES (
      ${data.business_name},
      ${data.contact_name ?? null},
      ${data.email ?? null},
      ${data.phone ?? null},
      ${data.address ?? null},
      ${data.notes ?? null},
      ${data.source ?? null},
      ${data.status ?? "lead"}
    )
    RETURNING *
  `;
  const client = rows[0] as Client;
  await logActivity({
    client_id: client.id,
    type: "client_created",
    description: `Added client ${client.business_name}`,
  });
  return client;
}

export async function updateClient(
  id: string,
  data: Partial<Omit<Client, "id" | "created_at" | "updated_at">>
): Promise<Client | null> {
  const existing = await getClient(id);
  if (!existing) return null;

  const sql = getSql();
  const rows = await sql`
    UPDATE clients SET
      business_name = ${data.business_name ?? existing.business_name},
      contact_name = ${data.contact_name !== undefined ? data.contact_name : existing.contact_name},
      email = ${data.email !== undefined ? data.email : existing.email},
      phone = ${data.phone !== undefined ? data.phone : existing.phone},
      address = ${data.address !== undefined ? data.address : existing.address},
      notes = ${data.notes !== undefined ? data.notes : existing.notes},
      tags = ${data.tags ?? existing.tags},
      status = ${data.status ?? existing.status},
      source = ${data.source !== undefined ? data.source : existing.source},
      stripe_customer_id = ${data.stripe_customer_id !== undefined ? data.stripe_customer_id : existing.stripe_customer_id},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return (rows[0] as Client) ?? null;
}

export async function listSitesWithClients(): Promise<SiteWithClient[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT s.*,
      c.business_name,
      c.contact_name,
      c.email AS client_email,
      c.phone AS client_phone
    FROM sites s
    JOIN clients c ON c.id = s.client_id
    ORDER BY s.updated_at DESC
  `;
  return rows as SiteWithClient[];
}

export async function getSite(id: string): Promise<SiteWithClient | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT s.*,
      c.business_name,
      c.contact_name,
      c.email AS client_email,
      c.phone AS client_phone
    FROM sites s
    JOIN clients c ON c.id = s.client_id
    WHERE s.id = ${id}
    LIMIT 1
  `;
  return (rows[0] as SiteWithClient) ?? null;
}

export async function listSitesForClient(clientId: string): Promise<Site[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM sites WHERE client_id = ${clientId} ORDER BY created_at DESC
  `;
  return rows as Site[];
}

export async function createClientWithSite(
  clientData: {
    business_name: string;
    contact_name?: string;
    email?: string;
    phone?: string;
    notes?: string;
    source?: string;
    status?: string;
  },
  siteData: {
    name: string;
    domain?: string;
    staging_url?: string;
    platform?: string;
    admin_url?: string;
    login_username?: string;
    login_password?: string;
    hosting_provider?: string;
    site_notes?: string;
    stage?: SiteStage;
    package?: string;
    project_price_cents?: number;
  }
): Promise<{ client: Client; site: Site }> {
  const client = await createClient(clientData);
  const site = await createSite({
    client_id: client.id,
    ...siteData,
    project_price_quoted_cents: siteData.project_price_cents,
    project_price_final_cents: siteData.project_price_cents,
  });
  return { client, site };
}

export async function createSite(data: {
  client_id: string;
  name: string;
  domain?: string;
  staging_url?: string;
  stage?: SiteStage;
  package?: string;
  platform?: string;
  admin_url?: string;
  login_username?: string;
  login_password?: string;
  hosting_provider?: string;
  site_notes?: string;
  project_price_quoted_cents?: number;
  project_price_final_cents?: number;
  tech_stack?: string;
}): Promise<Site> {
  const sql = getSql();
  const passwordEnc = data.login_password
    ? encryptPassword(data.login_password)
    : null;
  const rows = await sql`
    INSERT INTO sites (
      client_id, name, domain, staging_url, stage, package,
      platform, admin_url, login_username, login_password_enc,
      hosting_provider, site_notes,
      project_price_quoted_cents, project_price_final_cents, tech_stack
    ) VALUES (
      ${data.client_id},
      ${data.name},
      ${data.domain ?? null},
      ${data.staging_url ?? null},
      ${data.stage ?? "lead"},
      ${data.package ?? "launch"},
      ${data.platform ?? "wordpress"},
      ${data.admin_url ?? null},
      ${data.login_username ?? null},
      ${passwordEnc},
      ${data.hosting_provider ?? null},
      ${data.site_notes ?? null},
      ${data.project_price_quoted_cents ?? null},
      ${data.project_price_final_cents ?? null},
      ${data.tech_stack ?? null}
    )
    RETURNING *
  `;
  const site = rows[0] as Site;
  await logActivity({
    client_id: site.client_id,
    site_id: site.id,
    type: "site_created",
    description: `Added website ${site.domain || site.name}`,
  });
  return site;
}

export async function getSiteCredentials(siteId: string): Promise<{
  login_username: string | null;
  login_password: string;
} | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT login_username, login_password_enc
    FROM sites WHERE id = ${siteId} LIMIT 1
  `;
  const row = rows[0] as
    | { login_username: string | null; login_password_enc: string | null }
    | undefined;
  if (!row) return null;
  return {
    login_username: row.login_username,
    login_password: row.login_password_enc
      ? decryptPassword(row.login_password_enc)
      : "",
  };
}

export async function updateSite(
  id: string,
  data: Partial<Omit<Site, "id" | "created_at" | "updated_at">> & {
    login_password?: string;
  }
): Promise<Site | null> {
  const sql = getSql();
  const existingRows = await sql`SELECT * FROM sites WHERE id = ${id} LIMIT 1`;
  const existing = existingRows[0] as Site | undefined;
  if (!existing) return null;

  const passwordEnc =
    data.login_password !== undefined
      ? data.login_password
        ? encryptPassword(data.login_password)
        : null
      : existing.login_password_enc;

  const rows = await sql`
    UPDATE sites SET
      name = ${data.name ?? existing.name},
      domain = ${data.domain !== undefined ? data.domain : existing.domain},
      staging_url = ${data.staging_url !== undefined ? data.staging_url : existing.staging_url},
      stage = ${data.stage ?? existing.stage},
      package = ${data.package ?? existing.package},
      platform = ${data.platform !== undefined ? data.platform : existing.platform},
      admin_url = ${data.admin_url !== undefined ? data.admin_url : existing.admin_url},
      login_username = ${data.login_username !== undefined ? data.login_username : existing.login_username},
      login_password_enc = ${passwordEnc},
      hosting_provider = ${data.hosting_provider !== undefined ? data.hosting_provider : existing.hosting_provider},
      site_notes = ${data.site_notes !== undefined ? data.site_notes : existing.site_notes},
      project_price_quoted_cents = ${data.project_price_quoted_cents !== undefined ? data.project_price_quoted_cents : existing.project_price_quoted_cents},
      project_price_final_cents = ${data.project_price_final_cents !== undefined ? data.project_price_final_cents : existing.project_price_final_cents},
      project_payment_status = ${data.project_payment_status ?? existing.project_payment_status},
      care_plan_id = ${data.care_plan_id !== undefined ? data.care_plan_id : existing.care_plan_id},
      care_price_monthly_cents = ${data.care_price_monthly_cents !== undefined ? data.care_price_monthly_cents : existing.care_price_monthly_cents},
      care_status = ${data.care_status ?? existing.care_status},
      tech_stack = ${data.tech_stack !== undefined ? data.tech_stack : existing.tech_stack},
      launch_date = ${data.launch_date !== undefined ? data.launch_date : existing.launch_date},
      checklist = ${JSON.stringify(data.checklist ?? existing.checklist)}::jsonb,
      stripe_invoice_id = ${data.stripe_invoice_id !== undefined ? data.stripe_invoice_id : existing.stripe_invoice_id},
      stripe_subscription_id = ${data.stripe_subscription_id !== undefined ? data.stripe_subscription_id : existing.stripe_subscription_id},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  const site = rows[0] as Site;
  if (data.stage && data.stage !== existing.stage) {
    await logActivity({
      client_id: site.client_id,
      site_id: site.id,
      type: "stage_changed",
      description: `Moved ${site.name} to ${data.stage}`,
    });
  }
  return site;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const sql = getSql();
  const [row] = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM clients WHERE status = 'active') AS active_clients,
      (SELECT COUNT(*)::int FROM sites WHERE stage = 'live') AS live_sites,
      (SELECT COUNT(*)::int FROM sites WHERE stage IN ('building', 'review')) AS in_build,
      (SELECT COUNT(*)::int FROM sites WHERE project_payment_status IN ('sent', 'partial')) AS unpaid_projects,
      (SELECT COALESCE(SUM(project_price_final_cents), 0)::int FROM sites WHERE project_payment_status IN ('sent', 'partial')) AS unpaid_project_cents,
      (SELECT COUNT(*)::int FROM sites WHERE care_status = 'active') AS active_care,
      (SELECT COUNT(*)::int FROM sites WHERE care_status = 'past_due') AS past_due_care,
      (SELECT COALESCE(SUM(care_price_monthly_cents), 0)::int FROM sites WHERE care_status = 'active') AS mrr_cents,
      (SELECT COUNT(*)::int FROM sites WHERE stage = 'lead') AS leads_in_pipeline
  `;
  return {
    activeClients: row.active_clients as number,
    liveSites: row.live_sites as number,
    inBuild: row.in_build as number,
    unpaidProjects: row.unpaid_projects as number,
    unpaidProjectCents: row.unpaid_project_cents as number,
    activeCare: row.active_care as number,
    pastDueCare: row.past_due_care as number,
    mrrCents: row.mrr_cents as number,
    leadsInPipeline: row.leads_in_pipeline as number,
  };
}

export async function getActionQueue(): Promise<SiteWithClient[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT s.*,
      c.business_name,
      c.contact_name,
      c.email AS client_email,
      c.phone AS client_phone
    FROM sites s
    JOIN clients c ON c.id = s.client_id
    WHERE
      s.project_payment_status IN ('sent', 'partial')
      OR s.care_status = 'past_due'
      OR (s.stage = 'review' AND s.project_payment_status = 'not_invoiced')
      OR (s.stage = 'live' AND s.care_status = 'none')
    ORDER BY
      CASE
        WHEN s.care_status = 'past_due' THEN 0
        WHEN s.project_payment_status IN ('sent', 'partial') THEN 1
        WHEN s.stage = 'live' AND s.care_status = 'none' THEN 2
        ELSE 3
      END,
      s.updated_at DESC
    LIMIT 10
  `;
  return rows as SiteWithClient[];
}

export async function listRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT a.*, c.business_name
    FROM activity_log a
    LEFT JOIN clients c ON c.id = a.client_id
    ORDER BY a.created_at DESC
    LIMIT ${limit}
  `;
  return rows as ActivityItem[];
}

export async function listCarePlans(): Promise<CarePlan[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM care_plans WHERE is_active = true ORDER BY default_price_cents ASC
  `;
  return rows as CarePlan[];
}

async function logActivity(data: {
  client_id?: string;
  site_id?: string;
  type: string;
  description: string;
}) {
  const sql = getSql();
  await sql`
    INSERT INTO activity_log (client_id, site_id, type, description)
    VALUES (${data.client_id ?? null}, ${data.site_id ?? null}, ${data.type}, ${data.description})
  `;
}

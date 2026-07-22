export interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
  ga4MeasurementId?: string;
  gtmId?: string;
  clarityProjectId?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  siteUrl: string;
}

function getEnvVar(key: string, required = false): string {
  const value = process.env[key] || "";
  if (required && !value && process.env.NODE_ENV === "production") {
    console.warn(`[ENV WARNING] Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  supabaseUrl: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY"),
  ga4MeasurementId: getEnvVar("NEXT_PUBLIC_GA4_MEASUREMENT_ID"),
  gtmId: getEnvVar("NEXT_PUBLIC_GTM_ID"),
  clarityProjectId: getEnvVar("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
  metaPixelId: getEnvVar("NEXT_PUBLIC_META_PIXEL_ID"),
  linkedinPartnerId: getEnvVar("NEXT_PUBLIC_LINKEDIN_PARTNER_ID"),
  siteUrl: getEnvVar("NEXT_PUBLIC_SITE_URL") || "https://krayonova.com",
};

export function hasAnalyticsConfig(): boolean {
  return Boolean(
    env.ga4MeasurementId ||
    env.gtmId ||
    env.clarityProjectId ||
    env.metaPixelId ||
    env.linkedinPartnerId
  );
}

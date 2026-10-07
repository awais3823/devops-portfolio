export function getSiteOrigin(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate = configured || (vercelDomain ? `https://${vercelDomain}` : undefined);
  if (!candidate) return undefined;
  try {
    const url = new URL(candidate);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

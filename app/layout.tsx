import type { Metadata, Viewport } from "next";
import { profile } from "@/data/profile";
import { getSiteOrigin } from "@/lib/site";
import "./globals.css";

const origin = getSiteOrigin();
export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: "Awais Ali | DevOps Engineer", template: "%s | Awais Ali" },
  description: profile.description,
  ...(origin ? { alternates: { canonical: "/" } } : {}),
  openGraph: { title: "Awais Ali | DevOps Engineer", description: profile.description, type: "website", locale: "en_US", siteName: "Awais Ali", ...(origin ? { url: origin } : {}) },
  twitter: { card: "summary", title: "Awais Ali | DevOps Engineer", description: profile.description },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#090c12", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}

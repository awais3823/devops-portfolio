import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];
  return [{ url: origin, changeFrequency: "monthly", priority: 1 }, ...projects.map((project) => ({ url: `${origin}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))];
}

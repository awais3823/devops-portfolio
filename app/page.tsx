import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Infrastructure } from "@/components/sections/infrastructure";
import { Workflow } from "@/components/sections/workflow";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { profile } from "@/data/profile";
import { getSiteOrigin } from "@/lib/site";

export default function Home() {
  const origin = getSiteOrigin();
  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.role, ...(origin ? { url: origin } : {}), sameAs: [profile.github, profile.linkedin], knowsAbout: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Linux", "AWS"] };
  return <><Navigation /><main id="main-content"><Hero /><About /><Skills /><Experience /><Projects /><Infrastructure /><Workflow /><Contact /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></>;
}

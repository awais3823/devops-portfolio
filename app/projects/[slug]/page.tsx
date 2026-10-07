import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { projects } from "@/data/projects";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSiteOrigin } from "@/lib/site";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const url = getSiteOrigin();
  const title = `${project.category} | Awais Ali`;
  return { title: { absolute: title }, description: project.description, alternates: url ? { canonical: `/projects/${slug}` } : undefined, openGraph: { title, description: project.description, type: "article", ...(url ? { url: `${url}/projects/${slug}` } : {}), images: [] }, twitter: { card: "summary", title, description: project.description, images: [] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const sections = [{ title: "Problem", value: project.problem }, { title: "Architecture", value: project.architecture }, { title: "Implementation", value: project.implementation }, { title: "Challenges", value: project.challenges }, { title: "Solution", value: project.solution }, { title: "Result", value: project.result }];
  return <><Navigation detail /><main id="main-content" className="case-study container"><Link href="/#projects" className="text-link case-back"><ArrowLeft size={16} />All projects</Link><p className="eyebrow">CASE STUDY / {project.number}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="case-status"><span className={`project-state ${project.status}`}><i />{project.status === "pending" ? "ARCHITECTURE OUTLINE · DETAILS PENDING" : "DOCUMENTED IN THE PROVIDED RÉSUMÉ"}</span><p>{project.status === "pending" ? "This planned case study contains explicit placeholders. It does not represent a completed project." : "This case study summarizes the supplied résumé. Unspecified incidents and outcomes are identified below."}</p></div><div className="case-flow" aria-label="Project architecture">{project.flow.map((step, index) => <div key={step}><span>{step}</span>{index < project.flow.length - 1 && <ArrowRight size={18} />}</div>)}</div><div className="case-sections">{sections.map((section, index) => <section key={section.title}><span className="mono">0{index + 1}</span><div><h2>{section.title}</h2><p>{section.value}</p></div></section>)}</div><div className="case-links">{project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer" className="button button-primary"><Github size={17} />View source repository<ArrowUpRight size={17} /></a> : <p className="content-note">Direct project repository: awaiting a confirmed URL.</p>}{project.live ? <a href={project.live} target="_blank" rel="noopener noreferrer" className="button button-secondary">Live project<ArrowUpRight size={17} /></a> : <p className="content-note">Live deployment: not supplied.</p>}</div><Link href="/#contact" className="text-link">Talk about infrastructure<ArrowUpRight size={17} /></Link></main><Footer /></>;
}

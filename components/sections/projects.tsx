import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Projects() {
  return <section id="projects" className="section section-tinted"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="04 / SELECTED WORK" title="Less theory. More running systems." description="Hands-on projects, the decisions behind them, and the paths from application code to working infrastructure." /><span className="section-side-note mono">BUILD → SHIP → OPERATE</span></div>
    <div className="projects-grid">{projects.map((project) => <Reveal className={`project-card ${project.status === "pending" ? "project-pending" : ""}`} key={project.slug}><div className="project-top"><span className="mono project-number">/{project.number}</span><span className={`project-state ${project.status}`}><i />{project.status === "documented" ? "RÉSUMÉ-DOCUMENTED" : "DETAILS PENDING"}</span></div><div className="project-flow" aria-label={`Architecture: ${project.flow.join(" to ")}`}>{project.flow.map((node, index) => <span className="flow-item" key={node}><span>{node}</span>{index < project.flow.length - 1 && <ArrowRight size={13} />}</span>)}</div><p className="project-category mono">{project.category}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}<ArrowUpRight className="project-arrow" size={22} /></Link></h3><p className="project-description">{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="text-link project-read" href={`/projects/${project.slug}`}>{project.status === "pending" ? "View architecture outline" : "Explore case study"}<ArrowRight size={15} /></Link></Reveal>)}</div>
  </div></section>;
}

import { Activity, Cloud, Code2, Container, GitBranch, Server, Terminal } from "lucide-react";
import { skills } from "@/data/skills";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons = { cloud: Cloud, container: Container, pipeline: GitBranch, server: Server, code: Code2, activity: Activity, terminal: Terminal };
export function Skills() {
  return <section id="skills" className="section section-tinted"><div className="container"><SectionHeading eyebrow="02 / THE TOOLKIT" title="Built on the right foundations." description="A connected toolkit for packaging, deploying, and operating applications. Résumé-backed work appears in the case studies below; the wider cloud toolkit follows the portfolio brief." />
    <div className="skills-grid">{skills.map((skill, index) => { const Icon = icons[skill.icon as keyof typeof icons]; return <Reveal className={`skill-card ${index === 6 ? "skill-wide" : ""}`} key={skill.name} delay={(index % 3) * 0.04}><Icon size={23} strokeWidth={1.5} className="skill-icon" /><h3>{skill.name}</h3><p>{skill.description}</p><div className="tags">{skill.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></Reveal>; })}</div>
    <div className="certificates"><p className="mono">COURSE CERTIFICATES <span>/ AS LISTED IN RÉSUMÉ</span></p><div>{profile.certificates.map((certificate) => <a key={certificate.title} href={certificate.url} target="_blank" rel="noopener noreferrer">{certificate.title} ↗</a>)}</div></div>
  </div></section>;
}

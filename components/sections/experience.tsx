import { BriefcaseBusiness, ArrowUpRight } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return <section id="experience" className="section"><div className="container"><SectionHeading eyebrow="03 / EXPERIENCE" title="Where engineering meets operations." />
    <div className="experience-list">{experience.map((job) => <Reveal key={job.company} className="experience-row"><div className="experience-period"><span className="timeline-dot" /><BriefcaseBusiness size={20} /><span>{job.period}</span></div><div className="experience-content"><p className="eyebrow">{job.company}</p><h3>{job.title}<ArrowUpRight size={23} /></h3><p>{job.description}</p><div className="tags">{job.focus.map((item) => <span key={item}>{item}</span>)}</div><p className="content-note">{job.note}</p></div></Reveal>)}</div>
  </div></section>;
}

import Image from "next/image";
import { ArrowDownToLine, GraduationCap } from "lucide-react";
import { Terminal } from "@/components/terminal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function About() {
  return <section id="about" className="section"><div className="container">
    <SectionHeading eyebrow="01 / ABOUT" title="The engineer behind the infrastructure." />
    <div className="about-layout"><Reveal className="about-copy">
      <div className="about-profile"><div className="portrait-frame"><Image src="/awais-ali.jpeg" alt="Portrait of Awais Ali" width={180} height={180} sizes="(max-width: 600px) 100px, 128px" /></div><div><h3>Awais Ali</h3><p>DevOps / Cloud Infrastructure</p><span className="location"><span />Based in Pakistan</span></div></div>
      <p>I work at the point where applications become running systems. My hands-on work brings together <strong>Linux, containers, Kubernetes, and delivery pipelines</strong> to make deployments repeatable and easier to operate.</p>
      <p>From a multi-service Nginx, Node.js, and Redis stack to release-driven GitHub Actions workflows, I focus on the connections that matter: service routing, configuration, persistent storage, and verified rollouts.</p>
      <a className="text-link" href={profile.resume} download>Download my résumé<ArrowDownToLine size={16} /></a>
      <div className="education"><GraduationCap size={20} /><div><strong>{profile.education.degree}</strong><span>{profile.education.institution} · {profile.education.dates}</span></div></div>
    </Reveal><Reveal className="about-terminal" delay={0.1}><Terminal /></Reveal></div>
  </div></section>;
}

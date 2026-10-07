import Image from "next/image";
import { ArrowDown, ArrowUpRight, Cloud, Container, GitBranch, Radio, Server, ShieldCheck } from "lucide-react";
import { SocialLinks } from "@/components/ui/social-links";

function CloudNetwork() {
  return <div className="cloud-network" aria-hidden="true">
    <div className="network-orbit orbit-one" /><div className="network-orbit orbit-two" />
    <svg className="network-lines" viewBox="0 0 540 460" fill="none">
      <path d="M270 60V126M270 174V230M92 276H215M325 276H450M270 320V384M92 276V166H216M450 276V166H324" />
      <path className="traffic" d="M270 60V126M270 174V230M92 276H215M325 276H450M270 320V384M92 276V166H216M450 276V166H324" />
    </svg>
    <div className="network-node node-cloud"><Cloud size={19} /><span>AWS CLOUD</span></div>
    <div className="network-node node-vpc"><ShieldCheck size={18} /><span>PRIVATE VPC</span></div>
    <div className="network-core"><Container size={33} /><span>ORCHESTRATE</span><div className="core-status"><i /> SERVICES CONNECTED</div></div>
    <div className="network-node node-ci"><GitBranch size={19} /><span>CI / CD</span></div>
    <div className="network-node node-server"><Server size={19} /><span>COMPUTE</span></div>
    <div className="network-node node-monitor"><Radio size={19} /><span>OBSERVABILITY</span></div>
    <span className="network-caption">FIG. 01 / INFRASTRUCTURE CONCEPT</span>
  </div>;
}

export function Hero() {
  return <section id="home" className="hero">
    <div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
    <div className="container hero-layout">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span />CLOUD. CODE. CONTINUITY.</p>
        <div className="hero-identity"><Image src="/awais-ali.jpeg" alt="Awais Ali" width={48} height={48} priority sizes="48px" /><span>Hi, I’m <strong>Awais Ali.</strong><small>DevOps & Cloud Infrastructure · Pakistan</small></span></div>
        <h1>DevOps<br /><span>Engineer<span className="hero-period">.</span></span></h1>
        <p className="hero-tagline">Infrastructure that works.<br />Automation that lasts.</p>
        <p className="hero-description">I build, automate, deploy, and operate reliable cloud infrastructure—connecting code to the systems that keep it running.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">View My Work<ArrowUpRight size={18} /></a><a className="button button-secondary" href="#contact">Contact Me<ArrowUpRight size={18} /></a></div>
        <div className="hero-social"><SocialLinks /><span className="mono">LET’S CONNECT</span></div>
      </div>
      <div className="hero-visual"><CloudNetwork /></div>
    </div>
    <div className="container hero-bottom"><span className="mono hero-disciplines">CLOUD INFRASTRUCTURE <b>·</b> AUTOMATION <b>·</b> CI/CD <b>·</b> LINUX <b>·</b> AWS</span><a href="#about" className="scroll-link">SCROLL TO EXPLORE<ArrowDown size={14} /></a></div>
  </section>;
}

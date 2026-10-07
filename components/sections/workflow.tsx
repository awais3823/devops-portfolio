import { Activity, ArrowRight, Box, CheckCheck, Code2, Rocket, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { name: "Code", icon: Code2, description: "Version changes in Git." },
  { name: "Build", icon: Box, description: "Package a repeatable artifact." },
  { name: "Test", icon: CheckCheck, description: "Check behavior before release." },
  { name: "Security", icon: ShieldCheck, description: "Review secrets and dependencies." },
  { name: "Deploy", icon: Rocket, description: "Roll out a versioned change." },
  { name: "Monitor", icon: Activity, description: "Observe health and investigate." },
];
export function Workflow() {
  return <section id="workflow" className="section section-tinted workflow-section"><div className="container"><SectionHeading eyebrow="06 / THE DELIVERY LOOP" title="A release is a process. Not a leap of faith." description="A reference workflow for reliable delivery. Each stage makes the next one easier to trust." /><div className="workflow-grid">{steps.map((step, index) => { const Icon = step.icon; return <Reveal key={step.name} className="workflow-step" delay={index * 0.08}><span className="workflow-number mono">0{index + 1}</span><div className="workflow-icon"><Icon size={24} strokeWidth={1.5} /></div><h3>{step.name}</h3><p>{step.description}</p>{index < steps.length - 1 && <ArrowRight className="workflow-arrow" size={17} />}</Reveal>; })}</div></div></section>;
}

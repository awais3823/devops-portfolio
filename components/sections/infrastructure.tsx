"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Activity, ArrowDown, ArrowRight, Cloud, Container, Database, GitBranch, Globe, Layers, Radio, Server, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const nodes = [
  { id: "internet", name: "Internet", subtitle: "Incoming traffic", icon: Globe, detail: "The public entry point. Clients resolve a hostname and connect over HTTPS. An actual deployment must define TLS termination and allowed traffic." },
  { id: "dns", name: "Route 53", subtitle: "DNS resolution", icon: Cloud, detail: "DNS records map the application hostname to its entry point. In this AWS reference architecture, Route 53 handles DNS; it is not a proxy that forwards application packets." },
  { id: "proxy", name: "Reverse proxy", subtitle: "Nginx / load balancer", icon: ShieldCheck, detail: "A reverse proxy or load balancer routes requests to upstream services. TLS, health checks, and access controls depend on the chosen deployment configuration." },
  { id: "compute", name: "App servers", subtitle: "Linux compute", icon: Server, detail: "Compute instances provide the runtime, network boundaries, and service capacity. Security groups and host configuration should restrict access to what each service needs." },
  { id: "containers", name: "Containers", subtitle: "Docker workloads", icon: Container, detail: "Versioned Docker images package application code and dependencies. Kubernetes can manage workloads, service discovery, and rolling deployments." },
  { id: "backend", name: "Backend", subtitle: "Application services", icon: Layers, detail: "Application services handle requests and communicate with stateful dependencies. The documented lab stack uses Node.js and Redis behind Nginx." },
  { id: "data", name: "Data / nodes", subtitle: "Database or blockchain", icon: Database, detail: "The stateful layer can contain databases or blockchain nodes. Storage, backups, recovery, and RPC access need their own operational design. Blockchain implementation details are pending." },
];
const delivery = [
  { name: "GitHub", icon: GitBranch }, { name: "Pipeline", icon: Layers }, { name: "Build", icon: Container }, { name: "Deploy", icon: Server },
];

export function Infrastructure() {
  const [selected, setSelected] = useState("containers");
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);
  const current = nodes.find((node) => node.id === selected)!;
  return <section id="infrastructure" className="section"><div className="container"><SectionHeading eyebrow="05 / SYSTEMS THINKING" title="Every connection has a purpose." description="Explore a reference architecture—from the first DNS lookup to the services behind it. Hover, focus, or select a component to inspect its role." />
    <div ref={panel} className={`architecture-panel ${visible && !reduced ? "architecture-running" : ""}`}>
      <div className="architecture-header"><span className="mono"><span className="tiny-dot" />REFERENCE ARCHITECTURE</span><span className="mono architecture-hint">INTERACTIVE / SELECT A NODE</span></div>
      <div className="architecture-boundary"><div className="boundary-label mono">REQUEST & SERVICE FLOW</div><div className="architecture-flow">{nodes.map((node, index) => { const Icon = node.icon; return <div className="architecture-unit" key={node.id}><button type="button" className={`architecture-node ${selected === node.id ? "selected" : ""}`} aria-pressed={selected === node.id} aria-describedby="architecture-description" onMouseEnter={() => setSelected(node.id)} onFocus={() => setSelected(node.id)} onClick={() => setSelected(node.id)}><Icon size={24} strokeWidth={1.5} /><strong>{node.name}</strong><small>{node.subtitle}</small></button>{index < nodes.length - 1 && <div className="architecture-connector" aria-hidden="true"><ArrowRight className="desktop-arrow" size={15} /><ArrowDown className="mobile-arrow" size={15} /></div>}</div>; })}</div></div>
      <div className="architecture-lanes"><div className="delivery-lane"><p className="mono"><GitBranch size={14} />DELIVERY PLANE</p><div className="delivery-flow">{delivery.map((step, index) => { const Icon = step.icon; return <div key={step.name}><span><Icon size={17} />{step.name}</span>{index < delivery.length - 1 && <ArrowRight size={14} />}</div>; })}</div><p className="lane-note">Versioned images → compute & container workloads</p></div><div className="monitor-lane"><p className="mono"><Activity size={14} />OBSERVABILITY PLANE</p><div className="monitor-tools"><span><Cloud size={16} />CloudWatch</span><span><Radio size={16} />Prometheus</span><span><Activity size={16} />Grafana</span></div><p className="lane-note">Metrics & logs ← compute, containers, services & nodes</p></div></div>
      <div className="architecture-detail" id="architecture-description"><span className="detail-index mono">COMPONENT / {String(nodes.findIndex((node) => node.id === selected) + 1).padStart(2, "0")}</span><h3>{current.name}</h3><p>{current.detail}</p></div>
      <p className="architecture-disclaimer">Conceptual topology, not a claim of a specific production deployment. DNS resolution, application traffic, delivery, and telemetry are distinct flows.</p>
    </div>
  </div></section>;
}

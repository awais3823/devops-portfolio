"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const commands = ["terraform plan", "docker compose up -d", "kubectl get pods", "aws ec2 describe-instances", "systemctl status nginx"];
export function Terminal() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [visible, setVisible] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || !visible) return;
    const command = commands[index];
    const timer = window.setTimeout(() => {
      if (characters < command.length) setCharacters(characters + 1);
      else { setIndex((index + 1) % commands.length); setCharacters(0); }
    }, characters < command.length ? 75 : 2800);
    return () => window.clearTimeout(timer);
  }, [index, characters, reduced, visible]);
  return <div ref={panel} className="terminal-panel" aria-label="Illustrative DevOps terminal">
    <div className="terminal-title"><div className="terminal-dots"><i /><i /><i /></div><span>awais@infrastructure:~</span><TerminalIcon size={14} /></div>
    <div className="terminal-body"><p className="terminal-comment"># A look inside the toolkit</p><p><span className="terminal-prompt">$ </span>whoami</p><p className="terminal-output">awais / devops-engineer</p><p><span className="terminal-prompt">$ </span>cat engineering-principles.txt</p><div className="terminal-principles"><span>01 <b>Make it repeatable.</b></span><span>02 <b>Make it observable.</b></span><span>03 <b>Make failure visible.</b></span></div><p className="terminal-typing" aria-hidden="true"><span className="terminal-prompt">$ </span>{reduced ? commands[2] : commands[index].slice(0, characters)}<span className="terminal-cursor" /></p><span className="sr-only">Example commands: {commands.join(", ")}</span></div>
    <div className="terminal-footer"><span><i />ILLUSTRATIVE SESSION</span><span>bash</span></div>
  </div>;
}

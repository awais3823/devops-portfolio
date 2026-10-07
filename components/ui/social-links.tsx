import { Mail, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { profile } from "@/data/profile";

export function SocialLinks({ labeled = false }: { labeled?: boolean }) {
  return <div className={`social-links ${labeled ? "social-labeled" : ""}`}>
    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Awais Ali on GitHub"><Github size={17} />{labeled && <>GitHub<ArrowUpRight size={14} /></>}</a>
    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Awais Ali on LinkedIn"><Linkedin size={17} />{labeled && <>LinkedIn<ArrowUpRight size={14} /></>}</a>
    <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}><Mail size={17} />{labeled && <>Email<ArrowUpRight size={14} /></>}</a>
  </div>;
}

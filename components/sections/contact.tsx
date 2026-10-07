import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";

export function Contact() {
  return <section id="contact" className="section contact-section"><div className="container contact-layout"><div className="contact-copy"><SectionHeading eyebrow="07 / LET’S CONNECT" title="Let’s Build Reliable Infrastructure." /><p>Have a deployment challenge, a cloud project, or a role where I can help? Let’s talk about the systems you’re building.</p><a href={`mailto:${profile.email}`} className="contact-email"><Mail size={19} />{profile.email}<ArrowUpRight size={18} /></a><p className="contact-location"><MapPin size={16} />{profile.location}</p><SocialLinks labeled /></div><ContactForm /></div></section>;
}

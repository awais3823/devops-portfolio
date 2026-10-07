"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [notice, setNotice] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2 || message.length < 10) { setNotice("Please enter at least 2 characters for your name and 10 characters for your message."); return; }
    const body = `Hi Awais,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app has been requested. Review and send the draft there. If it does not open, use the email address beside this form.");
  }
  return <form className="contact-form" onSubmit={submit}><div className="contact-form-header"><Mail size={18} /><span>START A CONVERSATION</span></div><div className="form-row"><div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="A name to say hello to" autoComplete="name" required minLength={2} maxLength={100} /></div><div><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={254} /></div></div><label htmlFor="contact-message">What are you working on?</label><textarea id="contact-message" name="message" placeholder="Tell me about your infrastructure, your team, or the problem you’re solving…" rows={5} required minLength={10} maxLength={3000} /><button className="button button-primary" type="submit">Compose Email<ArrowUpRight size={17} /></button><p className="form-note">Opens your email app with a draft. You review and send it—this site does not send messages.</p><p className="form-notice" role="status" aria-live="polite">{notice}</p></form>;
}

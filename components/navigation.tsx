"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";

const links = ["Home", "About", "Skills", "Experience", "Projects", "Infrastructure", "Contact"];

export function Navigation({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    if (detail) return () => window.removeEventListener("scroll", scroll);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    links.forEach((label) => { const section = document.getElementById(label.toLowerCase()); if (section) observer.observe(section); });
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, [detail]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = nav.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab") {
        const elements = [toggle.current, ...Array.from(nav.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
        const firstElement = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); firstElement.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 1000) setOpen(false); };
    window.addEventListener("keydown", keydown); window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keydown); window.removeEventListener("resize", resize); };
  }, [open]);

  function close() { setOpen(false); }
  return <header className={`site-header ${scrolled || open || detail ? "is-scrolled" : ""}`}>
    <div className="nav-wrap">
      <Link href={detail ? "/" : "#home"} className="brand" aria-label="awais.ali home" onClick={close}><span className="brand-mark" aria-hidden="true">a<span>.</span></span><span>awais<span className="brand-muted">.ali</span></span></Link>
      <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav ref={nav} id="primary-navigation" aria-label="Main navigation" className={open ? "nav-links is-open" : "nav-links"}>
        {links.map((label) => <Link key={label} href={`${detail ? "/" : ""}#${label.toLowerCase()}`} className={active === label.toLowerCase() && !detail ? "is-active" : ""} aria-current={active === label.toLowerCase() && !detail ? "location" : undefined} onClick={close}>{label}</Link>)}
        <Link href={`${detail ? "/" : ""}#contact`} className="nav-contact" onClick={close}>Let’s talk <ArrowUpRight size={14} /></Link>
      </nav>
    </div>
  </header>;
}

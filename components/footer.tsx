import Link from "next/link";
import { SocialLinks } from "@/components/ui/social-links";
export function Footer() {
  return <footer className="site-footer"><div className="container footer-layout"><Link href="/#home" className="footer-identity"><strong>Awais Ali<span>.</span></strong><small>DevOps Engineer</small></Link><p>© {new Date().getFullYear()} Awais Ali</p><SocialLinks labeled /></div></footer>;
}

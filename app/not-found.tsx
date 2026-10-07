import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
export default function NotFound() {
  return <><Navigation detail /><main id="main-content" className="container not-found"><p className="eyebrow">404 / ROUTE NOT FOUND</p><h1>This endpoint doesn’t exist.</h1><p>Let’s route you back to the portfolio.</p><Link className="button button-primary" href="/">Return home</Link></main><Footer /></>;
}

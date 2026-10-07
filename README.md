# Awais Ali · DevOps portfolio

A responsive personal portfolio built from `porfolio.md`, `Awais_ali_DevOPs_Resume.docx`, and `porfoliopic.jpeg`. Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. The original source documents are preserved.

## Local development

Use Node.js 22 LTS or newer and npm.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Next.js. The homepage and case studies are rendered on the server. Navigation, terminal typing, contact composition, scroll effects, and the infrastructure diagram use small client components.

## Production checks and build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The automated browser checks cover small and large viewports, internal navigation, every case study, missing routes, the mobile menu, diagram interaction, contact validation, reduced motion, console errors, and accessibility:

```sh
npx playwright install chromium
npm run test:e2e
```

On Windows the browser checks can use installed Google Chrome. Screenshots and reports are written to ignored `artifacts/`, `test-results/`, and `playwright-report/` folders.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel, or run `npx vercel` from this directory with your Vercel account.
2. Select the Next.js preset and Node.js 22 or newer. The root directory is the project root. Use `npm run build`; keep the output directory at its default.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your final HTTPS origin, such as your own domain, with no trailing path. If unset, the Vercel production project domain is detected using `VERCEL_PROJECT_PRODUCTION_URL`.
4. Deploy. No database, email provider, API keys, special adapter, or additional hosting service is required.

The production origin supplies canonical links, sitemap URLs, and the sitemap reference in robots.txt. With no configured origin, canonical links are omitted and the sitemap is empty rather than publishing a made-up domain. Set the origin before building outside Vercel.

See the official [Next.js on Vercel guide](https://vercel.com/docs/frameworks/full-stack/nextjs) and [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables) for hosting configuration.

## Edit content

| File | Content |
| --- | --- |
| `data/profile.ts` | Name, email, social URLs, résumé, education, and certificates |
| `data/experience.ts` | Roles, employer, dates, descriptions, and focus areas |
| `data/skills.ts` | Categories, technology badges, and descriptions |
| `data/projects.ts` | Project cards, architecture summaries, links, and case study content |
| `components/sections/infrastructure.tsx` | Reference architecture nodes and explanations |
| `components/sections/workflow.tsx` | Delivery workflow stages |
| `app/globals.css` | Theme, responsive layouts, and lightweight CSS animations |

## Add a project

Add another `Project` object to the `projects` array in `data/projects.ts`. Give it a unique URL-safe `slug`, number, title, category, description, technologies, architecture `flow`, and all six case study fields: problem, architecture, implementation, challenges, solution, and result. The card, static case study route, metadata, and sitemap entry follow automatically.

Set `status` to `documented` only when supported by actual evidence. Use `pending` and explicit placeholders for unconfirmed work. Add `github` and `live` only when you have valid direct URLs. An absent URL displays a clear note, without a dead button.

## Photos and hero media

Replace `public/awais-ali.jpeg` with your portrait, or update the Next.js Image sources in `components/sections/hero.tsx` and `components/sections/about.tsx`. Replace `public/awais-ali-resume.docx` when your résumé changes. Update image alt text if appropriate.

The hero uses an SVG infrastructure topology with subtle CSS path animation. Edit `CloudNetwork` in `components/sections/hero.tsx` and its styles in `app/globals.css` to change it. It loads no WebGL framework or decorative video. The site respects reduced-motion preferences. No social-preview image was generated; Open Graph and Twitter text metadata are included.

## Contact behavior

The contact form validates name, email, and message, then opens a `mailto:` draft with encoded subject and body. The visitor reviews and sends it in their email app. It never reports that a message was sent. A direct email link is always available. To add server delivery, replace the form submission handler with a real provider-backed server endpoint, add server validation and rate limiting, and keep provider credentials in environment variables.

## Content provenance and remaining details

- Name, email, LinkedIn, GitHub repository, education, listed certificates, and four hands-on case studies come from the supplied résumé, including its embedded hyperlinks.
- The current Ovex Technologies role comes from `porfolio.md`. Its start date, detailed responsibilities, and outcomes remain explicitly unconfirmed.
- Broader cloud and Terraform tools follow the supplied portfolio brief; they are not presented as measured expertise or supported production outcomes.
- AWS migration and blockchain case studies are clearly marked planned outlines. They need your actual implementation, challenges, solutions, and results.
- The first two projects link to the shared résumé-provided repository. Direct links for individual labs and live deployments were not supplied.
- No employment dates, performance numbers, certification credentials, production statistics, or client names have been invented.

## Verified locally

- Production build, TypeScript checks, and linting pass.
- Five Playwright browser checks pass against the production server.
- Homepage layouts were checked at 320, 375, 768, 1280, 1920, and 2560 pixels without horizontal page overflow.
- Automated WCAG A/AA checks pass on the homepage at mobile and desktop sizes and on a case study.
- All six case studies render, unknown projects return 404, navigation highlights the active section, and mobile navigation supports Escape and focus handling.
- Contact validation and email-draft behavior pass; reduced-motion rendering and browser console errors were checked.
- Lighthouse 13.5 on the local production server reports mobile scores of **90 performance / 100 accessibility / 100 best practices / 100 SEO**, with zero cumulative layout shift. Scores are lab measurements and can vary by device and hosting conditions. The report is saved at `artifacts/lighthouse-mobile.json`.
- Framer Motion is loaded when a reveal section enters the viewport; terminal typing and infrastructure path animation pause outside the viewport.
- The production dependency audit reports no known vulnerabilities. The development-only Next.js lint dependency chain currently reports an advisory for `braces`; no patched release is available in the installed compatible chain. This dependency is not part of the deployed application.
- Vercel deployment has not been performed from this workspace. The project uses the standard Next.js build and is ready to import into your Vercel account.

## Implementation references

Stack integration follows the official [Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [Motion reduced-motion guidance](https://motion.dev/docs/react-use-reduced-motion). Resolved dependency versions are recorded in `package-lock.json`.

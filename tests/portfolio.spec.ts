import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../data/projects";

test("homepage, responsive layouts, working assets, and accessibility", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page).toHaveTitle("Awais Ali | DevOps Engineer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DevOps");
  for (const width of [320, 375, 768, 1280, 1920, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const id of ["home", "about", "skills", "experience", "projects", "infrastructure", "contact"]) await expect(page.locator(`#${id}`)).toBeAttached();
  }
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  }
  expect(errors).toEqual([]);
  for (const asset of ["/awais-ali.jpeg", "/awais-ali-resume.docx", "/favicon.svg", "/robots.txt", "/sitemap.xml"]) expect((await request.get(asset)).status()).toBe(200);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "artifacts/desktop.png", fullPage: true, animations: "disabled" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: "artifacts/mobile.png", fullPage: true, animations: "disabled" });
});

test("mobile navigation, keyboard dismissal, and section navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const name of ["Home", "About", "Skills", "Experience", "Projects", "Infrastructure", "Contact"]) {
    await page.getByRole("navigation").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
    await expect(page.getByRole("navigation").getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "location");
  }
});

test("architecture supports keyboard and pointer selection; contact validates honestly", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Route 53 DNS resolution" }).click();
  await expect(page.locator("#architecture-description")).toContainText("not a proxy");
  const node = page.getByRole("button", { name: "Reverse proxy Nginx / load balancer" });
  await node.focus();
  await page.keyboard.press("Enter");
  await expect(node).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#architecture-description")).toContainText("TLS");
  await page.locator("#contact-name").fill(" ");
  await page.locator("#contact-email").fill("not-an-email");
  await page.locator("#contact-message").fill("Hello");
  await page.getByRole("button", { name: "Compose Email" }).click();
  expect(await page.locator("#contact-email").evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(false);
  await page.locator("#contact-name").fill("  ");
  await page.locator("#contact-email").fill("test@example.com");
  await page.locator("#contact-message").fill("A valid infrastructure enquiry.");
  await page.getByRole("button", { name: "Compose Email" }).click();
  await expect(page.getByRole("status")).toContainText("at least 2 characters");
  await page.locator("#contact-name").fill("Test User");
  await page.getByRole("button", { name: "Compose Email" }).click();
  await expect(page.getByRole("status")).toContainText("Review and send the draft");
  await expect(page.locator(".form-note")).toContainText("does not send messages");
});

test("all case studies render, have distinct SEO, and preserve evidence boundaries", async ({ page }) => {
  for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    for (const title of ["Problem", "Architecture", "Implementation", "Challenges", "Solution", "Result"]) await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", project.description);
    if (project.status === "pending") await expect(page.locator(".case-status")).toContainText("does not represent a completed project");
    await page.setViewportSize({ width: 320, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
  const missing = await page.goto("/projects/missing-project");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
});

test("reduced motion keeps all information available without CSS animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".terminal-typing")).toContainText("kubectl get pods");
  expect(await page.locator(".traffic").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

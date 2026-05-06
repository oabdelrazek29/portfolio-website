/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CUSTOMIZE YOUR SITE HERE
 * ═══════════════════════════════════════════════════════════════════════════
 * - `githubUsername` / `githubUrl` — live project grid from GitHub.
 * - `heroBackgroundImage` / `heroIntroParagraphs` — hero art and lead copy.
 * - `futureAmbitions` — upcoming work (PHANTOM, ARCADIA, placeholders).
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
};

export type FutureCard = {
  title: string;
  body: string;
  /** Spans full width on large screens (e.g. PHANTOM). */
  wide?: boolean;
  /** Muted “coming soon” styling. */
  placeholder?: boolean;
};

export type SkillBubble = {
  name: string;
  icon: string;
};

export const siteConfig = {
  name: "Omar Abdelrazek",

  /** Full bleed art behind the hero name and intro. Place file in /public. */
  heroBackgroundImage: "/section-hero-home.jpg",

  /**
   * Home hero introduction, shown under your name.
   * Kept as short paragraphs so type stays readable over photography.
   */
  heroIntroParagraphs: [
    "I'm an engineer working on intelligent systems that bridge software, AI, and the physical world.",
    "My focus is on how machines interpret data, make decisions, and interact with real environments through robotics, control systems, and autonomous design. I build with the goal of understanding how intelligence behaves when it's no longer just theoretical, but embedded into systems that move and respond.",
    "That means working across software architecture, real-time systems, and the fundamentals of perception and control. Everything I create is driven by the question of how far we can push machines to understand and act within reality.",
  ],

  /** @deprecated Prefer heroIntroParagraphs; kept so older imports do not break. */
  heroSummaryLines: [
    "Cybersecurity · Robotics · Software development",
    "I build secure software and simulations with a focus on analysis, integration, and clear engineering.",
  ],

  /** “At a glance” for the About panel next to imagery. */
  about: `I work where software, AI perception, feedback control, and physical hardware meet.

Simulations telemetry and disciplined architecture help me test ideas before they earn actuator authority.`,
  /** About column image path in /public. */
  aboutImage: "/section-about.jpg",

  /** Decorative banner beside Skills chips. */
  skillsBannerImage: "/section-skills.jpg",

  githubUsername: "oabdelrazek29",
  githubUrl: "https://github.com/oabdelrazek29?tab=repositories",
  linkedinUrl: "https://linkedin.com/in/yourusername",
  email: "hello@yourdomain.com",

  resumeUrl: null as string | null,
  resumePlaceholderNote:
    "Upload a PDF to /public (e.g. /assets/resume.pdf) and set resumeUrl here, or link to Drive / Notion.",
};

export const futureAmbitions: FutureCard[] = [
  {
    title: "PHANTOM — WFIF project",
    wide: true,
    body: `PHANTOM stands for Passive Human Analysis via Network Transmission On Map. It is a 3D simulation built entirely in Python that shows how WiFi signals move through a room and change when someone is present. No real WiFi hardware is used; everything is modeled mathematically.

You can think of it as waves leaving a router, bouncing off walls, and fading with distance. When a person enters the space, their body absorbs and disturbs the signal, creating a kind of shadow. PHANTOM renders that behavior in real time in a 3D scene you can rotate and explore.`,
  },
  {
    title: "ARCADIA initiative",
    wide: true,
    body: `ARCADIA is still in deep development study at its core modular intelligence and control for motion environments decisions and interaction inspired by aerospace navigation robotics physics systems engineering simulation and AI disciplines.

Analog world digitized imperfectly disciplined estimation stability simulation telemetry and layered interfaces evolve on my machine in a folder separate from this website repository while Featured Projects carries the fuller scientific narrative.`,
  },
  {
    title: "Open source and demos",
    body: `I keep sharpening public repos and demos that match how I actually work: clear structure, reproducible setup, honest notes when something is still rough.

Updates show up here and on GitHub when a slice is stable enough to share.`,
  },
  {
    title: "Site and narrative",
    body: `This portfolio is alive. I revise copy, routing, and sections as my focus shifts, so visitors see an accurate picture of what I am building and learning.

If you want collaboration on security, robotics, or simulation tooling, reach out through contact.`,
    placeholder: true,
  },
];

export const skills: SkillBubble[] = [
  { name: "Python", icon: "Py" },
  { name: "Physics", icon: "Φ" },
  { name: "Cybersecurity", icon: "◎" },
  { name: "Robotics", icon: "⌬" },
  { name: "C / C++", icon: "⧫" },
  { name: "TypeScript", icon: "TS" },
  { name: "Systems design", icon: "◇" },
  { name: "Simulation", icon: "≈" },
];

export const projects: Project[] = [
  {
    id: "nebula",
    title: "Nebula Dashboard",
    tagline: "Analytics with a velvet-dark UI",
    description: "Placeholder — use live GitHub repos when connected.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/oabdelrazek29/nebula",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    id: "pulse",
    title: "Pulse API",
    tagline: "Realtime events, minimal latency",
    description: "Placeholder — use live GitHub repos when connected.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    repoUrl: "https://github.com/oabdelrazek29/pulse",
    stack: ["Node", "PostgreSQL", "Redis"],
  },
];

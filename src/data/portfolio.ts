/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CUSTOMIZE YOUR SITE HERE
 * ═══════════════════════════════════════════════════════════════════════════
 * - `githubUsername` / `githubUrl` — live project grid from GitHub.
 * - `heroSummaryLines` — short intro only (no project names).
 * - `futureAmbitions` — upcoming work (PHANTOM + placeholders).
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

  /** Short hero — who you are and your focus. No projects here. */
  heroSummaryLines: [
    "Cybersecurity · Robotics · Software development",
    "I build secure software and simulations with a focus on analysis, integration, and clear engineering.",
  ],

  /** “At a glance” — unchanged in spirit (About section). */
  about: `I'm Omar. My work sits at the intersection of cybersecurity, robotics, and software engineering. I use simulations and rapid prototypes to de-risk ideas before they touch hardware, and I care about clarity, safety, and measurable performance.

Whether it's securing a pipeline, modeling a physical system, or building the glue between sensors and software, I aim for systems that behave predictably under stress.`,

  aboutImage: null as string | null,

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
    title: "Additional work",
    body: "To be added soon.",
    placeholder: true,
  },
  {
    title: "Future builds",
    body: "To be added soon.",
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

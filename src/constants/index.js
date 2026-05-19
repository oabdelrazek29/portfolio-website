import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  threejs,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "projects", title: "Projects" },
  { id: "working-on", title: "Working On" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Full-Stack Developer", icon: web },
  { title: "Python Automation", icon: backend },
  { title: "AI-Powered Apps", icon: creator },
  { title: "Freelance Engineer", icon: mobile },
];

const technologies = [
  { name: "Python", icon: backend },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: reactjs },
  { name: "JavaScript", icon: javascript },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "PostgreSQL", icon: nodejs },
  { name: "Three.js", icon: threejs },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "Git", icon: git },
];

const experiences = [
  {
    title: "Founder and Developer",
    company_name: "ARC",
    icon: creator,
    iconBg: "#383E56",
    date: "March 2026 - Present",
    points: [
      "Built an AI-powered productivity and learning platform from the ground up, handling full-stack architecture, product design, and feature development solo.",
      "Developed core systems including adaptive task organization, contextual search, and AI-assisted knowledge management using Next.js, TypeScript, PostgreSQL, and LLM APIs.",
      "Took the project through full product ideation, technical execution, and real user testing before shutting it down, keeping everything I learned.",
    ],
  },
  {
    title: "Freelance Developer",
    company_name: "Upwork",
    icon: web,
    iconBg: "#E6DEDD",
    date: "2026 - Present",
    points: [
      "Delivering client projects across Python automation, full-stack web development, AI integration, data processing, and workflow tooling.",
      "Built tools ranging from web scrapers and file processors to React interfaces and API integrations depending on what the client actually needs.",
      "Managing the full client relationship from scoping to delivery, focused on clean work and results that hold up.",
    ],
  },
];

const workingOnLog = [
  "ARC: building out AI-assisted task organization, contextual search, and the analytics dashboard",
  "PRPilot: diff reader, PR description generation, and review history tracking",
  "New 3D portfolio with Three.js and React Three Fiber",
];

const projects = [
  {
    name: "ARC",
    description:
      "An AI-powered productivity and learning platform built for students and builders. ARC handles task organization, adaptive scheduling, and knowledge management so you can focus on building instead of managing.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/oabdelrazek29/ARC",
  },
  {
    name: "PRPilot",
    description:
      "A PR automation tool that takes the grunt work out of code review. PRPilot reads your diffs, generates clear pull request descriptions, flags potential issues, and keeps your review history organized.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "AI", color: "pink-text-gradient" },
    ],
    image: jobit,
    live_site_link: "https://pr-pilot-eight.vercel.app",
    source_code_link: "https://github.com/oabdelrazek29/pr-pilot",
  },
  {
    name: "Portfolio Site",
    description:
      "This 3D portfolio built with Three.js and React Three Fiber. Fully responsive with smooth animations and a clean layout built to showcase real work.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Three.js", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
    ],
    image: tripguide,
    live_site_link: "https://portfolio-website-nu-five-55.vercel.app",
    source_code_link: "https://github.com/oabdelrazek29/portfolio-website",
  },
];

export const aboutCopy = `I'm a CS and cybersecurity student at John Jay College building full-stack applications and AI-powered tools while taking on freelance automation work on the side. My focus is on software that's practical and clean, things that actually save people time. I work across Python, TypeScript, React, and Next.js, and I take the same attention to detail into every client project that I bring to my own builds.`;

export { services, technologies, experiences, workingOnLog, projects };

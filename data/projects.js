/**
 * Portfolio project data source.
 *
 * Replace project content here.
 * Keep writing clear and technical.
 * Use short summaries on cards, then expand details in the modal.
 */
export const projects = [
  {
    title: "Phantom",
    status: "In Progress",
    shortDescription: "Control architecture for state evaluation and deterministic action flow.",
    description:
      "Phantom is a control system focused on decision-making under changing runtime conditions. The software pipeline is organized into three layers: input interpretation, state evaluation, and action execution. Inputs are normalized into internal signals, evaluated against state constraints, and passed into deterministic control rules. Current work is centered on improving transition logic between states, reducing edge-case instability, and making the response path easier to inspect and debug.",
    image: "/project-phantom.jpg",
    github: "https://github.com/your-username/phantom",
    demo: "https://example.com/phantom",
    stack: ["TypeScript", "Control Logic", "State Modeling"],
    focus: [
      "Runtime signal normalization",
      "State-machine transition reliability",
      "Action trace logging for debugging",
    ],
  },
  {
    title: "Autonomous Rocket Landing System",
    status: "In Progress",
    shortDescription: "Simulation and guidance logic for controlled descent and landing.",
    description:
      "This project models controlled descent and precision landing in a simulation-first environment. The software integrates a physics model with closed-loop control for position, velocity, and orientation updates. Each control step receives current state measurements, computes corrective output, and applies bounded adjustments for stability. Ongoing work includes tuning control parameters across disturbance scenarios and validating landing behavior against defined safety thresholds.",
    image: "/project-rocket-landing.jpg",
    github: "https://github.com/your-username/autonomous-rocket-landing-system",
    demo: "https://example.com/autonomous-rocket-landing-system",
    stack: ["Python", "Simulation", "Control Systems"],
    focus: [
      "Guidance and control loop tuning",
      "Physics-step stability testing",
      "Landing error and recovery analysis",
    ],
  },
  {
    status: "In Progress",
    shortDescription: "Celestial motion modeling with mathematically grounded visualization.",
    title: "Celestial Tracker",
    description:
      "Celestial Tracker models orbital and rotational motion using explicit mathematical relationships, then renders results in a readable visual layer. The project is designed to keep computational logic and visual presentation tightly aligned, so displayed trajectories reflect actual model output without cosmetic distortion. Current development is focused on time-step precision, coordinate transform correctness, and clear comparative views between predicted and observed paths.",
    image: "/project-celestial.jpg",
    github: "https://github.com/your-username/celestial-tracker",
    demo: "https://example.com/celestial-tracker",
    stack: ["JavaScript", "Math Modeling", "Visualization"],
    focus: [
      "Precision in orbital calculations",
      "Coordinate conversion consistency",
      "Readable trajectory comparison UI",
    ],
  },
  {
    status: "In Progress",
    shortDescription: "A system for testing interface structure and information hierarchy.",
    title: "Portfolio Engine",
    description:
      "Portfolio Engine is the framework behind this site. It acts as a controlled environment for testing typography, interaction timing, and content hierarchy in a real interface. The software is structured into reusable sections, shared data models, and motion primitives so updates can be made without rewriting the whole system. Active work includes refining page-level consistency, improving content density control, and expanding route-based sections for future material.",
    image: "/project-portfolio.jpg",
    github: "https://github.com/your-username/portfolio-engine",
    demo: "https://example.com/portfolio-engine",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    focus: [
      "Reusable section architecture",
      "Consistent motion and typography rules",
      "Scalable route and content organization",
    ],
  },
];

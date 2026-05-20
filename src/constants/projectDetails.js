export const projectDetails = {
  ARC: [
    {
      title: "What ARC is",
      paragraphs: [
        "ARC is a cognitive learning system designed to make learning feel structured instead of overwhelming. The idea came from constantly running into the same problem while learning online, too many disconnected resources, too much guessing, and no real sense of progression.",
        "Instead of forcing users through fixed courses, ARC builds adaptive learning paths around what someone actually wants to understand. The system is designed to break large topics into smaller connected ideas so the user always knows what to focus on next.",
        "The goal is not speed, it is clarity.",
      ],
    },
    {
      title: "Why it was built",
      paragraphs: [
        "Most learning platforms focus on content delivery instead of understanding. People spend hours jumping between videos, articles, tutorials, and documentation without ever building a strong mental structure of the topic.",
        "ARC was built to solve that problem. The idea was to create something that feels less like a course platform and more like a system that organizes knowledge around the user.",
        "I wanted learning to feel guided without feeling restrictive.",
      ],
    },
    {
      title: "How the system works",
      paragraphs: [
        "The core idea behind ARC is adaptive sequencing. A user enters a topic or goal they want to learn, and the system generates a structured learning path that evolves as the user progresses.",
        "The platform is being designed around several connected systems: adaptive learning paths, AI assisted guidance, knowledge graph structures, progress tracking, contextual explanations, and an optional split screen AI advisor mode.",
        "The AI advisor acts more like a contextual tutor than a chatbot. It is meant to stay available during the learning process without interrupting the flow of studying.",
        "ARC also includes visual learning structures that help users see how concepts connect together instead of learning isolated information.",
      ],
    },
    {
      title: "Technical direction",
      paragraphs: [
        "ARC is being built with modern frontend architecture focused heavily on performance and scalability. The project uses Next.js, React, TailwindCSS, TypeScript, component based UI systems, dynamic rendering systems, responsive layouts, and modular architecture.",
        "A large focus of the engineering effort has been keeping the experience smooth and lightweight even while handling complex UI systems like graph structures and AI interactions.",
        "The architecture is being designed so more advanced AI systems and adaptive logic can be integrated later without rebuilding the platform.",
      ],
    },
    {
      title: "Who ARC is for",
      paragraphs: [
        "ARC is built for students, engineers, self learners, researchers, people learning technical subjects, and anyone overwhelmed by scattered information.",
        "It is especially focused on people who prefer understanding concepts deeply instead of rushing through content.",
      ],
    },
    {
      title: "What makes it different",
      paragraphs: [
        "Most learning platforms are centered around static content. ARC is centered around structure, adaptability, contextual learning, and understanding relationships between concepts.",
        "The system changes based on how the user learns instead of forcing everyone through the same path.",
      ],
    },
    {
      title: "Long term vision",
      paragraphs: [
        "The long term goal for ARC is to evolve into a fully adaptive cognitive learning environment where learning paths evolve dynamically, AI understands context across sessions, users can visually map understanding, and studying feels more interactive and intuitive.",
        "The focus is creating a system that genuinely helps people understand difficult things more clearly.",
      ],
    },
    {
      title: "Challenges while building",
      paragraphs: [
        "One of the biggest challenges has been balancing complexity with usability. A lot of systems that look technically impressive become overwhelming very quickly. A major part of building ARC has been simplifying interactions while still preserving depth underneath the surface.",
        "Performance optimization has also been a major focus, especially while experimenting with graph systems, dynamic rendering, and AI assisted interfaces.",
      ],
    },
  ],
  PRPilot: [
    {
      title: "What PR Pilot is",
      paragraphs: [
        "PR Pilot is an AI assisted pull request analysis and review platform designed to help developers understand code changes more efficiently.",
        "The idea started from noticing how difficult it can be to review large pull requests, especially when working across unfamiliar codebases or complex systems.",
        "PR Pilot helps summarize changes, surface important modifications, and make pull request reviews feel less overwhelming.",
      ],
    },
    {
      title: "Why it was built",
      paragraphs: [
        "Code reviews are one of the most important parts of software engineering, but they are often slow, repetitive, and mentally exhausting.",
        "Developers frequently spend large amounts of time trying to understand what changed, identify risky modifications, trace dependencies, summarize logic, and explain pull requests to teammates.",
        "PR Pilot was built to reduce that friction and improve visibility into code changes.",
      ],
    },
    {
      title: "How it works",
      paragraphs: [
        "The system analyzes pull requests and generates structured summaries of changed files, architectural impact, important modifications, possible risks, developer notes, and contextual explanations.",
        "The platform focuses heavily on readability and clarity so developers can quickly understand the purpose of a pull request before diving into every file manually.",
        "The interface is designed to feel lightweight and fast instead of overloaded with information.",
      ],
    },
    {
      title: "Technical direction",
      paragraphs: [
        "PR Pilot is built around Next.js, React, TypeScript, AI assisted processing systems, modular frontend architecture, and dynamic UI rendering.",
        "The system is structured to support future integrations with GitHub APIs, repository indexing, semantic code analysis, and automated review assistance.",
      ],
    },
    {
      title: "Who it is for",
      paragraphs: [
        "PR Pilot is designed for software engineers, open source contributors, startup teams, technical leads, and developers reviewing large repositories.",
        "It is especially useful for teams working quickly across fast moving projects.",
      ],
    },
    {
      title: "What makes it different",
      paragraphs: [
        "Many developer tools overload users with technical data without improving clarity. PR Pilot focuses on readability, understanding, workflow efficiency, and structured explanations.",
        "The goal is not replacing engineers, it is helping them process information faster.",
      ],
    },
    {
      title: "Long term vision",
      paragraphs: [
        "The long term goal is turning PR Pilot into a collaborative engineering intelligence system that helps teams understand repositories faster, onboard developers quicker, improve review quality, and reduce engineering bottlenecks.",
      ],
    },
    {
      title: "Challenges while building",
      paragraphs: [
        "One major challenge has been balancing technical depth with interface simplicity. Developer tools can become cluttered very quickly. A large focus of the project has been keeping the experience clean and intuitive while still exposing meaningful information.",
        "Performance and responsiveness have also been priorities to ensure the interface feels fast even when processing large pull requests.",
      ],
    },
  ],
  "Portfolio Site": [
    {
      title: "What this site is",
      paragraphs: [
        "This portfolio is a personal site built to present projects, experience, and technical work in a way that feels intentional rather than like a template.",
        "It uses a 3D scene as atmosphere, not as decoration for its own sake. The layout stays readable so the work stays in focus.",
      ],
    },
    {
      title: "Why it was built",
      paragraphs: [
        "I wanted a single place where recruiters and engineers could see real projects, context on how I think, and enough detail to judge depth without digging through scattered links.",
        "The site also became a practical place to refine frontend craft: motion, responsive layout, and performance with heavier visual layers.",
      ],
    },
    {
      title: "The problem it solves",
      paragraphs: [
        "Resumes and GitHub profiles rarely show product reasoning, tradeoffs, or how something feels to use.",
        "This site closes that gap by pairing concise project cards with room to go deeper when someone wants more context.",
      ],
    },
    {
      title: "How it works technically",
      paragraphs: [
        "The app is a Vite and React SPA with Tailwind for styling, Framer Motion for transitions, and React Three Fiber with Three.js for the hero and background scenes.",
        "Sections are composed as modular components wrapped in shared layout helpers so motion and spacing stay consistent across the page.",
      ],
    },
    {
      title: "Who it is for",
      paragraphs: [
        "Hiring managers, technical recruiters, and engineers evaluating fit for internships or early roles.",
        "Anyone who wants a quick scan of projects first, then optional depth without leaving the page.",
      ],
    },
    {
      title: "What makes it different",
      paragraphs: [
        "Many portfolios either look generic or bury the work under heavy effects. Here the 3D layer supports the content instead of competing with it.",
        "Project cards stay minimal until expanded, which keeps the first impression calm while still allowing a serious technical read.",
      ],
    },
    {
      title: "Future vision",
      paragraphs: [
        "Keep evolving the project writeups as products mature, add case study depth where it earns its place, and tune performance as scenes and content grow.",
        "Long term the site should remain fast, accessible, and honest about what is shipped versus in progress.",
      ],
    },
    {
      title: "Architecture and systems",
      paragraphs: [
        "Content lives in constants so copy and structure can change without touching presentation logic. Each section is a self contained component fed by that data.",
        "Motion utilities centralize entrance animations so new sections match the rest of the page without one off timing.",
      ],
    },
    {
      title: "Challenges while building",
      paragraphs: [
        "Balancing Three.js weight with fast first paint took iteration on what loads immediately versus what can wait.",
        "Responsive behavior across card grids, 3D canvases, and expandable project panels required careful spacing so nothing feels cramped on mobile.",
      ],
    },
  ],
};

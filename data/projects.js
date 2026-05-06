/**
 * Portfolio featured projects cards and modal bodies.
 *
 * `github` on each row must point at that project's repository URL.
 */

const arcadiaVision = [
  `ARCADIA is still in development, but at its core it is an attempt to study and build a modular intelligence and control architecture capable of understanding motion, environment, decision making, and machine interaction in a way that mirrors how complex real world systems operate. The project is heavily inspired by aerospace navigation, autonomous robotics, computational physics, systems engineering, artificial intelligence, and large scale simulation theory.`,
  `The foundation of ARCADIA begins with one simple reality, the universe is analog. Motion is continuous, light travels as electromagnetic radiation, temperature shifts through molecular interaction, gravity bends trajectories over time, sound propagates through pressure waves, and physical systems never truly stop changing. Computers however do not experience reality directly. A processor only sees voltage transitions, timing signals, sampled measurements, packets, memory states, and mathematically encoded approximations of the outside world. Everything a machine "knows" about reality comes through imperfect observation.`,
  `That gap between physical reality and computational interpretation is where most of the science behind ARCADIA begins.`,
  `Every sensor introduces uncertainty. Cameras suffer from exposure limits, motion blur, rolling shutter distortion, compression artifacts, and low light noise. Accelerometers drift over time because microscopic manufacturing imperfections amplify through integration. Gyroscopes accumulate rotational error. GPS signals experience atmospheric delay, multipath reflection, and signal degradation. Magnetometers become corrupted by surrounding electromagnetic interference. Even clocks themselves drift. The system therefore cannot blindly trust any one source of information.`,
  `Instead ARCADIA is built around probabilistic reasoning and layered state estimation.`,
  `The idea is not to ask "What is happening" with certainty, because certainty almost never exists in autonomous systems. The better question is "What is most likely happening based on current evidence, previous observations, known physics, and confidence weighting."`,
  `That changes the architecture entirely.`,
  `The system treats the world as a continuously updating state space. Position, velocity, acceleration, angular orientation, thermal conditions, signal quality, environmental uncertainty, actuator response, latency, and system confidence all become pieces of a larger mathematical representation of reality. Every incoming measurement slightly reshapes the machine's belief about the current state of the world.`,
  `At a deeper level this becomes a study of applied mathematics and physical modeling.`,
  `Linear algebra becomes necessary because rotations, transformations, coordinate systems, and multidimensional state relationships all depend on vector spaces and matrices. Calculus becomes necessary because motion itself is continuous change across time. Probability theory becomes necessary because measurements are noisy and incomplete. Differential equations become necessary because physical systems evolve dynamically rather than statically. Control theory becomes necessary because intelligent systems are meaningless if they cannot stabilize themselves against disturbances.`,
  `ARCADIA is designed around the understanding that intelligence alone is not enough. A system must also remain stable.`,
  `In autonomous environments instability kills performance long before intelligence matters. Oscillation, delayed feedback, overcorrection, saturation, timing jitter, packet loss, synchronization failure, sensor disagreement, and compounding numerical error can destabilize even highly advanced systems. Because of that the architecture focuses heavily on feedback loops, constraint handling, fault tolerance, and modular verification.`,
  `The project separates perception, estimation, planning, control, simulation, telemetry, logging, diagnostics, and decision systems into isolated but cooperative layers. That separation is intentional because tightly coupled systems become fragile as complexity increases. Real aerospace and robotics systems survive because subsystems communicate through narrow well defined interfaces instead of uncontrolled dependencies.`,
  `Simulation plays a major role in development because physical hardware is expensive, dangerous, and slow to iterate on. Before any real world deployment the system is intended to operate inside synthetic environments where gravity models, atmospheric conditions, signal degradation, mechanical delay, thermal behavior, and navigation uncertainty can be studied repeatedly under controlled conditions. Simulation allows edge cases to appear thousands of times faster than reality would naturally provide them.`,
  `Another major focus of ARCADIA is temporal coherence and system memory.`,
  `Most simple projects react only to the current frame or current input. Advanced systems instead maintain continuity through time. A machine should understand not only where something is, but where it was, how fast it is changing, what trajectory it implies, and how reliable that prediction remains under uncertainty. That introduces concepts like recursive estimation, temporal filtering, prediction horizons, and adaptive weighting.`,
  `The long term vision of ARCADIA is not one giant monolithic AI model. It is an ecosystem of specialized systems working together through structured coordination. Some modules may focus on navigation, some on environmental reconstruction, some on optimization, some on language interaction, some on telemetry interpretation, and others on autonomous decision support. The architecture is intentionally modular so components can evolve independently without collapsing the rest of the system.`,
  `From a scientific perspective ARCADIA exists at the intersection of multiple disciplines simultaneously.`,
  `Computer science provides algorithms, operating systems, memory management, concurrency, networking, and architecture design. Physics provides motion, force interaction, energy transfer, orbital behavior, signal propagation, and environmental modeling. Mathematics provides the language used to represent uncertainty, geometry, optimization, and transformation. Engineering provides constraint handling, reliability, scalability, verification, and systems integration. Artificial intelligence provides adaptation, inference, prediction, pattern extraction, and autonomous reasoning.`,
  `The project is still experimental and actively evolving. Many systems remain theoretical, under research, or in early development stages. The goal is not rapid deployment, but gradual construction of a deeply understood and scientifically grounded framework capable of scaling over time into increasingly advanced autonomous and aerospace oriented applications.`,
  `At its deepest level ARCADIA is really an exploration of one question, how can a machine observe an imperfect world, reason through uncertainty, adapt across time, and act intelligently while remaining stable inside the physical limits of reality itself.`,
].join("\n\n");

export const projects = [
  {
    title: "ARCADIA",
    status: "In progress",
    shortDescription:
      "Development stage modular intelligence and control architecture tying motion sensing uncertainty estimation stability simulation and disciplined interfaces into one roadmap.",
    description: arcadiaVision,
    image: "/project-arcadia.jpg",
    github: "https://github.com/oabdelrazek29/ARCADIA",
    demo: "/arcadia-demo",
    stack: [
      "Probabilistic state estimation roadmap",
      "Control and stability",
      "Simulation first practice",
      "Modular subsystem boundaries",
      "Telemetry diagnostics",
      "Python and systems growth path",
    ],
    focus: [
      "Teaching logs and repeatable runs before actuator authority rises",
      "Isolation between perception estimation planning control and simulation",
      "Grounding math and physics intuition next to runnable code slices",
      "Validation patterns drawn from aerospace and robotics practice",
    ],
  },
  {
    title: "PHANTOM (WFIF)",
    status: "In progress",
    shortDescription:
      "Python based study of modeled WiFi propagation occupancy shadowing and absorption mapped in three dimensions without capturing live RF hardware.",
    description: `PHANTOM Passive Human Analysis via Network Transmission On Map examines how electromagnetic energy could flow reflect weaken and silhouette against occupants inside a modeled interior.\n\nThe approach keeps computation tied to Maxwell level intuition reflection absorption multipath yet uses practical kernels such as ray approximations or lighter numeric schemes so workstations can visualize fields without waiting overnight for full wave solvers unless you purposely scale there.\n\nThat loop observational physics encoded numerically predictive maps compared against expectations is aligned with credible scientific software discipline rather than decoration only.`,
    image: "/project-phantom.jpg",
    github: "https://github.com/oabdelrazek29/phantom-wfif",
    demo: "/lab",
    stack: ["Python", "Spatial modeling", "3D visualization", "Propagation kernels"],
    focus: [
      "Stable coordinate transforms from scene meters to imagery",
      "Separating electromagnetic kernels from viewport rendering",
      "Scenario replay so parameter sweeps remain comparable",
    ],
  },
  {
    title: "Portfolio site",
    status: "Active",
    shortDescription:
      "This Next.js portfolio as a reusable layout engine for sections motion tokens and routed pages.",
    description: `The site bundles typography motion primitives and routed pages so new writing ships without rewriting the shell.\n\nContent anchors live in typed data maps components stay dumb where possible fetching logic isolates GitHub summaries when enabled which mirrors how frontend teams cooperate with designers.\n\nIteration goal is restrained motion strong contrast legible rhythm and accessibility so flair never steals meaning.`,
    image: "/project-portfolio.jpg",
    github: "https://github.com/oabdelrazek29/portfolio-website",
    demo: "/",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    focus: ["Section modular layout", "Consistent hover and focus cues", "Content driven featured projects modal"],
  },
];

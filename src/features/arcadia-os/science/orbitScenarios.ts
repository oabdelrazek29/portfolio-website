/** Text-only orbit vignettes aligned with ARCADIA `arcadia.space.simulations.orbit_text`. */

export const ORBIT_SCENARIO_A_EARTH_MOON = [
  "Conceptual translunar storyline (two-body intuition, not a fitted ephemeris):",
  "",
  "1. Ascent → low parking orbit (~200–400 km) for checkout.",
  "2. Translunar injection burn raises energies so apogee reaches lunar sphere-of-influence scale.",
  "3. Translunar cruise is mostly ballistic; mid-course trims correct dispersion.",
  "4. Lunar orbit insertion is a Δv at periapsis-ish geometry targeting stable lunar orbit.",
  "5. Orbital-mechanics core: continual free fall; rockets only retarget the fall vector.",
];

export const ORBIT_SCENARIO_B_LEO = [
  "LEO kinematics vignette:",
  "",
  "- Circular-speed scales ~ √(μ/r): lower altitude ⇒ higher angular velocity.",
  "- J₂ oblateness precesses node & argument of periapsis; drag below ~600 km couples to thermosphere weather.",
];

export const ORBIT_SCENARIO_C_FLYBY = [
  "Asteroid planetary flyby (hyperbolic arcs in planet-fixed frame):",
  "",
  "- Close approach minimizes miss distance catalogued in JSON feeds.",
  "- Trajectory bends under planet gravity; spacecraft remote sensing concentrates near closest approach Δt budgets.",
];

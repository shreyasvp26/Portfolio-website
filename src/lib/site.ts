export const site = {
  name: "Shreyas Patil",
  handle: "shreyasvp26",
  role: "Software Engineer",
  // Kept deliberately concrete: specialty + current status, above the fold.
  positioning:
    "Final-year B.Tech CSE at IIIT Pune. I build applied ML systems on a core-CS foundation, and I'm going deep on agentic AI by building evaluation infrastructure for coding agents.",
  location: "Pune, India",
  email: "shreyasvp2605@gmail.com",
  url: "https://shreyas-portfolio.vercel.app",
  resumePath: "/Shreyas_Patil_Resume.pdf",
  socials: {
    github: "https://github.com/shreyasvp26",
    linkedin: "https://www.linkedin.com/in/shreyas-patil-005a6830a/",
    // TODO(shreyas): confirm these two handles — the CodeChef URL 404s as written.
    leetcode: "https://leetcode.com/u/ShreyasvPatil/",
    codechef: "https://www.codechef.com/users/shreyas_vp",
  },
} as const;

export type Education = {
  institution: string;
  qualification: string;
  detail: string;
  period: string;
};

export const education: Education[] = [
  {
    institution: "IIIT Pune",
    qualification: "B.Tech, Computer Science & Engineering",
    detail: "CGPA 7.27 / 10.0",
    period: "Aug 2023 — May 2027",
  },
  {
    institution: "Sudhakar Naik Jr. College, Akola",
    qualification: "Senior Secondary (Science), Maharashtra State Board",
    detail: "78.50%",
    period: "2021 — 2023",
  },
];

export type Experience = {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Shreepad Seva Mandal",
    title: "iOS Coding & Operations Lead",
    location: "Pune (Remote)",
    period: "Apr 2026 — Present",
    current: true,
    points: [
      "One of three developers on a Next.js + Capacitor app live on the App Store; own the iOS release pipeline from TestFlight beta distribution through App Store submission and review.",
      "Debug production issues across authentication, push notifications, and native-plugin parity, also contributing to the Android side to keep behaviour consistent across platforms.",
    ],
  },
  {
    company: "Xelron",
    title: "Software Development Engineer Intern",
    location: "Bengaluru (Remote)",
    period: "Mar 2026 — May 2026",
    points: [
      "Project Gauss: promoted to team lead of 7 engineers; architected an HLE-style LLM benchmarking pipeline across 9 domains with rule-based validation gates, contributing 20+ accepted expert-level QA pairs.",
      "Project Einstein: built multi-stage quality-enforcement tooling for STEM LLM training data, integrating formatting, rubric, and metadata checks against frontier models.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

// No proficiency percentages by design — the case studies are the evidence.
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["C++", "Python", "TypeScript", "JavaScript", "SQL", "C"] },
  { label: "ML / AI", items: ["PyTorch", "NumPy", "Pandas", "Gemini API", "Transfer learning", "Prompt engineering"] },
  { label: "Backend", items: ["FastAPI", "Node.js", "Express", "REST", "JWT", "PostgreSQL", "MongoDB"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Streamlit"] },
  { label: "Tooling", items: ["Git", "Linux", "CMake", "Catch2", "Docker", "TestFlight", "App Store Connect"] },
  { label: "Core CS", items: ["Data structures & algorithms", "OOP", "SOLID", "DBMS", "Operating systems", "Networks"] },
];

export const competitive = {
  leetcode: { rating: 1473, label: "LeetCode" },
  codechef: { rating: 1402, label: "CodeChef" },
  problems: "270+",
  contests: "20+",
};

export type Achievement = {
  title: string;
  detail: string;
  period: string;
  href?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Cyber Cypher 5.0 Finalist — Team Lead",
    detail:
      "Built ArcticOps, a multitenant cold-chain logistics system (Next.js, Node.js, Express) at NMIMS MPSTME.",
    period: "Mar 2026",
    href: "https://github.com/shreyasvp26/ArcticOps-Multitenant-Cold-Chain-Supply-Logistics-System",
  },
  {
    title: "Campus Ambassador — E-Cell, IIT Bombay",
    detail: "Represented IIIT Pune across entrepreneurship outreach programmes.",
    period: "Jul 2024 — Jun 2025",
  },
  {
    title: "Senior Member & Event Organiser — SAAZ Music Club, IIIT Pune",
    detail: "Organised campus performances and managed event logistics.",
    period: "Sep 2023 — May 2026",
  },
];

/** Smaller projects that support the case studies without competing with them. */
export type SideProject = {
  name: string;
  blurb: string;
  stack: string[];
  repo: string;
  demo?: string;
};

export const sideProjects: SideProject[] = [
  {
    name: "Pathfinding Analysis Engine",
    blurb:
      "SOLID-compliant C++17 engine that decouples three solvers (A*, Dijkstra, BFS) from four heuristics behind pure-virtual interfaces, with 44 Catch2 cases, a clean ASan/UBSan build, and reproducible benchmarks rendered to an HTML dashboard.",
    stack: ["C++17", "CMake", "Catch2", "ASan/UBSan", "CI"],
    repo: "https://github.com/shreyasvp26/Pathfinding-analysis-engine-with-Heuristic-Visualization",
  },
  {
    name: "ArcticOps",
    blurb:
      "Multitenant cold-chain logistics system built as team lead under hackathon time pressure; reached the Cyber Cypher 5.0 finals.",
    stack: ["Next.js", "TypeScript", "Node.js", "Express"],
    repo: "https://github.com/shreyasvp26/ArcticOps-Multitenant-Cold-Chain-Supply-Logistics-System",
  },
  {
    name: "Deepfake Detection & Attribution Suite",
    blurb:
      "Multi-signal deepfake forensics: spatial XceptionNet fused with temporal consistency, four-way manipulation attribution via DSAN, dual Grad-CAM++ explainability, and identity-safe dataset splits. Engine-complete; benchmarks pending a measured GPU run.",
    stack: ["PyTorch", "XceptionNet", "Grad-CAM++", "FastAPI", "Streamlit"],
    repo: "https://github.com/shreyasvp26/ai-powered-deepfake-detection-investigation-suite",
  },
  {
    name: "Stock Sentiment Predictor",
    blurb:
      "Explored whether headline sentiment adds signal to price movement prediction over a pure technical baseline.",
    stack: ["Python", "Pandas", "scikit-learn"],
    repo: "https://github.com/shreyasvp26/Stock-Market-Prediction-Using-Sentiment-Analysis",
  },
];

export const site = {
  name: "Shreyas Patil",
  handle: "shreyasvp26",
  role: "Software Engineer",
  // Kept deliberately concrete: specialty + current status, above the fold.
  positioning:
    "I’m a Computer Science student at IIIT Pune who likes building software that holds up outside a demo. Lately, that has meant working on payment recovery systems, AI memory, and computer vision.",
  location: "Pune, India",
  phone: "+91 95793 33834",
  email: "shreyasvp2605@gmail.com",
  url: "https://shreyaspatil-dev.vercel.app",
  resumePath: "/112315129_ShreyasPatil.pdf",
  interests: [
    "Software Engineering",
    "Applied ML",
    "Backend Engineering",
    "Distributed Systems",
    "AI Systems",
  ],
  socials: {
    github: "https://github.com/shreyasvp26",
    linkedin: "https://www.linkedin.com/in/shreyas-patil-005a6830a/",
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
    title: "Software Developer & iOS Operations Lead",
    location: "Pune, Maharashtra (Remote)",
    period: "Apr 2026 — Aug 2026",
    points: [
      "Led iOS release engineering across 98 TestFlight builds, helping scale the nonprofit app to more than 1,000 live users.",
      "Fixed production issues with APNs push delivery and Firebase Authentication race conditions, and kept iOS and Android behaviour aligned through Capacitor native bridges.",
      "Shipped fixes with feedback from more than 20 beta testers.",
    ],
  },
  {
    company: "Xelron",
    title: "Software Development Engineer Intern",
    location: "Bengaluru (Remote)",
    period: "Mar 2026 — Apr 2026",
    points: [
      "For Project Gauss, designed adversarial, HLE-style evaluation tasks and validation gates across nine domains.",
      "For Project Einstein, checked STEM training data against rubric, schema, and LaTeX requirements, then benchmarked GPT and Claude on more than 42 accepted prompts to study multi-step reasoning failures.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

// No proficiency percentages by design — the case studies are the evidence.
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["C++", "Python", "JavaScript", "SQL"] },
  { label: "AI / ML", items: ["PyTorch", "NumPy", "Pandas", "LLMs", "LLM APIs", "Transfer learning", "Computer vision"] },
  { label: "Generative AI", items: ["LangChain", "LangGraph", "RAG", "Vectorless RAG", "Guardrails", "Evaluations"] },
  { label: "Backend", items: ["FastAPI", "Asyncio", "Node.js", "Express.js", "REST APIs", "JWT", "Firebase"] },
  { label: "Frontend & mobile", items: ["React.js", "Next.js", "Capacitor", "Streamlit", "Tailwind CSS"] },
  { label: "Data", items: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis"] },
  { label: "Testing & DevOps", items: ["Pytest", "Hypothesis", "Mypy", "Docker", "Git", "Linux", "GitHub Actions CI/CD"] },
  { label: "Core CS", items: ["Data structures & algorithms", "OOP", "DBMS", "Low-level design", "Operating systems", "Computer networks", "SOLID"] },
];

export const competitive = {
  leetcode: { rating: 1718, label: "LeetCode" },
  codechef: { rating: 1480, label: "CodeChef" },
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
      "Led ArcticOps, a multitenant cold-chain logistics system, to the top 30 out of 250+ teams at NMIMS MPSTME.",
    period: "Mar 2026",
    href: "https://github.com/shreyasvp26/ArcticOps-Multitenant-Cold-Chain-Supply-Logistics-System",
  },
  {
    title: "SQL & Data Engineering Foundations — takeUforward",
    detail: "Completed certification in SQL and ETL fundamentals.",
    period: "Oct 2026",
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
    name: "Temporal Memory Engine",
    blurb:
      "A bitemporal memory system for AI agents, built around PostgreSQL, explicit conflict resolution, and hybrid retrieval. On LongMemEval, it reached 96.7% accuracy; the evaluation suite includes 482 automated tests.",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Asyncio"],
    repo: "https://github.com/shreyasvp26/Temporal-Memory-Engine",
  },
  {
    name: "EvalForge",
    blurb:
      "Evaluation platform for autonomous coding agents — runs the same pinned task against Cursor, Claude Code, Codex and others inside identical Docker sandboxes, then grades the results objectively. Hexagonal architecture with nine independently versioned Python packages.",
    stack: ["Python", "FastAPI", "Docker", "PostgreSQL", "Next.js", "pytest"],
    repo: "https://github.com/shreyasvp26/EvalForge",
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

/** Projects featured in the current PDF résumé, in the same order. */
export const resumeProjects = [
  {
    name: "RecoveryOS — Autonomous Payment Recovery Engine",
    summary:
      "A payment recovery engine that uses idempotent Razorpay webhooks and a policy gate to make safe recovery decisions. Tested across 1,753 Pytest tests, including financial-safety checks.",
    stack: ["Python", "FastAPI", "SQLite", "React", "Gemini API"],
    href: "/work/recoveryos",
    linkLabel: "Case study",
  },
  {
    name: "Temporal Memory Engine — Bitemporal AI Memory",
    summary:
      "A PostgreSQL-backed memory system for AI agents, with a conflict resolver for out-of-order updates and hybrid search across vector, text, graph, and time-based signals. Scored 96.7% on LongMemEval.",
    stack: ["Python", "FastAPI", "PostgreSQL 16", "pgvector", "Asyncio"],
    href: "https://github.com/shreyasvp26/Temporal-Memory-Engine",
    linkLabel: "GitHub",
  },
  {
    name: "Skin Cancer Detection via Deep Transfer Learning",
    summary:
      "A skin-lesion classification project using transfer learning and an ensemble of CNNs. The reported ensemble reached 0.960 ROC-AUC on the evaluation data; the project also includes a FastAPI and React app.",
    stack: ["Python", "PyTorch", "EfficientNet", "ResNet", "FastAPI"],
    href: "/work/oncoscan",
    linkLabel: "Case study",
  },
] as const;

/**
 * Portfolio content. Edit this file to change copy, links, and the availability line.
 * Metrics keep the project they came from. Do not turn them into career-wide claims.
 * Project URLs stay empty until real links exist.
 */

const leetcodeProfile = "https://leetcode.com/u/guptagovind1410/";

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configured && !configured.includes("localhost")) return configured;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  const preview = process.env.VERCEL_URL?.trim();
  if (preview) return `https://${preview.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return configured || "http://localhost:3000";
}

export const site = {
  name: "Govind Gupta",
  monogram: "GG",
  role: "Software Engineer",
  location: "New Delhi, India",
  email: "guptagovind1410@gmail.com",
  phoneDisplay: "+91 9643099218",
  phoneHref: "tel:+919643099218",
  github: "https://github.com/guptaG1410",
  linkedin: "https://www.linkedin.com/in/guptag1410",
  /** Real profile. NEXT_PUBLIC_LEETCODE_URL overrides it when set. */
  leetcodeUrl: process.env.NEXT_PUBLIC_LEETCODE_URL?.trim() || leetcodeProfile,
  url: siteUrl(),
  resume: {
    href: "/Govind-Gupta-Resume.pdf",
    fileName: "Govind-Gupta-Resume.pdf",
  },
  /**
   * Manual availability setting. It is not inferred from the resume.
   * NEXT_PUBLIC_AVAILABILITY_SHOW=false hides the indicator.
   */
  availability: {
    show: process.env.NEXT_PUBLIC_AVAILABILITY_SHOW !== "false",
    label: process.env.NEXT_PUBLIC_AVAILABILITY_LABEL?.trim() || "Open to opportunities",
  },
  positioning: ["Full-Stack Engineer", "Backend Systems", "Cloud & DevOps", "AI Engineering"],
  intro:
    "I build scalable software systems, secure APIs, intelligent applications, and high-performance digital experiences. I enjoy solving complex engineering problems and turning ideas into reliable production-ready solutions.",
  heroSupport:
    "Software Engineer specializing in full-stack development, backend architecture, cloud infrastructure, API security, and AI-powered applications.",
  tagline: ["Building scalable systems.", "Engineering intelligent solutions."],
} as const;

export const nav = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "projects", label: "Projects", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export const aboutParagraphs = [
  "I’m a Software Engineer with 2.5+ years of experience building scalable full-stack applications, backend microservices, and cloud-native systems.",
  "My experience spans API platform engineering, authentication and authorization, cloud infrastructure, DevOps automation, and AI-powered data pipelines.",
  "I focus on building systems that are secure, maintainable, scalable, and performance-driven.",
] as const;

export const aboutStats = [
  {
    value: "2.5+",
    label: "Years of experience",
    context: "Professional tenure across the roles listed on this site.",
  },
  {
    value: "95%",
    label: "Test coverage",
    context:
      "Charmai Technologies — Jest and Playwright on that work, with 100% CI success. Not a career-wide average.",
  },
  {
    value: "4",
    label: "LLM providers",
    context: "Charmai Technologies — Anthropic, OpenAI, Gemini, and Mistral behind one API proxy.",
  },
  {
    value: "70+",
    label: "Table schema",
    context: "Charmai Technologies — PostgreSQL schema where nested queries were optimized.",
  },
] as const;

export const skillGroups = [
  "Frontend",
  "Backend",
  "Cloud & DevOps",
  "API Management & Security",
  "Databases & Search",
  "AI & Machine Learning",
  "Monitoring & Testing",
] as const;

export type SkillGroup = (typeof skillGroups)[number];

export const skills: { name: string; group: SkillGroup }[] = [
  { name: "React.js", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "JavaScript", group: "Frontend" },
  { name: "Redux Toolkit", group: "Frontend" },
  { name: "React Query", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "NestJS", group: "Backend" },
  { name: "Express.js", group: "Backend" },
  { name: "Java", group: "Backend" },
  { name: "Python", group: "Backend" },
  { name: "AWS", group: "Cloud & DevOps" },
  { name: "Lambda", group: "Cloud & DevOps" },
  { name: "S3", group: "Cloud & DevOps" },
  { name: "Cognito", group: "Cloud & DevOps" },
  { name: "Docker", group: "Cloud & DevOps" },
  { name: "Kubernetes", group: "Cloud & DevOps" },
  { name: "Helm", group: "Cloud & DevOps" },
  { name: "Calico", group: "Cloud & DevOps" },
  { name: "CI/CD", group: "Cloud & DevOps" },
  { name: "Apigee X", group: "API Management & Security" },
  { name: "OAuth 2.0", group: "API Management & Security" },
  { name: "OIDC", group: "API Management & Security" },
  { name: "PKCE", group: "API Management & Security" },
  { name: "JWT", group: "API Management & Security" },
  { name: "Zero Trust", group: "API Management & Security" },
  { name: "Open Policy Agent", group: "API Management & Security" },
  { name: "PostgreSQL", group: "Databases & Search" },
  { name: "MongoDB", group: "Databases & Search" },
  { name: "OpenSearch", group: "Databases & Search" },
  { name: "Weaviate", group: "Databases & Search" },
  { name: "Pinecone", group: "Databases & Search" },
  { name: "LangChain", group: "AI & Machine Learning" },
  { name: "RAG Pipelines", group: "AI & Machine Learning" },
  { name: "Vector Search", group: "AI & Machine Learning" },
  { name: "OpenAI", group: "AI & Machine Learning" },
  { name: "Anthropic", group: "AI & Machine Learning" },
  { name: "Gemini", group: "AI & Machine Learning" },
  { name: "Mistral", group: "AI & Machine Learning" },
  { name: "Splunk", group: "Monitoring & Testing" },
  { name: "Datadog", group: "Monitoring & Testing" },
  { name: "Komodor", group: "Monitoring & Testing" },
  { name: "Jest", group: "Monitoring & Testing" },
  { name: "Playwright", group: "Monitoring & Testing" },
  { name: "Swagger", group: "Monitoring & Testing" },
  { name: "Spectral", group: "Monitoring & Testing" },
  { name: "ESLint", group: "Monitoring & Testing" },
];

export const heroLabels = ["Next.js", "NestJS", "Kubernetes", "OAuth 2.0", "PostgreSQL", "RAG"] as const;

export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Charmai Technologies Pvt. Ltd.",
    role: "Software Engineer",
    dates: "March 2025 – Present",
    location: "New Delhi, India",
    points: [
      "Applied OAuth 2.0/OIDC security with PKCE, JWT validation, and Zero Trust principles behind a secure proxy, closing interception and injection risks in identity-provider integrations.",
      "Developed and maintained API proxies on Apigee X, and enforced API standards with Spectral, ESLint, and Nx monorepo tooling.",
      "Deployed NestJS and Express microservices on Kubernetes using Helm.",
      "Implemented policy-based authorization with Open Policy Agent and contributed to Kubernetes network security with Calico, decoupling access control from application code.",
      "Integrated four LLM providers — Anthropic, OpenAI, Gemini, and Mistral — behind a unified API proxy for model routing.",
      "Built a Python ETL pipeline from S3 into PostgreSQL, plus Lambda integrations with third-party APIs, removing manual data entry.",
      "Optimized nested PostgreSQL queries across a 70+ table schema and built real-time analytics dashboards for business reporting.",
      "Reduced API response time by 25% and delivered 40% faster frontend development through optimized Backend-for-Frontend patterns.",
      "Achieved 95% test coverage with Jest and Playwright, and 100% CI success.",
      "Reduced production MTTR by 35% using Splunk-based monitoring.",
    ],
  },
  {
    company: "Misemind Technologies Pvt. Ltd.",
    role: "Software Engineer",
    dates: "March 2024 – February 2025",
    location: "New Delhi, India",
    points: [
      "Improved dashboard rendering speed by 80% using server-side pagination, AG Grid virtualization, and data batching.",
      "Built a unified CRM-integrated platform using React and TypeScript.",
      "Created a reusable Material UI design system that accelerated UI delivery.",
      "Integrated AWS Cognito and OpenSearch, reducing authentication and search latency by 30%.",
      "Maintained 85%+ test coverage.",
    ],
  },
  {
    company: "TGH Tech",
    role: "Frontend Developer",
    dates: "December 2023 – February 2024",
    location: "Kochi, Kerala · Remote",
    points: [
      "Developed modular React components and integrated the frontend with backend microservices.",
      "Improved load times using React Query and Axios.",
      "Achieved 80% unit and end-to-end test coverage.",
      "Contributed to API testing and Swagger documentation.",
    ],
  },
];

export type ProjectHighlight = {
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  technologies: string[];
  highlights: ProjectHighlight[];
  /** Add a real URL later. Null means the link is intentionally unpublished. */
  liveUrl: string | null;
  repositoryUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "geniai",
    name: "GeniAI",
    title: "AI-Powered Insurance Management System",
    summary:
      "Built an AI-powered conversational interface with PDF-driven semantic search and role-based dashboards.",
    technologies: ["React", "Next.js", "GPT-4o", "MongoDB Atlas Vector Search"],
    highlights: [
      {
        title: "Conversational interface",
        detail: "A GPT-4o conversational UI built with React and Next.js.",
      },
      {
        title: "Document intelligence",
        detail: "PDF-driven semantic search over insurance documents.",
      },
      {
        title: "Semantic search",
        detail: "Retrieval backed by MongoDB Atlas Vector Search.",
      },
      {
        title: "Role-based dashboards",
        detail: "Dashboards shaped by the signed-in role.",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
  },
  {
    slug: "socioverse",
    name: "SocioVerse",
    title: "Social Media Platform",
    summary:
      "Developed a full-stack social media platform with authentication and file upload functionality.",
    technologies: ["React", "Redux Toolkit", "Express.js", "MongoDB", "JWT", "Multer"],
    highlights: [
      {
        title: "Social application",
        detail: "A full-stack social platform with a React client and an Express.js API.",
      },
      {
        title: "Authentication",
        detail: "JWT-based authentication for account access.",
      },
      {
        title: "Media upload",
        detail: "File uploads handled with Multer.",
      },
      {
        title: "Application data",
        detail: "MongoDB for application data, with Redux Toolkit on the client.",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const engineering = [
  {
    id: "api",
    title: "API & Backend Engineering",
    copy: "Secure API gateways, microservices, backend architecture, and performance optimization.",
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    copy: "AWS, Kubernetes, Docker, Helm, CI/CD, and infrastructure security.",
  },
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    copy: "Multi-LLM integration, RAG pipelines, semantic search, and vector databases.",
  },
  {
    id: "security",
    title: "Security & Reliability",
    copy: "OAuth 2.0/OIDC, PKCE, JWT, Zero Trust, monitoring, and automated testing.",
  },
] as const;

export const achievements = [
  {
    value: 80,
    suffix: "%",
    label: "Faster dashboard rendering",
    context: "Misemind Technologies — server-side pagination, AG Grid virtualization, and data batching.",
  },
  {
    value: 35,
    suffix: "%",
    label: "Lower production MTTR",
    context: "Charmai Technologies — Splunk-based monitoring.",
  },
  {
    value: 30,
    suffix: "%",
    label: "Faster authentication and search",
    context: "Misemind Technologies — AWS Cognito and OpenSearch.",
  },
  {
    value: 25,
    suffix: "%",
    label: "Faster API responses",
    context: "Charmai Technologies — optimized Backend-for-Frontend patterns.",
  },
  {
    value: 4,
    suffix: "",
    label: "LLM providers integrated",
    context: "Charmai Technologies — Anthropic, OpenAI, Gemini, and Mistral behind one proxy.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Test coverage",
    context: "Charmai Technologies — Jest and Playwright, with 100% CI success on that work.",
  },
] as const;

export const education = {
  degree: "Bachelor of Technology",
  field: "Information Technology",
  school: "Guru Gobind Singh Indraprastha University",
  location: "New Delhi",
  dates: "August 2019 – July 2023",
  cgpa: "8.5",
  note: "8.5 CGPA, listed on the resume as 85% equivalent.",
  coursework: [
    "Data Structures",
    "Web Development",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
} as const;

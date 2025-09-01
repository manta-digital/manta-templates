export const techStack = [
  {
    name: "React",
    version: "19.1.1",
    description: "Modern React with concurrent features and improved hooks",
    icon: "react",
    category: "Framework" as const,
    color: "blue",
    url: "https://react.dev",
    featured: true
  },
  {
    name: "TypeScript", 
    version: "5.8.3",
    description: "Type-safe JavaScript with advanced inference and tooling",
    icon: "typescript",
    category: "Language" as const,
    color: "blue",
    url: "https://typescriptlang.org",
    featured: true
  },
  {
    name: "Vite",
    version: "7.1.2", 
    description: "Next-generation frontend tooling with lightning-fast HMR",
    icon: "vite",
    category: "Build Tool" as const,
    color: "purple",
    url: "https://vitejs.dev",
    featured: true
  },
  {
    name: "Tailwind CSS",
    version: "4.1.12",
    description: "Utility-first CSS framework with CSS-based configuration",
    icon: "tailwind",
    category: "Styling" as const,
    color: "cyan",
    url: "https://tailwindcss.com",
    featured: true
  },
  {
    name: "Framer Motion",
    version: "12.23.12",
    description: "Production-ready motion library for React components",
    icon: "motion",
    category: "Animation" as const,
    color: "pink",
    url: "https://framer.com/motion",
    featured: false
  },
  {
    name: "Lucide React",
    version: "0.507.0",
    description: "Beautiful, customizable SVG icons as React components", 
    icon: "lucide",
    category: "Icons" as const,
    color: "orange",
    url: "https://lucide.dev",
    featured: false
  },
  {
    name: "Three.js",
    version: "0.179.1",
    description: "3D graphics library for WebGL-powered experiences",
    icon: "cube",
    category: "3D Graphics" as const,
    color: "green", 
    url: "https://threejs.org",
    featured: false
  },
  {
    name: "React Router",
    version: "7.8.2", 
    description: "Declarative routing for React applications",
    icon: "route",
    category: "Routing" as const,
    color: "red",
    url: "https://reactrouter.com",
    featured: false
  }
];

export const buildTools = [
  {
    name: "ESLint",
    version: "9.33.0",
    description: "Pluggable linting utility for JavaScript and TypeScript",
    purpose: "Code Quality"
  },
  {
    name: "Vite React Plugin", 
    version: "5.0.0",
    description: "Official Vite plugin for React with Fast Refresh support",
    purpose: "React Integration"
  },
  {
    name: "Tailwind Vite Plugin",
    version: "4.1.12", 
    description: "Native Vite integration for Tailwind CSS v4",
    purpose: "CSS Processing"
  }
];

export const categories = [
  { name: "Framework", count: 1, color: "blue" },
  { name: "Language", count: 1, color: "blue" }, 
  { name: "Build Tool", count: 1, color: "purple" },
  { name: "Styling", count: 1, color: "cyan" },
  { name: "Animation", count: 1, color: "pink" },
  { name: "Icons", count: 1, color: "orange" },
  { name: "3D Graphics", count: 1, color: "green" },
  { name: "Routing", count: 1, color: "red" }
];

export const performanceStats = {
  bundleSize: {
    js: "329KB",
    jsGzipped: "101KB", 
    css: "123KB",
    cssGzipped: "19KB"
  },
  buildTime: "~1.8s",
  devStartTime: "~235ms",
  hmrUpdateTime: "<100ms"
};
export const reactProjectContent = {
  title: "React Components Showcase",
  description: "Standard React template with ui-core components working without injection",
  longDescription: "This template demonstrates how ui-core components work seamlessly in standard React environments using Vite for build tooling. No framework-specific injection required.",
  techStack: ["React 19", "Vite 5", "Tailwind 4", "TypeScript", "Framer Motion"],
  image: "/image/blog/blog-sample-image.png",
  demoUrl: "http://localhost:5173",
  repoUrl: "https://github.com/manta-digital/manta-templates/tree/main/templates/react",
  features: [
    { 
      label: "Zero-configuration component usage", 
      icon: "zap", 
      color: "primary" as const 
    },
    { 
      label: "Background video without injection", 
      icon: "video", 
      color: "success" as const 
    },
    { 
      label: "Theme-aware components", 
      icon: "palette", 
      color: "info" as const 
    },
    {
      label: "TypeScript support throughout",
      icon: "code",
      color: "secondary" as const
    }
  ],
  actions: [
    { 
      label: "View Examples", 
      href: "/examples", 
      variant: "outline" as const 
    },
    {
      label: "View Source",
      href: "https://github.com/manta-digital/manta-templates/tree/main/templates/react",
      variant: "secondary" as const
    }
  ],
  status: "active" as const,
  category: "template" as const
};

export const showcaseProjects = [
  {
    title: "Video Components Demo",
    description: "StandardBackgroundVideo and StandardVideoPlayer in action",
    techStack: ["React", "HTML5 Video", "Autoplay Policies"],
    image: "/image/blog/blog-sample-image.png",
    demoUrl: "/examples#video-components",
    category: "component-demo" as const
  },
  {
    title: "Layout Components",
    description: "Container, GridLayout, BentoLayout working without injection",
    techStack: ["React", "Tailwind", "Responsive Design"],
    image: "/image/blog/blog-sample-image.png", 
    demoUrl: "/examples#layouts",
    category: "component-demo" as const
  },
  {
    title: "Card Components",
    description: "ProjectCard, ArticleCard, QuoteCard with standard HTML defaults",
    techStack: ["React", "Standard HTML", "Theme System"],
    image: "/images/cards-demo.png",
    demoUrl: "/examples#cards", 
    category: "component-demo" as const
  }
];
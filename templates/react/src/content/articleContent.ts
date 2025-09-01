export const featuredArticle = {
  title: "Building Framework-Agnostic React Components",
  description: "Learn how to create components that work seamlessly across React, Next.js, Electron, and other frameworks using dependency injection patterns.",
  excerpt: "Dependency injection isn't just for backend services. Frontend components can benefit from the same patterns, enabling true framework independence and maximum reusability.",
  content: "Full article content would go here...",
  author: {
    name: "Jane Developer",
    avatar: "/images/avatars/jane-developer.jpg",
    role: "Senior Frontend Engineer"
  },
  publishedAt: "2024-12-15",
  readingTime: "8 min read",
  tags: ["React", "Architecture", "Components", "Framework Agnostic"],
  image: "/image/blog/blog-sample-image.png",
  category: "Tutorial",
  slug: "building-framework-agnostic-react-components",
  featured: true,
  status: "published" as const
};

export const relatedArticles = [
  {
    title: "Mastering Video Autoplay Policies",
    description: "Navigate the complex world of browser autoplay restrictions with practical solutions for background video components.",
    excerpt: "Modern browsers have strict autoplay policies. Here's how to handle them gracefully while maintaining great user experience.", 
    author: {
      name: "Video Specialist",
      avatar: "/images/avatars/video-specialist.jpg",
      role: "Media Developer"
    },
    publishedAt: "2024-12-10",
    readingTime: "5 min read",
    tags: ["Video", "Browser APIs", "UX"],
    image: "/images/articles/video-autoplay-policies.jpg",
    category: "Technical Guide",
    slug: "mastering-video-autoplay-policies",
    status: "published" as const
  },
  {
    title: "TypeScript Best Practices for Component Libraries", 
    description: "Essential patterns for building type-safe, developer-friendly component APIs that scale across teams and projects.",
    excerpt: "TypeScript can make or break the developer experience of your component library. These patterns ensure both safety and usability.",
    author: {
      name: "TypeScript Expert", 
      avatar: "/images/avatars/typescript-expert.jpg",
      role: "Type System Architect"
    },
    publishedAt: "2024-12-05",
    readingTime: "12 min read",
    tags: ["TypeScript", "API Design", "DX"],
    image: "/images/articles/typescript-component-apis.jpg",
    category: "Best Practices",
    slug: "typescript-best-practices-component-libraries",
    status: "published" as const
  },
  {
    title: "Tailwind CSS v4: What's New for Component Authors",
    description: "Explore the latest features in Tailwind CSS v4 and how they improve the component authoring experience.",
    excerpt: "Tailwind CSS v4 brings CSS-first configuration, better performance, and improved developer experience for component libraries.",
    author: {
      name: "CSS Architecture Lead",
      avatar: "/images/avatars/css-architect.jpg", 
      role: "Styling Systems Expert"
    },
    publishedAt: "2024-11-28",
    readingTime: "6 min read",
    tags: ["Tailwind", "CSS", "Styling"],
    image: "/images/articles/tailwind-v4-components.jpg",
    category: "Framework Update",
    slug: "tailwind-css-v4-whats-new-component-authors",
    status: "published" as const
  }
];

export const draftArticles = [
  {
    title: "Advanced Pattern: Adaptive Component Injection",
    description: "Take dependency injection to the next level with adaptive patterns that automatically choose optimal implementations.",
    excerpt: "Components that adapt their behavior based on the runtime environment unlock new possibilities for cross-platform development.",
    author: {
      name: "Architecture Specialist",
      avatar: "/images/avatars/arch-specialist.jpg",
      role: "Principal Engineer" 
    },
    publishedAt: "2024-12-20", 
    readingTime: "15 min read",
    tags: ["Advanced", "Architecture", "Patterns"],
    image: "/images/articles/adaptive-component-injection.jpg",
    category: "Advanced Tutorial",
    slug: "advanced-pattern-adaptive-component-injection",
    status: "draft" as const
  }
];
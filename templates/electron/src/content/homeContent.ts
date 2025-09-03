export const homeContent = {
  hero: {
    title: "Electron Template",
    description: "Standard React template with ui-core components working without injection",
    subtitle: "Demonstrates framework-agnostic component usage in Vite + React environment",
    actions: [
      { 
        label: "View Examples", 
        href: "/examples",
        variant: "primary" as const
      }
    ]
  },
  features: [
    {
      title: "Zero Configuration",
      description: "UI-core components work out-of-the-box without dependency injection",
      icon: "zap"
    },
    {
      title: "Framework Agnostic", 
      description: "Same components work across Next.js, React, Electron, and more",
      icon: "layers"
    },
    {
      title: "Full Feature Set",
      description: "Complete video support, theming, and responsive design built-in",
      icon: "check-circle"
    }
  ],
  stats: {
    components: "25+",
    frameworks: "3+", 
    themes: "12+"
  }
};

export const pageMetadata = {
  title: "Electron Template | UI-Core Showcase",
  description: "Standard React template demonstrating ui-core components working without framework injection in Vite environment."
};
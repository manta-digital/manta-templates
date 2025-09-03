// Footer content for React template
import { FooterSections } from '../lib/ui-core/types/footer';

export const footerContent: FooterSections = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Examples', href: '/examples' }
  ],
  resources: [
    { label: 'manta-templates', href: 'https://github.com/manta-digital/manta-templates', external: true },
    { label: 'React', href: 'https://reactjs.org', external: true },
    { label: 'Vite', href: 'https://vitejs.dev', external: true },
    { label: 'Tailwind CSS', href: 'https://tailwindcss.com', external: true }
  ],
  legal: [
    { label: 'MIT License', href: 'https://opensource.org/licenses/MIT', external: true }
  ],
  socialProfessional: [
    { label: 'GitHub', href: 'https://github.com/', external: true }
  ],
  socialCommunity: [],
  primaryContact: {
    email: 'info@example.com'
  },
  professionalContact: {
    business: 'business@example.com',
    support: 'support@example.com'
  },
  copyright: {
    notice: '© 2025 manta.digital. MIT Licensed.',
    attribution: 'Built with <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>, and <a href="https://github.com/manta-digital/manta-templates" target="_blank" rel="noopener noreferrer">manta-templates</a>.',
    lastUpdated: 'September 2025'
  }
};
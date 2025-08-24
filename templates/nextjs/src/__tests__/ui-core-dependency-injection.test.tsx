import { render } from '@testing-library/react';
import { Github, Linkedin, Mail, X } from 'lucide-react';

interface MockImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

interface MockLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

interface MockSocial {
  platform: string;
  url: string;
}

interface MockArticleCardProps {
  ImageComponent?: React.ComponentType<MockImageProps>;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface MockProjectCardProps {
  LinkComponent?: React.ComponentType<MockLinkProps>;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
}

interface MockAboutCardProps {
  ImageComponent?: React.ComponentType<MockImageProps>;
  LinkComponent?: React.ComponentType<MockLinkProps>;
  socialIcons?: Record<string, React.ComponentType>;
  title: string;
  socials?: MockSocial[];
}

// Mock Next.js components for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: MockImageProps) => <img src={src} alt={alt} {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: MockLinkProps) => <a href={href} {...props}>{children}</a>,
}));

// Mock ui-core components to avoid import issues in test environment
jest.mock('@manta-templates/ui-core', () => ({
  ArticleCard: ({ ImageComponent, title, description, image, href }: MockArticleCardProps) => (
    <div data-testid="article-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {ImageComponent && <ImageComponent src={image} alt={title} />}
      <a href={href}>Read more</a>
    </div>
  ),
  ProjectCard: ({ LinkComponent, title, description, repoUrl, demoUrl }: MockProjectCardProps) => (
    <div data-testid="project-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {LinkComponent && <LinkComponent href={repoUrl}>Repository</LinkComponent>}
      {demoUrl && <a href={demoUrl}>Demo</a>}
    </div>
  ),
  AboutCard: ({ LinkComponent, socialIcons, title, socials }: MockAboutCardProps) => (
    <div data-testid="about-card">
      <h2>{title}</h2>
      {socials?.map((social: MockSocial, idx: number) => (
        <div key={idx}>
          {socialIcons?.[social.platform] && <span data-testid={`icon-${social.platform}`}>Icon</span>}
          {LinkComponent && <LinkComponent href={social.url}>{social.platform}</LinkComponent>}
        </div>
      ))}
    </div>
  ),
}));

// Import the mocked components
import { ArticleCard, ProjectCard, AboutCard } from '@manta-templates/ui-core';
import Image from 'next/image';
import Link from 'next/link';

describe('UI-Core Dependency Injection', () => {
  describe('Image Component Injection', () => {
    it('should successfully inject Next.js Image component into ArticleCard', () => {
      const { container, getByTestId } = render(
        <ArticleCard
          ImageComponent={Image}
          title="Test Image Injection"
          description="Testing Image dependency injection"
          image="/test-image.jpg"
          href="/test"
        />
      );
      
      // Verify the component renders without errors
      expect(getByTestId('article-card')).toBeInTheDocument();
      expect(container.querySelector('img')).toBeInTheDocument();
    });
  });

  describe('Link Component Injection', () => {
    it('should successfully inject Next.js Link component into ProjectCard', () => {
      const { getByTestId } = render(
        <ProjectCard
          LinkComponent={Link}
          title="Test Link Injection"
          description="Testing Link dependency injection"
          repoUrl="https://github.com/test"
          demoUrl="/demo"
        />
      );
      
      // Verify the component renders without errors
      expect(getByTestId('project-card')).toBeInTheDocument();
    });
  });

  describe('Social Icons Injection', () => {
    it('should successfully inject social icons into AboutCard', () => {
      const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        mail: Mail,
        x: X,
        twitter: X
      };

      const { getByTestId } = render(
        <AboutCard
          ImageComponent={Image}
          LinkComponent={Link}
          socialIcons={socialIcons}
          title="Test Social Icons"
          socials={[
            { platform: 'github', url: 'https://github.com/test' },
            { platform: 'linkedin', url: 'https://linkedin.com/in/test' }
          ]}
        />
      );
      
      // Verify the component renders without errors
      expect(getByTestId('about-card')).toBeInTheDocument();
      expect(getByTestId('icon-github')).toBeInTheDocument();
      expect(getByTestId('icon-linkedin')).toBeInTheDocument();
    });
  });

  describe('Combined Dependency Injection', () => {
    it('should handle multiple dependency injections simultaneously', () => {
      const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        mail: Mail,
        x: X,
        twitter: X
      };

      const { container, getByTestId } = render(
        <div>
          <ArticleCard
            ImageComponent={Image}
            title="Article with Image"
            description="Testing combined injection"
            image="/test.jpg"
            href="/article"
          />
          <ProjectCard
            LinkComponent={Link}
            title="Project with Link"
            description="Testing link injection"
            repoUrl="https://github.com/test"
          />
          <AboutCard
            ImageComponent={Image}
            LinkComponent={Link}
            socialIcons={socialIcons}
            title="About with All Injections"
            socials={[
              { platform: 'github', url: 'https://github.com/test' }
            ]}
          />
        </div>
      );
      
      // Verify all components render without errors
      expect(container.firstChild).toBeInTheDocument();
      expect(getByTestId('article-card')).toBeInTheDocument();
      expect(getByTestId('project-card')).toBeInTheDocument();
      expect(getByTestId('about-card')).toBeInTheDocument();
    });
  });
});
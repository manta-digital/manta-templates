import React from 'react';
import { cn } from '../../utils';
import { BaseCard } from './BaseCard';

interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  pubDate: string;
  thumbnail?: string;
  image?: string;
  heroImage?: string;
}

interface BlogIndexCardProps {
  /** Array of blog posts to display */
  posts: BlogPost[];
  /** Whether to display the mini version */
  mini?: boolean;
  /** Optional additional CSS classes for the container */
  className?: string;
  /** Maximum number of posts to display */
  postLimit?: number;
  /** Array of post slugs to exclude from display */
  excludeSlugs?: string[];
  /** The title text for the card header */
  title?: string;
  /** The href for the "View All" link */
  viewAllHref?: string;
  /** The text for the "View All" link */
  viewAllText?: string;
  /** Default image URL to use when post has no image */
  defaultImageUrl?: string;
  /** Function to generate post href from slug */
  generatePostHref?: (slug: string) => string;
  /** Image component for framework-specific optimization (e.g., Next.js Image) */
  ImageComponent?: React.ComponentType<any>;
  /** Link component for framework-specific routing (e.g., Next.js Link) */
  LinkComponent?: React.ComponentType<any>;
}

/**
 * A card component that displays a list of blog posts with thumbnails and metadata.
 * Designed to show recent blog posts in sidebar areas or content sections.
 * 
 * Framework-agnostic with dependency injection for Image and Link components.
 * Posts data must be provided as props, allowing flexible content loading strategies.
 */
const BlogIndexCard: React.FC<BlogIndexCardProps> = ({
  posts,
  mini = false,
  className,
  postLimit = 3,
  excludeSlugs = [],
  title = 'More Great Articles',
  viewAllHref = '/blog',
  viewAllText = 'View All Posts',
  defaultImageUrl = '/image/blog/blog-sample-image.png',
  generatePostHref = (slug) => `/blog/${slug}`,
  ImageComponent = 'img',
  LinkComponent = 'a',
}) => {
  // Filter and limit posts
  const filteredPosts = posts.filter(post => !excludeSlugs.includes(post.slug));
  const displayPosts = filteredPosts.slice(0, postLimit);

  const getPostImageUrl = (post: BlogPost): string => {
    return post.thumbnail || post.image || post.heroImage || defaultImageUrl;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const PostLink: React.FC<{ post: BlogPost; children: React.ReactNode }> = ({ post, children }) => {
    const href = generatePostHref(post.slug);
    
    if (typeof LinkComponent === 'string') {
      return (
        <a href={href} className="block p-3 rounded-lg hover:bg-[var(--color-accent-3)] dark:hover:bg-[var(--color-accent-4)] transition-colors">
          {children}
        </a>
      );
    }
    
    return (
      <LinkComponent href={href} className="block p-3 rounded-lg hover:bg-[var(--color-accent-3)] dark:hover:bg-[var(--color-accent-4)] transition-colors">
        {children}
      </LinkComponent>
    );
  };

  const ViewAllLink: React.FC = () => {
    if (typeof LinkComponent === 'string') {
      return (
        <a href={viewAllHref} className="pt-3 pl-2 text-sm font-semibold text-primary hover:underline flex items-center">
          {viewAllText}
        </a>
      );
    }
    
    return (
      <LinkComponent href={viewAllHref} className="pt-3 pl-2 text-sm font-semibold text-primary hover:underline flex items-center">
        {viewAllText}
      </LinkComponent>
    );
  };

  return (
    <BaseCard className={cn('h-full w-full flex flex-col', mini ? 'p-4' : 'p-6', className)}>
      {/* Header */}
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      {/* Posts List */}
      <div className="flex flex-col gap-2 -mx-2">
        {displayPosts.map(post => (
          <PostLink key={post.slug} post={post}>
            <div className="flex items-start gap-4">
              {/* Post Thumbnail */}
              <div className="relative shrink-0 w-20 h-20 aspect-square">
                {typeof ImageComponent === 'string' ? (
                  <img
                    src={getPostImageUrl(post)}
                    alt={`Thumbnail for ${post.title}`}
                    className="object-cover rounded-md w-full h-full"
                  />
                ) : (
                  <ImageComponent
                    src={getPostImageUrl(post)}
                    alt={`Thumbnail for ${post.title}`}
                    sizes="5rem"
                    fill
                    className="object-cover rounded-md"
                  />
                )}
              </div>
              
              {/* Post Content */}
              <div className="grow py-1">
                <h4 className="font-semibold mb-1 line-clamp-2">{post.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 hidden lg:block">
                  {formatDate(post.pubDate)}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 block lg:hidden">
                  {post.description}
                </p>
              </div>
            </div>
          </PostLink>
        ))}
      </div>
      
      {/* View All Link */}
      <ViewAllLink />
    </BaseCard>
  );
};

export { BlogIndexCard };
export type { BlogIndexCardProps, BlogPost };
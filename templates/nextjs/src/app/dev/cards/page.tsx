
import { BlogCard } from '@/components/cards';
import { BlogCard as BlogCardV2 } from '@/components/cards';
import { BaseCard as BaseCardV2 } from '@/components/cards';

import { BlogCardWide } from '@/components/cards';
import { BlogCardWide as BlogCardWideV2 } from '@/components/cards';
import { BlogCardImage } from '@/components/cards';
import {
  EnhancedBaseCard,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/cards/EnhancedBaseCard';

const samplePost = {
  title: 'The Power of Component-Based Architecture',
  date: '2024-05-21',
  excerpt: 'Discover how breaking down UIs into reusable components can streamline your development process, improve maintainability, and lead to more consistent user experiences across your applications.',
  coverImageUrl: '/image/blog-sample-image.png',
  author: 'Jane Doe',
  category: 'Web Development',
  slug: '/blog/sample-post',
};

export default function CardTestPage() {
  return (
    <div className="container mx-auto space-y-12 p-8">
      
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. BlogCard Migration</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Original BlogCard</h3>
            <BlogCard {...samplePost} className="w-full max-w-[400px]" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New BlogCardV2 (ShadCN)</h3>
            <BlogCardV2 {...samplePost} className="w-full max-w-[400px]" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Verification: `size` Prop</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Original: `size=&quot;sm&quot;`</h3>
            {/* @ts-expect-error migrate deprecated props */}
            <BaseCardV2 size="sm" className="w-full max-w-[400px]">
              <p>This card uses the `size=&quot;sm&quot;` prop for `p-4` padding.</p>
            </BaseCardV2>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New: `className=&quot;p-4&quot;`</h3>
            <BaseCardV2 className="w-full max-w-[400px] p-4">
              <p>This card uses the `p-4` utility class for padding.</p>
            </BaseCardV2>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. Verification: `variant` Prop</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Original: `variant=&quot;outlined&quot;`</h3>
            {/* @ts-expect-error migrate deprecated props */}
            <BaseCardV2 variant="outlined" className="w-full max-w-[400px]">
              <p>This card uses `variant=&quot;outlined&quot;` for a transparent background.</p>
            </BaseCardV2>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New: `className=&quot;bg-transparent&quot;`</h3>
            <BaseCardV2 className="w-full max-w-[400px] bg-transparent">
              <p>This card uses the `bg-transparent` utility class.</p>
            </BaseCardV2>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">4. BlogCardWide Migration</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Original BlogCardWide</h3>
            <BlogCardWide {...samplePost} />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New BlogCardWideV2</h3>
            <BlogCardWideV2 {...samplePost} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">5. BlogCardImage Migration</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Original BlogCardImage</h3>
            <BlogCardImage {...samplePost} />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New BlogCardImage</h3>
            <BlogCardImage {...samplePost} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">5b. BlogCardImage Dim + Blur Test</h2>
        <BlogCardImage {...samplePost} dim blur className="w-full max-w-[400px]" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">6. EnhancedBaseCard Variants</h2>
        <div className="space-y-8">
          
          <div>
            <h3 className="mb-4 font-semibold">Base Variant</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnhancedBaseCard size="sm">
                <CardHeader><CardTitle>Small</CardTitle></CardHeader>
                <CardContent><p>A small base card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard size="md">
                <CardHeader><CardTitle>Medium</CardTitle></CardHeader>
                <CardContent><p>A medium base card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard size="lg">
                <CardHeader><CardTitle>Large</CardTitle></CardHeader>
                <CardContent><p>A large base card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard size="xl">
                <CardHeader><CardTitle>Extra Large</CardTitle></CardHeader>
                <CardContent><p>An extra large base card.</p></CardContent>
              </EnhancedBaseCard>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Elevated Variant</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnhancedBaseCard variant="elevated" size="sm">
                <CardHeader><CardTitle>Small</CardTitle></CardHeader>
                <CardContent><p>A small elevated card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="elevated" size="md">
                <CardHeader><CardTitle>Medium</CardTitle></CardHeader>
                <CardContent><p>A medium elevated card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="elevated" size="lg">
                <CardHeader><CardTitle>Large</CardTitle></CardHeader>
                <CardContent><p>A large elevated card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="elevated" size="xl">
                <CardHeader><CardTitle>Extra Large</CardTitle></CardHeader>
                <CardContent><p>An extra large elevated card.</p></CardContent>
              </EnhancedBaseCard>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Bordered Variant (hover to see effect)</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnhancedBaseCard variant="bordered" size="sm">
                <CardHeader><CardTitle>Small</CardTitle></CardHeader>
                <CardContent><p>A small bordered card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="bordered" size="md">
                <CardHeader><CardTitle>Medium</CardTitle></CardHeader>
                <CardContent><p>A medium bordered card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="bordered" size="lg">
                <CardHeader><CardTitle>Large</CardTitle></CardHeader>
                <CardContent><p>A large bordered card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="bordered" size="xl">
                <CardHeader><CardTitle>Extra Large</CardTitle></CardHeader>
                <CardContent><p>An extra large bordered card.</p></CardContent>
              </EnhancedBaseCard>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Gradient Variant</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnhancedBaseCard variant="gradient" size="sm">
                <CardHeader><CardTitle>Small</CardTitle></CardHeader>
                <CardContent><p>A small gradient card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="gradient" size="md">
                <CardHeader><CardTitle>Medium</CardTitle></CardHeader>
                <CardContent><p>A medium gradient card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="gradient" size="lg">
                <CardHeader><CardTitle>Large</CardTitle></CardHeader>
                <CardContent><p>A large gradient card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="gradient" size="xl">
                <CardHeader><CardTitle>Extra Large</CardTitle></CardHeader>
                <CardContent><p>An extra large gradient card.</p></CardContent>
              </EnhancedBaseCard>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Interactive Variant (hover to see effect)</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnhancedBaseCard variant="interactive" size="sm">
                <CardHeader><CardTitle>Small</CardTitle></CardHeader>
                <CardContent><p>A small interactive card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="interactive" size="md">
                <CardHeader><CardTitle>Medium</CardTitle></CardHeader>
                <CardContent><p>A medium interactive card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="interactive" size="lg">
                <CardHeader><CardTitle>Large</CardTitle></CardHeader>
                <CardContent><p>A large interactive card.</p></CardContent>
              </EnhancedBaseCard>
              <EnhancedBaseCard variant="interactive" size="xl">
                <CardHeader><CardTitle>Extra Large</CardTitle></CardHeader>
                <CardContent><p>An extra large interactive card.</p></CardContent>
              </EnhancedBaseCard>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

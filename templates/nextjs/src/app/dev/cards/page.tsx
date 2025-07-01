import BaseCard from '@/components/cards/BaseCard';
import BlogCard from '@/components/cards/BlogCard';
import BlogCardV2 from '@/components/cards/BlogCardV2';
import { BaseCardV2, CardContent, CardHeader, CardTitle } from '@/components/cards/BaseCardV2';
import { BlogCardWide } from '@/components/cards/BlogCardWide';
import BlogCardWideV2 from '@/components/cards/BlogCardWideV2';

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
            <h3 className="mb-2 font-semibold">Original: `size="sm"`</h3>
            <BaseCard size="sm" className="w-full max-w-[400px]">
              <p>This card uses the `size="sm"` prop for `p-4` padding.</p>
            </BaseCard>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New: `className="p-4"`</h3>
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
            <h3 className="mb-2 font-semibold">Original: `variant="outlined"`</h3>
            <BaseCard variant="outlined" className="w-full max-w-[400px]">
              <p>This card uses `variant="outlined"` for a transparent background.</p>
            </BaseCard>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">New: `className="bg-transparent"`</h3>
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

    </div>
  );
}

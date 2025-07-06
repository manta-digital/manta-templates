import { BentoLayout } from '@/components/layouts/bento-layout';
import { BaseCard } from '@/components/cards';
import { cn } from '@/lib/utils';

const cardColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-amber-200',
  'bg-rose-200',
  'bg-indigo-200',
  'bg-pink-200',
  'bg-purple-200',
  'bg-orange-200',
  'bg-teal-200',
  'bg-lime-200',
  'bg-cyan-200',
  'bg-gray-200',
];

export default function BlogExamplePage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Layout Test</h1>

      <BentoLayout 
        columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
        rowHeight="minmax(180px,auto)"
        gap={6}
        className="max-w-7xl mx-auto"
      >
        {/* Item using BaseCard directly with span classes */}
        <BaseCard className={cn('col-span-full lg:col-span-2 justify-center', cardColors[0])}>
          <h3 className="font-semibold">Small Size (BaseCard)</h3>
          <p>Uses BaseCard with direct spans. Check updated spans from your recent edit in grid-item.tsx.</p>
        </BaseCard>

        {/* Item using direct colSpan/rowSpan strings - now BaseCard */}
        <BaseCard className={cn('col-span-full lg:col-span-4 justify-center', cardColors[1])}>
          <h3 className="font-semibold">Wide Direct Span (4x1) (BaseCard)</h3>
        </BaseCard>

        {/* Item with responsive colSpan and a longer content - now BaseCard */}
        <BaseCard className={cn('col-span-full lg:col-span-2 lg:row-span-3 justify-center', cardColors[2])}>
          <h3 className="font-semibold">Responsive Span &amp; Tall Content (BaseCard)</h3>
          <p>Base: full x 2. MD: 2x3</p>
          <p className="mt-2">This item has more content to test if the row expands correctly due to BentoLayout&apos;s &apos;minmax(6rem, auto)&apos; rowHeight. It shouldn&apos;t overlap if rowHeight auto works.</p>
          <p className="mt-auto text-sm">Footer text</p>
        </BaseCard>
        
        {/* Another item to see alignment with the tall item - now BaseCard */}
        <BaseCard className={cn('col-span-full lg:col-span-4 justify-center', cardColors[3])}>
          <h3 className="font-semibold">Wide Direct Span (4x1) (BaseCard)</h3>
        </BaseCard>

        <BaseCard className={cn('col-span-full lg:col-span-4 justify-center', cardColors[4])}>
          <h3 className="font-semibold">Wide Direct Span (4x1) (BaseCard)</h3>
        </BaseCard>

        <BaseCard className={cn('col-span-full lg:col-span-4 justify-center', cardColors[5])}>
          <h3 className="font-semibold">Wide Direct Span (4x1) (BaseCard)</h3>
        </BaseCard>

         {/* Item to fill remaining space - now BaseCard */}
        <BaseCard className={cn('col-span-full justify-center', cardColors[6])}>
           <h3 className="font-semibold">Full Width Item (Bottom) (BaseCard)</h3>
        </BaseCard>
      </BentoLayout>
    </main>
  );
}

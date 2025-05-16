import React from "react";
import { BentoLayout } from "@/components/layouts/bento-layout";
import BaseCard from "@/components/cards/BaseCard";

export default function BentoGridExample() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary break-words max-w-full leading-tight">Bento Grid Example</h1>
      <BentoLayout
        columns="grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
        rowHeight="minmax(180px,auto)"
        gap={6}
        className="max-w-7xl mx-auto"
      >
        {/* Hero block */}
        <BaseCard className="col-span-2 row-span-2 md:col-span-1 lg:col-span-2 justify-center items-start bg-linear-to-br from-purple-500 via-blue-500 to-indigo-500">
          <h2 className="text-2xl font-bold mb-2">Hero Block</h2>
          <p className="opacity-90">A visually prominent bento grid card.</p>
        </BaseCard>
        {/* Main content */}
        <BaseCard className="col-span-2 row-span-1 md:col-span-2 lg:col-span-4">
          <h3 className="text-xl font-semibold mb-1">Main Content</h3>
          <p>This card spans 4 columns.</p>
        </BaseCard>
        {/* Sidebar/Feature */}
        <BaseCard className="col-span-2 row-span-1 md:col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-1">Sidebar/Feature</h3>
          <p>Flexible placement for sidebar or feature content.</p>
        </BaseCard>
        {/* Info card */}
        <BaseCard className="col-span-2 row-span-1 md:col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-1">Info Card</h3>
          <p>Another bento block, same height as sidebar.</p>
        </BaseCard>
        {/* Tall card */}
        <BaseCard className="col-span-2 lg:col-span-4 row-span-2 justify-center items-center bg-linear-to-tr from-green-400 to-teal-500 text-white">
          <h3 className="text-xl font-semibold mb-2">Tall Card</h3>
          <p>Spans 2 rows for visual interest.</p>
        </BaseCard>
        <BaseCard className="col-span-2 row-span-2 md:col-span-1 lg:col-span-2 justify-center items-center bg-linear-to-tr from-teal-500 to-white text-black">
          <h3 className="text-xl font-semibold mb-2">Tall Card</h3>
          <p>Spans 2 rows for visual interest.</p>
        </BaseCard>
      </BentoLayout>
    </main>
  );
}

import React from "react";
import BentoGrid from "./BentoGrid";

export default function BentoGridExample() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary break-words max-w-full leading-tight">Bento Grid Example</h1>
      <BentoGrid />
    </main>
  );
}

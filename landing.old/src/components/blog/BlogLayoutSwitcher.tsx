"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * BlogLayoutSwitcher provides buttons to toggle between layout variants via URL query.
 * Supported variants: default, wide, image.
 */
export function BlogLayoutSwitcher() {
  const router = useRouter();
  const params = useSearchParams();
  const variant = params.get('layout') ?? 'default';

  const setVariant = (v: string) => {
    const newParams = new URLSearchParams(Array.from(params.entries()));
    if (v === 'default') {
      newParams.delete('layout');
    } else {
      newParams.set('layout', v);
    }
    router.push(`/blog?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-2 mb-4">
      {['default', 'wide', 'image'].map((v) => (
        <button
          key={v}
          onClick={() => setVariant(v)}
          className={cn(
            'px-3 py-1 rounded',
            variant === v ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          )}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}

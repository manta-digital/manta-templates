'use client';

import React from 'react';
import { CardCarousel2 } from '@manta-templates/ui-core';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BlogCard } from '@manta-templates/ui-core';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog data for testing
const sampleBlogData = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and how to build modern web applications with React and server-side rendering.",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    date: "2024-01-15",
    readTime: "5 min read",
    slug: "getting-started-nextjs"
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns", 
    excerpt: "Explore advanced TypeScript patterns and techniques to write more robust and maintainable code.",
    coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    date: "2024-01-10",
    readTime: "8 min read",
    slug: "advanced-typescript-patterns"
  },
  {
    id: 3,
    title: "Building Responsive Layouts",
    excerpt: "Master the art of creating responsive layouts that work beautifully across all device sizes.",
    coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    date: "2024-01-05",
    readTime: "6 min read",
    slug: "building-responsive-layouts"
  },
  {
    id: 4,
    title: "State Management in React",
    excerpt: "Compare different state management solutions in React and learn when to use each approach.",
    coverImageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    date: "2023-12-28",
    readTime: "7 min read",
    slug: "state-management-react"
  },
  {
    id: 5,
    title: "Performance Optimization Tips",
    excerpt: "Discover practical techniques to optimize your React applications for better performance.",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    date: "2023-12-20",
    readTime: "9 min read",
    slug: "performance-optimization"
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox",
    excerpt: "Understanding when to use CSS Grid versus Flexbox for your layout needs.",
    coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    date: "2023-12-15",
    readTime: "4 min read",
    slug: "css-grid-vs-flexbox"
  }
];

export default function TestCarousel2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            CardCarousel2 Test Page
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Testing the new CardCarousel2 component with dependency injection
          </p>
        </div>

        {/* Test 1: Single Card, Infinite, Autoplay */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Test 1: Single Card, Infinite Loop, Autoplay
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            One card visible (full width), infinite loop, autoplay enabled, no dot controls, actual images working.
          </p>
          
          <CardCarousel2
            visibleCards={{ mobile: 1, tablet: 1, desktop: 1 }}
            gap={0}
            infinite={true}
            autoPlay={3000}
            showArrows={true}
            showDots={false}
            enableSwipe={true}
            ButtonComponent={Button}
            ChevronLeftIcon={ChevronLeft}
            ChevronRightIcon={ChevronRight}
            MotionComponent={motion.div}
            className="h-80"
          >
            {sampleBlogData.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                coverImageUrl={post.coverImageUrl}
                date={post.date}
                ImageComponent={Image}
                LinkComponent={Link}
                className="h-full"
              />
            ))}
          </CardCarousel2>
        </section>

        {/* Test 2: Multiple Cards, Infinite, with Dots */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Test 2: Multiple Cards, Infinite, with Dots
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Multiple cards visible, infinite scroll, autoplay, with dot controls and pause/play.
          </p>
          
          <CardCarousel2
            visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={16}
            infinite={true}
            autoPlay={3000}
            showArrows={true}
            showDots={true}
            showControls={true}
            enableSwipe={true}
            ButtonComponent={Button}
            ChevronLeftIcon={ChevronLeft}
            ChevronRightIcon={ChevronRight}
            PlayIcon={Play}
            PauseIcon={Pause}
            MotionComponent={motion.div}
            className="h-80"
          >
            {sampleBlogData.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                coverImageUrl={post.coverImageUrl}
                date={post.date}
                ImageComponent={Image}
                LinkComponent={Link}
                className="h-full"
              />
            ))}
          </CardCarousel2>
        </section>

        {/* Test 3: Framework-Agnostic (No Injected Components) */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Test 3: Framework-Agnostic Mode
          </h2>
          <p className="text-gray-600 mb-6">
            Testing without injected components - should fall back to basic HTML elements.
          </p>
          
          <CardCarousel2
            visibleCards={{ mobile: 1, tablet: 2, desktop: 2 }}
            gap={24}
            infinite={false}
            autoPlay={0}
            showArrows={true}
            showDots={true}
            enableSwipe={true}
            className="h-80"
          >
            {sampleBlogData.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-gray-100 rounded-lg p-6 h-full border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-xs text-gray-500">{post.date} • {post.readTime}</span>
                </div>
              </div>
            ))}
          </CardCarousel2>
        </section>

        {/* Test 4: Mobile-First Responsive */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Test 4: Mobile-First Responsive
          </h2>
          <p className="text-gray-600 mb-6">
            Testing responsive behavior: 1 card on mobile, 3 on tablet, 4 on desktop.
          </p>
          
          <CardCarousel2
            visibleCards={{ mobile: 1, tablet: 3, desktop: 4 }}
            gap={12}
            infinite={true}
            autoPlay={0}
            showArrows={true}
            showDots={true}
            enableSwipe={true}
            ButtonComponent={Button}
            ChevronLeftIcon={ChevronLeft}
            ChevronRightIcon={ChevronRight}
            className="h-72"
          >
            {sampleBlogData.map((post) => (
              <div key={post.id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 h-full border border-blue-200">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-xs text-blue-600 font-medium">{post.readTime}</span>
                </div>
              </div>
            ))}
          </CardCarousel2>
        </section>

        {/* Test 5: Custom Styling and Min Height */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Test 5: Custom Styling and Min Height
          </h2>
          <p className="text-gray-600 mb-6">
            Testing custom styling with minimum height enforcement and custom gaps.
          </p>
          
          <CardCarousel2
            visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={32}
            infinite={false}
            autoPlay={0}
            showArrows={true}
            showDots={false}
            enableSwipe={true}
            minHeight="300px"
            ButtonComponent={Button}
            ChevronLeftIcon={ChevronLeft}
            ChevronRightIcon={ChevronRight}
            className="bg-gray-50 rounded-xl p-4"
            itemClassName="transform hover:scale-105 transition-transform duration-200"
          >
            {sampleBlogData.slice(0, 5).map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-6 h-full shadow-md border border-gray-200 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
              </div>
            ))}
          </CardCarousel2>
        </section>

        {/* Test Results Summary */}
        <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Test Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Features Tested:</h3>
              <ul className="space-y-1 text-blue-700">
                <li>✓ Dependency injection (Button, Icons, Motion)</li>
                <li>✓ Framework-agnostic fallbacks</li>
                <li>✓ Infinite scrolling</li>
                <li>✓ Auto-play with controls</li>
                <li>✓ Touch/swipe gestures</li>
                <li>✓ Responsive breakpoints</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Visual Features:</h3>
              <ul className="space-y-1 text-blue-700">
                <li>✓ Navigation arrows</li>
                <li>✓ Dot indicators</li>
                <li>✓ Custom spacing and gaps</li>
                <li>✓ Min height enforcement</li>
                <li>✓ Smooth animations</li>
                <li>✓ Custom styling support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
import React from 'react';

/**
 * Reusable loading and error state components for background types
 */

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({ message = "Loading...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`absolute inset-0 bg-gray-100 animate-pulse ${className}`}>
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
}

interface ErrorDisplayProps {
  icon: string;
  message: string;
  className?: string;
}

export function ErrorDisplay({ icon, message, className = "" }: ErrorDisplayProps) {
  return (
    <div className={`absolute inset-0 bg-gray-100 ${className}`}>
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
}

// Specialized loading states for different background types
export function ImageLoadingState({ className }: { className?: string }) {
  return <LoadingSpinner message="Loading image..." className={className} />;
}

export function VideoLoadingState({ className }: { className?: string }) {
  return <LoadingSpinner message="Loading video..." className={className} />;
}

export function SlideLoadingState({ className }: { className?: string }) {
  return <LoadingSpinner message="Loading slide..." className={className} />;
}

// Specialized error states for different background types
export function ImageErrorState({ className }: { className?: string }) {
  return (
    <ErrorDisplay
      icon="📷"
      message="Failed to load background image"
      className={className}
    />
  );
}

export function VideoErrorState({ className }: { className?: string }) {
  return (
    <ErrorDisplay
      icon="🎬"
      message="Failed to load background video"
      className={className}
    />
  );
}
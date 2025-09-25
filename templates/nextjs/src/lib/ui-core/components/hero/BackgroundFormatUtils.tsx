'use client';

import { useMemo } from 'react';

/**
 * Utility functions and hooks for detecting supported background formats
 */

// Support for modern image formats
export const useImageFormatSupport = () => {
  const supportsWebP = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  const supportsAVIF = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }, []);

  return { supportsWebP, supportsAVIF };
};

// Video format support detection
export const useVideoFormatSupport = () => {
  const supportedVideoFormat = useMemo(() => {
    if (typeof window === 'undefined') return 'mp4';

    const video = document.createElement('video');
    if (video.canPlayType('video/webm; codecs="vp9"')) {
      return 'webm';
    } else if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      return 'mp4';
    }
    return 'mp4'; // fallback
  }, []);

  return { supportedVideoFormat };
};

// Check if device is mobile for optimization
export const useMobileDetection = () => {
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  return { isMobile };
};

// Motion preferences detection
export const useMotionPreferences = () => {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return { prefersReducedMotion };
};

// Optimize image URL based on format support
export const optimizeImageUrl = (
  originalUrl: string,
  supportsWebP: boolean,
  supportsAVIF: boolean
): string => {
  let imageUrl = originalUrl;

  // Basic format optimization - replace extensions if modern formats are supported
  if (supportsAVIF && imageUrl.includes('.jpg')) {
    imageUrl = imageUrl.replace('.jpg', '.avif');
  } else if (supportsAVIF && imageUrl.includes('.png')) {
    imageUrl = imageUrl.replace('.png', '.avif');
  } else if (supportsWebP && imageUrl.includes('.jpg')) {
    imageUrl = imageUrl.replace('.jpg', '.webp');
  } else if (supportsWebP && imageUrl.includes('.png')) {
    imageUrl = imageUrl.replace('.png', '.webp');
  }

  return imageUrl;
};

// Optimize video URL based on format support and device
export const optimizeVideoUrl = (
  originalUrl: string,
  supportedVideoFormat: string,
  isMobile: boolean,
  fallbackImage?: string
): string | null => {
  // On mobile, try to use fallback image if available
  if (isMobile && fallbackImage) {
    return null; // Will fallback to image on mobile
  }

  // Basic format optimization - replace extensions if better formats are supported
  if (supportedVideoFormat === 'webm' && originalUrl.includes('.mp4')) {
    const webmUrl = originalUrl.replace('.mp4', '.webm');
    return webmUrl;
  }

  return originalUrl;
};
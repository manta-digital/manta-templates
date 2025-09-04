import type { ComponentType } from 'react';

/**
 * Type for image components that works with both regular img tags and Next.js Image component
 */
export type ImageComponentType = ComponentType<any> | string;

/**
 * Type for link components that works with both regular anchor tags and Next.js Link component
 */
export type LinkComponentType = ComponentType<any> | string;

/**
 * Type for video components that works with framework-specific video components
 */
export type VideoComponentType = ComponentType<any>;
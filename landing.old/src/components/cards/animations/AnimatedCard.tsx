'use client';

import * as React from 'react';
import { motion, Variants, HTMLMotionProps, useReducedMotion } from 'framer-motion';

type AnimationVariant = 'fade-in' | 'slide-up' | 'scale-in';

export interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  /** Enable or disable animations */
  enabled?: boolean;
  /** Entry/exit animation variant */
  variant?: AnimationVariant;
  /** Animation duration in seconds */
  duration?: number;
  /** Stagger child elements before animating */
  staggerChildren?: boolean;
}

const cardAnimationVariants: Record<AnimationVariant, Variants> = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  'scale-in': {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

export function AnimatedCard({
  enabled = false,
  variant = 'fade-in',
  duration = 0.3,
  staggerChildren = false,
  className,
  children,
  ...props
}: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enabled && !shouldReduceMotion;
  const variants = cardAnimationVariants[variant];
  const transition = {
    duration,
    when: staggerChildren ? 'beforeChildren' : undefined,
    staggerChildren: staggerChildren ? 0.1 : undefined,
  };

  return (
    <motion.div
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate="visible"
      exit={shouldAnimate ? 'hidden' : 'visible'}
      variants={variants}
      transition={shouldAnimate ? transition : {}}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

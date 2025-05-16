"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export default function MotionArticle({ children, className, ...props }: HTMLMotionProps<'article'>) {
  return (
    <motion.article className={className} {...props}>
      {children}
    </motion.article>
  );
}

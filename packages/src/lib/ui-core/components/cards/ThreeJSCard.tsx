"use client";

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { BaseCard } from './BaseCard';

export interface ThreeJSCardProps {
  className?: string;
  /** Theme mode - can be injected from any theme system */
  theme?: 'light' | 'dark';
  /** Custom background color (overrides theme when variant is 'card') */
  backgroundColor?: number;
  /**
   * Display mode:
   * - 'blend' renders a transparent canvas that blends into surroundings, no border or wrapper
   * - 'card' renders inside a standard card with rounded border and theme background
   */
  variant?: 'blend' | 'card';
}

const ThreeJSCard: React.FC<ThreeJSCardProps> = ({ 
  className = '', 
  theme = 'light',
  backgroundColor,
  variant = 'blend'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      // Use alpha so CSS background (card or page) shows through and matches theme perfectly
      alpha: true
    });
    const canvas = canvasRef.current!;
    
    // Always transparent so the CSS background handles light/dark and border radii
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Use CSS sizing (w-full h-full), so disable style updates
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    const scene = new THREE.Scene();
    // Let CSS background show through for both variants
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      // Update drawing buffer only, CSS handles canvas sizing
      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, backgroundColor, variant]);

  const CanvasEl = (
    <canvas
      ref={canvasRef}
      className={`${className} w-full h-full block`}
    />
  );

  if (variant === 'card') {
    // Force card background to follow theme instead of default card styling that may be light in dark mode
    return (
      <BaseCard className={`h-full p-3 overflow-hidden rounded-lg bg-background border-border`}>{CanvasEl}</BaseCard>
    );
  }

  return CanvasEl;
};

export { ThreeJSCard };
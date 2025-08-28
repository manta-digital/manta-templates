"use client";

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/themecontext';

export interface ThreeJSCardProps {
  className?: string;
}

const ThreeJSCard: React.FC<ThreeJSCardProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    const canvas = canvasRef.current!;
    const bgColor = theme === 'dark' ? 0x000000 : 0xffffff;
    renderer.setClearColor(bgColor);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Use CSS sizing (w-full h-full), so disable style updates
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);

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
  }, [theme]);

  return <canvas ref={canvasRef} className={`${className} w-full h-full block p-1`} />;
};

export default ThreeJSCard;

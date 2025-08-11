'use client';

import React, { useRef, useEffect } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  BufferAttribute,
  Vector3,
  Mesh,
  AmbientLight,
  DirectionalLight,
} from 'three';

/**
 * Animated cosine-terrain renderer using Three.js.
 * Exposes tuning props for frequency, amplitude, tiling, and performance.
 */
export interface CosineTerrainCardProps {
  className?: string;
  /** phase seed for cosine fields */
  seed?: number;
  /** camera forward speed (world units/sec) */
  speed?: number;
  /** baseline camera height above sampled terrain */
  cameraHeight?: number;
  /** spatial frequency of cosine fields (radians per unit) */
  terrainFrequency?: number;
  /** base amplitude for height field */
  terrainAmplitude?: number;
  /** mesh segments per tile edge (>=1) */
  meshResolution?: number;
  /** horizontal tile count (used if dynamic disabled) */
  tilesX?: number;
  /** depth (Z) tile count */
  tilesZ?: number;
  /** camera field of view in degrees */
  fov?: number;
  /** world size of a tile edge */
  terrainScale?: number;
  /** height combination equation */
  terrainEquation?: 'multiplicative' | 'additive';
  xAmplitudeMultiplier?: number;
  zAmplitudeMultiplier?: number;
  enableAmplitudeVariation?: boolean;
  amplitudeVariationFrequency?: number;
  amplitudeVariationIntensity?: number;
  showFPS?: boolean;
  followTerrain?: boolean;
  lookAheadDistance?: number;
  lookAtHeight?: number;
  heightVariation?: number;
  heightVariationFrequency?: number;
  terrainQuality?: 0 | 1 | 2;
  enableDynamicTilesX?: boolean;
  cameraFarPlane?: number;
  showTerrainLogs?: boolean;
  // Material / render
  materialColor?: number;
  wireframe?: boolean;
  materialType?: 'basic' | 'standard';
  /** quick preset for material look */
  renderPreset?: 'wireframe' | 'solid';
  // Rendering perf
  maxPixelRatio?: number;
  // Limits
  maxTilesX?: number;
  /** renderer clear color; pass 'transparent' via backgroundAlpha */
  backgroundColor?: number | string;
  /** clear alpha 0..1; 0 = transparent */
  backgroundAlpha?: number;
  /** material opacity 0..1 (sets material.transparent) */
  materialOpacity?: number;
}

const CosineTerrainCard: React.FC<CosineTerrainCardProps> = ({
  className,
  seed = 0,
  speed = 2400,
  cameraHeight = 3600,
  terrainFrequency = 0.000113,
  terrainAmplitude = 2400,
  meshResolution = 8,
  tilesX = 20,
  tilesZ = 65,
  fov = 60,
  terrainScale = 2048,
  terrainEquation = 'multiplicative',
  xAmplitudeMultiplier = 1.2,
  zAmplitudeMultiplier = 1.0,
  enableAmplitudeVariation = true,
  amplitudeVariationFrequency = 0.000233,
  amplitudeVariationIntensity = 1.73,
  showFPS = true,
  followTerrain = true,
  lookAheadDistance = 8100,
  lookAtHeight = 1024,
  heightVariation = 0,
  heightVariationFrequency = 0.25,
  terrainQuality = 2,
  enableDynamicTilesX = true,
  cameraFarPlane = 28000,
  showTerrainLogs = false,
  materialColor = 0x00cf8f,
  wireframe = true,
  materialType = 'basic',
  renderPreset = 'wireframe',
  maxPixelRatio = 2,
  maxTilesX = 96,
  backgroundColor,
  backgroundAlpha = 1,
  materialOpacity = 1,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const TILE_RECYCLING_THRESHOLD = 3.5;
  const TILE_BUFFER_DISTANCE = 1.5;
  const GAP_DETECTION_ENABLED = false;
  const MAX_TILES_PER_FRAME_RECYCLE = 5;

  const calculateOptimalTilesX = (viewportWidth: number, viewportHeight: number): number => {
    const viewWidth = 2 * Math.tan((fov * Math.PI / 180) / 2) * cameraFarPlane;
    const baselineTiles = Math.ceil(viewWidth / terrainScale);
    const aspectRatio = viewportWidth / viewportHeight;
    const aspectAdjustedTiles = Math.round(baselineTiles * Math.max(1, aspectRatio));
    const finalTileCount = Math.min(Math.max(aspectAdjustedTiles, 1), Math.max(1, maxTilesX));
    if (showTerrainLogs && process.env.NODE_ENV !== 'production') {
      console.log('🔧 Tile Calculation Debug:', {
        viewportSize: `${viewportWidth}×${viewportHeight}px`,
        aspectRatio: aspectRatio.toFixed(2),
        fov: `${fov}°`,
        cameraFarPlane: cameraFarPlane,
        terrainScale: terrainScale,
        viewWidth: `${viewWidth.toFixed(0)} world units`,
        baselineTiles: `${baselineTiles} tiles (geometric baseline)`,
        aspectAdjustedTiles: `${aspectAdjustedTiles} tiles (after aspect)`,
        finalTileCount: `${finalTileCount} tiles`,
      });
    }
    return finalTileCount;
  };

  const validateTerrainFrequency = (frequency: number): void => {
    const wavelength = (2 * Math.PI) / frequency;
    const tileWavelengthRatio = wavelength / terrainScale;
    const fractionalPart = tileWavelengthRatio % 1;
    if (fractionalPart > 0.2 && fractionalPart < 0.8 && process.env.NODE_ENV !== 'production') {
      console.warn(
        `Terrain frequency ${frequency} may cause tile boundary artifacts. ` +
          `Wavelength/tile ratio: ${tileWavelengthRatio.toFixed(2)}. ` +
          `Consider frequencies that create integer or half-integer ratios.`,
      );
    }
  };

  validateTerrainFrequency(terrainFrequency);

  useEffect(() => {
    if (!mountRef.current) return;
    mountRef.current.innerHTML = '';
    let frameId: number;

    const actualTilesX = enableDynamicTilesX
      ? calculateOptimalTilesX(mountRef.current.clientWidth, mountRef.current.clientHeight)
      : tilesX;

    const cameraNearPlane = 0.1;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      fov,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      cameraNearPlane,
      cameraFarPlane,
    );
    camera.position.y = cameraHeight;
    const renderer = new WebGLRenderer({ antialias: true });
    // Pixel ratio: keep it stable to avoid periodic GC/surface reallocations
    const devicePR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const pixelRatio = Math.min(Math.max(1, devicePR), Math.max(1, maxPixelRatio));
    renderer.setPixelRatio(pixelRatio);
    if (backgroundColor !== undefined) {
      renderer.setClearColor(backgroundColor as any, Math.max(0, Math.min(1, backgroundAlpha)));
    } else {
      renderer.setClearColor(0x000000, Math.max(0, Math.min(1, backgroundAlpha)));
    }
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Optional simple lighting for solid shading
    if (renderPreset === 'solid') {
      const amb = new AmbientLight(0xffffff, 0.35);
      const dir = new DirectionalLight(0xffffff, 0.9);
      dir.position.set(1, 2, 1).normalize();
      scene.add(amb);
      scene.add(dir);
    }

    // Create material per configuration
    const createMaterial = () => {
      const finalWireframe = renderPreset === 'solid' ? false : wireframe;
      const common = { color: materialColor, wireframe: finalWireframe } as const;
      const transparent = materialOpacity < 1;
      const opacity = Math.max(0, Math.min(1, materialOpacity));
      if (materialType === 'standard' || renderPreset === 'solid') {
        return new MeshStandardMaterial({
          color: common.color,
          wireframe: common.wireframe,
          metalness: 0.1,
          roughness: 0.9,
          transparent,
          opacity,
        });
      }
      return new MeshBasicMaterial({ ...common, transparent, opacity });
    };

    const material = createMaterial();

    const terrainTiles: Mesh[] = [];

    const detectAndFillGaps = () => {
      if (!GAP_DETECTION_ENABLED) return;
      const cameraZ = camera.position.z;
      const frontmostZ = cameraZ - TILE_BUFFER_DISTANCE * terrainScale;
      const tilesInFront = terrainTiles.filter(
        (tile) => tile.position.z <= frontmostZ && tile.position.z >= frontmostZ - tilesZ * terrainScale,
      );
      const expectedTilesInFront = Math.min(tilesZ, Math.ceil(TILE_BUFFER_DISTANCE * 2));
      if (tilesInFront.length < expectedTilesInFront * 0.8) {
        const frontmostTile = terrainTiles.reduce((front, tile) => (tile.position.z < front.position.z ? tile : front));
        const emergencyTileZ = frontmostTile.position.z - terrainScale;
        const emergencyTileX = 0;
        console.warn(`Gap detected! Creating emergency tile at Z: ${emergencyTileZ}`);
        terrainTiles.push(generateTerrainTile(emergencyTileX, emergencyTileZ / terrainScale));
      }
    };

    const calculateTerrainHeight = (worldX: number, worldZ: number): number => {
      const cosX = Math.cos(worldX * terrainFrequency + seed);
      const cosZ = Math.cos(worldZ * terrainFrequency + seed);
      let localAmplitude = terrainAmplitude;
      if (enableAmplitudeVariation) {
        const amplitudeNoise =
          Math.sin(worldX * amplitudeVariationFrequency + seed * 0.7) *
          Math.cos(worldZ * amplitudeVariationFrequency + seed * 1.3);
        const amplitudeVariationFactor = 1 + amplitudeNoise * amplitudeVariationIntensity;
        localAmplitude *= amplitudeVariationFactor;
      }
      return terrainEquation === 'additive'
        ? (xAmplitudeMultiplier * cosX + zAmplitudeMultiplier * cosZ) * localAmplitude * 0.5
        : xAmplitudeMultiplier * cosX * (zAmplitudeMultiplier * cosZ) * localAmplitude;
    };

    const generateTerrainTile = (tileX: number, tileZ: number) => {
      const safeMeshResolution = Math.max(1, Math.floor(meshResolution));
      const resolution = terrainQuality >= 1 ? safeMeshResolution : Math.max(1, safeMeshResolution - 1);
      const geometry = new PlaneGeometry(terrainScale, terrainScale, resolution, resolution);
      geometry.rotateX(-Math.PI / 2);
      const positions = geometry.attributes.position as BufferAttribute;
      const vertex = new Vector3();
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const worldX = terrainQuality >= 1 ? tileX * terrainScale + vertex.x : vertex.x + tileX * terrainScale;
        const worldZ = terrainQuality >= 1 ? tileZ * terrainScale + vertex.z : vertex.z + tileZ * terrainScale;
        const y = calculateTerrainHeight(worldX, worldZ);
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      const mesh = new Mesh(geometry, material);
      mesh.position.set(tileX * terrainScale, 0, tileZ * terrainScale);
      scene.add(mesh);
      return mesh;
    };

    const regenerateTileGeometry = (tile: Mesh, newTileX: number, newTileZ: number) => {
      if (terrainQuality < 2) return;
      const geometry = tile.geometry as PlaneGeometry;
      const positions = geometry.attributes.position as BufferAttribute;
      const vertex = new Vector3();
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const worldX = newTileX * terrainScale + vertex.x;
        const worldZ = newTileZ * terrainScale + vertex.z;
        const y = calculateTerrainHeight(worldX, worldZ);
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    };

    for (let i = 0; i < actualTilesX; i++) {
      for (let j = 0; j < tilesZ; j++) {
        terrainTiles.push(generateTerrainTile(i - Math.floor(actualTilesX / 2), j - tilesZ));
      }
    }

    const sampleTerrainHeight = (worldX: number, worldZ: number): number => {
      if (terrainQuality >= 2) {
        return calculateTerrainHeight(worldX, worldZ);
      }
      let closestTile: Mesh | null = null;
      let minDistance = Infinity;
      for (const tile of terrainTiles) {
        const dx = worldX - tile.position.x;
        const dz = worldZ - tile.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const halfScale = terrainScale / 2;
        if (Math.abs(dx) <= halfScale && Math.abs(dz) <= halfScale) {
          closestTile = tile;
          break;
        }
        if (distance < minDistance) {
          minDistance = distance;
          closestTile = tile;
        }
      }
      if (!closestTile) return calculateTerrainHeight(worldX, worldZ);
      const localX = worldX - closestTile.position.x;
      const localZ = worldZ - closestTile.position.z;
      const u = (localX + terrainScale / 2) / terrainScale;
      const v = (localZ + terrainScale / 2) / terrainScale;
      const geometry = closestTile.geometry as PlaneGeometry;
      const positions = geometry.attributes.position as BufferAttribute;
      const resolution = terrainQuality >= 1 ? meshResolution : meshResolution - 1;
      const segmentsX = resolution;
      const segmentsZ = resolution;
      const gridX = u * segmentsX;
      const gridZ = v * segmentsZ;
      const x0 = Math.floor(gridX);
      const z0 = Math.floor(gridZ);
      const x1 = Math.min(x0 + 1, segmentsX);
      const z1 = Math.min(z0 + 1, segmentsZ);
      const fx = gridX - x0;
      const fz = gridZ - z0;
      const getHeightAt = (x: number, z: number) => {
        const index = z * (segmentsX + 1) + x;
        return index < positions.count ? positions.getY(index) : 0;
      };
      const h00 = getHeightAt(x0, z0);
      const h10 = getHeightAt(x1, z0);
      const h01 = getHeightAt(x0, z1);
      const h11 = getHeightAt(x1, z1);
      const h0 = h00 * (1 - fx) + h10 * fx;
      const h1 = h01 * (1 - fx) + h11 * fx;
      const height = h0 * (1 - fz) + h1 * fz;
      return height;
    };

    const onWindowResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Fast resume when tab/window becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Reset timing to avoid a huge delta after resume
        lastTime = performance.now();
        // Regenerate all tile geometries immediately for a fully drawn surface
        for (const tile of terrainTiles) {
          const tileX = tile.position.x / terrainScale;
          const tileZ = tile.position.z / terrainScale;
          // For consistent visuals across qualities, always refresh positions/normals
          const geometry = tile.geometry as PlaneGeometry;
          const positions = geometry.attributes.position as BufferAttribute;
          const vertex = new Vector3();
          for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);
            const worldX = tileX * terrainScale + vertex.x;
            const worldZ = tileZ * terrainScale + vertex.z;
            const y = calculateTerrainHeight(worldX, worldZ);
            positions.setY(i, y);
          }
          positions.needsUpdate = true;
          geometry.computeVertexNormals();
          geometry.attributes.position.needsUpdate = true;
        }
        // Render a frame immediately after regeneration
        renderer.render(scene, camera);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let frameCount = 0;
    let fpsLastTime = performance.now();
    let currentFPS = 0;
    let fpsElement: HTMLDivElement | null = null;
    if (showFPS) {
      fpsElement = document.createElement('div');
      fpsElement.style.position = 'absolute';
      fpsElement.style.top = '10px';
      fpsElement.style.left = '10px';
      fpsElement.style.color = '#00ff00';
      fpsElement.style.fontFamily = 'monospace';
      fpsElement.style.fontSize = '16px';
      fpsElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
      fpsElement.style.padding = '5px';
      fpsElement.style.borderRadius = '3px';
      fpsElement.style.zIndex = '1000';
      fpsElement.textContent = 'FPS: --';
      mountRef.current.style.position = 'relative';
      mountRef.current.appendChild(fpsElement);
    }

    let lastTime = performance.now();
    const animate = (nowHighRes?: number) => {
      frameId = requestAnimationFrame(animate);
      const now = typeof nowHighRes === 'number' ? nowHighRes : performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (showFPS && fpsElement) {
        frameCount++;
        if (now - fpsLastTime >= 1000) {
          currentFPS = Math.round((frameCount * 1000) / (now - fpsLastTime));
          fpsElement.textContent = `FPS: ${currentFPS}`;
          frameCount = 0;
          fpsLastTime = now;
        }
      }
      camera.position.z -= delta * speed;
      if (followTerrain) {
        const currentTerrainHeight = sampleTerrainHeight(camera.position.x, camera.position.z);
        const timeVariation = Math.sin(now * 0.001 * heightVariationFrequency) * heightVariation;
        camera.position.y = currentTerrainHeight + cameraHeight + timeVariation;
        const lookAheadX = camera.position.x;
        const lookAheadZ = camera.position.z - lookAheadDistance;
        const lookAheadTerrainHeight = sampleTerrainHeight(lookAheadX, lookAheadZ);
        const lookAtPoint = new Vector3(lookAheadX, lookAheadTerrainHeight + lookAtHeight, lookAheadZ);
        camera.lookAt(lookAtPoint);
      } else {
        camera.position.y = cameraHeight;
      }
      let recycledThisFrame = 0;
      const nowMs = now;
      if (showTerrainLogs && process.env.NODE_ENV !== 'production') {
        const shouldLog = Math.floor(nowMs / 5000) !== Math.floor((nowMs - delta * 1000) / 5000);
        if (shouldLog) {
          const timeSeconds = Math.floor(nowMs / 1000);
          const cameraZTile = Math.round(camera.position.z / terrainScale);
          const allTileZ = terrainTiles.map((t) => Math.round(t.position.z / terrainScale));
          const minZ = Math.min(...allTileZ);
          const maxZ = Math.max(...allTileZ);
          console.log(
            `T=${timeSeconds}s: Camera Z=${camera.position.z.toFixed(0)} (tile ${cameraZTile}), Tiles: ${terrainTiles.length}`,
          );
          console.log(`  Terrain coverage: tiles ${minZ} to ${maxZ} (span: ${maxZ - minZ + 1} tiles)`);
        }
      }
      // Limit recycle checks; tiles far from the recycle boundary can be skipped
      for (const tile of terrainTiles) {
        if (recycledThisFrame >= MAX_TILES_PER_FRAME_RECYCLE) break;
        const recycleThreshold = terrainScale * TILE_RECYCLING_THRESHOLD;
        const distanceBehindCamera = tile.position.z - camera.position.z;
        if (distanceBehindCamera > recycleThreshold) {
          const newTileZ = tile.position.z - terrainScale * tilesZ;
          const tileX = tile.position.x / terrainScale;
          const tileZ = newTileZ / terrainScale;
          tile.position.set(tileX * terrainScale, 0, tileZ * terrainScale);
          recycledThisFrame++;
          if (terrainQuality >= 2) {
            regenerateTileGeometry(tile, tileX, tileZ);
          }
        }
      }
      detectAndFillGaps();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      const currentMountRef = mountRef.current;
      if (currentMountRef) {
        currentMountRef.innerHTML = '';
      }
      renderer.dispose();
      terrainTiles.forEach((tile) => {
        tile.geometry.dispose();
      });
      material.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className={className} />;
};

export default CosineTerrainCard;



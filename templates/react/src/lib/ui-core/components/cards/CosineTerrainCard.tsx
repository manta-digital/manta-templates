'use client';

import React, { useRef, useEffect, useState } from 'react';
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
import type { ColorRepresentation } from 'three';
import { BaseCard } from './BaseCard';
import { cn } from '../../utils/cn';
import { resolveThemeColor } from '../../utils/color-resolution';


/**
 * Animated cosine-terrain renderer using Three.js.
 * Exposes tuning props for frequency, amplitude, tiling, and performance.
 */
export interface CosineTerrainCardProps {
  className?: string;
  /** Display variant: 'raw' for canvas only, 'card' for BaseCard wrapper */
  variant?: 'raw' | 'card';
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
  /** wireframe/material color; supports theme CSS custom properties (e.g. 'var(--color-accent-11)') */
  materialColor?: number | string;
  wireframe?: boolean;
  materialType?: 'basic' | 'standard';
  /** quick preset for material look */
  renderPreset?: 'wireframe' | 'solid';
  // Rendering perf
  maxPixelRatio?: number;
  // Limits
  maxTilesX?: number;
  /** renderer clear color; supports theme CSS custom properties (e.g. 'var(--color-background)'); pass 'transparent' via backgroundAlpha */
  backgroundColor?: number | string;
  /** clear alpha 0..1; 0 = transparent */
  backgroundAlpha?: number;
  /** material opacity 0..1 (sets material.transparent) */
  materialOpacity?: number;
  /** per-frame recycle scan chunk size */
  recycleChunkSize?: number;
  /** grouped settings (merged with individual props; individual props win) */
  settings?: Partial<SettingsGroups & CosineTerrainCardProps>;
}

// Structured settings groups for readability (optional via `settings`)
export interface CameraSettings {
  speed?: number;
  cameraHeight?: number;
  fov?: number;
  cameraFarPlane?: number;
  followTerrain?: boolean;
  lookAheadDistance?: number;
  lookAtHeight?: number;
  heightVariation?: number;
  heightVariationFrequency?: number;
}
export interface TerrainSettings {
  terrainScale?: number;
  terrainFrequency?: number;
  terrainAmplitude?: number;
  terrainEquation?: 'multiplicative' | 'additive';
  xAmplitudeMultiplier?: number;
  zAmplitudeMultiplier?: number;
  enableAmplitudeVariation?: boolean;
  amplitudeVariationFrequency?: number;
  amplitudeVariationIntensity?: number;
}
export interface TilingSettings {
  tilesX?: number;
  tilesZ?: number;
  meshResolution?: number;
  enableDynamicTilesX?: boolean;
  maxTilesX?: number;
}
export interface MaterialSettings {
  renderPreset?: 'wireframe' | 'solid';
  materialType?: 'basic' | 'standard';
  materialColor?: number | string;
  materialOpacity?: number;
  /** PBR: 0..1 */
  metalness?: number;
  /** PBR: 0..1 */
  roughness?: number;
}
export interface BackgroundSettings {
  backgroundColor?: number | string;
  backgroundAlpha?: number;
}
export interface PerfSettings {
  maxPixelRatio?: number;
  recycleChunkSize?: number;
  showFPS?: boolean;
  showTerrainLogs?: boolean;
  /** optional override for tilesX limit when dynamic tiling is enabled */
  maxTilesX?: number;
}

export interface LightingSettings {
  ambientColor?: number | string;
  ambientIntensity?: number;
}

// Public settings groups type for consumers of `settings`
export interface SettingsGroups {
  camera: CameraSettings;
  terrain: TerrainSettings;
  tiling: TilingSettings;
  material: MaterialSettings;
  background: BackgroundSettings;
  perf: PerfSettings;
  lighting: LightingSettings;
}

const DEFAULT_SETTINGS: {
  camera: Required<CameraSettings>;
  terrain: Required<TerrainSettings>;
  tiling: Required<TilingSettings>;
  material: Required<MaterialSettings>;
  background: Required<BackgroundSettings>;
  lighting: Required<LightingSettings>;
  perf: Required<PerfSettings> & { maxTilesX: number };
  seed: number;
  terrainQuality: 0 | 1 | 2;
  enableDynamicTilesX: boolean;
} = {
  seed: 0,
  camera: {
    speed: 2400,
    cameraHeight: 3600,
    fov: 60,
    cameraFarPlane: 28000,
    followTerrain: true,
    lookAheadDistance: 8100,
    lookAtHeight: 1024,
    heightVariation: 0,
    heightVariationFrequency: 0.25,
  },
  terrain: {
    terrainScale: 2048,
    terrainFrequency: 0.000113,
    terrainAmplitude: 2400,
    terrainEquation: 'multiplicative',
    xAmplitudeMultiplier: 1.2,
    zAmplitudeMultiplier: 1.0,
    enableAmplitudeVariation: true,
    amplitudeVariationFrequency: 0.000233,
    amplitudeVariationIntensity: 1.73,
  },
  tiling: {
    tilesX: 20,
    tilesZ: 65,
    meshResolution: 8,
    enableDynamicTilesX: true,
    maxTilesX: 96,
  },
  material: {
    renderPreset: 'wireframe',
    materialType: 'basic',
    materialColor: 0x90ffc0,
    materialOpacity: 1,
    metalness: 0.9,
    roughness: 0.1,
  },
  background: {
    backgroundColor: 0x90ffff,
    backgroundAlpha: 0.5,
  },
  lighting: {
    ambientColor: 0x20f0c0,
    ambientIntensity: 2.00,
  },
  perf: {
    maxPixelRatio: 2,
    recycleChunkSize: 128,
    showFPS: true,
    showTerrainLogs: false,
    maxTilesX: 96,
  },
  terrainQuality: 2,
  enableDynamicTilesX: true,
};

const CosineTerrainCard: React.FC<CosineTerrainCardProps> = ({ className, variant = 'raw', settings, ...flat }) => {
  
  // Track resolved colors to trigger re-renders when themes change
  const [resolvedColors, setResolvedColors] = useState({ 
    material: '', 
    background: '',
    timestamp: Date.now()
  });
  

  // Normalize grouped settings type for safe access
  const s = (settings || {}) as Partial<{
    camera: CameraSettings;
    terrain: TerrainSettings;
    tiling: TilingSettings;
    material: MaterialSettings;
    background: BackgroundSettings;
    perf: PerfSettings;
    lighting: LightingSettings;
  }> & Partial<CosineTerrainCardProps>;

  // Build effective config: defaults → settings.groups → flat props overrides
  const cfg = {
    seed: flat.seed ?? s.seed ?? DEFAULT_SETTINGS.seed,
    terrainQuality: flat.terrainQuality ?? s.terrainQuality ?? DEFAULT_SETTINGS.terrainQuality,
    camera: {
      ...DEFAULT_SETTINGS.camera,
      ...s.camera,
      speed: flat.speed ?? s.camera?.speed ?? DEFAULT_SETTINGS.camera.speed,
      cameraHeight:
        flat.cameraHeight ?? s.camera?.cameraHeight ?? DEFAULT_SETTINGS.camera.cameraHeight,
      fov: flat.fov ?? s.camera?.fov ?? DEFAULT_SETTINGS.camera.fov,
      cameraFarPlane:
        flat.cameraFarPlane ?? s.camera?.cameraFarPlane ?? DEFAULT_SETTINGS.camera.cameraFarPlane,
      followTerrain:
        flat.followTerrain ?? s.camera?.followTerrain ?? DEFAULT_SETTINGS.camera.followTerrain,
      lookAheadDistance:
        flat.lookAheadDistance ?? s.camera?.lookAheadDistance ?? DEFAULT_SETTINGS.camera.lookAheadDistance,
      lookAtHeight:
        flat.lookAtHeight ?? s.camera?.lookAtHeight ?? DEFAULT_SETTINGS.camera.lookAtHeight,
      heightVariation:
        flat.heightVariation ?? s.camera?.heightVariation ?? DEFAULT_SETTINGS.camera.heightVariation,
      heightVariationFrequency:
        flat.heightVariationFrequency ?? s.camera?.heightVariationFrequency ?? DEFAULT_SETTINGS.camera.heightVariationFrequency,
    },
    terrain: {
      ...DEFAULT_SETTINGS.terrain,
      ...s.terrain,
      terrainScale:
        flat.terrainScale ?? s.terrain?.terrainScale ?? DEFAULT_SETTINGS.terrain.terrainScale,
      terrainFrequency:
        flat.terrainFrequency ?? s.terrain?.terrainFrequency ?? DEFAULT_SETTINGS.terrain.terrainFrequency,
      terrainAmplitude:
        flat.terrainAmplitude ?? s.terrain?.terrainAmplitude ?? DEFAULT_SETTINGS.terrain.terrainAmplitude,
      terrainEquation:
        flat.terrainEquation ?? s.terrain?.terrainEquation ?? DEFAULT_SETTINGS.terrain.terrainEquation,
      xAmplitudeMultiplier:
        flat.xAmplitudeMultiplier ?? s.terrain?.xAmplitudeMultiplier ?? DEFAULT_SETTINGS.terrain.xAmplitudeMultiplier,
      zAmplitudeMultiplier:
        flat.zAmplitudeMultiplier ?? s.terrain?.zAmplitudeMultiplier ?? DEFAULT_SETTINGS.terrain.zAmplitudeMultiplier,
      enableAmplitudeVariation:
        flat.enableAmplitudeVariation ?? s.terrain?.enableAmplitudeVariation ?? DEFAULT_SETTINGS.terrain.enableAmplitudeVariation,
      amplitudeVariationFrequency:
        flat.amplitudeVariationFrequency ?? s.terrain?.amplitudeVariationFrequency ?? DEFAULT_SETTINGS.terrain.amplitudeVariationFrequency,
      amplitudeVariationIntensity:
        flat.amplitudeVariationIntensity ?? s.terrain?.amplitudeVariationIntensity ?? DEFAULT_SETTINGS.terrain.amplitudeVariationIntensity,
    },
    tiling: {
      ...DEFAULT_SETTINGS.tiling,
      ...s.tiling,
      tilesX: flat.tilesX ?? s.tiling?.tilesX ?? DEFAULT_SETTINGS.tiling.tilesX,
      tilesZ: flat.tilesZ ?? s.tiling?.tilesZ ?? DEFAULT_SETTINGS.tiling.tilesZ,
      meshResolution:
        flat.meshResolution ?? s.tiling?.meshResolution ?? DEFAULT_SETTINGS.tiling.meshResolution,
      enableDynamicTilesX:
        flat.enableDynamicTilesX ?? s.enableDynamicTilesX ?? s.tiling?.enableDynamicTilesX ?? DEFAULT_SETTINGS.tiling.enableDynamicTilesX,
      maxTilesX: s.perf?.maxTilesX ?? DEFAULT_SETTINGS.tiling.maxTilesX,
    },
    material: {
      ...DEFAULT_SETTINGS.material,
      ...s.material,
      renderPreset:
        flat.renderPreset ?? s.material?.renderPreset ?? DEFAULT_SETTINGS.material.renderPreset,
      materialType:
        flat.materialType ?? s.material?.materialType ?? DEFAULT_SETTINGS.material.materialType,
      materialColor:
        flat.materialColor ?? s.material?.materialColor ?? DEFAULT_SETTINGS.material.materialColor,
      materialOpacity:
        flat.materialOpacity ?? s.material?.materialOpacity ?? DEFAULT_SETTINGS.material.materialOpacity,
    },
    background: {
      ...DEFAULT_SETTINGS.background,
      ...s.background,
      backgroundColor:
        flat.backgroundColor ?? s.background?.backgroundColor ?? DEFAULT_SETTINGS.background.backgroundColor,
      backgroundAlpha:
        flat.backgroundAlpha ?? s.background?.backgroundAlpha ?? DEFAULT_SETTINGS.background.backgroundAlpha,
    },
    lighting: {
      ...DEFAULT_SETTINGS.lighting,
      ...s.lighting,
      ambientColor: s.lighting?.ambientColor ?? DEFAULT_SETTINGS.lighting.ambientColor,
      ambientIntensity:
        s.lighting?.ambientIntensity ?? DEFAULT_SETTINGS.lighting.ambientIntensity,
    },
    perf: {
      ...DEFAULT_SETTINGS.perf,
      ...s.perf,
      maxPixelRatio:
        flat.maxPixelRatio ?? s.perf?.maxPixelRatio ?? DEFAULT_SETTINGS.perf.maxPixelRatio,
      recycleChunkSize:
        flat.recycleChunkSize ?? s.perf?.recycleChunkSize ?? DEFAULT_SETTINGS.perf.recycleChunkSize,
      showFPS: flat.showFPS ?? s.perf?.showFPS ?? DEFAULT_SETTINGS.perf.showFPS,
      showTerrainLogs:
        flat.showTerrainLogs ?? s.perf?.showTerrainLogs ?? DEFAULT_SETTINGS.perf.showTerrainLogs,
      maxTilesX: s.perf?.maxTilesX ?? DEFAULT_SETTINGS.perf.maxTilesX,
    },
  } as const;
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Effect to watch for theme changes and update resolved colors
  useEffect(() => {
    const checkColors = () => {
      if (typeof window === 'undefined') return;
      
      const materialResult = resolveThemeColor(cfg.material.materialColor);
      const backgroundResult = resolveThemeColor(cfg.background.backgroundColor);
      
      if (materialResult.hex !== resolvedColors.material || backgroundResult.hex !== resolvedColors.background) {
        setResolvedColors({
          material: materialResult.hex,
          background: backgroundResult.hex,
          timestamp: Date.now()
        });
      }
    };
    
    // Check immediately and then periodically
    checkColors();
    const interval = setInterval(checkColors, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, [cfg.material.materialColor, cfg.background.backgroundColor, resolvedColors.material, resolvedColors.background]);

  const TILE_RECYCLING_THRESHOLD = 3.5;
  const TILE_BUFFER_DISTANCE = 1.5;
  const GAP_DETECTION_ENABLED = false;
  const MAX_TILES_PER_FRAME_RECYCLE = 5;

  const calculateOptimalTilesX = (viewportWidth: number, viewportHeight: number): number => {
    const viewWidth = 2 * Math.tan((cfg.camera.fov * Math.PI / 180) / 2) * cfg.camera.cameraFarPlane;
    const baselineTiles = Math.ceil(viewWidth / cfg.terrain.terrainScale);
    const aspectRatio = viewportWidth / viewportHeight;
    const maxTiles = cfg.perf.maxTilesX;
    const aspectAdjustedTiles = Math.round(baselineTiles * Math.max(1, aspectRatio));
    const finalTileCount = Math.min(Math.max(aspectAdjustedTiles, 1), Math.max(1, maxTiles));
    if (cfg.perf.showTerrainLogs && process.env.NODE_ENV !== 'production') {
      console.log('🔧 Tile Calculation Debug:', {
        viewportSize: `${viewportWidth}×${viewportHeight}px`,
        aspectRatio: aspectRatio.toFixed(2),
        fov: `${cfg.camera.fov}°`,
        cameraFarPlane: cfg.camera.cameraFarPlane,
        terrainScale: cfg.terrain.terrainScale,
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
    const tileWavelengthRatio = wavelength / cfg.terrain.terrainScale;
    const fractionalPart = tileWavelengthRatio % 1;
    if (fractionalPart > 0.2 && fractionalPart < 0.8 && process.env.NODE_ENV !== 'production') {
      console.warn(
        `Terrain frequency ${frequency} may cause tile boundary artifacts. ` +
          `Wavelength/tile ratio: ${tileWavelengthRatio.toFixed(2)}. ` +
          `Consider frequencies that create integer or half-integer ratios.`,
      );
    }
  };

  validateTerrainFrequency(cfg.terrain.terrainFrequency);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    mount.innerHTML = '';
    let frameId: number;

    const actualTilesX = cfg.tiling.enableDynamicTilesX
      ? calculateOptimalTilesX(mount.clientWidth, mount.clientHeight)
      : cfg.tiling.tilesX;

    const cameraNearPlane = 0.1;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      cfg.camera.fov,
      mount.clientWidth / mount.clientHeight,
      cameraNearPlane,
      cfg.camera.cameraFarPlane,
    );
    camera.position.y = cfg.camera.cameraHeight;
    // Use alpha so CSS background (page or BaseCard) can show through when desired
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    // Pixel ratio: keep it stable to avoid periodic GC/surface reallocations
    const devicePR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const pixelRatio = Math.min(
      Math.max(1, devicePR),
      Math.max(1, cfg.perf.maxPixelRatio),
    );
    renderer.setPixelRatio(pixelRatio);
    // If variant is 'card' and no explicit alpha provided, default to 0 to blend with card background
    const bgAlpha = Math.max(0, Math.min(1, cfg.background.backgroundAlpha ?? (variant === 'card' ? 0 : 1)));
    const backgroundResult = resolveThemeColor(cfg.background.backgroundColor);
    
    renderer.setClearColor(backgroundResult.hex as ColorRepresentation, bgAlpha);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Post-layout correction: ensure we pick up the final grid size on the next tick
    setTimeout(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    }, 0);

    // Optional simple lighting for solid shading
    if (cfg.material.renderPreset === 'solid') {
      const amb = new AmbientLight(cfg.lighting.ambientColor as ColorRepresentation | undefined, cfg.lighting.ambientIntensity);
      const dir = new DirectionalLight(0xffffff, 0.9);
      dir.position.set(1, 2, 1).normalize();
      scene.add(amb);
      scene.add(dir);
    }

    // Create material per configuration
    const createMaterial = () => {
      const finalRenderPreset = cfg.material.renderPreset;
      const isWireframe = finalRenderPreset === 'wireframe';
      
      // Resolve color inside useEffect where DOM is available
      const materialResult = resolveThemeColor(cfg.material.materialColor);
      
      const common = { color: materialResult.hex, wireframe: isWireframe } as const;
      const transparent = cfg.material.materialOpacity < 1;
      const opacity = Math.max(0, Math.min(1, cfg.material.materialOpacity));
      const finalMaterialType = cfg.material.materialType;
      if (finalMaterialType === 'standard' || finalRenderPreset === 'solid') {
        return new MeshStandardMaterial({
          color: common.color,
          wireframe: common.wireframe,
          metalness: Math.max(0, Math.min(1, cfg.material.metalness)),
          roughness: Math.max(0, Math.min(1, cfg.material.roughness)),
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
      const frontmostZ = cameraZ - TILE_BUFFER_DISTANCE * cfg.terrain.terrainScale;
      const tilesInFront = terrainTiles.filter(
        (tile) => tile.position.z <= frontmostZ && tile.position.z >= frontmostZ - cfg.tiling.tilesZ * cfg.terrain.terrainScale,
      );
      const expectedTilesInFront = Math.min(cfg.tiling.tilesZ, Math.ceil(TILE_BUFFER_DISTANCE * 2));
      if (tilesInFront.length < expectedTilesInFront * 0.8) {
        const frontmostTile = terrainTiles.reduce((front, tile) => (tile.position.z < front.position.z ? tile : front));
        const emergencyTileZ = frontmostTile.position.z - cfg.terrain.terrainScale;
        const emergencyTileX = 0;
        console.warn(`Gap detected! Creating emergency tile at Z: ${emergencyTileZ}`);
        terrainTiles.push(generateTerrainTile(emergencyTileX, emergencyTileZ / cfg.terrain.terrainScale));
      }
    };

    const calculateTerrainHeight = (worldX: number, worldZ: number): number => {
      const cosX = Math.cos(worldX * cfg.terrain.terrainFrequency + cfg.seed);
      const cosZ = Math.cos(worldZ * cfg.terrain.terrainFrequency + cfg.seed);
      let localAmplitude = cfg.terrain.terrainAmplitude;
      if (cfg.terrain.enableAmplitudeVariation) {
        const amplitudeNoise =
          Math.sin(worldX * cfg.terrain.amplitudeVariationFrequency + cfg.seed * 0.7) *
          Math.cos(worldZ * cfg.terrain.amplitudeVariationFrequency + cfg.seed * 1.3);
        const amplitudeVariationFactor = 1 + amplitudeNoise * cfg.terrain.amplitudeVariationIntensity;
        localAmplitude *= amplitudeVariationFactor;
      }
      return cfg.terrain.terrainEquation === 'additive'
        ? (cfg.terrain.xAmplitudeMultiplier * cosX + cfg.terrain.zAmplitudeMultiplier * cosZ) * localAmplitude * 0.5
        : cfg.terrain.xAmplitudeMultiplier * cosX * (cfg.terrain.zAmplitudeMultiplier * cosZ) * localAmplitude;
    };

    const generateTerrainTile = (tileX: number, tileZ: number) => {
      const safeMeshResolution = Math.max(1, Math.floor(cfg.tiling.meshResolution));
      const resolution = cfg.terrainQuality >= 1 ? safeMeshResolution : Math.max(1, safeMeshResolution - 1);
      const geometry = new PlaneGeometry(cfg.terrain.terrainScale, cfg.terrain.terrainScale, resolution, resolution);
      geometry.rotateX(-Math.PI / 2);
      const positions = geometry.attributes.position as BufferAttribute;
      const vertex = new Vector3();
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const worldX = cfg.terrainQuality >= 1 ? tileX * cfg.terrain.terrainScale + vertex.x : vertex.x + tileX * cfg.terrain.terrainScale;
        const worldZ = cfg.terrainQuality >= 1 ? tileZ * cfg.terrain.terrainScale + vertex.z : vertex.z + tileZ * cfg.terrain.terrainScale;
        const y = calculateTerrainHeight(worldX, worldZ);
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      const mesh = new Mesh(geometry, material);
      mesh.position.set(tileX * cfg.terrain.terrainScale, 0, tileZ * cfg.terrain.terrainScale);
      scene.add(mesh);
      return mesh;
    };

    const regenerateTileGeometry = (tile: Mesh, newTileX: number, newTileZ: number) => {
      if (cfg.terrainQuality < 1) return;
      const geometry = tile.geometry as PlaneGeometry;
      const positions = geometry.attributes.position as BufferAttribute;
      const vertex = new Vector3();
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const worldX = newTileX * cfg.terrain.terrainScale + vertex.x;
        const worldZ = newTileZ * cfg.terrain.terrainScale + vertex.z;
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
      for (let j = 0; j < cfg.tiling.tilesZ; j++) {
        terrainTiles.push(generateTerrainTile(i - Math.floor(actualTilesX / 2), j - cfg.tiling.tilesZ));
      }
    }

    const sampleTerrainHeight = (worldX: number, worldZ: number): number => {
      if (cfg.terrainQuality >= 2) {
        return calculateTerrainHeight(worldX, worldZ);
      }
      let closestTile: Mesh | null = null;
      let minDistance = Infinity;
      for (const tile of terrainTiles) {
        const dx = worldX - tile.position.x;
        const dz = worldZ - tile.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const halfScale = cfg.terrain.terrainScale / 2;
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
      const u = (localX + cfg.terrain.terrainScale / 2) / cfg.terrain.terrainScale;
      const v = (localZ + cfg.terrain.terrainScale / 2) / cfg.terrain.terrainScale;
      const geometry = closestTile.geometry as PlaneGeometry;
      const positions = geometry.attributes.position as BufferAttribute;
      const resolution = cfg.terrainQuality >= 1 ? cfg.tiling.meshResolution : cfg.tiling.meshResolution - 1;
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
      const mount = mountRef.current;
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Fast resume when tab/window becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Reset timing to avoid a huge delta after resume
        lastTime = performance.now();
        // Regenerate all tile geometries immediately for a fully drawn surface
        for (const tile of terrainTiles) {
          const tileX = tile.position.x / cfg.terrain.terrainScale;
          const tileZ = tile.position.z / cfg.terrain.terrainScale;
          // For consistent visuals across qualities, always refresh positions/normals
          const geometry = tile.geometry as PlaneGeometry;
          const positions = geometry.attributes.position as BufferAttribute;
          const vertex = new Vector3();
          for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);
            const worldX = tileX * cfg.terrain.terrainScale + vertex.x;
            const worldZ = tileZ * cfg.terrain.terrainScale + vertex.z;
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
    if (cfg.perf.showFPS) {
      fpsElement = document.createElement('div');
      fpsElement.style.position = 'absolute';
      fpsElement.style.top = '10px';
      fpsElement.style.left = '10px';
      fpsElement.style.color = resolvedColors.material || '#00ff00';
      fpsElement.style.fontFamily = 'monospace';
      fpsElement.style.fontSize = '16px';
      fpsElement.style.backgroundColor = resolvedColors.background ? `${resolvedColors.background}cc` : 'rgba(0,0,0,0.7)';
      fpsElement.style.padding = '5px';
      fpsElement.style.borderRadius = '3px';
      fpsElement.style.zIndex = '1000';
      fpsElement.textContent = 'FPS: --';
      mount.style.position = 'relative';
      mount.appendChild(fpsElement);
    }

    let lastTime = performance.now();
    let scanIndex = 0;
    const updateFps = (nowMs: number) => {
      if (!cfg.perf.showFPS || !fpsElement) return;
      frameCount++;
      if (nowMs - fpsLastTime >= 1000) {
        currentFPS = Math.round((frameCount * 1000) / (nowMs - fpsLastTime));
        fpsElement.textContent = `FPS: ${currentFPS}`;
        frameCount = 0;
        fpsLastTime = nowMs;
      }
    };

    const followTerrainCamera = (timeNow: number) => {
      const currentTerrainHeight = sampleTerrainHeight(camera.position.x, camera.position.z);
      const timeVariation = Math.sin(timeNow * 0.001 * cfg.camera.heightVariationFrequency) * cfg.camera.heightVariation;
      camera.position.y = currentTerrainHeight + cfg.camera.cameraHeight + timeVariation;
      const lookAheadX = camera.position.x;
      const lookAheadZ = camera.position.z - cfg.camera.lookAheadDistance;
      const lookAheadTerrainHeight = sampleTerrainHeight(lookAheadX, lookAheadZ);
      const lookAtPoint = new Vector3(lookAheadX, lookAheadTerrainHeight + cfg.camera.lookAtHeight, lookAheadZ);
      camera.lookAt(lookAtPoint);
    };

    const animate = (nowHighRes?: number) => {
      frameId = requestAnimationFrame(animate);
      const now = typeof nowHighRes === 'number' ? nowHighRes : performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      updateFps(now);
      camera.position.z -= delta * cfg.camera.speed;
      if (cfg.camera.followTerrain) {
        followTerrainCamera(now);
      } else {
        camera.position.y = cfg.camera.cameraHeight;
      }
      let recycledThisFrame = 0;
      const maybeLogProgress = (nowMsLocal: number, deltaSec: number) => {
        if (!(cfg.perf.showTerrainLogs && process.env.NODE_ENV !== 'production')) return;
        const shouldLog = Math.floor(nowMsLocal / 5000) !== Math.floor((nowMsLocal - deltaSec * 1000) / 5000);
        if (!shouldLog) return;
        const timeSeconds = Math.floor(nowMsLocal / 1000);
      const cameraZTile = Math.round(camera.position.z / cfg.terrain.terrainScale);
      const allTileZ = terrainTiles.map((t) => Math.round(t.position.z / cfg.terrain.terrainScale));
        const minZ = Math.min(...allTileZ);
        const maxZ = Math.max(...allTileZ);
        console.log(
          `T=${timeSeconds}s: Camera Z=${camera.position.z.toFixed(0)} (tile ${cameraZTile}), Tiles: ${terrainTiles.length}`,
        );
        console.log(`  Terrain coverage: tiles ${minZ} to ${maxZ} (span: ${maxZ - minZ + 1} tiles)`);
      };
      maybeLogProgress(now, delta);

      // Scan a fixed-size chunk of tiles per frame for recycling to reduce spikes
      const len = terrainTiles.length;
      const chunk = Math.max(8, Math.min(cfg.perf.recycleChunkSize, len));
      for (let k = 0; k < chunk; k++) {
        if (recycledThisFrame >= MAX_TILES_PER_FRAME_RECYCLE) break;
        const idx = (scanIndex + k) % len;
        const tile = terrainTiles[idx];
        const recycleThreshold = cfg.terrain.terrainScale * TILE_RECYCLING_THRESHOLD;
        const distanceBehindCamera = tile.position.z - camera.position.z;
        if (distanceBehindCamera > recycleThreshold) {
          const newTileZ = tile.position.z - cfg.terrain.terrainScale * cfg.tiling.tilesZ;
          const tileX = tile.position.x / cfg.terrain.terrainScale;
          const tileZ = newTileZ / cfg.terrain.terrainScale;
          tile.position.set(tileX * cfg.terrain.terrainScale, 0, tileZ * cfg.terrain.terrainScale);
          recycledThisFrame++;
          if (cfg.terrainQuality >= 1) {
            regenerateTileGeometry(tile, tileX, tileZ);
          }
        }
      }
      scanIndex = (scanIndex + chunk) % Math.max(1, len);
      detectAndFillGaps();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      const mountNow = mountRef.current;
      if (mountNow) {
        mountNow.innerHTML = '';
      }
      renderer.dispose();
      terrainTiles.forEach((tile) => {
        tile.geometry.dispose();
      });
      material.dispose();
    };
  }, [flat.materialColor, flat.backgroundColor, variant, resolvedColors.timestamp]);

  const canvasElement = <div ref={mountRef} className={cn('w-full h-full', className)} />;

  if (variant === 'card') {
    return (
      <BaseCard className={cn('p-0 overflow-hidden', className)}>
        {canvasElement}
      </BaseCard>
    );
  }

  return canvasElement;
};

export { CosineTerrainCard };
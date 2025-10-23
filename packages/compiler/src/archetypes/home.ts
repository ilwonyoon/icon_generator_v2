/**
 * Home Icon Archetype
 *
 * Renders a house icon with customizable roof height, door width, and window size.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createRectPath, createTrianglePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface HomeParams {
  roofHeight: number;
  doorWidth: number;
  windowSize: number;
}

/**
 * Compile a home icon
 */
export function compileHomeIcon(
  params: HomeParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { roofHeight, doorWidth, windowSize } = params;
  const { viewBoxSize, strokeWidth, liveAreaInset } = dna;

  // Calculate dimensions
  const center = viewBoxSize / 2;
  const liveSize = viewBoxSize - liveAreaInset * 2;
  const houseWidth = liveSize * 0.7;
  const houseHeight = liveSize * 0.6;
  const houseX = center - houseWidth / 2;
  const houseY = center + houseHeight / 2 - liveAreaInset;

  const paths: SVGPath[] = [];

  // Roof (triangle)
  const roofCenterX = center;
  const roofCenterY = houseY - houseHeight / 2 - roofHeight / 2;
  const roofPath = createTrianglePath(roofCenterX, roofCenterY, houseWidth / 2, -90);

  paths.push({
    d: roofPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // House body (rectangle)
  const bodyPath = createRectPath(houseX, houseY - houseHeight, houseWidth, houseHeight);

  paths.push({
    d: bodyPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Door
  const doorX = center - doorWidth / 2;
  const doorY = houseY - doorWidth * 1.5;
  const doorPath = createRectPath(doorX, doorY, doorWidth, doorWidth * 1.5);

  paths.push({
    d: doorPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Windows (left and right)
  const windowSpacing = houseWidth * 0.25;
  const leftWindowX = center - windowSpacing - windowSize / 2;
  const rightWindowX = center + windowSpacing - windowSize / 2;
  const windowY = houseY - houseHeight * 0.6;

  const windowPath = createRectPath(leftWindowX, windowY, windowSize, windowSize);
  paths.push({
    d: windowPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const windowPath2 = createRectPath(rightWindowX, windowY, windowSize, windowSize);
  paths.push({
    d: windowPath2,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

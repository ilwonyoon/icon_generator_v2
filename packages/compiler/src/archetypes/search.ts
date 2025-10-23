/**
 * Search Icon Archetype
 *
 * Renders a magnifying glass with customizable lens radius, handle length, and angle.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createCirclePath, createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface SearchParams {
  lensRadius: number;
  handleLength: number;
  handleAngle: number;
}

/**
 * Compile a search icon
 */
export function compileSearchIcon(
  params: SearchParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { lensRadius, handleLength, handleAngle } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const lensX = center - lensRadius * 0.3;
  const lensY = center - lensRadius * 0.3;

  const paths: SVGPath[] = [];

  // Lens (circle)
  const lensPath = createCirclePath(lensX, lensY, lensRadius);

  paths.push({
    d: lensPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Handle (line at an angle)
  const angle = (handleAngle * Math.PI) / 180;
  const handleEndX = lensX + lensRadius + handleLength * Math.cos(angle);
  const handleEndY = lensY + lensRadius + handleLength * Math.sin(angle);

  const handlePath = createLinePath(
    lensX + lensRadius * Math.cos(angle) * 0.7,
    lensY + lensRadius * Math.sin(angle) * 0.7,
    handleEndX,
    handleEndY
  );

  paths.push({
    d: handlePath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

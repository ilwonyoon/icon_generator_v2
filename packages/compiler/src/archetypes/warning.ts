/**
 * Warning Icon Archetype
 *
 * Renders a triangle with an exclamation mark inside.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { SVGPathBuilder, createCirclePath, createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface WarningParams {
  triangleHeight: number;
  dotRadius: number;
  exclamationHeight: number;
}

/**
 * Compile a warning icon
 */
export function compileWarningIcon(
  params: WarningParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { triangleHeight, dotRadius, exclamationHeight } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Triangle (equilateral, pointing up)
  const triangleWidth = triangleHeight * Math.sqrt(3) / 2;
  const topY = center - triangleHeight / 2;
  const bottomY = center + triangleHeight / 2;
  const leftX = center - triangleWidth / 2;
  const rightX = center + triangleWidth / 2;

  const trianglePath = new SVGPathBuilder()
    .moveTo(center, topY)
    .lineTo(rightX, bottomY)
    .lineTo(leftX, bottomY)
    .close()
    .build();

  paths.push({
    d: trianglePath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Exclamation mark line
  const lineStartY = center - exclamationHeight / 2;
  const lineEndY = center + exclamationHeight / 4;
  const linePath = createLinePath(center, lineStartY, center, lineEndY);

  paths.push({
    d: linePath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: strokeWidth * 1.5,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Exclamation mark dot
  const dotY = center + exclamationHeight / 2 + dotRadius;
  const dotPath = createCirclePath(center, dotY, dotRadius);

  paths.push({
    d: dotPath,
    fill: 'currentColor',
    stroke: 'none',
    strokeWidth: 0,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

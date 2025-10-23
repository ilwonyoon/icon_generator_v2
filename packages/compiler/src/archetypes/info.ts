/**
 * Info Icon Archetype
 *
 * Renders a circle with an "i" inside, representing information.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createCirclePath, createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface InfoParams {
  circleRadius: number;
  dotRadius: number;
  textHeight: number;
}

/**
 * Compile an info icon
 */
export function compileInfoIcon(
  params: InfoParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { circleRadius, dotRadius, textHeight } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Outer circle
  const circlePath = createCirclePath(center, center, circleRadius);

  paths.push({
    d: circlePath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Dot (top of "i")
  const dotY = center - textHeight / 2 - dotRadius * 2;
  const dotPath = createCirclePath(center, dotY, dotRadius);

  paths.push({
    d: dotPath,
    fill: 'currentColor',
    stroke: 'none',
    strokeWidth: 0,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Vertical line (stem of "i")
  const lineStartY = center - textHeight / 4;
  const lineEndY = center + textHeight / 2;
  const linePath = createLinePath(center, lineStartY, center, lineEndY);

  paths.push({
    d: linePath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: strokeWidth * 1.5,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

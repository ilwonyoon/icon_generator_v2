/**
 * Share Icon Archetype
 *
 * Renders three dots connected with lines representing a share network.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createCirclePath, createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface ShareParams {
  dotRadius: number;
  lineWidth: number;
}

/**
 * Compile a share icon
 */
export function compileShareIcon(
  params: ShareParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { dotRadius, lineWidth } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  const spacing = viewBoxSize * 0.25;

  // Positions for three dots: top-right, center-left, bottom-right
  const topRightX = center + spacing;
  const topRightY = center - spacing;
  const centerLeftX = center - spacing;
  const centerLeftY = center;
  const bottomRightX = center + spacing;
  const bottomRightY = center + spacing;

  const actualStrokeWidth = strokeWidth * lineWidth;

  // Connection lines
  const line1Path = createLinePath(centerLeftX, centerLeftY, topRightX, topRightY);
  paths.push({
    d: line1Path,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const line2Path = createLinePath(centerLeftX, centerLeftY, bottomRightX, bottomRightY);
  paths.push({
    d: line2Path,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Three dots
  const topRightDot = createCirclePath(topRightX, topRightY, dotRadius);
  paths.push({
    d: topRightDot,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const centerLeftDot = createCirclePath(centerLeftX, centerLeftY, dotRadius);
  paths.push({
    d: centerLeftDot,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const bottomRightDot = createCirclePath(bottomRightX, bottomRightY, dotRadius);
  paths.push({
    d: bottomRightDot,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

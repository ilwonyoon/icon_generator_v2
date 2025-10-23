/**
 * Play Icon Archetype
 *
 * Renders a triangle play button with customizable dimensions.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { SVGPathBuilder } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface PlayParams {
  triangleWidth: number;
  triangleHeight: number;
}

/**
 * Compile a play icon
 */
export function compilePlayIcon(
  params: PlayParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { triangleWidth, triangleHeight } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Triangle pointing right
  const leftX = center - triangleWidth / 2;
  const topY = center - triangleHeight / 2;
  const bottomY = center + triangleHeight / 2;
  const rightX = center + triangleWidth / 2;

  const trianglePath = new SVGPathBuilder()
    .moveTo(leftX, topY)
    .lineTo(rightX, center)
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

  return paths;
}

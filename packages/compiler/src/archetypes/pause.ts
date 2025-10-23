/**
 * Pause Icon Archetype
 *
 * Renders two vertical bars with customizable dimensions and gap.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createRectPath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface PauseParams {
  barWidth: number;
  barHeight: number;
  barGap: number;
}

/**
 * Compile a pause icon
 */
export function compilePauseIcon(
  params: PauseParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { barWidth, barHeight, barGap } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Left bar
  const leftBarX = center - barGap / 2 - barWidth;
  const barY = center - barHeight / 2;

  const leftBarPath = createRectPath(leftBarX, barY, barWidth, barHeight);

  paths.push({
    d: leftBarPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Right bar
  const rightBarX = center + barGap / 2;

  const rightBarPath = createRectPath(rightBarX, barY, barWidth, barHeight);

  paths.push({
    d: rightBarPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

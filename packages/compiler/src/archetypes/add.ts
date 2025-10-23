/**
 * Add Icon Archetype
 *
 * Renders a plus sign with customizable line length, width, and center gap.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface AddParams {
  lineLength: number;
  lineWidth: number;
  centerGap: number;
}

/**
 * Compile an add icon
 */
export function compileAddIcon(
  params: AddParams,
  dna: IconDNA,
  _style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { lineLength, lineWidth: customLineWidth, centerGap } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  const actualStrokeWidth = strokeWidth * customLineWidth;
  const halfGap = centerGap / 2;
  const halfLength = lineLength / 2;

  // Horizontal line (left and right segments)
  const horizontalLeftPath = createLinePath(
    center - halfLength,
    center,
    center - halfGap,
    center
  );

  paths.push({
    d: horizontalLeftPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const horizontalRightPath = createLinePath(
    center + halfGap,
    center,
    center + halfLength,
    center
  );

  paths.push({
    d: horizontalRightPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Vertical line (top and bottom segments)
  const verticalTopPath = createLinePath(
    center,
    center - halfLength,
    center,
    center - halfGap
  );

  paths.push({
    d: verticalTopPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  const verticalBottomPath = createLinePath(
    center,
    center + halfGap,
    center,
    center + halfLength
  );

  paths.push({
    d: verticalBottomPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: actualStrokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

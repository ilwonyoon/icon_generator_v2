/**
 * Download Icon Archetype
 *
 * Renders a download icon with an arrow pointing down and a line below.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { SVGPathBuilder, createLinePath } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface DownloadParams {
  arrowWidth: number;
  arrowLength: number;
  lineWidth: number;
}

/**
 * Compile a download icon
 */
export function compileDownloadIcon(
  params: DownloadParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { arrowWidth, arrowLength, lineWidth } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Arrow shaft (vertical line)
  const shaftStartY = center - arrowLength / 2;
  const shaftEndY = center + arrowLength / 4;

  const shaftPath = createLinePath(center, shaftStartY, center, shaftEndY);

  paths.push({
    d: shaftPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Arrow head (pointing down)
  const arrowTipY = shaftEndY + arrowWidth;
  const arrowPath = new SVGPathBuilder()
    .moveTo(center - arrowWidth, shaftEndY)
    .lineTo(center, arrowTipY)
    .lineTo(center + arrowWidth, shaftEndY)
    .build();

  paths.push({
    d: arrowPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Base line
  const baseY = center + arrowLength / 2 + arrowWidth / 2;
  const lineStartX = center - lineWidth / 2;
  const lineEndX = center + lineWidth / 2;

  const linePath = createLinePath(lineStartX, baseY, lineEndX, baseY);

  paths.push({
    d: linePath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

/**
 * Remove Icon (Minus)
 *
 * Generates a minus/remove icon with customizable line properties.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { SVGPath } from '../types';
import { SVGPathBuilder } from '../utils/svg-path';

export interface RemoveParams {
  lineLength: number;
  lineWidth: number;
}

export function compileRemoveIcon(
  params: RemoveParams,
  dna: IconDNA,
  _style: 'outline' | 'filled'
): SVGPath[] {
  const center = dna.viewBoxSize / 2;
  const lineLength = params.lineLength;
  const lineWidth = params.lineWidth;

  const paths: SVGPath[] = [];

  // Horizontal line
  const linePath = new SVGPathBuilder()
    .moveTo(center - lineLength / 2, center)
    .lineTo(center + lineLength / 2, center)
    .build();

  paths.push({
    d: linePath,
    stroke: '#000000',
    fill: 'none',
    strokeWidth: lineWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

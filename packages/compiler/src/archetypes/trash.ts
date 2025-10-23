/**
 * Trash Icon (Delete)
 *
 * Generates a trash can icon with handle and interior lines.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { SVGPath } from '../types';
import { SVGPathBuilder } from '../utils/svg-path';

export interface TrashParams {
  handleWidth: number;
  canWidth: number;
  lineCount: number;
}

export function compileTrashIcon(
  params: TrashParams,
  dna: IconDNA,
  style: 'outline' | 'filled'
): SVGPath[] {
  const center = dna.viewBoxSize / 2;
  const handleWidth = params.handleWidth;
  const canWidth = params.canWidth;
  const lineCount = Math.max(2, Math.min(5, Math.round(params.lineCount)));

  const paths: SVGPath[] = [];

  // Handle
  const handlePath = new SVGPathBuilder()
    .moveTo(center - handleWidth / 2, center - 7)
    .lineTo(center + handleWidth / 2, center - 7)
    .close()
    .build();

  paths.push({
    d: handlePath,
    stroke: '#000000',
    fill: 'none',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Trash can body
  const canPath = new SVGPathBuilder()
    .moveTo(center - canWidth / 2, center - 5)
    .lineTo(center - canWidth / 2, center + 5)
    .lineTo(center + canWidth / 2, center + 5)
    .lineTo(center + canWidth / 2, center - 5)
    .close()
    .build();

  paths.push({
    d: canPath,
    stroke: style === 'outline' ? '#000000' : 'none',
    fill: style === 'filled' ? '#000000' : 'none',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Interior lines
  const spacing = canWidth / (lineCount + 1);
  for (let i = 1; i <= lineCount; i++) {
    const x = center - canWidth / 2 + spacing * i;
    const linePath = new SVGPathBuilder()
      .moveTo(x, center - 3)
      .lineTo(x, center + 3)
      .build();

    paths.push({
      d: linePath,
      stroke: style === 'outline' ? '#000000' : 'none',
      fill: 'none',
      strokeWidth: dna.strokeWidth * 0.7,
      strokeLinecap: dna.strokeLineCap,
      strokeLinejoin: dna.strokeLineJoin,
    });
  }

  return paths;
}

/**
 * Edit Icon Archetype
 *
 * Renders a pencil icon with customizable length, tip length, and angle.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { SVGPathBuilder } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface EditParams {
  pencilLength: number;
  tipLength: number;
  tipAngle: number;
}

/**
 * Compile an edit icon
 */
export function compileEditIcon(
  params: EditParams,
  dna: IconDNA,
  style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { pencilLength, tipLength, tipAngle: _tipAngle } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Pencil is rotated 45 degrees
  const rotation = -45;
  const radians = (rotation * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  // Pencil body
  const bodyLength = pencilLength - tipLength;
  const bodyWidth = pencilLength * 0.25;

  const bodyStartX = center - (pencilLength / 2) * cos;
  const bodyStartY = center - (pencilLength / 2) * sin;
  const bodyEndX = center + (bodyLength / 2 - pencilLength / 2) * cos;
  const bodyEndY = center + (bodyLength / 2 - pencilLength / 2) * sin;

  // Body rectangle corners
  const halfWidth = bodyWidth / 2;
  const perpX = -sin;
  const perpY = cos;

  const bodyPath = new SVGPathBuilder()
    .moveTo(bodyStartX + perpX * halfWidth, bodyStartY + perpY * halfWidth)
    .lineTo(bodyEndX + perpX * halfWidth, bodyEndY + perpY * halfWidth)
    .lineTo(bodyEndX - perpX * halfWidth, bodyEndY - perpY * halfWidth)
    .lineTo(bodyStartX - perpX * halfWidth, bodyStartY - perpY * halfWidth)
    .close()
    .build();

  paths.push({
    d: bodyPath,
    fill: style === 'filled' ? 'currentColor' : 'none',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Pencil tip
  const tipStartX = bodyEndX;
  const tipStartY = bodyEndY;
  const tipEndX = center + (pencilLength / 2) * cos;
  const tipEndY = center + (pencilLength / 2) * sin;

  const tipPath = new SVGPathBuilder()
    .moveTo(tipStartX + perpX * halfWidth, tipStartY + perpY * halfWidth)
    .lineTo(tipEndX, tipEndY)
    .lineTo(tipStartX - perpX * halfWidth, tipStartY - perpY * halfWidth)
    .close()
    .build();

  paths.push({
    d: tipPath,
    fill: 'currentColor',
    stroke: style === 'outline' ? 'currentColor' : 'none',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

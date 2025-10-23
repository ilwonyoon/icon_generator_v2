/**
 * Profile Icon (User/Account)
 *
 * Generates a user profile icon with customizable head and body.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { SVGPath } from '../types';
import { SVGPathBuilder } from '../utils/svg-path';
import { quantizeRadius } from '../utils/constraint-solver';

export interface ProfileParams {
  headRadius: number;
  shoulderWidth: number;
  bodyHeight: number;
}

export function compileProfileIcon(
  params: ProfileParams,
  dna: IconDNA,
  style: 'outline' | 'filled'
): SVGPath[] {
  const center = dna.viewBoxSize / 2;
  const headRadius = quantizeRadius(params.headRadius, dna.allowedRadii);
  const shoulderWidth = Math.min(params.shoulderWidth, dna.viewBoxSize - 4);
  const bodyHeight = params.bodyHeight;

  const paths: SVGPath[] = [];

  // Head circle
  const headPath = new SVGPathBuilder()
    .moveTo(center + headRadius, center - 4)
    .arc({
      radiusX: headRadius,
      radiusY: headRadius,
      rotation: 0,
      largeArc: false,
      sweep: true,
      endX: center - headRadius,
      endY: center - 4,
      startX: center + headRadius,
      startY: center - 4,
    })
    .arc({
      radiusX: headRadius,
      radiusY: headRadius,
      rotation: 0,
      largeArc: false,
      sweep: true,
      endX: center + headRadius,
      endY: center - 4,
      startX: center - headRadius,
      startY: center - 4,
    })
    .close()
    .build();

  paths.push({
    d: headPath,
    stroke: style === 'outline' ? '#000000' : 'none',
    fill: style === 'filled' ? '#000000' : 'none',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Body (shoulders + torso)
  const bodyPath = new SVGPathBuilder()
    .moveTo(center - shoulderWidth / 2, center + 2)
    .lineTo(center - shoulderWidth / 4, center + 2 + bodyHeight)
    .lineTo(center + shoulderWidth / 4, center + 2 + bodyHeight)
    .lineTo(center + shoulderWidth / 2, center + 2)
    .close()
    .build();

  paths.push({
    d: bodyPath,
    stroke: style === 'outline' ? '#000000' : 'none',
    fill: style === 'filled' ? '#000000' : 'none',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

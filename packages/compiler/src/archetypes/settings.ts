/**
 * Settings Icon (Gear)
 *
 * Generates a gear/settings icon with customizable teeth and center hole.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { SVGPath } from '../types';
import { SVGPathBuilder } from '../utils/svg-path';
import { snapPointToGrid, quantizeRadius } from '../utils/constraint-solver';

export interface SettingsParams {
  toothCount: number;
  toothDepth: number;
  centerRadius: number;
}

export function compileSettingsIcon(
  params: SettingsParams,
  dna: IconDNA,
  style: 'outline' | 'filled'
): SVGPath[] {
  const center = dna.viewBoxSize / 2;
  const outerRadius = 8;
  const innerRadius = 6;

  // Clamp and snap parameters
  const toothCount = Math.max(6, Math.min(12, Math.round(params.toothCount)));
  const toothDepth = quantizeRadius(params.toothDepth, dna.allowedRadii);
  const centerRadius = quantizeRadius(params.centerRadius, dna.allowedRadii);

  const paths: SVGPath[] = [];
  const anglePerTooth = 360 / toothCount;

  // Build gear outline
  let gearPath = '';
  for (let i = 0; i < toothCount; i++) {
    const angle = i * anglePerTooth;
    const nextAngle = (i + 1) * anglePerTooth;

    // Outer point (tooth tip)
    const outerRad = (angle * Math.PI) / 180;
    const outerX = snapPointToGrid(
      { x: center + Math.cos(outerRad) * (outerRadius + toothDepth), y: 0 },
      dna.gridSize
    ).x;
    const outerY = snapPointToGrid(
      { x: 0, y: center + Math.sin(outerRad) * (outerRadius + toothDepth) },
      dna.gridSize
    ).y;

    // Inner point (between teeth)
    const innerAngle = (angle + anglePerTooth / 2) * (Math.PI / 180);
    const innerX = snapPointToGrid(
      { x: center + Math.cos(innerAngle) * innerRadius, y: 0 },
      dna.gridSize
    ).x;
    const innerY = snapPointToGrid(
      { x: 0, y: center + Math.sin(innerAngle) * innerRadius },
      dna.gridSize
    ).y;

    if (i === 0) {
      gearPath = `M ${outerX} ${outerY}`;
    }

    gearPath += ` L ${innerX} ${innerY}`;
    gearPath += ` A ${innerRadius} ${innerRadius} 0 0 1 ${center + Math.cos((nextAngle * Math.PI) / 180) * outerRadius} ${center + Math.sin((nextAngle * Math.PI) / 180) * outerRadius}`;
  }
  gearPath += ' Z';

  // Outer gear circle
  paths.push({
    d: gearPath,
    stroke: style === 'outline' ? '#000000' : 'none',
    fill: style === 'filled' ? '#000000' : 'none',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Center hole
  const centerHolePath = new SVGPathBuilder()
    .moveTo(center + centerRadius, center)
    .arc({
      radiusX: centerRadius,
      radiusY: centerRadius,
      rotation: 0,
      largeArc: false,
      sweep: true,
      endX: center - centerRadius,
      endY: center,
      startX: center + centerRadius,
      startY: center,
    })
    .arc({
      radiusX: centerRadius,
      radiusY: centerRadius,
      rotation: 0,
      largeArc: false,
      sweep: true,
      endX: center + centerRadius,
      endY: center,
      startX: center - centerRadius,
      startY: center,
    })
    .close()
    .build();

  paths.push({
    d: centerHolePath,
    stroke: style === 'outline' ? '#000000' : 'none',
    fill: 'white',
    strokeWidth: dna.strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

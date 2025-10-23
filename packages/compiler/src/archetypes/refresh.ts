/**
 * Refresh Icon Archetype
 *
 * Renders a circular arrow with customizable radius, arrow width, and arc angle.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { SVGPathBuilder } from '../utils/svg-path';
import type { SVGPath } from '../types';

interface RefreshParams {
  circleRadius: number;
  arrowWidth: number;
  arcAngle: number;
}

/**
 * Compile a refresh icon
 */
export function compileRefreshIcon(
  params: RefreshParams,
  dna: IconDNA,
  _style: 'outline' | 'filled' = 'outline'
): SVGPath[] {
  const { circleRadius, arrowWidth, arcAngle } = params;
  const { viewBoxSize, strokeWidth } = dna;

  const center = viewBoxSize / 2;
  const paths: SVGPath[] = [];

  // Arc path
  const startAngle = 90;
  const endAngle = startAngle + arcAngle;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const startX = center + circleRadius * Math.cos(startRad);
  const startY = center + circleRadius * Math.sin(startRad);
  const endX = center + circleRadius * Math.cos(endRad);
  const endY = center + circleRadius * Math.sin(endRad);

  const largeArc = arcAngle > 180;

  const arcPath = new SVGPathBuilder()
    .moveTo(startX, startY)
    .arc({
      radiusX: circleRadius,
      radiusY: circleRadius,
      rotation: 0,
      largeArc,
      sweep: true,
      endX,
      endY,
      startX,
      startY,
    })
    .build();

  paths.push({
    d: arcPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  // Arrow head at the end of the arc
  const arrowAngle = endRad + Math.PI / 2;
  const arrowTipX = endX + arrowWidth * Math.cos(endRad);
  const arrowTipY = endY + arrowWidth * Math.sin(endRad);
  const arrowBase1X = endX + arrowWidth * 0.5 * Math.cos(arrowAngle);
  const arrowBase1Y = endY + arrowWidth * 0.5 * Math.sin(arrowAngle);
  const arrowBase2X = endX - arrowWidth * 0.5 * Math.cos(arrowAngle);
  const arrowBase2Y = endY - arrowWidth * 0.5 * Math.sin(arrowAngle);

  const arrowPath = new SVGPathBuilder()
    .moveTo(arrowBase1X, arrowBase1Y)
    .lineTo(arrowTipX, arrowTipY)
    .lineTo(arrowBase2X, arrowBase2Y)
    .build();

  paths.push({
    d: arrowPath,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: dna.strokeLineCap,
    strokeLinejoin: dna.strokeLineJoin,
  });

  return paths;
}

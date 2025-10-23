/**
 * SVG Path Builder
 *
 * Utility for constructing SVG paths programmatically.
 * All coordinates are snapped to grid (see constraintSolver).
 */

import type { SVGPathData, Point, Arc } from '../types';

/**
 * Precision for rounding coordinates (decimal places)
 */
const PRECISION = 2;

/**
 * Round a number to the specified precision
 */
export function round(value: number, precision = PRECISION): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

/**
 * SVG Path builder class
 */
export class SVGPathBuilder {
  private segments: string[] = [];

  /**
   * Move to a point (M command)
   */
  moveTo(x: number, y: number): this {
    this.segments.push(`M${round(x)},${round(y)}`);
    return this;
  }

  /**
   * Line to a point (L command)
   */
  lineTo(x: number, y: number): this {
    this.segments.push(`L${round(x)},${round(y)}`);
    return this;
  }

  /**
   * Horizontal line (H command)
   */
  horizontalTo(x: number): this {
    this.segments.push(`H${round(x)}`);
    return this;
  }

  /**
   * Vertical line (V command)
   */
  verticalTo(y: number): this {
    this.segments.push(`V${round(y)}`);
    return this;
  }

  /**
   * Cubic Bézier curve (C command)
   */
  curveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): this {
    this.segments.push(
      `C${round(cp1x)},${round(cp1y)} ${round(cp2x)},${round(cp2y)} ${round(x)},${round(y)}`
    );
    return this;
  }

  /**
   * Smooth cubic Bézier curve (S command)
   */
  smoothCurveTo(cp2x: number, cp2y: number, x: number, y: number): this {
    this.segments.push(`S${round(cp2x)},${round(cp2y)} ${round(x)},${round(y)}`);
    return this;
  }

  /**
   * Quadratic Bézier curve (Q command)
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this {
    this.segments.push(`Q${round(cpx)},${round(cpy)} ${round(x)},${round(y)}`);
    return this;
  }

  /**
   * Arc (A command)
   */
  arc(arc: Arc): this {
    this.segments.push(
      `A${round(arc.radiusX)},${round(arc.radiusY)} ${arc.rotation} ${arc.largeArc ? 1 : 0}${arc.sweep ? 1 : 0} ${round(arc.endX)},${round(arc.endY)}`
    );
    return this;
  }

  /**
   * Close path (Z command)
   */
  close(): this {
    this.segments.push('Z');
    return this;
  }

  /**
   * Get the final SVG path string
   */
  build(): SVGPathData {
    return this.segments.join(' ');
  }

  /**
   * Reset the builder
   */
  reset(): this {
    this.segments = [];
    return this;
  }
}

/**
 * Create a circle path
 */
export function createCirclePath(cx: number, cy: number, r: number): SVGPathData {
  const k = 0.5522847498; // Magic constant for circular arc
  const x = r;
  const y = r * k;

  return new SVGPathBuilder()
    .moveTo(cx + r, cy)
    .curveTo(cx + x, cy + y, cx + y, cy + x, cx, cy + r)
    .curveTo(cx - y, cy + x, cx - x, cy + y, cx - r, cy)
    .curveTo(cx - x, cy - y, cx - y, cy - x, cx, cy - r)
    .curveTo(cx + y, cy - x, cx + x, cy - y, cx + r, cy)
    .close()
    .build();
}

/**
 * Create a rectangle path
 */
export function createRectPath(x: number, y: number, width: number, height: number): SVGPathData {
  return new SVGPathBuilder()
    .moveTo(x, y)
    .lineTo(x + width, y)
    .lineTo(x + width, y + height)
    .lineTo(x, y + height)
    .close()
    .build();
}

/**
 * Create a rectangle with rounded corners
 */
export function createRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): SVGPathData {
  const r = Math.min(radius, width / 2, height / 2);

  return new SVGPathBuilder()
    .moveTo(x + r, y)
    .lineTo(x + width - r, y)
    .quadraticCurveTo(x + width, y, x + width, y + r)
    .lineTo(x + width, y + height - r)
    .quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    .lineTo(x + r, y + height)
    .quadraticCurveTo(x, y + height, x, y + height - r)
    .lineTo(x, y + r)
    .quadraticCurveTo(x, y, x + r, y)
    .close()
    .build();
}

/**
 * Create a line path (for stroking)
 */
export function createLinePath(x1: number, y1: number, x2: number, y2: number): SVGPathData {
  return new SVGPathBuilder().moveTo(x1, y1).lineTo(x2, y2).build();
}

/**
 * Create an equilateral triangle path
 */
export function createTrianglePath(
  cx: number,
  cy: number,
  size: number,
  rotation: number = 0
): SVGPathData {
  const angle1 = (rotation * Math.PI) / 180;
  const angle2 = angle1 + (2 * Math.PI) / 3;
  const angle3 = angle1 + (4 * Math.PI) / 3;

  const x1 = cx + size * Math.cos(angle1);
  const y1 = cy + size * Math.sin(angle1);
  const x2 = cx + size * Math.cos(angle2);
  const y2 = cy + size * Math.sin(angle2);
  const x3 = cx + size * Math.cos(angle3);
  const y3 = cy + size * Math.sin(angle3);

  return new SVGPathBuilder()
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .lineTo(x3, y3)
    .close()
    .build();
}

/**
 * Create a polygon path
 */
export function createPolygonPath(points: Point[]): SVGPathData {
  if (points.length < 2) {
    return '';
  }

  const builder = new SVGPathBuilder();
  builder.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    builder.lineTo(points[i].x, points[i].y);
  }

  return builder.close().build();
}

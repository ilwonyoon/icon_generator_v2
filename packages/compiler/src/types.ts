/**
 * Compiler-specific types
 */

/**
 * Style variant for icons
 */
export type IconStyle = 'outline' | 'filled';

/**
 * SVG path data
 */
export type SVGPathData = string;

/**
 * Compiled icon output
 */
export interface CompiledIcon {
  /**
   * Unique ID for this icon instance
   */
  id: string;

  /**
   * Archetype ID (e.g., "search", "home")
   */
  archetypeId: string;

  /**
   * Parameters used to generate this icon
   */
  parameters: Record<string, number | boolean>;

  /**
   * Style variant (outline, filled)
   */
  style: IconStyle;

  /**
   * SVG viewBox attribute
   */
  viewBox: string;

  /**
   * SVG paths for the icon
   */
  paths: SVGPath[];

  /**
   * DNA metadata embedded in the icon
   */
  metadata: {
    dnaId: string;
    archetypeId: string;
    style: IconStyle;
    parameters: Record<string, number | boolean>;
    compiledAt: string;
  };
}

/**
 * A single SVG path element
 */
export interface SVGPath {
  /**
   * SVG path data (d attribute)
   */
  d: SVGPathData;

  /**
   * Fill color or 'none'
   */
  fill?: string;

  /**
   * Stroke color or 'none'
   */
  stroke?: string;

  /**
   * Stroke width
   */
  strokeWidth?: number;

  /**
   * Stroke linecap (butt, round, square)
   */
  strokeLinecap?: string;

  /**
   * Stroke linejoin (miter, round, bevel)
   */
  strokeLinejoin?: string;

  /**
   * Fill rule (evenodd, nonzero)
   */
  fillRule?: string;

  /**
   * Vector effect for non-scaling strokes
   */
  vectorEffect?: string;

  /**
   * Custom attributes
   */
  [key: string]: any;
}

/**
 * Point in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Circle
 */
export interface Circle {
  cx: number;
  cy: number;
  r: number;
}

/**
 * Arc definition
 */
export interface Arc {
  startX: number;
  startY: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  largeArc: boolean;
  sweep: boolean;
  endX: number;
  endY: number;
}

/**
 * Icon DNA Schema
 *
 * Defines the constraints and rules that all icons must follow.
 * The DNA is locked after Phase 1 and cannot be changed without a version bump.
 *
 * DNA encapsulates:
 * - Grid size (base unit for all geometry)
 * - Live area (usable space within the icon)
 * - Stroke properties (width, cap, join)
 * - Corner radius rules
 * - Allowed angles for lines (e.g., 0°, 45°, 90°)
 * - Minimum gaps and feature sizes (for legibility)
 */

/**
 * Line cap style for strokes
 */
export type LineCap = 'butt' | 'round' | 'square';

/**
 * Line join style for strokes
 */
export type LineJoin = 'miter' | 'round' | 'bevel';

/**
 * Color mode for icons
 */
export type ColorMode = 'currentColor' | 'fixed';

/**
 * Icon DNA Schema - The foundational rules for all icons
 */
export interface IconDNA {
  /**
   * Unique identifier for this DNA profile
   * e.g., "corporate-sharp", "playful-rounded"
   */
  id: string;

  /**
   * Human-readable name
   * e.g., "Corporate Sharp", "Playful Rounded"
   */
  name: string;

  /**
   * Description of this DNA profile
   */
  description?: string;

  /**
   * Grid size in pixels (base unit for snapping)
   * All coordinates must snap to this grid
   * Common values: 1, 2, 4
   */
  gridSize: number;

  /**
   * Viewbox size for icons
   * All icons use a square viewBox (e.g., "0 0 24 24")
   * Common values: 16, 24, 32
   */
  viewBoxSize: number;

  /**
   * Live area (usable space within viewBox)
   * Coordinates outside this are considered padding
   * Common range: 2-22 for a 24px viewBox
   */
  liveAreaInset: number;

  /**
   * Stroke width in pixels
   * All filled outlines use this width
   */
  strokeWidth: number;

  /**
   * Line cap style for strokes
   */
  strokeLineCap: LineCap;

  /**
   * Line join style for strokes
   */
  strokeLineJoin: LineJoin;

  /**
   * Allowed corner radius values (in pixels)
   * Radii must be one of these values or 0
   * e.g., [0, 1, 2, 4]
   */
  allowedRadii: number[];

  /**
   * Allowed angles for lines (in degrees)
   * Lines must align to one of these angles
   * Common values: [0, 45, 90] for orthogonal + diagonals
   */
  allowedAngles: number[];

  /**
   * Minimum gap between features (in pixels)
   * Used to prevent features from touching and becoming illegible
   */
  minimumGap: number;

  /**
   * Minimum feature size (in pixels)
   * Prevents details from being too small to render
   */
  minimumFeatureSize: number;

  /**
   * Color mode for this DNA
   */
  colorMode: ColorMode;

  /**
   * Primary color (if colorMode is 'fixed')
   * CSS color value, e.g., "#000000"
   */
  primaryColor?: string;

  /**
   * Version of this DNA schema
   * Used for migrations and compatibility tracking
   */
  version: number;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Last modified timestamp
   */
  updatedAt: string;
}

/**
 * Validate an Icon DNA object
 * Throws an error if validation fails
 */
export function validateDNA(dna: unknown): asserts dna is IconDNA {
  if (!dna || typeof dna !== 'object') {
    throw new Error('DNA must be an object');
  }

  const d = dna as Record<string, unknown>;

  // Required string fields
  if (typeof d.id !== 'string' || d.id.length === 0) {
    throw new Error('DNA.id must be a non-empty string');
  }

  if (typeof d.name !== 'string' || d.name.length === 0) {
    throw new Error('DNA.name must be a non-empty string');
  }

  // Required number fields
  if (typeof d.gridSize !== 'number' || d.gridSize <= 0) {
    throw new Error('DNA.gridSize must be a positive number');
  }

  if (typeof d.viewBoxSize !== 'number' || d.viewBoxSize <= 0) {
    throw new Error('DNA.viewBoxSize must be a positive number');
  }

  if (typeof d.liveAreaInset !== 'number' || d.liveAreaInset < 0) {
    throw new Error('DNA.liveAreaInset must be a non-negative number');
  }

  if (typeof d.strokeWidth !== 'number' || d.strokeWidth <= 0) {
    throw new Error('DNA.strokeWidth must be a positive number');
  }

  if (typeof d.minimumGap !== 'number' || d.minimumGap < 0) {
    throw new Error('DNA.minimumGap must be a non-negative number');
  }

  if (typeof d.minimumFeatureSize !== 'number' || d.minimumFeatureSize <= 0) {
    throw new Error('DNA.minimumFeatureSize must be a positive number');
  }

  // Validate arrays
  if (!Array.isArray(d.allowedRadii) || !d.allowedRadii.every((r) => typeof r === 'number')) {
    throw new Error('DNA.allowedRadii must be an array of numbers');
  }

  if (!Array.isArray(d.allowedAngles) || !d.allowedAngles.every((a) => typeof a === 'number')) {
    throw new Error('DNA.allowedAngles must be an array of numbers');
  }

  // Validate line properties
  const validLineCaps: LineCap[] = ['butt', 'round', 'square'];
  if (!validLineCaps.includes(d.strokeLineCap as LineCap)) {
    throw new Error(`DNA.strokeLineCap must be one of: ${validLineCaps.join(', ')}`);
  }

  const validLineJoins: LineJoin[] = ['miter', 'round', 'bevel'];
  if (!validLineJoins.includes(d.strokeLineJoin as LineJoin)) {
    throw new Error(`DNA.strokeLineJoin must be one of: ${validLineJoins.join(', ')}`);
  }

  // Validate color mode
  const validColorModes: ColorMode[] = ['currentColor', 'fixed'];
  if (!validColorModes.includes(d.colorMode as ColorMode)) {
    throw new Error(`DNA.colorMode must be one of: ${validColorModes.join(', ')}`);
  }

  if (d.colorMode === 'fixed' && typeof d.primaryColor !== 'string') {
    throw new Error('DNA.primaryColor is required when colorMode is "fixed"');
  }

  // Validate timestamps
  if (typeof d.createdAt !== 'string' || !isValidISO8601(d.createdAt)) {
    throw new Error('DNA.createdAt must be a valid ISO 8601 timestamp');
  }

  if (typeof d.updatedAt !== 'string' || !isValidISO8601(d.updatedAt)) {
    throw new Error('DNA.updatedAt must be a valid ISO 8601 timestamp');
  }
}

/**
 * Check if a string is a valid ISO 8601 timestamp
 */
function isValidISO8601(str: string): boolean {
  return !isNaN(Date.parse(str));
}

/**
 * Create a new DNA profile with default values
 */
export function createDNA(
  id: string,
  name: string,
  overrides?: Partial<Omit<IconDNA, 'id' | 'name' | 'version' | 'createdAt' | 'updatedAt'>>
): IconDNA {
  const now = new Date().toISOString();

  const dna: IconDNA = {
    id,
    name,
    description: overrides?.description,
    gridSize: overrides?.gridSize ?? 1,
    viewBoxSize: overrides?.viewBoxSize ?? 24,
    liveAreaInset: overrides?.liveAreaInset ?? 2,
    strokeWidth: overrides?.strokeWidth ?? 1.5,
    strokeLineCap: overrides?.strokeLineCap ?? 'round',
    strokeLineJoin: overrides?.strokeLineJoin ?? 'round',
    allowedRadii: overrides?.allowedRadii ?? [0, 2, 4],
    allowedAngles: overrides?.allowedAngles ?? [0, 45, 90],
    minimumGap: overrides?.minimumGap ?? 1,
    minimumFeatureSize: overrides?.minimumFeatureSize ?? 2,
    colorMode: overrides?.colorMode ?? 'currentColor',
    primaryColor: overrides?.primaryColor,
    version: 1,
    createdAt: now,
    updatedAt: now,
  };

  validateDNA(dna);
  return dna;
}

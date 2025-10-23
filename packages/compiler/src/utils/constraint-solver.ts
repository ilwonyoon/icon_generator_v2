/**
 * Constraint Solver
 *
 * Ensures all geometry follows DNA constraints:
 * - Grid snapping (coordinates aligned to grid)
 * - Angle quantization (lines aligned to allowed angles)
 * - Spacing enforcement (minimum gaps between features)
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { Point } from '../types';

/**
 * Snap a coordinate to the nearest grid point
 */
export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Snap a point to the grid
 */
export function snapPointToGrid(point: Point, gridSize: number): Point {
  return {
    x: snapToGrid(point.x, gridSize),
    y: snapToGrid(point.y, gridSize),
  };
}

/**
 * Snap multiple points to the grid
 */
export function snapPointsToGrid(points: Point[], gridSize: number): Point[] {
  return points.map((p) => snapPointToGrid(p, gridSize));
}

/**
 * Normalize an angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

/**
 * Find the closest allowed angle
 */
export function quantizeAngle(angle: number, allowedAngles: number[]): number {
  const normalized = normalizeAngle(angle);

  // Find the closest allowed angle
  let closest = allowedAngles[0];
  let minDiff = Math.abs(normalized - closest);

  for (const allowed of allowedAngles) {
    const diff = Math.abs(normalized - allowed);
    if (diff < minDiff) {
      minDiff = diff;
      closest = allowed;
    }
  }

  return closest;
}

/**
 * Calculate the angle between two points (in degrees)
 */
export function getAngle(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return normalizeAngle(angle);
}

/**
 * Quantize the line between two points
 * Adjusts p2 so the line aligns to an allowed angle
 */
export function quantizeLineTo(
  p1: Point,
  p2: Point,
  allowedAngles: number[],
  distance: number = Math.hypot(p2.x - p1.x, p2.y - p1.y)
): Point {
  const angle = getAngle(p1, p2);
  const quantized = quantizeAngle(angle, allowedAngles);
  const radians = (quantized * Math.PI) / 180;

  return {
    x: p1.x + distance * Math.cos(radians),
    y: p1.y + distance * Math.sin(radians),
  };
}

/**
 * Ensure a radius respects allowed values
 */
export function quantizeRadius(radius: number, allowedRadii: number[]): number {
  if (radius <= 0 || allowedRadii.includes(0)) {
    return 0;
  }

  // Find closest allowed radius
  let closest = allowedRadii[0];
  let minDiff = Math.abs(radius - closest);

  for (const allowed of allowedRadii) {
    if (allowed <= 0) continue;
    const diff = Math.abs(radius - allowed);
    if (diff < minDiff) {
      minDiff = diff;
      closest = allowed;
    }
  }

  return closest;
}

/**
 * Validate spacing between features
 * Returns true if spacing meets minimum requirements
 */
export function validateSpacing(
  features: Point[],
  minimumGap: number
): boolean {
  for (let i = 0; i < features.length; i++) {
    for (let j = i + 1; j < features.length; j++) {
      const dx = features[j].x - features[i].x;
      const dy = features[j].y - features[i].y;
      const distance = Math.hypot(dx, dy);

      if (distance < minimumGap) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Ensure a feature is at least minimumSize in all dimensions
 */
export function validateFeatureSize(
  width: number,
  height: number,
  minimumSize: number
): boolean {
  return width >= minimumSize && height >= minimumSize;
}

/**
 * Complete constraint validation
 */
export function validateConstraints(
  dna: IconDNA,
  features: Point[],
  featureSize: number
): string[] {
  const errors: string[] = [];

  // Validate spacing
  if (!validateSpacing(features, dna.minimumGap)) {
    errors.push(
      `Features are too close together. Minimum gap required: ${dna.minimumGap}px`
    );
  }

  // Validate feature size
  if (!validateFeatureSize(featureSize, featureSize, dna.minimumFeatureSize)) {
    errors.push(
      `Feature size ${featureSize}px is too small. Minimum required: ${dna.minimumFeatureSize}px`
    );
  }

  return errors;
}

/**
 * Adjust a value to be within a range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Calculate distance between two points
 */
export function distance(p1: Point, p2: Point): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Check if a point is within a rectangle
 */
export function isPointInRect(
  point: Point,
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
}

/**
 * Icon Builder Shared Types
 *
 * Central location for all shared TypeScript types, schemas, and constants
 * used across the Icon Builder monorepo.
 */

export * from './dna';
export * from './archetype';

/**
 * Geometry types used throughout the compiler
 */
export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  cx: number;
  cy: number;
  r: number;
}

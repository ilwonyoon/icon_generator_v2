/**
 * Icon Archetypes
 *
 * Each archetype is a parameterized function that compiles to SVG paths.
 * All archetypes follow the same interface:
 *   (params, dna, style) => SVGPath[]
 */

import type { IconDNA } from '@icon-builder/shared-types';
import type { SVGPath } from '../types';
import { compileHomeIcon } from './home';
import { compileSearchIcon } from './search';

/**
 * Archetype compiler function signature
 */
export type ArchetypeCompiler = (
  params: Record<string, number | boolean>,
  dna: IconDNA,
  style: 'outline' | 'filled'
) => SVGPath[];

/**
 * Registry of all archetype compilers
 */
export const ARCHETYPE_COMPILERS: Record<string, ArchetypeCompiler> = {
  home: (params, dna, style) =>
    compileHomeIcon(
      params as unknown as Parameters<typeof compileHomeIcon>[0],
      dna,
      style
    ),
  search: (params, dna, style) =>
    compileSearchIcon(
      params as unknown as Parameters<typeof compileSearchIcon>[0],
      dna,
      style
    ),

  // TODO: Phase 2 - Implement remaining archetypes
  settings: () => [],
  profile: () => [],
  trash: () => [],
  download: () => [],
  upload: () => [],
  edit: () => [],
  add: () => [],
  remove: () => [],
  play: () => [],
  pause: () => [],
  refresh: () => [],
  share: () => [],
  info: () => [],
  warning: () => [],
};

/**
 * Get an archetype compiler by ID
 */
export function getArchetypeCompiler(id: string): ArchetypeCompiler | undefined {
  return ARCHETYPE_COMPILERS[id];
}

/**
 * Check if an archetype exists
 */
export function hasArchetype(id: string): boolean {
  return id in ARCHETYPE_COMPILERS;
}

/**
 * Get all archetype IDs
 */
export function getAllArchetypeIds(): string[] {
  return Object.keys(ARCHETYPE_COMPILERS);
}

export * from './home';
export * from './search';

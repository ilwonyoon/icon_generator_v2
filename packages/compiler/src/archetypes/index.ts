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
import { compileSettingsIcon } from './settings';
import { compileProfileIcon } from './profile';
import { compileTrashIcon } from './trash';
import { compileDownloadIcon } from './download';
import { compileUploadIcon } from './upload';
import { compileEditIcon } from './edit';
import { compileAddIcon } from './add';
import { compileRemoveIcon } from './remove';
import { compilePlayIcon } from './play';
import { compilePauseIcon } from './pause';
import { compileRefreshIcon } from './refresh';
import { compileShareIcon } from './share';
import { compileInfoIcon } from './info';
import { compileWarningIcon } from './warning';

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
  settings: (params, dna, style) =>
    compileSettingsIcon(
      params as unknown as Parameters<typeof compileSettingsIcon>[0],
      dna,
      style
    ),
  profile: (params, dna, style) =>
    compileProfileIcon(
      params as unknown as Parameters<typeof compileProfileIcon>[0],
      dna,
      style
    ),
  trash: (params, dna, style) =>
    compileTrashIcon(
      params as unknown as Parameters<typeof compileTrashIcon>[0],
      dna,
      style
    ),
  download: (params, dna, style) =>
    compileDownloadIcon(
      params as unknown as Parameters<typeof compileDownloadIcon>[0],
      dna,
      style
    ),
  upload: (params, dna, style) =>
    compileUploadIcon(
      params as unknown as Parameters<typeof compileUploadIcon>[0],
      dna,
      style
    ),
  edit: (params, dna, style) =>
    compileEditIcon(
      params as unknown as Parameters<typeof compileEditIcon>[0],
      dna,
      style
    ),
  add: (params, dna, style) =>
    compileAddIcon(
      params as unknown as Parameters<typeof compileAddIcon>[0],
      dna,
      style
    ),
  remove: (params, dna, style) =>
    compileRemoveIcon(
      params as unknown as Parameters<typeof compileRemoveIcon>[0],
      dna,
      style
    ),
  play: (params, dna, style) =>
    compilePlayIcon(
      params as unknown as Parameters<typeof compilePlayIcon>[0],
      dna,
      style
    ),
  pause: (params, dna, style) =>
    compilePauseIcon(
      params as unknown as Parameters<typeof compilePauseIcon>[0],
      dna,
      style
    ),
  refresh: (params, dna, style) =>
    compileRefreshIcon(
      params as unknown as Parameters<typeof compileRefreshIcon>[0],
      dna,
      style
    ),
  share: (params, dna, style) =>
    compileShareIcon(
      params as unknown as Parameters<typeof compileShareIcon>[0],
      dna,
      style
    ),
  info: (params, dna, style) =>
    compileInfoIcon(
      params as unknown as Parameters<typeof compileInfoIcon>[0],
      dna,
      style
    ),
  warning: (params, dna, style) =>
    compileWarningIcon(
      params as unknown as Parameters<typeof compileWarningIcon>[0],
      dna,
      style
    ),
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
export * from './settings';
export * from './profile';
export * from './trash';
export * from './download';
export * from './upload';
export * from './edit';
export * from './add';
export * from './remove';
export * from './play';
export * from './pause';
export * from './refresh';
export * from './share';
export * from './info';
export * from './warning';

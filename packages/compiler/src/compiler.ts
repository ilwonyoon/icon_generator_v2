/**
 * Icon Compiler
 *
 * Compiles archetype parameters + DNA constraints → SVG icon.
 * This is the core engine of Icon Builder.
 */

import type { IconDNA } from '@icon-builder/shared-types';
import { validateArchetypeParams } from '@icon-builder/shared-types';
import { ARCHETYPE_COMPILERS } from './archetypes';
import type { CompiledIcon, SVGPath, IconStyle } from './types';

/**
 * Compile an icon from archetype parameters
 */
export function compileIcon(
  archetypeId: string,
  params: Record<string, number | boolean>,
  dna: IconDNA,
  style: IconStyle = 'outline'
): CompiledIcon {
  // Validate archetype exists
  const compiler = ARCHETYPE_COMPILERS[archetypeId];
  if (!compiler) {
    throw new Error(`Unknown archetype: ${archetypeId}`);
  }

  // Validate parameters
  const errors = validateArchetypeParams(archetypeId, params);
  if (errors.length > 0) {
    throw new Error(`Invalid parameters for ${archetypeId}:\n${errors.join('\n')}`);
  }

  // Compile the icon
  const paths = compiler(params, dna, style);

  // Generate ID
  const id = generateIconId(archetypeId, params, style);

  // Generate viewBox
  const viewBox = `0 0 ${dna.viewBoxSize} ${dna.viewBoxSize}`;

  // Create metadata
  const metadata = {
    dnaId: dna.id,
    archetypeId,
    style,
    parameters: params,
    compiledAt: new Date().toISOString(),
  };

  return {
    id,
    archetypeId,
    parameters: params,
    style,
    viewBox,
    paths,
    metadata,
  };
}

/**
 * Convert a compiled icon to SVG markup
 */
export function compiledIconToSVG(icon: CompiledIcon): string {
  const pathsMarkup = icon.paths
    .map((path) => {
      const attrs = [
        `d="${path.d}"`,
        path.fill !== undefined ? `fill="${path.fill}"` : '',
        path.stroke !== undefined ? `stroke="${path.stroke}"` : '',
        path.strokeWidth !== undefined ? `stroke-width="${path.strokeWidth}"` : '',
        path.strokeLinecap ? `stroke-linecap="${path.strokeLinecap}"` : '',
        path.strokeLinejoin ? `stroke-linejoin="${path.strokeLinejoin}"` : '',
        path.fillRule ? `fill-rule="${path.fillRule}"` : '',
        path.vectorEffect ? `vector-effect="${path.vectorEffect}"` : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `  <path ${attrs} />`;
    })
    .join('\n');

  // Embed DNA metadata as comment
  const metadataComment = `<!-- Icon DNA: ${JSON.stringify(icon.metadata)} -->`;

  return `<svg viewBox="${icon.viewBox}" xmlns="http://www.w3.org/2000/svg">
${metadataComment}
${pathsMarkup}
</svg>`;
}

/**
 * Generate a unique ID for an icon instance
 */
function generateIconId(
  archetypeId: string,
  params: Record<string, number | boolean>,
  style: IconStyle
): string {
  // Simple hash-like ID based on archetype + params + style
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join(',');

  const hash = hashString(`${archetypeId}|${paramString}|${style}`);
  return `icon-${hash}`;
}

/**
 * Simple hash function for strings
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).substring(0, 8);
}

export { type CompiledIcon, type SVGPath, type IconStyle };

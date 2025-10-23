# @icon-builder/shared-types

Shared TypeScript types and schemas for Icon Builder.

## Exports

- **Icon DNA Schema** - Core constraints and rules for all icons
- **Archetype Definitions** - 15 universal icon archetypes with parameters
- **Validation Functions** - Validate DNA and archetype parameters

## Usage

```typescript
import { createDNA, ARCHETYPES, validateArchetypeParams } from '@icon-builder/shared-types';

// Create a DNA profile
const dna = createDNA('corporate-sharp', 'Corporate Sharp', {
  gridSize: 1,
  strokeWidth: 1.5,
  allowedAngles: [0, 45, 90],
});

// Get an archetype
const searchArchetype = ARCHETYPES['search'];

// Validate parameters
const errors = validateArchetypeParams('search', {
  lensRadius: 5,
  handleLength: 5,
  handleAngle: 45,
});
```

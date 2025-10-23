# Icon Builder

A deterministic, parametric icon generation system that creates pixel-perfect, design-token-aligned icons for design systems.

## Overview

**Icon Builder** combines a constraint-solving compiler with an optional LLM layer to generate consistent, high-quality icons. Unlike traditional AI icon generators, the core system is **deterministic**—geometry is always produced by rules-based compilation. An optional LLM can map natural language descriptions to structured parameters, but it never generates geometry directly.

### Key Features

- **Deterministic parametric engine** – generates exact SVGs based on archetype parameters and DNA rules
- **Style enforcement** – linter checks for compliance with minimum gaps, feature sizes, and allowed angles
- **Multi-style support** – outline and filled variations built from the same underlying geometry
- **Live preview** – real-time preview at 16/20/24 px on light and dark backgrounds
- **Legibility warnings** – automatic warnings for icons that violate design constraints
- **Extensible archetypes** – add new icon types by defining parameterized templates

## Project Status

Early development (Phase 0: Planning & Setup)

See `prd.md` for the complete product requirements document.

## Documentation

- **[prd.md](./prd.md)** – Product requirements, architecture, and detailed roadmap
- **[PROGRESS.md](./PROGRESS.md)** – Development task tracker by phase
- **[CLAUDE.md](./CLAUDE.md)** – Architecture guidance for developers

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, ShadCN UI, Zustand, Konva.js
- **Backend:** Fastify, PostgreSQL, BullMQ, S3/Minio
- **Compiler:** Pure TypeScript (framework-agnostic)
- **Testing:** Vitest, Playwright, Percy/Chromatic
- **Distribution:** Node.js CLI, npm package

## Monorepo Structure

```
packages/
├── compiler          # Core parametric engine (framework-agnostic)
├── ui                # Next.js web application
├── cli               # Node.js CLI for batch operations
└── shared-types      # Shared TypeScript types and schemas
```

## Quick Start

(Coming soon after Phase 1)

## Development

See [CLAUDE.md](./CLAUDE.md) for detailed development guidance.

## License

MIT (or your preferred license)

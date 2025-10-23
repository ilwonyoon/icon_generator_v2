# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Icon Builder** is a deterministic, parametric icon generation system that creates pixel-perfect, design-token-aligned icons for design systems. It combines a constraint-solving compiler with an optional LLM layer for natural-language-to-parameters mapping.

**Key Philosophy:** Determinism first, AI second. Geometry is always produced by rules-based compilation; LLM is optional convenience.

See `prd.md` for the complete product requirements document and `PROGRESS.md` for development task tracking.

---

## Architecture

### High-Level Structure

```
icon_generator_v2/
├── prd.md                 # Product requirements (source of truth)
├── PROGRESS.md            # Development task tracking
├── CLAUDE.md              # This file
├── packages/
│   ├── compiler/          # Core parametric engine (framework-agnostic)
│   ├── ui/                # Next.js web app
│   ├── cli/               # Node.js CLI for batch operations
│   └── shared-types/      # Shared TypeScript types & schemas
├── pnpm-workspace.yaml    # Monorepo workspace config
└── turbo.json             # Turborepo build orchestration (optional)
```

### Core Concepts

1. **Icon DNA Schema**: Constraints that all icons must follow (grid, stroke width, minimum gaps, allowed angles, etc.)
2. **Parametric Compiler**: TypeScript functions that convert archetype parameters → precise SVG paths
3. **Linter**: Validates icons against DNA constraints; provides auto-fix suggestions
4. **Constraint Solver**: Snaps geometry to grid and quantizes angles
5. **15 Universal Archetypes**: home, search, settings, profile, trash, download, upload, edit, add, remove, play, pause, refresh, share, info, warning

### Monorepo Rationale

- **compiler**: Core business logic; used by web app and CLI. Zero framework dependencies for maximum reusability.
- **ui**: Next.js SPA with Zustand state, Konva preview, ShadCN UI components
- **cli**: Node.js CLI tool for batch operations (compile, lint, fix, stamp, diff, batch)
- **shared-types**: Shared TypeScript types, schemas, and constants

---

## Development Workflow

### Before You Start

1. Read `prd.md` (Sections 1-5) to understand the product vision
2. Read `prd.md` Section 7 to understand which phase you're working on
3. Check `PROGRESS.md` for the specific tasks and their status
4. Understand the Definition of Done (DoD) for your phase before starting

### Phase-Specific Guidance

#### Phase 1 – Foundations & Schema (Weeks 1-2)

**Focus:** Schema design and planning, not code.

- Lock Icon DNA schema in TypeScript. Don't change it later.
- Document all 15 archetypes with their parameter ranges
- Get design sign-off on wireframes before moving to Phase 2

**Key file:** `packages/shared-types/src/dna.ts` (to be created)

#### Phase 2 – Compiler Engine (Weeks 3-5)

**Focus:** Build deterministic geometry generation and linting.

- `packages/compiler/src/archetypes/` – one file per archetype
- `packages/compiler/src/linter.ts` – validates against DNA rules
- `packages/compiler/src/constraintSolver.ts` – grid snapping, angle quantization
- All tests are snapshot tests + geometry validation
- No external dependencies except: svgpath, bezier-js, polygon-clipping

**Key principle:** Every SVG generated must be deterministic (same inputs → exact same output)

#### Phase 3 – Web App UI (Weeks 6-8)

**Focus:** Interactive UI with live preview.

- `packages/ui/src/store/` – Zustand stores for DNA profiles, parameters, UI state
- `packages/ui/src/components/` – ShadCN-based components
- `packages/ui/src/lib/preview.ts` – Konva.js + resvg-js rendering
- Connect compiler to UI; no business logic in UI

**Key principle:** Preview updates must be <100 ms for smooth interaction

#### Phase 4 – Backend & Persistence (Weeks 9-10)

**Focus:** API and database.

- `packages/backend/src/routes/` – REST API endpoints
- `packages/backend/src/db/migrations/` – PostgreSQL migrations
- `packages/backend/src/jobs/` – BullMQ job queue
- API docs auto-generated from OpenAPI

**Key principle:** No breaking changes to API after Phase 3 UI is complete

#### Phase 5 – LLM Integration & Presets (Weeks 11-12)

**Focus:** Optional LLM layer and preset system.

- LLM is optional; must have graceful fallback
- Strict JSON schema validation on LLM outputs
- Presets are just saved DNA profiles

**Key principle:** Invalid LLM output should never crash the system

#### Phase 6 – CLI & Automation (Week 13)

**Focus:** Distribution and CI/CD.

- CLI commands are composable (small, focused utilities)
- GitHub Actions gates PRs on icon linter passes
- Package published to npm for distribution

**Key principle:** CLI uses same compiler; maximum code reuse

#### Phase 7 – Visual Regression Testing & QA (Week 14)

**Focus:** Quality gates and documentation.

- Visual regression baseline for all 15 archetypes at 16/20/24 px
- Legibility validation at smallest size (16 px)
- Comprehensive user and developer documentation

**Key principle:** All testing uses actual pixel rendering (resvg-js), not vector-only

---

## Common Development Tasks

### Running the Monorepo

```bash
# Install dependencies (pnpm)
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Lint and format
pnpm run lint
pnpm run format

# Watch mode (development)
pnpm run dev
```

### Testing

```bash
# Unit tests (Vitest)
pnpm -r run test

# UI tests (Playwright)
pnpm -w --filter ui run test:e2e

# Snapshot tests
pnpm -r run test -- -u  # Update snapshots

# Coverage
pnpm -r run test -- --coverage
```

### Building Individual Packages

```bash
# Compiler only
pnpm -r --filter compiler run build

# Web app only
pnpm -r --filter ui run build

# CLI only
pnpm -r --filter cli run build
```

### Local Development with Live Reload

```bash
# Terminal 1: Watch compiler
pnpm -r --filter compiler run watch

# Terminal 2: Run web app dev server
pnpm -r --filter ui run dev

# Web app will auto-reload when compiler changes
```

---

## Important Design Decisions

### 1. Monorepo with pnpm Workspaces

- Allows compiler to be used independently
- Enables shared types without circular dependencies
- Faster builds with Turborepo

### 2. Deterministic Geometry

- No randomness in SVG generation
- Same parameters always produce identical output
- Enables reliable snapshot testing

### 3. TypeScript Everywhere

- Type safety for DNA schema and compiler
- Easier refactoring and maintenance
- Better IDE support and documentation

### 4. LLM is Optional

- Core product works without LLM
- LLM adds convenience, not capability
- Graceful degradation if LLM unavailable

### 5. Separate Compiler Package

- Reusable in web, CLI, Figma plugin, and future tools
- Framework-agnostic; can be used in Node.js, browser, even Python
- Testable in isolation

### 6. No Framework Dependencies in Compiler

- Only geometric libraries: svgpath, bezier-js, polygon-clipping
- Reduces bundle size for web and Figma plugin
- Maximum portability

---

## Code Organization & Naming

### DNA & Types

All types related to Icon DNA live in `packages/shared-types/src/`:
- `dna.ts` – Icon DNA schema and validation
- `archetype.ts` – Archetype types and parameters
- `config.ts` – Global configuration types

### Compiler

All geometry generation lives in `packages/compiler/src/`:
- `archetypes/home.ts`, `search.ts`, etc. – One function per archetype
- `compiler.ts` – Main compile entry point
- `linter.ts` – DNA validation and rule checking
- `constraintSolver.ts` – Grid snapping and quantization
- `utils/geometry.ts` – Vector math utilities

**Naming convention:** `compileSearchIcon(params: SearchIconParams, dna: IconDNA): SVGPathData`

### UI Components

All React components live in `packages/ui/src/components/`:
- `ArchetypeSelector.tsx` – Archetype list
- `ParameterControls.tsx` – Parameter inputs
- `IconPreview.tsx` – Konva canvas preview
- `ExportPanel.tsx` – Export options
- `LegibilityWarnings.tsx` – Linter warning display

### Stores (Zustand)

All state stores live in `packages/ui/src/store/`:
- `dnaStore.ts` – DNA profile state
- `parameterStore.ts` – Current parameters
- `uiStore.ts` – UI state (selected archetype, preview sizes, etc.)

### Backend

All API routes live in `packages/backend/src/routes/`:
- `profiles.ts` – DNA profile CRUD
- `icons.ts` – Icon save/list
- `export.ts` – Export job queue

---

## Critical Path & Dependencies

**Critical Path (must complete in order):**

1. ✅ Phase 1: DNA schema locked (prerequisite for everything)
2. 📌 Phase 2: Compiler engine (prerequisite for UI and CLI)
3. 📌 Phase 3: Web app UI (prerequisite for backend integration)
4. 📌 Phase 4: Backend persistence
5. 📌 Phase 5: LLM integration (optional, doesn't block launch)
6. 📌 Phase 6: Plugins & automation (optional, doesn't block MVP)
7. 📌 Phase 7: QA & documentation

**Can be done in parallel:**
- Phase 5 (LLM) can start after Phase 4 API is stable
- Phase 6 (Plugins) can start once compiler in Phase 2 is done
- Phase 7 (QA) can run alongside Phase 6

---

## Constraints & Guardrails

### DNA Schema is Locked After Phase 1

- Once Phase 1 is done, the Icon DNA schema cannot change
- All existing code and tests depend on it
- Use version numbers if breaking changes become necessary

### No Breaking Changes to Compiler API

- If you must change a compiler function signature, create a v2 variant
- Maintain backward compatibility for web app, CLI, and Figma plugin

### All Geometry Must Be Pixel-Perfect

- Use resvg-js for preview rendering, not just vector display
- Test legibility at 16 px (the smallest size)
- Validate with actual rasterization, not just SVG inspection

### Linter Is Your Friend

- Before every commit, run the linter on your icons
- Auto-fix should catch most issues
- Manual fixes are a last resort

### CLI & Figma Plugin Use Same Compiler

- No duplicated geometry logic
- If fixing a geometry bug in compiler, it fixes both CLI and Figma automatically

---

## Testing Strategy

### Unit Tests (Vitest)

- Snapshot tests for all 15 archetypes (compiler output)
- Linter rule tests (pass/fail cases)
- Geometry validation tests (grid snapping, angle quantization)
- Store tests (Zustand state management)

### Integration Tests (Playwright)

- Full user workflows (select archetype → adjust params → export)
- Parameter changes trigger preview updates
- Export functions produce valid SVG and React code

### Visual Regression (Percy or Chromatic)

- Baseline for all 15 archetypes at 16/20/24 px
- Light and dark backgrounds
- Automated diffs on every commit

### Manual Usability Testing

- Conduct with 3-5 design stakeholders
- Measure time to produce icon (target: ≤2 minutes)
- Gather feedback on parameter discovery and UI/UX

---

## Common Gotchas

### 1. SVG Path Precision

- Rounding errors accumulate; use consistent precision (e.g., 2 decimal places)
- Grid snapping must happen before final SVG output

### 2. Preview vs. Production Rendering

- During preview: use `vector-effect="non-scaling-stroke"` for stroke width
- In production: snap all coordinates to grid; no vector effects needed

### 3. LLM Response Validation

- Always validate LLM output against JSON schema
- Invalid responses should trigger fallback to defaults
- Never trust raw LLM geometry

### 4. Parameter Ranges

- Each archetype parameter has min/max bounds
- Validate on input; clamp if necessary
- Document ranges in code comments

### 5. Monorepo Build Order

- Compiler must build before UI and CLI
- Use Turborepo or manual `pnpm run build` in correct order
- Watch mode handles dependencies automatically

---

## Performance Targets

- **Preview updates:** <100 ms (parameter change → render)
- **Rasterization:** <50 ms (SVG → PNG at 16/20/24 px)
- **API responses:** <200 ms (profile save/icon compile)
- **Lighthouse score:** ≥90 on desktop
- **CLI performance:** Icon compile <500 ms

---

## External Dependencies (Minimal & Vetted)

### Compiler (Zero Framework Dependencies)
- `svgpath` – SVG path parsing and manipulation
- `bezier-js` – Bézier curve math
- `polygon-clipping` – Boolean polygon operations

### UI
- `next` – Framework
- `react` – Component library
- `shadcn/ui` – Component library (built on Radix + Tailwind)
- `zustand` – State management
- `konva` – Canvas library
- `resvg-js` – SVG rasterization

### Backend
- `fastify` – Web framework
- `postgres` – Database client
- `bullmq` – Job queue
- `aws-sdk` – S3 integration (or minio)

### Testing
- `vitest` – Unit tests
- `playwright` – E2E tests
- `percy` or `chromatic` – Visual regression

---

## Resources

- **prd.md**: Product requirements and full specification
- **PROGRESS.md**: Detailed task checklist by phase
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **ShadCN UI**: https://ui.shadcn.com/
- **Zustand**: https://github.com/pmndrs/zustand
- **Konva.js**: https://konva.js.org/
- **Fastify**: https://www.fastify.io/
- **pnpm Workspaces**: https://pnpm.io/workspaces

---

## Questions?

If you're unsure about:
- Product direction → check `prd.md`
- Current tasks → check `PROGRESS.md`
- Architecture → check this file
- Code specifics → check the source files and inline comments

Always default to the **Deterministic Philosophy**: if it can be ruled-based, it should be; if it must be data-driven, make it explicit and testable.

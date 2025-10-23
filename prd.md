# Icon Builder Product Requirements Document

## 1. Context and Problem Statement

Modern digital products rely on icon sets to communicate actions intuitively. Research on iconography highlights four dominant styles—filled, colored, duotone, and outlined icons. Filled icons are solid shapes that preserve legibility on small screens; duotone icons use two colors to add depth without being distracting; outlined icons are elegant and minimalist but require careful design to remain clear. Universal icons like home, search, settings, profile, save, refresh and delete are immediately recognizable across cultures and platforms. Good icon sets consistently implement these styles and provide variations to suit multiple contexts.

Despite this knowledge, many product teams struggle with inconsistent iconography. Designers often manually draw icons, leading to mismatched stroke widths, uneven radii and unclear symbols. AI-driven icon generators exist but typically produce unstructured SVGs and rely on prompts that hallucinate geometry. The team needs an icon builder that is deterministic, aligns with design tokens, and can be extended as design systems evolve. An LLM may assist with mapping natural language to parameters, but it should not generate geometry directly.

## 2. User Goals

- **Designers**: Create a coherent icon library that matches brand guidelines without drawing each icon manually.
- **Design system leads**: Enforce consistent stroke widths, radii, spacing and allowable angles across all icons.
- **Developers**: Export icons as clean SVGs or React components using currentColor, ensuring easy integration with frameworks and theming.
- **Non-design stakeholders**: Generate icons from plain language descriptions or sketches, reducing dependence on specialized tools.

## 3. Pain Points

- **Inconsistent style**: Different teams produce icons with varying stroke widths and proportions, leading to a patchwork appearance.
- **Manual creation overhead**: Drawing and refining icons for multiple sizes and variations is time-intensive.
- **Poor legibility**: Small details disappear at 16–20 px; outlined icons collapse on dark backgrounds without careful spacing.
- **Lack of integration**: Designers export from Figma, while developers import from separate libraries, creating misalignment.
- **Unstructured AI output**: Current AI tools output uncontrolled paths; they don't respect design tokens or the minimum spacing rules necessary for readability.

## 4. Proposed Solution

The Icon Builder is a parametric design tool that deterministically constructs icons from a defined Icon DNA. The DNA encapsulates grid size, live area, stroke width, line cap and join style, corner radius, allowed angles, minimum gap and feature sizes, and color mode (currentColor). Each icon archetype (search, home, etc.) has a set of parameters (e.g., lens radius and handle angle for a search icon) that control its shape. A constraint solver quantizes all geometry to the grid and allowed angles and ensures minimum spacing.

### Optional LLM Layer

The system does not depend on a large language model to generate SVG. Geometry is always produced deterministically by the compiler. An LLM can optionally map free-form text descriptions to structured parameters—e.g., "rounded search icon with longer handle" → archetype: search, lensRadius: 6, handleLength: 5. All LLM outputs are validated against the DNA schema; invalid entries revert to defaults. This integration is strictly optional and has no bearing on the core generation engine.

### Key Features

- **Deterministic parametric engine** – generates exact SVGs based on archetype parameters and DNA rules; no randomness.
- **Style enforcement** – linter checks for compliance with minimum gaps, feature sizes and allowed angles.
- **Multi-style support** – outline and filled variations built from the same underlying geometry.
- **Responsive preview** – icons rendered at 16/20/24 px on light and dark backgrounds with automatic legibility warnings.
- **Export formats** – raw SVG (with DNA metadata) and React components using forwardRef for easy integration.
- **Extensible archetypes** – additional icons added by defining new parameterized templates.
- **Integration** – Web app built with Next.js and ShadCN UI; CLI for batch operations.

## 5. User Journey

1. **Setup DNA** – The user selects or creates a style profile specifying grid size, stroke width, radii, and allowed angles.
2. **Choose archetype** – The user picks a universal icon (search, home, settings, etc.). They can also create new archetypes by defining parameter names and ranges.
3. **Enter inputs** – The user either sets parameters via sliders and numeric inputs or enters a natural-language description. If text is used, an optional LLM maps it to structured parameters, subject to validation.
4. **Preview & refine** – The engine generates a live SVG preview at multiple sizes. Legibility warnings appear if minimum gaps or features are violated. The user adjusts parameters until satisfied.
5. **Select style** – The user toggles between outline and filled variations.
6. **Export** – The final icon is exported as SVG or React component. DNA metadata is embedded in the SVG for future audits.

## 6. Technical Architecture & Stack

### Recommended Stack (Finalized)

| Component | Technology & Notes |
|-----------|-------------------|
| **UI** | Next.js 15 + React 19 (TypeScript) for SPA; ShadCN UI + Radix + Tailwind for accessible, customizable components. |
| **State Management** | Zustand for lightweight, predictable state without boilerplate; store profiles, current parameters, and UI state. |
| **Canvas & Preview** | Konva.js for interactive icon preview; resvg-js to rasterize SVGs at 16/20/24 px for pixel-perfect legibility testing. |
| **Geometry Engine** | Pure TypeScript modules; geometry handled via svgpath (path parsing), bezier-js (curve math), polygon-clipping (boolean ops), and manual vector math utilities. Grid snapping and angle quantization via utility functions. Production icons use snapped coordinates; previews use vector-effect="non-scaling-stroke". |
| **Optional LLM Service** | OpenAI API, Anthropic Claude API, or self-hosted (Ollama/Llama 2). Used exclusively for text→parameter mapping. Strict JSON schema validation with fallback to defaults on invalid input. |
| **Backend** | Fastify (lightweight, fast) with TypeScript; PostgreSQL for storing style profiles, icon metadata, and user data; S3 or Minio for asset storage; BullMQ for async jobs (export, lint, compile). |
| **Testing & QA** | Vitest for fast unit tests; Playwright for UI/integration tests; Percy or Chromatic for visual regression testing; snapshot tests for geometry output. |
| **CI/CD** | GitHub Actions for linting PRs with icons; visual regression gates; automated tests on every commit. |
| **Distribution** | Node.js CLI (commander.js) for batch operations; npm package for embedding engine in other projects. |

### Monorepo Structure (Recommended)

- `packages/compiler` – Core parametric engine (no framework dependencies; reusable)
- `packages/ui` – Next.js web app
- `packages/cli` – Node.js CLI for batch operations
- `packages/shared-types` – Shared TypeScript types and schemas

## 7. Roadmap & Phased Tasks

### Timeline Overview: 14 weeks for complete MVP + extended features

The development is split into 7 phases with clear milestones. Each phase has a definition of done (DoD) that must be met before proceeding. No phase advances without its DoD met.

---

### Phase 1 – Foundations & Schema (Weeks 1-2)

**Goals:**
- Finalize the Icon DNA schema with all constraints and rules
- Identify and document the initial icon archetype set
- Create wireframes and design system tokens for the web app

**Deliverables:**
- Icon DNA TypeScript schema with validation (grid size, live area, stroke width, caps/joins, radii, minimum gaps, allowed angles)
- 15 universal icon archetypes documented with parameter definitions: home, search, settings, profile, trash, download, upload, edit, add, remove, play, pause, refresh, share, info, warning
- Each archetype has documented parameters, valid ranges, and sample values
- Web app wireframes (Figma/sketch): sidebar (archetype + params), center (multi-size preview), right panel (export options)
- Design tokens file (colors, spacing, typography, breakpoints)
- Repository scaffolding (monorepo structure with pnpm workspaces or Turborepo)

**Definition of Done:**
- Schema validated in code and tests passing
- All 15 archetypes have parameter definitions reviewed and approved
- Wireframes signed off by design stakeholder

---

### Phase 2 – Compiler Engine (Weeks 3-5)

**Goals:**
- Build the core parametric compiler that converts archetype parameters → SVG geometry
- Implement constraint solver for grid snapping, angle quantization, and minimum spacing
- Enforce DNA rules via linter

**Deliverables:**
- TypeScript compiler module (`packages/compiler`) with zero framework dependencies
- For each archetype: parameterized function that generates precise SVG paths
- Constraint solver that snaps geometry to grid and enforces allowed angles
- Linter that validates: stroke width consistency, minimum gaps, minimum feature sizes, allowed angles, fill-rule correctness
- Auto-fix routines: snap to grid, widen gaps, adjust radii, quantize angles
- Unit tests for each archetype (snapshot tests + geometry validation)
- Unit tests for linter rules (pass/fail cases)
- CLI stub (basic compile & lint commands)

**Definition of Done:**
- All 15 archetypes generate deterministic SVG with ≥95% linter pass rate
- Snapshot tests catch any unintended geometry changes
- Linter catches 100% of rule violations in test suite
- No external dependencies in compiler package (only pure TS + geometry libs)

---

### Phase 3 – Web App UI (Weeks 6-8)

**Goals:**
- Build interactive Next.js web app with ShadCN UI
- Implement live preview with legibility warnings
- Connect UI to compiler engine

**Deliverables:**
- Next.js 15 app scaffold with TypeScript
- Zustand state store for DNA profiles, current parameters, UI state
- Layout: left sidebar (archetype list + parameter inputs), center (live preview at 16/20/24 px, light/dark toggle, legibility warnings), right panel (export options)
- Interactive parameter controls: sliders, numeric inputs, styled to ShadCN design
- Live preview rendering using Konva.js (interactive) + resvg-js (rasterized at 3 sizes)
- Legibility warning system (triggered by linter rules)
- Style variant toggle (outline, filled)
- Export panel: copy SVG, copy React component (with forwardRef), download SVG with metadata
- Responsive design (desktop-first; mobile optimized later)

**Definition of Done:**
- App loads and renders without errors
- All 15 archetypes selectable and previewable
- Parameters update preview in <100 ms (smooth interaction)
- Legibility warnings appear for out-of-spec icons
- Export functions produce valid SVG and React code
- Lighthouse score ≥90 on desktop

---

### Phase 4 – Backend & Persistence (Weeks 9-10)

**Goals:**
- Set up Fastify backend with database persistence
- Implement user authentication (optional for MVP, but infrastructure ready)
- Store icon libraries, DNA profiles, and user data

**Deliverables:**
- Fastify server with TypeScript
- PostgreSQL database schema: users, style_profiles, icons (with metadata), export_jobs
- REST API endpoints:
  - `POST /api/profiles` – Save/update DNA profiles
  - `GET /api/profiles` – Fetch user's profiles
  - `POST /api/icons` – Save icon with metadata
  - `GET /api/icons` – List saved icons with filtering
  - `POST /api/export` – Queue async export job
- BullMQ job queue for long-running exports
- S3/Minio integration for storing exported assets
- Environment configuration (dev, staging, prod)
- API documentation (OpenAPI/Swagger)

**Definition of Done:**
- API endpoints tested with integration tests (Vitest)
- Database migrations run cleanly
- Job queue processes exports successfully
- Error handling and logging in place

---

### Phase 5 – LLM Integration & Presets (Weeks 11-12)

**Goals:**
- Add optional natural-language→parameters mapping
- Implement preset system for saved style profiles
- Fallback gracefully if LLM fails

**Deliverables:**
- LLM integration module (support OpenAI, Anthropic, or Ollama)
- Prompt→parameter endpoint: accepts free-form text, returns structured parameters (JSON schema validated)
- Fallback logic: if LLM output invalid, revert to defaults + notify user
- Natural-language input box in UI with example prompts
- Preset management: save current DNA as named preset (e.g., "Corporate Sharp", "Playful Rounded")
- Load preset from dropdown
- Suggested parameters based on archetype (UI hints)
- Tests: mock LLM responses, validate schema enforcement

**Definition of Done:**
- LLM integration tested with mock responses
- Invalid LLM outputs handled gracefully (no crashes)
- Presets save and load correctly
- Natural-language feature is optional (can disable if needed)

---

### Phase 6 – CLI & Automation (Week 13)

**Goals:**
- Create Node.js CLI for batch operations
- Set up CI/CD linting gates

**Deliverables:**
- Node.js CLI (commander.js):
  - `icon compile <params.json>` – Generate SVG from parameters
  - `icon lint <svg>` – Check for DNA compliance
  - `icon fix <svg>` – Auto-fix spacing, angles, grid snapping
  - `icon stamp <svg>` – Embed DNA metadata
  - `icon diff <old.svg> <new.svg>` – Visual diff output
  - `icon batch <dir>` – Lint/fix multiple icons
- GitHub Actions workflow: lint icons on PRs, block merge if violations
- CLI documentation and examples
- npm package for distributing CLI and compiler

**Definition of Done:**
- CLI commands all tested and working
- GitHub Actions workflow active and tested
- Documentation written
- Package published to npm (or ready for internal distribution)

---

### Phase 7 – Visual Regression Testing & QA (Week 14)

**Goals:**
- Establish visual regression baseline
- Perform cross-platform testing at small sizes
- Finalize documentation and prepare for launch

**Deliverables:**
- Visual regression test suite using Percy or Chromatic
  - Baseline for all 15 archetypes at 16/20/24 px (outline and filled variants) on light/dark backgrounds
  - Automated diffs on every commit
- Cross-browser testing: Chrome, Firefox, Safari (at least)
- Legibility validation at 16 px (smallest size)
- Usability testing with 3-5 design stakeholders
  - Test parameter discovery and workflow efficiency
  - Collect feedback on UI/UX
- Documentation:
  - User guide (how to generate icons, export, integrate)
  - Developer guide (adding new archetypes, customizing DNA)
  - API documentation (auto-generated from OpenAPI)
  - Figma plugin tutorial
  - CLI reference
- Beta launch checklist
- Performance profiling and optimization (if needed)

**Definition of Done:**
- Visual regression baseline established and passing
- All 15 archetypes legible at 16 px
- Documentation complete and reviewed
- Zero critical bugs; known issues logged
- Performance acceptable (preview updates in <100 ms)

---

### Post-MVP Roadmap (Future)

Once the MVP is complete and stable, future phases include:
- **Advanced LLM features** – Multi-icon batch generation, style transfer ("make this icon with thicker strokes"), archetype suggestions
- **Collaborative features** – Team workspaces, shared profiles, icon review workflow
- **Extended archetypes** – Additional icon families (arrows, status indicators, badges)
- **Mobile app** – React Native or native iOS/Android
- **Asset library** – Public icon library with ratings and community contributions
- **Analytics** – Track which icons are most used, design patterns, export formats

## 8. Success Measures

- **Consistency**: ≥90% of icons pass the linter without manual fixes after first compile.
- **Adoption**: At least three internal teams use the tool within three months of launch.
- **Efficiency**: Average time to produce an icon (from selecting archetype to export) is ≤2 minutes, half of the manual process.
- **Satisfaction**: Designers report improved confidence in icon consistency and ease of use.

## 9. Notes & Constraints

- **No breaking changes after Phase 1**: DNA schema must be locked before Phase 2 begins.
- **Determinism first, AI second**: Parametric rules are the foundation; LLM is optional convenience.
- **Pixel-perfect at small sizes**: All legibility testing must use actual pixel rendering (resvg-js), not vector previews.
- **Extensibility**: New archetypes can be added without modifying core compiler logic.
- **Monorepo benefits**: Compiler is framework-agnostic; same engine powers web, CLI, and other future tools.

---

This PRD outlines a realistic, deterministic icon builder rooted in design research and accessible technology. The solution balances rigor (parametric rules, linters) with flexibility (optional LLM for convenience) and uses a modern stack (Next.js, ShadCN UI, TypeScript) for rapid development. By focusing on universality and extensibility, it provides a scalable foundation for any design system.

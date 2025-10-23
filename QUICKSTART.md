# Quick Start Guide

## Installation

Make sure you have **pnpm** installed. If not:

```bash
npm install -g pnpm
```

Install dependencies:

```bash
cd /Users/ilwonyoon/icon_generator_v2
pnpm install
```

## Running the Web App

Start the development server:

```bash
pnpm dev
```

This will start the Next.js development server on **http://localhost:3000**

You should see output like:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Environments: .env.local

 ✓ Ready in 1.2s
```

## Using the Web App

1. **Open your browser** → http://localhost:3000
2. **Select an archetype** from the left panel (Home, Search, etc.)
3. **Adjust parameters** using the sliders
4. **Choose a style** (Outline or Filled)
5. **Click "Compile"** to generate the icon
6. **View the preview** in the center panel at 16px, 24px, and 32px
7. **Copy the SVG code** from the code viewer

## What's Currently Available

✅ **2 Complete Archetypes:**
- Home (with roof, door, windows)
- Search (with lens and handle)

✅ **Features:**
- Real-time parameter adjustment
- Multiple size previews (16, 24, 32px)
- SVG code viewer with copy functionality
- Error handling and validation
- Responsive design

⏳ **Coming Soon:**
- Additional archetypes (settings, profile, trash, etc.)
- Linter with compliance checking
- Backend persistence
- Import/Export functionality

## Stopping the Server

Press `Ctrl+C` in your terminal to stop the dev server.

## Troubleshooting

**Issue: `pnpm: command not found`**
- Install pnpm: `npm install -g pnpm`

**Issue: Port 3000 already in use**
- Kill the process: `lsof -i :3000` then `kill -9 <PID>`
- Or use a different port: `PORT=3001 pnpm dev`

**Issue: Module not found errors**
- Clean install: `pnpm clean && pnpm install`

## Development Commands

```bash
# Watch mode for compiler changes
pnpm -r run watch

# Run all tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format

# Clean all build artifacts
pnpm clean
```

## Project Structure

```
packages/
├── shared-types/    # Shared types and schemas (Icon DNA, Archetypes)
├── compiler/        # Core icon compiler engine
├── ui/              # Next.js web app (currently running)
└── cli/             # CLI tool (coming later)
```

---

**Happy icon building!** 🎨

For more details, see:
- `README.md` – Project overview
- `prd.md` – Complete product requirements
- `PROGRESS.md` – Development task tracker
- `CLAUDE.md` – Architecture guide

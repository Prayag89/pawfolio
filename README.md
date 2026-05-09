# 🐾 Pawfolio

A React + TypeScript pet gallery application that fetches pet data from the Eulerity API, presenting it in an interactive, searchable, and downloadable gallery.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app runs at `http://localhost:3000`.

## Features

- **Responsive Gallery** — 1 column on mobile, 2 on tablet, 4 on desktop
- **Search & Sort** — Filter by name/description, sort by name or date
- **Batch Selection** — Select individual pets or all at once
- **Download** — Download selected images as a ZIP archive
- **Detail Views** — Dynamic routes for each pet (`/pets/:id`)
- **Persistent Selection** — Selections survive route navigation
- **Custom Data Hook** — `usePets` handles loading, error, and empty states

## Tech Stack

- React 18 with TypeScript (strict mode)
- styled-components for CSS-in-JS
- React Router v6 for dynamic routing
- Context API for global selection state
- JSZip + FileSaver for client-side downloads

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # SelectionContext (global state)
├── hooks/          # usePets custom hook
├── pages/          # Route-level page components
├── styles/         # GlobalStyles and theme
├── types/          # TypeScript type definitions
└── utils/          # Download helpers
```

## Architecture

See [PROMPT.md](./PROMPT.md) for detailed architectural decisions and the prompt-driven development strategy.

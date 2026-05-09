# Prompt Strategy — Pawfolio

This document outlines the prompt-driven development approach used to build Pawfolio, a React + TypeScript pet gallery application. Each prompt corresponds to a logical feature branch, mirroring a professional git workflow.

---

## Philosophy

Rather than generating the entire application in a single prompt, I broke the project into **incremental, reviewable units** — each targeting a specific architectural layer or feature. This approach:

1. **Mirrors real development** — features are scoped, built, and tested independently
2. **Produces auditable history** — each commit tells a story
3. **Reduces error surface** — smaller prompts yield more predictable output
4. **Demonstrates architectural thinking** — the sequence reveals deliberate decisions

---

## Prompt Sequence

### Prompt 1 — Project Scaffold (`setup/project-scaffold`)

> "Scaffold a React 18 + TypeScript project with styled-components and react-router-dom v6. Set up the folder structure (hooks, context, components, pages, styles, types, utils), configure TypeScript strict mode, and create type definitions for a Pet model with id, url, title, description, and created fields. Include sort option types and selection context types."

**Rationale:** Establish the foundation before writing any UI. Types-first development catches errors early and serves as documentation.

---

### Prompt 2 — Data Layer (`feature/data-layer`)

> "Create a custom `usePets` hook that fetches pet data from `https://eulerity-hackathon.appspot.com/pets` using the Fetch API. The hook must explicitly handle idle, loading, success, and error states via a `LoadingState` type. Add client-side search filtering (by title and description) and sorting (name A-Z/Z-A, date newest/oldest) as derived state using `useMemo`. Generate stable IDs from image URLs since the API doesn't provide them."

**Rationale:** The custom hook requirement is explicitly called out in the spec. Building it before UI components ensures a clean data contract.

---

### Prompt 3 — Global State (`feature/selection-state`)

> "Implement a SelectionContext using React Context API to manage image selection state globally. The context should provide: selectedIds (Set), toggleSelection, selectAll, clearSelection, isSelected, and selectionCount. Wrap it around the Router so selection persists across route navigation. Include a download utility that uses JSZip + FileSaver to batch-download selected images as a ZIP, with a HEAD-request-based file size estimator."

**Rationale:** Context over Redux — the state is a simple Set consumed by few components. Wrapping above the Router is the key insight for persistence.

---

### Prompt 4 — Core UI Components (`feature/gallery-ui`)

> "Build the gallery components with styled-components:
> - **Navbar**: Fixed, blurred background, brand logo, route links, selection badge
> - **PetCard**: Image with lazy loading + skeleton shimmer, selection checkbox, hover overlay with 'View Details' CTA, staggered entrance animation
> - **SearchBar**: Debounced input (300ms), live result count, clear button
> - **SortControls**: Pill-style segmented button group
> - **Pagination**: Smart ellipsis, page numbers, scroll-to-top on change
> - **StateDisplays**: Loading skeleton grid, error state with retry, empty state
> 
> Use a warm, editorial aesthetic with Playfair Display for headings and DM Sans for body text. Earthy palette with amber (#C67D3A) accents."

**Rationale:** This is the largest prompt — it generates the visual identity. The specific font and color choices differentiate from generic AI output.

---

### Prompt 5 — Selection Bar (`feature/selection-actions`)

> "Create a floating bottom action bar (SelectionBar) that appears when pets are selected. Show selection count, estimated total file size (using HEAD requests), and three actions: Select All Visible, Clear Selection, and Download ZIP. The bar should slide up with a spring animation and support mobile layout (stacked buttons)."

**Rationale:** Separated from the gallery UI because it's a standalone interaction pattern with its own animation and state needs.

---

### Prompt 6 — Pages & Routing (`feature/pages`)

> "Build three pages with react-router-dom v6:
> - **Home** (`/`): Orchestrates search, sort, pagination at 12 items/page. Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop. Hero section with decorative elements.
> - **PetDetail** (`/pets/:id`): Full image with sticky positioning, metadata, description, selection toggle, breadcrumb nav. Fetches from API and matches by generated ID.
> - **About** (`/about`): Tech stack cards, feature list, architecture decision records explaining Context vs Redux, custom hook rationale, CSS variable strategy."

**Rationale:** Pages are the integration layer — they compose components and hooks into user-facing views. The About page doubles as documentation.

---

### Prompt 7 — Polish & Documentation (`polish/final`)

> "Add global styles with CSS custom properties for the full theme (colors, spacing, radii, shadows, transitions, typography). Include custom scrollbar, entrance animations (fadeInUp, shimmer, scaleIn), and responsive viewport handling. Create the prompt.md documenting this process."

**Rationale:** Final pass for consistency, performance, and the meta-documentation the interviewer requested.

---

## Git Branch Strategy

```
main
├── setup/project-scaffold     ← Types, config, folder structure
├── feature/data-layer          ← usePets hook, API integration
├── feature/selection-state     ← Context, download utility
├── feature/gallery-ui          ← All visual components
├── feature/selection-actions   ← Floating action bar
├── feature/pages               ← Home, Detail, About pages
└── polish/final                ← Global styles, docs, prompt.md
```

Each branch merges into `main` via a clean merge commit. The history reads like a story of progressive enhancement.

---

## Key Architectural Decisions

| Decision | Choice | Why |
|---|---|---|
| State management | Context API | Simple state (Set of IDs), few consumers, no Redux boilerplate needed |
| Styling | styled-components + CSS vars | Co-located styles with TypeScript props; CSS vars for theming |
| Data fetching | Custom hook | Encapsulates loading/error/empty states; reusable pattern |
| ID generation | `btoa(url)` hash | API lacks IDs; URL-derived IDs are stable across refetches |
| Pagination | Client-side | Dataset is small enough; avoids unnecessary API complexity |
| Download | JSZip + FileSaver | Client-side bundling; no server dependency |
| Search debounce | 300ms setTimeout | Balances responsiveness with performance |

---

## What I'd Add With More Time

- **Dark mode toggle** with CSS variable swap
- **Virtualized list** (react-window) for very large datasets
- **E2E tests** with Cypress or Playwright
- **Favorites persistence** via localStorage
- **Image preview lightbox** with keyboard navigation
- **PWA support** for offline gallery access
- **Performance monitoring** with Web Vitals reporting

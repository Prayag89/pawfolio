# PROMPTS.md — AI Tool Usage Log

This file documents the prompts I sent to AI tools (Claude) during development. I used AI as a development accelerator while making architectural decisions myself and reviewing all generated code.

---

## Prompt 1 — Project Setup & Architecture Planning

> I need to build a React + TypeScript app that fetches pet data from an API and displays it in a gallery. Requirements: styled-components, react-router-dom, custom data hook, global selection state, pagination, responsive grid (1/2/4 cols), search/sort, and batch image download. Plan the folder structure and create TypeScript types for the Pet model matching the API at https://eulerity-hackathon.appspot.com/pets.

**What I used:** Project structure, tsconfig, package.json, and type definitions. I adjusted types after testing the actual API response.

---

## Prompt 2 — Custom Data Fetching Hook

> Create a custom usePets hook that fetches from the pets endpoint using fetch. It needs to handle loading, error, and empty states explicitly with a LoadingState type. Add client-side search filtering by title and description, and sorting by name A-Z/Z-A and date newest/oldest as derived state with useMemo. The API doesn't return IDs so generate stable ones from the URL.

**What I used:** Core hook logic. I refined the ID generation and added the debounce approach for search.

---

## Prompt 3 — Selection Context & Download Utility

> Implement a React Context for managing image selection globally. Use a Set for O(1) lookups, provide toggle/selectAll/clear/isSelected. It needs to persist selections when navigating between routes. Also build a download utility that zips selected images using JSZip + FileSaver with a HEAD-request based file size estimator.

**What I used:** Context pattern and download logic. I chose Context over Redux since the state is simple (a Set of IDs).

---

## Prompt 4 — UI Components

> Build styled-components for: Navbar with blur backdrop, PetCard with lazy loading + skeleton shimmer + selection checkbox + hover overlay, SearchBar with debounce, SortControls as pill buttons, Pagination with smart ellipsis, and Loading/Error/Empty state displays. Use Playfair Display for headings, DM Sans for body, warm earthy palette with amber (#C67D3A) accents.

**What I used:** Component scaffolding. I iterated on the card hover animation timing and adjusted the color values after visual testing.

---

## Prompt 5 — Floating Selection Bar

> Create a floating bottom action bar that appears when pets are selected. Show count, estimated file size, and buttons for Select All Visible, Clear, and Download ZIP. Slide-up animation, mobile stacked layout.

**What I used:** Full component with minor spacing adjustments.

---

## Prompt 6 — Pages & Routing

> Build three pages: Home (gallery grid with search/sort/pagination at 12/page, hero section), PetDetail at /pets/:id (full image, metadata, selection toggle, breadcrumb), and About Me page. Wire up with react-router-dom v6 Routes. SelectionProvider should wrap Router.

**What I used:** Page structure and routing setup. I customized the About Me content with my own details and rewrote the hero copy.

---

## Prompt 7 — Global Styles

> Create GlobalStyles with styled-components createGlobalStyle. CSS custom properties for the full theme — colors, spacing, radii, shadows, transitions, typography. Include keyframe animations for fadeInUp, shimmer, scaleIn. Custom scrollbar.

**What I used:** Theme system as-is, it provided good consistency across components.

---

## Prompt 8 — Git Setup Script

> Create a shell script that initializes a git repo with feature branches and realistic commit messages, then pushes everything to GitHub. Branches: setup/project-scaffold, feature/data-layer, feature/selection-state, feature/gallery-ui, feature/pages, polish/styles-and-docs. Each should merge into main with --no-ff.

**What I used:** Script structure. I had to fix an issue where `main` branch didn't exist before the first checkout (needed an initial commit first).

---

## How I Used AI in This Project

- **Scaffolding & boilerplate** — generating repetitive styled-components, type definitions, and project config
- **Pattern implementation** — Context setup, custom hook structure, pagination logic
- **All architectural decisions were mine** — choosing Context over Redux, CSS variables + styled-components for theming, client-side pagination, URL-derived IDs
- **All code was reviewed and tested** before committing — I ran `tsc --noEmit` and `npm run build` to verify zero errors
- **UI/UX design direction was mine** — the editorial aesthetic, font pairing, color palette, and interaction patterns
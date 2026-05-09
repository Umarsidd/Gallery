# Gallery

A production-quality React + TypeScript pet gallery built for the Eulerity Web Take-Home Challenge.

## Tech Stack

- React
- TypeScript
- Vite
- styled-components
- react-router-dom
- fetch API
- Context API
- framer-motion

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Environment

The app defaults to the Eulerity challenge host:

```env
VITE_API_BASE_URL=https://eulerity-hackathon.appspot.com
```

If the `/pets` endpoint is exposed through another origin in your environment, add a `.env` file and override `VITE_API_BASE_URL`.

## Features

- Fetches pets from `/pets` with `fetch`
- Handles loading, error, empty dataset, and empty search-result states
- Responsive gallery grid
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- Search with debounced filtering across title and description
- Sorting by title and creation date
- Multi-select with persistent cross-route state
- Estimated total file size for selected pets
- Download selected images
- Detail page for each pet
- About page and custom 404 route
- Light and dark theme toggle
- Skeleton loaders
- Lazy-loaded images
- Toast notifications
- Keyboard-friendly controls and accessible labels
- LocalStorage persistence for theme, selection, and file-size cache
- Framer Motion transitions

## Architecture

The codebase follows a feature-light clean architecture that keeps responsibilities predictable:

- `src/api`
  - API clients and network helpers
- `src/components`
  - Reusable UI building blocks
- `src/context`
  - Global app state for pets, theme, selection, toasts, and file-size cache
- `src/hooks`
  - Reusable hooks including `usePets()`
- `src/pages`
  - Route-level page components
- `src/routes`
  - Router composition
- `src/styles`
  - Theme tokens, global styles, primitives, and responsive utilities
- `src/types`
  - Shared TypeScript models
- `src/utils`
  - Formatting, sorting, download, and file-size helpers

## Key Decisions

- `usePets()` owns query, sorting, and pagination logic so gallery concerns stay centralized and reusable.
- The Context provider fetches the shared dataset once, which keeps selection state and detail-page lookup in sync across routes.
- File-size estimation uses `HEAD` first and falls back to `GET` because some image hosts do not expose `content-length` headers consistently.
- Pagination is implemented client-side because the take-home API contract only guarantees `/pets`, not server-side paging parameters.

## Tradeoffs

- Downloading selected images triggers one browser download per item instead of bundling them into a zip archive.
- File-size estimation depends on remote host support and may show unavailable values when servers block `HEAD` or cross-origin blob fetches.
- Client-side pagination works well for the challenge dataset size, but server-driven paging would be preferable for very large collections.

## Future Improvements

- Add unit and integration tests with Vitest and React Testing Library
- Introduce server-side pagination or infinite scroll if the API expands
- Add optimistic caching with request invalidation
- Support batch zip downloads through a backend or service worker strategy
- Expand keyboard shortcuts for selection workflows


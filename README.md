# Portfolio — Eduardo Garay

Personal portfolio built with Angular 21, TailwindCSS, and TypeScript. Features signal-based state management, lazy-loaded feature modules, and automated GitHub project fetching.

🔗 **Live URL**: _pending Cloudflare Pages deploy_

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21.2 (standalone components) |
| Language | TypeScript 5.9 (strict mode) |
| Styling | TailwindCSS 3.4 |
| State | Angular Signals (`signal`, `computed`, `DataState<T>`) |
| Testing | Vitest 4.0 via `ng test` |
| Deploy | Cloudflare Pages |
| Build | Angular CLI (Vite/esbuild) |

## Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/) 11+ (install: `npm install -g pnpm`)

```bash
pnpm install
```

## Development

```bash
# Start dev server at http://localhost:4200
pnpm start

# Run unit tests
pnpm test

# Run tests with coverage
pnpm test -- --code-coverage

# Production build
pnpm build
```

Build output goes to `dist/portfolio/browser`.

## GitHub Projects Sync

A prebuild script fetches public repos from GitHub and generates `src/assets/data/projects.json`. It runs automatically before every `pnpm build`:

```bash
node scripts/fetch-github-projects.js
```

The script works without authentication (60 req/hr limit). For a higher rate limit (5000/hr), set:

```bash
export GITHUB_TOKEN=your_token_here
```

> **⚠️ Never commit `.env` files.** The token is read from `process.env.GITHUB_TOKEN` at build time only.

## Deploy

The project is configured for Cloudflare Pages via `wrangler.toml`. See [`DEPLOY.md`](./DEPLOY.md) for instructions.

Cloudflare auto-detects pnpm from the lockfile — no extra config needed.

## Architecture

```
src/
├── app/
│   ├── core/          # Models (interfaces), services (HTTP + local storage)
│   ├── features/      # Lazy-loaded pages: about, contact, experience, hero, not-found, projects, skills
│   ├── layout/        # Header, footer (shared across all routes)
│   └── shared/        # Reusable components: button, error-state, loading-spinner, section-heading, skill-badge
├── assets/
│   ├── data/          # JSON sources (experience, profile, projects, skills)
│   └── docs/          # CV PDF
├── main.ts            # App bootstrap
└── styles.css         # Global styles + Tailwind directives
```

State follows a `DataState<T>` pattern: `idle → loading → success | error`, driven by Angular Signals.

## Author

**Eduardo Garay**

- GitHub: [@EduardoGaray57](https://github.com/EduardoGaray57)

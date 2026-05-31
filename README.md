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
- npm 11+

```bash
npm install
```

## Development

```bash
# Start dev server at http://localhost:4200
ng serve

# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Production build
ng build
```

Build output goes to `dist/portfolio/browser`.

## GitHub Projects Sync

A prebuild script fetches public repos from GitHub and generates `src/assets/data/projects.json`:

```bash
node scripts/fetch-github-projects.js
```

The script works without authentication (60 req/hr limit). For a higher rate limit (5000/hr), set:

```bash
export GITHUB_TOKEN=your_token_here
```

> **⚠️ Never commit `.env` files.** The token is read from `process.env.GITHUB_TOKEN` at build time only.

## Deploy

The project deploys to Cloudflare Pages. See [`DEPLOY.md`](./DEPLOY.md) for instructions.

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

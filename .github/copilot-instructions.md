# Copilot Instructions for Portfolio Website

This repository contains two independent but related projects: a **React/TypeScript frontend** and a **Java Spring Boot backend**. An AI agent should treat them as separate workspaces and be aware of the interactions between them.

## Big‑picture architecture

- **Frontend** (`portfolio-frontend/`) is a Vite‑powered React SPA written in TypeScript.
  - Entry point: `src/main.tsx` renders `<App />` which currently only embeds `pages/Home.tsx`.
  - `Home.tsx` holds all UI state, hard‑coded project list, skills, social links, and framer‑motion animations.
  - Only reusable component is `components/Navbar.tsx`; navigation links are simple anchor tags pointing to page sections.
  - Styling is mostly global CSS in `src/styles/Global.css` and a few local CSS files.
  - Deployment target is GitHub Pages, configured via the `homepage` field in `package.json` and `gh-pages` scripts.
  - `package.json` scripts:
    ```json
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "deploy": "gh-pages -d dist"
    ```
  - Dependencies: `react`, `react-dom`, `framer-motion`. Dev tools include eslint, TypeScript, Vite, and the React plugin.

- **Backend** (`portfolio-backend/portfolio/`) is a minimal Spring Boot REST API. not planning for frontend integration yet, but the API is designed to be ready for it.
  - Standard layered structure under `com.portfolio.portfolio` with packages: `controller`, `service`, `repository`, `entity`, `configuration`.
  - Two domains: `Project` and `Visitor`, each with CRUD endpoints.
  - Persistence uses H2 file database (`./data/portfolio-db`) with `spring.jpa.hibernate.ddl-auto=update`.
  - Security is disabled (`SecurityConfig` permits every request and disables CSRF and login).
  - Controllers map under `/api/projects` and `/api/visitors`.
  - Maven wrapper (`mvnw`, `mvnw.cmd`) handles build/test/run; use `./mvnw spring-boot:run` or `./mvnw clean package`.
  - H2 console is enabled at `/h2-console` for debugging.
  - Only test present is `PortfolioApplicationTests` which boots the context.

## Developer workflows

1. **Frontend**
   - `npm install` in `portfolio-frontend/` to fetch dependencies.
   - `npm run dev` for a local development server at `http://localhost:5173`.
   - `npm run build` produces a `dist/` directory; `npm run deploy` pushes to `gh-pages` branch.
   - `npm run lint` executes ESLint across `.tsx` files.
   - TypeScript build (`tsc -b`) runs before `vite build`; watch for type errors.
   - The `homepage` field must match the GitHub Pages URL when modifying deployment script.

2. **Backend**
   - Use the provided Maven wrapper from repository root or `portfolio-backend/portfolio`.
   - `./mvnw clean install` to compile and run tests.
   - `./mvnw spring-boot:run` starts the server on default port `8080`.
   - The API can be exercised with `curl` or Postman; e.g. `GET http://localhost:8080/api/projects`.
   - Modifications to entities/services should be followed by a rebuild; H2 will auto‑update schema.
   - To reset DB, delete `portfolio-backend/portfolio/data/portfolio-db.*` and restart.

## Conventions & patterns

- **CRUD service pattern:** controller delegates to service, service wraps repository; services return `null` when not found instead of throwing.
  Example: `ProjectService.getProjectById` returns `null`.
- **Entity constructors** initialize timestamp fields (`createdAt`, `visitTime`) with `LocalDateTime.now()`; setters also reset to now.
- **No authentication**; security config is permissive. If added later, update tests accordingly.
- **Frontend data is static** for now; if API integration is required, fetch from `/api/projects` or `/api/visitors` at the same origin (CORS not currently configured).
- Use only global CSS; avoid CSS‑in‑JS. Component files are `.tsx` with `.css` imports.

## Integration points

- Frontend currently does **not call** the backend. However, the API exists and follows conventional REST paths.
- When implementing data fetching, use `fetch('/api/projects')` from React; the backend runs on the same host in development when started separately.

## Miscellaneous

- `portfolio-frontend` is a standalone Node project; nothing in backend references it and vice versa.
- The root `README.md` contains author info and is not used programmatically.

---

If you need more details on build commands, package structure, or patterns not covered above, ask for clarification and I can update this file.
# Scoped agent context for ./shared — see root AGENTS.md for global rules

## Purpose

Code in `./shared` is consumed by both client and server. Keep it free of platform-specific imports (no `express`, no `react`, no Node built-ins unless behind a guard).

## Security & Permissions

- Role-based permissions system lives in `./config/security/`
- This is the single source of truth for access control — both client UI gating and server authorization reference it
- Changes here affect both sides; review impact on both before modifying

## Utilities

- `./utils/` contains shared helper functions used across client and server
- Prefer pure functions with no side effects
- All exports should be explicitly typed — no implicit `any`
- Prefer interfaces over type aliases (consistent with project-wide TypeScript conventions)

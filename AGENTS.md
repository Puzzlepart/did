# AGENTS.md

**did** (always stylised in lowercase) is a calendar-to-timesheet web application built with React/TypeScript frontend and Node.js/Express backend, using GraphQL for API communication with Microsoft Graph API integration.

## Subfolder Context

Scoped AGENTS.md files exist for areas with distinct concerns. Read the relevant one when working in that area:

| Folder | Covers |
|---|---|
| [`client/AGENTS.md`](client/AGENTS.md) | Component patterns, styling, GraphQL client, i18n, accessibility, error handling, performance |
| [`server/AGENTS.md`](server/AGENTS.md) | Auth flow, multi-tenant MongoDB, Redis, TypeGraphQL resolvers, security middleware, logging |
| [`shared/AGENTS.md`](shared/AGENTS.md) | RBAC/permissions config, shared utilities, cross-platform constraints |
| [`docker/AGENTS.md`](docker/AGENTS.md) | Docker commands, agent/worktree setup scripts, sample data |
| [`webpack/AGENTS.md`](webpack/AGENTS.md) | Webpack 5 config structure, loaders, plugins, production build flags |

## Essential Commands

### Development
- `npm run watch` - Primary development command (concurrent client/server watching with hot reload)
- `npm run debug:server` - Server debugging with TypeScript compilation and Node inspector
- `npm run create-env` - Generate .env file for local development (run this first)

### Build & Deploy
- `npm run package` - Full production build (client + server + archive)
- `npm run package:client` - Build client only
- `npm run build:server` - Build server with TypeScript compilation

### Code Quality
- `npm run lint` - ESLint check for client/server TypeScript
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier:write` - Auto-format code (single quotes, no semicolons, 2-space indent)
- `npm test` - Run AVA test suite (2-minute timeout per test)

### Version Control
- `npm run commit` - Interactive commit with emojis using sexy-commits (recommended)
- Format: `commit "[changes]" "[type]" "[message]"` where type is from package.json gitmoji config

## TypeScript Setup

- Separate `tsconfig.json` for client (ES2018 target) and server (Node.js target)
- Decorators enabled server-side for TypeGraphQL
- Prefer interfaces over type aliases
- Explicit return types required

## Environment Setup

### Required Environment Variables
```bash
# Authentication
MICROSOFT_CLIENT_ID=your_azure_ad_client_id
MICROSOFT_CLIENT_SECRET=your_azure_ad_client_secret

# Database
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017
MONGO_DB_DB_NAME=main

# Sessions & Security
SESSION_SIGNING_KEY=your_session_key
REDIS_CACHE_HOSTNAME=localhost
REDIS_CACHE_KEY=your_redis_key
REDIS_CACHE_PORT=6379
# Optional: Explicit TLS/SSL port (falls back to 6380 automatically when REDIS_CACHE_KEY is set and REDIS_CACHE_PORT=6379)
# REDIS_CACHE_SSL_PORT=6380
API_TOKEN_SECRET=your_api_secret
```

### Node Requirements
- Node.js >= 22.14.0 LTS (see .nvmrc)
- npm >= 10.0.0

## Testing Strategy

- AVA test framework with TypeScript support
- Tests alongside source files with `.test.ts` extension
- 2-minute timeout per test
- Worker threads enabled for performance
- `npm test` - Run all tests with verbose output
- Tests run automatically on PRs via GitHub Actions
- Use `[ava]` in commit message to trigger tests; `[skip-ci]` to skip CI entirely

## Deployment

### Branch Strategy
- `main` - Production (did.crayonconsulting.no)
- `dev` - Development (didapp-dev.azurewebsites.net)
- `feat/` - Feature branches (deploy to dev)

### Azure App Service
- Slot swapping for zero-downtime deployments
- Environment-specific configuration per slot
- Automatic scaling based on load
- Maintenance mode: set `MAINTENANCE_MODE=true` environment variable

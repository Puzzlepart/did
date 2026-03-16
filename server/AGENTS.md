# Scoped agent context for ./server — see root AGENTS.md for global rules

## Authentication Flow

- Primary: Azure AD OpenID Connect via `passport-azure-ad` (`azuread-openidconnect` strategy)
- Experimental: Google OAuth 2.0 for external users
- Session-based auth with Redis storage
- Bearer token support for API access
- Auth config and middleware in `./middleware/`

## Database — Multi-Tenant Architecture

Each customer has their own MongoDB database:

- `main` database — configuration and metadata (subscriptions, tenant registry)
- Customer databases (e.g. `puzzlepart`, `crayon`) — time entries, projects, users
- The active database is determined by the user's subscription at authentication time
- **Scripts and tools must specify the customer database explicitly** — never assume `main`
- Connection strings come from environment variables (`MONGO_DB_CONNECTION_STRING`, `MONGO_DB_DB_NAME`)

## Caching

- Redis for session storage and API response caching
- TypeDI dependency injection used throughout — services are registered containers, not singletons
- Redis connection auto-upgrades to TLS port 6380 when `REDIS_CACHE_KEY` is set and port is 6379

## GraphQL (Server Side)

- Resolvers in `./graphql/resolvers/` — use TypeGraphQL decorators (`@Resolver`, `@Query`, `@Mutation`)
- Decorators are enabled in `tsconfig.json` — required for TypeGraphQL
- Resolver batching for performance-sensitive queries
- GraphQL error formatting middleware in place — let it handle error shaping, don't hand-roll

## Security Middleware

- `Helmet` for security headers
- `class-validator` for input validation — validate at GraphQL resolver boundaries
- CORS configured for API access
- Rate limiting on API endpoints — do not remove or bypass
- JWT for API token auth; sessions for web interface
- Role-based permissions config lives in `/shared/config/security/`

## Error Handling & Logging

- Use `debug('namespace')` from the `debug` module for structured logging — not `console.log`
- Express error handling middleware is registered in `./app.ts`
- GraphQL errors are formatted and reported centrally — add context, not raw throws

## Performance

- Redis caching for frequent/expensive queries
- Optimize MongoDB queries — use projections, avoid full collection scans
- GraphQL resolver batching (DataLoader pattern where applicable)
- Rate limiting also serves as a performance guard — don't circumvent it

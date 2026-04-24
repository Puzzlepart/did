# Architecture

**Analysis Date:** 2026-04-24

## Pattern Overview

**Overall:** Monolithic repository with three co-located TypeScript projects (client, server, shared) served by a single Node.js/Express process. The server exposes a single GraphQL endpoint backed by TypeGraphQL resolvers + TypeDI-injected services that talk to MongoDB and Microsoft Graph. The React SPA is bundled by Webpack and served as static assets from the same Express instance.

**Key Characteristics:**
- Single Express process hosts both the SPA (static assets) and the GraphQL API at `/graphql`.
- Multi-tenant MongoDB: a `main` database holds subscriptions/metadata, and each tenant has its own database (e.g. `puzzlepart`, `crayon`). The tenant DB is resolved per-request from the authenticated user's subscription.
- Session-based auth (Azure AD OpenID Connect via `passport-azure-ad`, optional Google OAuth) with Redis-backed session storage; Bearer tokens supported for API/PAT access.
- TypeDI dependency injection drives GraphQL resolvers and services; a scoped container is created and disposed per GraphQL request.
- Shared code in `shared/` (security/permission config, date utilities, holiday utilities) is consumed by both client and server with no platform-specific imports.
- Webpack 5 builds the client into `server/public/js` (or `dist/server/public/js` in production) so the same Express app serves the bundle.

## Layers

**Client UI (React SPA):**
- Purpose: Renders pages, forms, timesheet, and admin UI; consumes GraphQL.
- Location: `client/`
- Contains: React functional components with co-located `use*` hooks, SCSS modules, Fluent UI primitives.
- Depends on: Apollo Client, `shared/` utilities/permissions.
- Used by: Browser (bootstrapped at `client/index.tsx`).

**Apollo Client (GraphQL transport):**
- Purpose: Single Apollo Client instance configured with `InMemoryCache` and `cache-and-network` default fetch policy.
- Location: `client/graphql-client/index.ts`, `client/graphql-client/apolloLink.ts`, `client/graphql-client/httpLink.ts`, `client/graphql-client/fragments/`
- Contains: Apollo link chain, cache type policies (custom `keyFields` on `Role`, custom merge on `User.role`).
- Queries/Mutations: `client/graphql-queries/<entity>/`, `client/graphql-mutations/<entity>/`.

**GraphQL API (Apollo Server + TypeGraphQL):**
- Purpose: Single `/graphql` endpoint; request context creation, auth checks, schema generation, error formatting.
- Location: `server/graphql/setupGraphQL.ts`, `server/graphql/generateGraphQLSchema.ts`, `server/graphql/authChecker.ts`, `server/graphql/requestContext.ts`, `server/graphql/index.ts`
- Depends on: `@apollo/server`, `type-graphql`, `typedi`, `reflect-metadata`.
- Plugins: Apollo usage reporting, schema reporting, per-request container reset.

**GraphQL Resolvers:**
- Purpose: Receive typed GraphQL args, delegate to services, return typed objects.
- Location: `server/graphql/resolvers/<entity>/` (one folder per entity: `timesheet`, `project`, `customer`, `label`, `notification`, `outlookCategory`, `reportLink`, `reports`, `role`, `subscription`, `user`, `apiToken`, `personalAccessToken`).
- Pattern: Decorated class (`@Service()` + `@Resolver(T)`), constructor-injected services, `@Authorized<IAuthOptions>` on queries/mutations, `@Ctx()` for `RequestContext`.
- Example: `server/graphql/resolvers/timesheet/TimesheetResolver.ts`

**Services (business/data layer):**
- Purpose: Encapsulate business logic, Mongo queries, external API calls. Registered as TypeDI `@Service({ global: false })` so each request gets a scoped instance.
- Location: `server/services/` with subgroups:
  - `server/services/mongo/` - one service per Mongo collection (`UserService`, `ProjectService`, `CustomerService`, `TimeEntryService`, `SubscriptionService`, `ConfirmedPeriodsService`, `ForecastedPeriodsService`, `HolidaysService`, `LabelService`, `RoleService`, `ApiTokenService`, `DeltaLinksService`, `GraphUsersService`, `ReportLinkService`, plus `document/MongoDocumentService.ts` base class).
  - `server/services/msgraph/` - `MSGraphService`, `MSGraphDeltaService` (Microsoft Graph calendar/events).
  - `server/services/google/` - `GoogleCalendarService`.
  - `server/services/timesheet/` - `TimesheetService`, `TimesheetMatchingEngine` (calendar -> time-entry matching).
  - `server/services/notification/`, `server/services/report/`, `server/services/cache.ts` (Redis cache), `server/services/msoauth.ts`, `server/services/github.ts`.

**Persistence:**
- MongoDB multi-tenant: `server/app.ts` creates a single `MongoClient`, `RequestContext.create` resolves the tenant DB via `context.subscription.db`.
- Redis: session storage (`server/middleware/session/`, `server/middleware/redis/index.ts`) and API response caching (`server/services/cache.ts`).

**Cross-cutting middleware (Express):**
- Location: `server/middleware/` (`helmet/`, `passport/`, `redis/`, `session/`, `gzip/`).
- Registered in order in `server/app.ts` constructor and `setup()`.

## Data Flow

**Authenticated session bootstrap:**
1. Browser requests `/` - `server/routes/index.ts` checks `request.isUnauthenticated()` and redirects to `/auth/azuread-openidconnect/signin` when needed.
2. `server/routes/auth.ts` (via `server/middleware/passport/microsoft/`) runs the Azure AD OpenID Connect strategy, verifies the user against Mongo, loads their subscription and role, and serializes a minimal user into the Redis-backed session via `pickSessionFields` (`server/middleware/passport/index.ts`).
3. Express renders `server/views/index.hbs`, which boots `client/index.tsx`.
4. `client/index.tsx` calls `fetchSessionContext(client)` (`client/graphql-queries/session/`) to hydrate user/subscription/permissions, sets up i18n + DateUtils, then renders `<App sessionContext={...} />`.

**Per-request GraphQL flow:**
1. Apollo Client issues a POST to `/graphql` via `client/graphql-client/httpLink.ts`; the browser session cookie is sent automatically.
2. `expressMiddleware(server, { context })` calls `RequestContext.create(req, mcl)` (`server/graphql/requestContext.ts`):
   - Generates a unique `requestId` and a scoped TypeDI `Container.of(requestId)`.
   - Honours `req.api_key` (bearer) for PAT/API-token paths (`handleTokenAuthentication`).
   - Refreshes subscription metadata from `main.subscriptions` on every interactive request (falls back to session copy on miss).
   - Resolves the user's current role + permissions from the tenant DB's `roles` collection (with embedded fallback).
   - Resolves `context.db` to the tenant subscription DB (`context.subscription.db`).
   - Registers `CONTEXT` and `REQUEST` in the scoped container so resolvers/services can `@Inject('CONTEXT')`.
3. `authChecker` (`server/graphql/authChecker.ts`) enforces `IAuthOptions` (requires user context vs API token, permission scope checks) using `shared/config/security/permissions.ts`.
4. Resolver calls service(s); services read/write Mongo via collection-specific services and/or call Microsoft Graph / Google / Redis cache.
5. Apollo plugin disposes the container via `Container.reset(requestContext.contextValue.requestId)` in `willSendResponse`.
6. `formatError` maps GraphQL error codes to HTTP status (UNAUTHENTICATED=401, FORBIDDEN=403, BAD_USER_INPUT=400, INTERNAL_SERVER_ERROR=500) before returning.

**Calendar -> timesheet flow:**
1. Client loads `client/pages/Timesheet/` and issues the `timesheet` query (see `client/graphql-queries/`).
2. `TimesheetResolver.timesheet` (`server/graphql/resolvers/timesheet/TimesheetResolver.ts`) delegates to `TimesheetService.getTimesheet` (`server/services/timesheet/TimesheetService.ts`).
3. `TimesheetService` injects `MSGraphService` / `GoogleCalendarService` (events), `ProjectService` (projects/customers), `TimeEntryService`, `ConfirmedPeriodsService`, `ForecastedPeriodsService`, `UserService`, `HolidaysService`.
4. `TimesheetMatchingEngine` (`server/services/timesheet/TimesheetMatchingEngine.ts`) matches calendar events to projects/customers by the Outlook category/text.
5. Matched events + confirmed/forecasted state are returned as `TimesheetPeriodObject[]`; the Timesheet page renders them via Fluent UI components.

**State management (client):**
- Per-page reducer pattern: reducers live in `client/pages/<Page>/reducer/`, context in `client/pages/<Page>/context.ts`, logic in `use<Page>.ts`.
- Global app state in `client/app/context.ts` + `client/app/reducer.ts` + `client/app/useApp.ts`, consumed via `useAppContext()`.
- `immer` (`enableMapSet()`) used for reducer updates.

## Key Abstractions

**RequestContext (`server/graphql/requestContext.ts`):**
- Represents the per-request execution scope for GraphQL.
- Holds: `requestId`, `userId`, `user`, `userConfiguration`, `provider`, `subscription`, `container` (scoped TypeDI `ContainerInstance`), `permissions`, `tokenSource`, `mcl` (MongoClient), `db` (tenant `MongoDatabase`).
- Created by `RequestContext.create(req, mcl)`; disposed by the Apollo plugin in `server/graphql/setupGraphQL.ts`.

**TypeGraphQL Resolver classes (`server/graphql/resolvers/*Resolver.ts`):**
- One class per domain entity, decorated with `@Service()` + `@Resolver(T)`.
- Queries/mutations use `@Authorized<IAuthOptions>({ requiresUserContext, scope })` where `scope` is a `PermissionScope` from `shared/config/security/permissions.ts`.
- Inputs use `class-validator` / TypeGraphQL input types defined in each resolver's `types/` folder.

**Mongo services (`server/services/mongo/*`):**
- One service per collection, injected via TypeDI.
- Extend/use `MongoDocumentService` (`server/services/mongo/document/MongoDocumentService.ts`) for shared CRUD patterns.
- Always use `context.db` (tenant DB) unless intentionally reaching into `main` (e.g. subscription lookup).

**Apollo Client (`client/graphql-client/index.ts`):**
- Single `ApolloClient` with `InMemoryCache`, custom type policies, `cache-and-network` default fetch policy, URL `${document.location.origin}/graphql`.

**AppContext (`client/app/context.ts`, `client/app/useApp.ts`):**
- React context exposing session user, subscription, permissions, toast state, and dispatch.
- Consumed throughout the SPA via `useAppContext()`.

**Permission scopes (`shared/config/security/permissions.ts`):**
- Single source of truth used by both `authChecker` on the server and `usePermissions` (`client/hooks/user/usePermissions.ts`) on the client.

## Entry Points

**Server HTTP entry:**
- Location: `server/index.ts`
- Starts an `http.createServer(app.instance)` on `process.env.PORT` (default `9001`).
- Calls `app.setup()` which connects MongoDB, registers middleware, initializes Passport, mounts GraphQL, and registers routes.

**Server Express app:**
- Location: `server/app.ts`
- Registers `helmetMiddleware`, `favicon`, request logger, JSON/body parsers, `redisSessionMiddleware`, Passport with `bearerToken({ reqKey: 'api_key' })`, `/auth` route, `/health_check` (rate-limited), `setupGraphQL`, catch-all route for React Router, and error handling.

**GraphQL setup:**
- Location: `server/graphql/setupGraphQL.ts`
- Builds schema via `generateGraphQLSchema` (`server/graphql/generateGraphQLSchema.ts`) using resolvers from `server/graphql/resolvers/index.ts` and `authChecker`.

**Client entry:**
- Location: `client/index.tsx`
- Bootstraps Fluent UI icons, fetches session context, initializes i18next + DateUtils, and renders `<ApolloProvider><App sessionContext={...} /></ApolloProvider>` into `#app`.

**Webpack entry / build:**
- Config: `webpack/config.js` (assembled via `webpack/constants.js`, `webpack/getRules.js`, `webpack/getPluginsForEnvironment.js`, `webpack/getOptimizationForEnvironment.js`, `webpack/getResolves.js`, `webpack/exportedVarsPlugin.js`, `webpack/compileHooks.js`).
- Entry: `./client` (resolved to `client/index.tsx`); output: `server/public/js/` in dev, `dist/server/public/js/` in production.

**HTML template:**
- Location: `server/views/_template.hbs` (source) -> emitted to `server/views/index.hbs` by HtmlWebpackPlugin; rendered by the default route in `server/routes/index.ts`.

## Error Handling

**Strategy:** Centralized error shaping at three boundaries: Express middleware (HTML/JSON 404 + error fallback), Apollo `formatError` (maps codes to HTTP status), React `ErrorBoundary`.

**Patterns:**
- Express 404 fallback (`server/app.ts` `setupErrorHandling`) returns JSON for `/graphql`, `/api/`, or JSON-accepting clients; otherwise renders `index.hbs` with a serialized error.
- GraphQL errors use `GraphQLError` with explicit `extensions.code` (`UNAUTHENTICATED`, `FORBIDDEN`, `BAD_USER_INPUT`, etc.) - see `server/graphql/authChecker.ts` and `server/graphql/setupGraphQL.ts`.
- Client: `react-error-boundary` with `ErrorFallback` (`client/parts/ErrorFallback/`) wraps `AppSwitch`; user-facing errors surface via `Toast` (`client/components/Toast/`).
- Server logging uses `debug('namespace')` (e.g. `debug('graphql/requestContext')`), not `console.log`.

## Cross-Cutting Concerns

**Logging:**
- Server: `debug` package with per-module namespaces (`server`, `graphql/setupGraphQL`, `graphql/requestContext`, `middleware:redis`, etc.). Request logging via `morgan('dev')` in `server/app.ts`.
- Client: `client/logging/logger.ts`, controlled by `CLIENT_LOG_LEVEL` env baked in at build time by `webpack/constants.js`. `console.log` disabled in production client code via ESLint rule.

**Validation:**
- `class-validator` applied to TypeGraphQL input types; validation errors bubble through `formatError` with `BAD_USER_INPUT` code.

**Authentication / Authorization:**
- Authentication: Azure AD OpenID Connect (primary) and Google OAuth (experimental) via `passport` (`server/middleware/passport/`), plus Bearer API tokens (`express-bearer-token`, `reqKey: 'api_key'`).
- Authorization: `authChecker` enforces `IAuthOptions` at resolver boundaries using permissions resolved per-request from the tenant DB's `roles` collection; scope constants from `shared/config/security/permissions.ts`.

**Security middleware:**
- `helmet` (`server/middleware/helmet/`), rate limiting via `express-rate-limit` on `/health_check` and API endpoints, CSRF prevention enabled in Apollo Server (`csrfPrevention: true`), CORS on `/graphql` via `cors()`.

**Caching:**
- Redis for sessions (`server/middleware/session/`) and for expensive GraphQL queries (`server/services/cache.ts`).
- Apollo Client `InMemoryCache` on the browser with `cache-and-network` fetch policy.

**Internationalization:**
- `react-i18next` on the client; translation bundles at `client/i18n/en-GB.json`, `client/i18n/nb.json`, `client/i18n/nn.json`; loaded in `client/i18n/index.ts` and language switched in `client/index.tsx`.

**Theming:**
- Fluent UI themes in `client/theme/defaultTheme.ts`, `client/theme/darkTheme.ts`; applied via `<Themed>` in `client/app/App.tsx`.

**Maintenance mode:**
- Toggled by the `MAINTENANCE_MODE` env var; handled in `server/routes/maintenanceMode.ts` and surfaced in `/health_check`.

---

*Architecture analysis: 2026-04-24*

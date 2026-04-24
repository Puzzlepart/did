# External Integrations

**Analysis Date:** 2026-04-24

## APIs & External Services

**Microsoft Graph (primary calendar / directory source):**
- Purpose: Fetches Outlook calendar events, user profile, manager, photo, and Outlook categories. Powers the "calendar is your timesheet" core flow.
- SDK: `@microsoft/microsoft-graph-client` 2.2.1.
- Implementation: `server/services/msgraph/MSGraphService.ts` (main service), `server/services/msgraph/MSGraphDeltaService.ts` (delta queries for user sync), `server/services/msgraph/types.ts`, `server/services/msgraph/index.ts`.
- Endpoints used:
  - `/me/calendar/calendarView` - Range queries for calendar events (`MSGraphService.ts` lines 90, 335).
  - `/me/photos/{size}/$value` - User photo (`MSGraphService.ts` line 71).
  - `/users/{userId}` and `/users/{userId}/manager` - Graph users directory (`MSGraphService.ts` lines 412, 431).
  - `/users/delta` - Incremental sync, delta links stored via `server/services/mongo/delta_links.ts`.
  - `/me/outlook/masterCategories` - Outlook categories.
- Auth: OAuth2 bearer token obtained through `simple-oauth2` in `server/services/msoauth.ts` (`MSOAuthService.getAccessToken`). Tokens are refreshed via `tokenHost: https://login.microsoftonline.com/common/`, `tokenPath: oauth2/v2.0/token`.
- Env vars: `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_SCOPES` (default scopes from `.env.sample`: `profile offline_access user.read user.read.all calendars.read mailboxsettings.readwrite`).

**Google Calendar (secondary provider, optional):**
- Purpose: Alternative calendar source for users signing in with Google.
- SDK: `googleapis` ^137.1.0.
- Implementation: `server/services/google/index.ts` (`GoogleCalendarService`) - uses `google.auth.OAuth2` and `calendar_v3.Calendar` to list calendars (`calendarList.list`) and events (`events.list`).
- Auth: Access token from Passport Google OAuth flow (`server/middleware/passport/google/index.ts`), stored on `request.user.tokenParams.access_token`.
- Env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_SCOPES` (default: `userinfo.profile`, `userinfo.email`, `calendar.readonly`).
- Feature flag: only enabled when `AUTH_PROVIDERS` contains `google` (`server/routes/auth.ts` line 156).

**GitHub (feedback issue creation, optional):**
- Purpose: Creates GitHub issues from in-app user feedback.
- SDK: `@octokit/auth-app` ^8.2.0 + `@octokit/request` ^10.0.8.
- Implementation: `server/services/github.ts` (`GitHubService.createIssue` posts to `POST /repos/{owner}/{repo}/issues`).
- Auth: GitHub App installation token flow via `createAppAuth({ appId, privateKey, clientId, clientSecret })`, then installation token lookup.
- Env vars: `GITHUB_APPID`, `GITHUB_INSTALLATION_ID`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_FEEDBACK_OWNER` (defaults to `puzzlepart`), `GITHUB_FEEDBACK_REPO`, `GITHUB_FEEDBACK_REPORTER_INFO`.

**Apollo Studio (GraphQL telemetry):**
- Purpose: Usage and schema reporting for the GraphQL API.
- Implementation: `server/graphql/setupGraphQL.ts` registers `ApolloServerPluginUsageReporting` (with `sendVariableValues: { none: true }`) and `ApolloServerPluginSchemaReporting`.
- Client info generator: `server/graphql/generateClientInfo.ts`.
- Env vars: `APOLLO_KEY`, `APOLLO_GRAPH_REF` (referenced in `.env.sample`), `APOLLO_SCHEMA_REPORTING_SEND_REPORTS_IMMEDIATELY` (switch).
- Dev tooling: `apollo.config.js` (`service: Did-dev@v0.15.x`) for the Apollo CLI/VS Code extension.

**Fluent UI icons CDN:**
- Purpose: Icon assets for `@uifabric/icons`.
- URL: `https://spoprod-a.akamaihd.net/files/fabric/assets/icons/` (exported as `ICONS_BASE_URL` in `webpack/constants.js`).

## Data Storage

**Databases:**
- Primary: MongoDB (self-hosted in dev via `docker-compose.yml` `mongo:7.0-jammy`; Azure Cosmos DB for MongoDB in production - timeout tuning in `server/app.ts` `setup()` confirms Cosmos compatibility).
- Connection string: env var `MONGO_DB_CONNECTION_STRING` (default dev `mongodb://mongodb:27017`).
- Default database: `MONGO_DB_DB_NAME` (default `main`).
- Credentials (dev): `MONGO_ROOT_USERNAME`, `MONGO_ROOT_PASSWORD`.
- Client: `mongodb` ^3.7.4 (native driver), connected once in `server/app.ts` (`MongoClient.connect`) and passed to services.
- Multi-tenant model: one shared `main` database for subscriptions + invitations, per-subscription database name stored on `subscription.db`. `server/graphql/requestContext.ts` switches the active DB per request:
  - `context.db = context.mcl.db(context.subscription.db || environment('MONGO_DB_DB_NAME'))` (line ~235)
  - `tenantDb = tenantDbName ? mcl.db(tenantDbName) : database` (line ~175) for dynamic role/permission resolution.
- Collection services (each wraps a MongoDB collection): `server/services/mongo/subscription.ts`, `server/services/mongo/user.ts`, `server/services/mongo/project.ts`, `server/services/mongo/customer.ts`, `server/services/mongo/time_entry.ts`, `server/services/mongo/confirmed_periods.ts`, `server/services/mongo/forecasted_periods.ts`, `server/services/mongo/forecasted_time_entry.ts`, `server/services/mongo/role.ts`, `server/services/mongo/label.ts`, `server/services/mongo/holidays.ts`, `server/services/mongo/api_token.ts`, `server/services/mongo/delta_links.ts`, `server/services/mongo/graph_users.ts`, `server/services/mongo/graph_users_enrichment.ts`, `server/services/mongo/reportLink.ts`.
- Subscription lookup: `server/middleware/passport/microsoft/retrieveSubscription.ts` resolves tenant by tenant ID, external OID, or pending invitation; throws `TENANT_NOT_ENROLLED` otherwise.

**File Storage:**
- No external object-storage integration detected. Static client bundle is served from `server/public/` (see `server/app.ts` `setupAssets`).

**Caching:**
- Redis via `redis` v3 client. Dual purpose: session store and application cache.
- Configuration: `server/middleware/redis/index.ts` - host `REDIS_CACHE_HOSTNAME`, port `REDIS_CACHE_PORT` (default 6379), TLS port `REDIS_CACHE_SSL_PORT` (default 6380) auto-selected when `REDIS_CACHE_KEY` is set, `auth_pass = REDIS_CACHE_KEY`, `tls.servername = REDIS_CACHE_HOSTNAME`, `socket_keepalive: true`.
- Mock client used when `NODE_ENV=test` or `AVA_TEST=true` with no Redis configured.
- Session store: `server/middleware/session/index.ts` (`connect-redis` 5.2.0, TTL `1_209_600` seconds = 14 days, cookie name from `SESSION_NAME`, signed with `SESSION_SIGNING_KEY`).
- Application cache: `server/services/cache.ts` - scopes `USER`, `SUBSCRIPTION`, `GLOBAL`; used by `MSGraphService` and `MSGraphDeltaService`.

## Authentication & Identity

**Auth providers (driven by `AUTH_PROVIDERS` env var, space-delimited):**
- `azuread-openidconnect` - Azure AD / Entra ID via `passport-azure-ad` `OIDCStrategy`.
  - Implementation: `server/middleware/passport/microsoft/index.ts` (`azureAdStrategy`).
  - Identity metadata: `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`.
  - Response mode: `form_post`, response type: `code id_token`.
  - Verify callback chain: `server/middleware/passport/microsoft/onVerifySignin.ts` -> `server/middleware/passport/microsoft/retrieveSubscription.ts` -> `server/middleware/passport/microsoft/synchronizeUserProfile.ts` -> `server/middleware/passport/microsoft/checkSecurityGroupMembership.ts` -> `server/middleware/passport/microsoft/processUserInvitation.ts`.
  - Dynamic redirect URL: computed per-request from `Host` / `X-Forwarded-*` headers via `server/utils/getCallbackUrl.ts` so the app can sit behind Cloudflare tunnels and reverse proxies. `MICROSOFT_REDIRECT_URI` acts as a baseline override; the strategy's `authenticate` method is monkey-patched in `azureAdStrategy` to inject `req.session.__callbackUrl` into `this._options.redirectUrl`.
  - Sign-in: `GET /auth/azuread-openidconnect/signin`. Callback: `POST /auth/azuread-openidconnect/callback` (`server/routes/auth.ts`).
- `google` - Google OAuth 2.0 via `passport-google-oauth20` (`server/middleware/passport/google/index.ts`). Sign-in `GET /auth/google/signin`, callback `GET /auth/google/callback`.
- Sign-out: `GET /auth/signout` (destroys session + `request.logOut`).

**Bearer-token API access:**
- `express-bearer-token` ^3.0.0 reads tokens from incoming requests (`reqKey: 'api_key'`, `server/app.ts` `setupAuth`).
- API tokens stored in Mongo via `server/services/mongo/api_token.ts`. JWT-based PATs verified with `jsonwebtoken` ^9.0.3 using `API_TOKEN_SECRET` (`server/graphql/requestContext.ts`). `RequestContext.authSource` distinguishes `pat`, `api`, or interactive sessions.

**Session handling:**
- Session cookie name: `SESSION_NAME` (default `connect.sid` / `.env.sample` sets `didsesh`).
- Cookie flags: `secure: false` (TLS termination expected at proxy; `trust proxy` is enabled in `server/app.ts`), `resave: false`, `saveUninitialized: false`, `rolling: false`.
- Session payload is minimized - only allowlisted fields kept (`pickSessionFields` in `server/middleware/passport/index.ts`: `id`, `mail`, `provider`, `role`, `subscription`, `configuration`, `tokenParams`).

**Development-only session injection:**
- `POST /auth/inject-session` (guarded by `NODE_ENV=development`, `ENABLE_SESSION_INJECTION=true`, `TEST_SESSION_COOKIE`, `SESSION_INJECTION_SECRET`). Used for Playwright/agent tests. Uses `crypto.timingSafeEqual` for secret comparison (`server/routes/auth.ts`).

## Monitoring & Observability

**Error Tracking:**
- No third-party APM / Sentry / Datadog integration detected.
- GraphQL errors formatted with `httpStatusMap` in `server/graphql/setupGraphQL.ts` (`formatError`). Stack traces only in non-production.

**Logs:**
- Server: `debug` 4.4.3 namespaces (e.g. `server`, `server/routes/auth`, `services/msoauth`, `graphql/setupGraphQL`, `middleware:redis`); `morgan` ^1.10.1 with `dev` format for HTTP access logs. Static 404s are suppressed by a custom middleware in `server/app.ts`.
- Client: custom logger at `client/logging/` with level controlled by `CLIENT_LOG_LEVEL` env var (exported at build time via `webpack/constants.js`).

**Health Check:**
- `GET /health_check` (`server/app.ts` `setupHealthCheck`) returns MongoDB connection status, maintenance mode flags, memory, load average, uptime. Rate-limited to 10 requests/minute per IP via `express-rate-limit`. Consumed by the Dockerfile `HEALTHCHECK` and Azure App Service probes.

## CI/CD & Deployment

**Hosting:**
- Azure App Service, app name `didapp`, slots `dev` and `staging` (see `.github/workflows/deploy-reusable.yml` line 73-78, `uses: azure/webapps-deploy@v2`). Environment-specific publish profiles: `DIDAPP_DEV_PUBLISH_PROFILE`, `DIDAPP_STAGING_PUBLISH_PROFILE`.
- Kudu/rsync script: `.deployment` invokes `scripts/deploy.sh` (rsync to deployment target + `npm install --omit=dev`).
- Container alternative: `Dockerfile` produces a production image on port 9001, runs as non-root user `did`, entrypoint `dumb-init` + `node dist/server/index.js`.

**CI Pipeline:**
- GitHub Actions workflows in `.github/workflows/`:
  - `on_pr_test_build.yml` - PR test/build validation.
  - `on_push_dev_deploy.yml` - Auto-deploy to `dev` slot on pushes to `dev` and `feat/*` branches.
  - `on_push_staging_deploy.yml` - Auto-deploy to `staging` slot on pushes to `main`.
  - `on_push_staging_deploy_tags.yml` - Tag-triggered staging deploy.
  - `deploy-reusable.yml` - Shared reusable workflow: `actions/setup-node@v4` with `NODE_VERSION` from repo variables, `npm ci`, `npm run package` (produces `did-package.zip` via `.tasks/package.js`), upload artifact, then `azure/webapps-deploy@v2`.
  - `docker-build.yml` - Builds and publishes the Docker image.
  - `automatic_chores.yml` - Scheduled maintenance tasks.
- Skip markers: commit messages containing `[skip-ci]` or `[skip-deploy]` bypass the dev deploy.

## Environment Configuration

**Required env vars (production):**
- Runtime: `NODE_ENV`, `PORT`.
- Auth: `AUTH_PROVIDERS`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_SCOPES`, `MICROSOFT_SIGNIN_PROMPT`, `SESSION_NAME`, `SESSION_SIGNING_KEY`, `API_TOKEN_SECRET`.
- Optional auth: `MICROSOFT_REDIRECT_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_SCOPES`.
- Data: `MONGO_DB_CONNECTION_STRING`, `MONGO_DB_DB_NAME`.
- Cache: `REDIS_CACHE_HOSTNAME`, `REDIS_CACHE_PORT`, `REDIS_CACHE_KEY`, `REDIS_CACHE_SSL_PORT` (optional).
- Telemetry: `APOLLO_KEY`, `APOLLO_GRAPH_REF`.
- Optional integrations: `GITHUB_APPID`, `GITHUB_INSTALLATION_ID`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_FEEDBACK_OWNER`, `GITHUB_FEEDBACK_REPO`, `GITHUB_FEEDBACK_REPORTER_INFO`.
- Feature flags / misc: `MAINTENANCE_MODE`, `MAINTENANCE_MESSAGE`, `DISPLAY_VERSION_DETAILS`, `CLIENT_LOG_LEVEL`, `DEBUG`.
- Dev-only: `ENABLE_SESSION_INJECTION`, `TEST_SESSION_COOKIE`, `SESSION_INJECTION_SECRET`, `LAUNCH_BROWSER`, `WEBPACK_NOTIFICATIONS_SOUND`, `FORK_TS_CHECKER_WEBPACK_PLUGIN_PROFILE`, `SKIP_GIT_PLUGIN`.

**Secrets location:**
- Local: `.env` (gitignored; template `.env.sample` committed). Not read by this analysis.
- CI: GitHub Actions secrets (`DIDAPP_DEV_PUBLISH_PROFILE`, `DIDAPP_STAGING_PUBLISH_PROFILE`, and inherited secrets forwarded via `deploy-reusable.yml`).
- Production: Azure App Service configuration / application settings injected as environment variables.

## Webhooks & Callbacks

**Incoming:**
- `POST /auth/azuread-openidconnect/callback` - Azure AD OIDC `form_post` callback.
- `GET /auth/google/callback` - Google OAuth 2.0 callback.
- `POST /auth/inject-session` - Development-only test session injection (secret-gated).
- `GET /health_check` - Azure App Service / Docker health probe.
- `POST /graphql` - Apollo GraphQL endpoint (CORS-enabled, CSRF prevention on).

**Outgoing:**
- Microsoft Graph (`https://graph.microsoft.com`) and Microsoft identity platform (`https://login.microsoftonline.com/common`) - calendar, users, delta sync, token refresh.
- Google APIs (`https://www.googleapis.com`) - calendar list and events.
- GitHub API (`https://api.github.com/repos/.../issues`) - feedback issue creation.
- Apollo Studio reporting endpoint (via `@apollo/server` plugins) - usage + schema telemetry.

## Browser Extension

- Microsoft Edge sidebar extension located under `extension/` (`manifest.json`, `background.js`, `sidebar.js`, `sidebar.html`). Documentation in `extension/TECHNICAL.md`, `extension/QUICKSTART.md`. Packages independently via `extension/build.sh`; not part of the main webpack build.

## Email / Notifications

- No SMTP / transactional email provider integration detected. In-app notifications are generated from data via `server/services/notification/index.ts` (`NotificationService`) using templates in `server/graphql/resolvers/types` (`NotificationTemplates`); these surface through GraphQL rather than external mail delivery.

---

*Integration audit: 2026-04-24*

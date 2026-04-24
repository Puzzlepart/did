# Codebase Concerns

**Analysis Date:** 2026-04-24
**Repo:** Puzzlepart/did
**Branch:** dev (v0.21.0)

## Tech Debt

**Legacy/EOL runtime dependencies (root `package.json`):**
- Issue: Several core dependencies are major versions behind upstream and some are past EOL. They still work but block security/feature improvements and are increasingly hard to upgrade due to drift.
- Files: `package.json`
- Impact: Larger attack surface, slower dependency upgrades, harder migrations, stuck on deprecated APIs.
- Specifics (from `package.json`):
  - `mongodb: ^3.7.4` (driver v3 is EOL; v5+/v6 is current; breaking changes queued up)
  - `@types/mongodb: ^3.6.20` must upgrade in lockstep with driver
  - `redis: ^3.1.2` (v3 legacy; v4+ has a different client API - big refactor)
  - `connect-redis: 5.2.0` (v6+ is current; v7/v8 requires node-redis v4)
  - `passport-azure-ad: 4.3.5` (Microsoft has **deprecated** this library; migration to MSAL / `@azure/msal-node` is required; see `server/middleware/passport/microsoft/index.ts`)
  - `@microsoft/microsoft-graph-client: 2.2.1` (v3 is current)
  - `helmet: 3.23.3` (v3 is ancient; v8+ is current; v3 lacks modern defaults such as `referrerPolicy`, `permittedCrossDomainPolicies`, and a sensible CSP)
  - `i18next: 20.6.1` (v25 is current; several breaking API changes between)
  - `react-i18next: 11.18.6` (matched to stale i18next)
  - `react: 17.0.2`, `react-dom: 17.0.2` (React 18 / 19 available; missing concurrent features, automatic batching)
  - `react-router-dom: 5.3.4` (v6/v7 available; v5 API diverges significantly)
  - `passport-google-oauth20: 2.0.0`, `passport: 0.7.0` (both stale)
  - `@uifabric/icons: 7.9.6` is a legacy Fluent UI v8 package kept around despite v9 migration (see `0.19.0` changelog entry)
  - `dotenv: 8.6.0` (v17 is current)
- Fix approach: Stage migration by layer - mongodb driver first (affects all `server/services/mongo/*.ts`), then redis + connect-redis, then passport-azure-ad → MSAL (auth-critical, needs regression suite), then helmet upgrade (CSP policy work), then React 18, then react-router.

**Manual `try { ... } catch (error) { throw error }` wrappers:**
- Issue: Pointless re-throws that add nothing but a stack frame. Present in `ApiTokenService.getTokens` and `ApiTokenService.addToken` at minimum.
- Files: `server/services/mongo/api_token.ts:64-97`
- Impact: Cosmetic/noise; masks actual error provenance because the original stack gets another frame.
- Fix approach: Remove try/catch unless logging or error transformation is added.

**`any` and unsafe casts in critical paths:**
- Issue: ESLint rule `@typescript-eslint/no-explicit-any: 0` is globally disabled in `package.json`. `Record<string, any>` and `as any` are used in the auth-critical request context.
- Files:
  - `server/graphql/requestContext.ts:18` (`tokenParams?: Record<string, any>`)
  - `server/graphql/requestContext.ts:46` (`public user?: Record<string, any>`)
  - `server/graphql/requestContext.ts:51` (`public userConfiguration?: Record<string, any>`)
  - `server/graphql/requestContext.ts:271` (`verify(...) as any`) - JWT payload is not type-checked after verification
  - `server/graphql/setupGraphQL.ts:119` (`(Container as any).instances as ContainerInstance[]`)
  - `server/graphql/resolvers/subscription/SubscriptionResolver.ts:76` (`context.container.get('REQUEST') as any`)
  - `server/services/github.ts:30` (`...}) as any`)
- Impact: Silent drift between JWT payload shape and consumer expectations; subtle auth bugs are hard to surface at compile time.
- Fix approach: Declare a `TokenPayload` interface in `server/graphql/requestContext.ts` and narrow `verify` output with a type guard before destructuring.

**Deprecated in-tree utilities:**
- Issue: Deliberately-kept deprecated symbols still exported to avoid breakage.
- Files:
  - `shared/utils/date.ts:374` - `getIsoWeek(isoWeek, year)` - documented as deprecated; emits `console.warn` outside production. Preserved for "backward compatibility" but returns the input unchanged, i.e. it was a no-op pretending to do work.
  - `shared/utils/date.ts:386` - deprecation message intended to be removed.
  - `server/graphql/resolvers/reports/types.ts:98` - `projectId` deprecated in favour of `projectIds` array (per 0.21.0 changelog).
  - `server/routes/auth.ts:75` - comment flags use of the deprecated Node `url.format` API in the OAuth callback handler.
- Impact: Noise, accidental usage. `url.format` is legacy Node API and may disappear in a future Node major.
- Fix approach: Grep call sites, migrate, remove the symbol. For `url.format`, switch to `URL` / `URLSearchParams`.

**Dead-code comment in MSGraphService:**
- Issue: `server/services/msgraph/MSGraphService.ts:575` "Manager enrichment removed for now to keep delta queries fast and compliant." - a feature-flagged removal with no tracking marker.
- Files: `server/services/msgraph/MSGraphService.ts`
- Impact: Nobody remembers why / when this should come back; the comment rots.
- Fix approach: Open an issue or delete the stale comment.

**`Math.random()` used for request IDs and short IDs:**
- Issue: Not cryptographically random; low collision risk given `Number.MAX_SAFE_INTEGER` range, but still inappropriate for anything security-adjacent.
- Files:
  - `server/graphql/requestContext.ts:250` - `generateUniqueRequestId`
  - `server/utils/generateId.ts:7` - `generateId()` used for generating ad-hoc IDs
- Impact: Request IDs used only for logging, low risk. `generateId()` is used elsewhere; confirm it is not used for tokens, invitations, or secret material.
- Fix approach: Replace with `crypto.randomUUID()` for request IDs, and `crypto.randomBytes(...).toString('base64url')` for anywhere `generateId` is a security boundary.

**ESLint configuration swallows real issues:**
- Issue: `react-hooks/exhaustive-deps: "off"` globally in `package.json:309` means stale-closure bugs compile clean. Exactly the class of bug that required the `f72ff5ef5` fix ("auth hardening, client stale-state" - `useCustomers`, `useProjects`, `EventList/useColumns`, Timesheet hotkeys missing dependencies).
- Files: `package.json:309`
- Impact: The lint rule that would have caught the bug is disabled. Future recurrences are near-guaranteed.
- Fix approach: Turn the rule on as `warn`, fix or `// eslint-disable-next-line` each occurrence deliberately, then bump to `error`.

## Known Bugs

**Swallowed async rejections in MSGraphService helpers that return `Promise`:**
- Symptoms: `try { ... } catch (error) { throw new MSGraphError(...) }` around a `return this._cache.usingCache(async () => {...})` does **not** wrap the cache-miss path because the inner `async` promise's rejection bypasses the outer sync `try`.
- Files: `server/services/msgraph/MSGraphService.ts:149-185` (`getUsers`), `server/services/msgraph/MSGraphService.ts:279-298` (`getOutlookCategories`), and other `getXxx(...)` wrappers that aren't themselves `async`.
- Trigger: Any rejection inside the cache factory (e.g. Graph API 401/429) bubbles up unchanged instead of surfacing as a `MSGraphError`.
- Workaround: None today; callers see a raw Graph SDK error.
- Fix approach: Either declare these methods `async` and `await` the cache call, or `.catch(err => { throw new MSGraphError(...) })`.

**Subscription DB name is assumed on the session copy when DB refresh fails:**
- Symptoms: `server/graphql/requestContext.ts:234` uses `context.subscription.db || environment('MONGO_DB_DB_NAME')`. On a refresh miss `context.subscription = sessionSubscription`; if the session was stale (e.g. tenant was moved to a different DB), queries silently hit the wrong database.
- Files: `server/graphql/requestContext.ts:137-159, 234`
- Trigger: Tenant's `subscriptions.db` changes while a session cookie is still valid.
- Workaround: Users must sign out and back in.
- Fix approach: After refresh fallback, also invalidate the session rather than continuing with stale tenant routing.

**`submitPeriod` returning `success: false` on success** (already fixed in 0.21.0, #1365):
- Files: `server/graphql/resolvers/timesheet/TimesheetResolver.ts`
- Status: Regression-tested as part of #1379 per commit `d46feb579`. Keep the guard test in place.

**Holiday date timezone drift** (fixed in 0.21.0 via `parseHolidayDate`, #1376):
- Files: `shared/utils/holidayUtils.ts:38` (`parseHolidayDate`)
- Historic issue: `2025-12-24` in Oslo (UTC+1) parsed as `2025-12-23T23:00Z` under UTC default - holiday visibly shifted by one day.
- Status: Centralised normalization now - any new holiday-related code **must** route through `parseHolidayDate` / `toISODateString`, not raw `new Date(isoString)` or `dayjs(iso)`.

**Malformed base64/JSON URL state crashes Home / Reports** (fixed in 0.21.0, #1365):
- Files: `getUrlState`, `useHome`, `useCustomQueryFilterCriterias`
- Historic issue: Unhandled JSON parse error during render crashed the route.
- Status: Regression test added in #1379 (`d46feb579`). Keep new URL-state consumers behind try/catch or a shared `tryParseJson` helper.

## Security Considerations

**Session cookie is not marked `secure`:**
- Risk: Session cookie can be transmitted over plain HTTP if TLS terminates upstream and the app runs in a configuration where the proxy does not force HTTPS.
- Files: `server/middleware/session/index.ts:22` - `cookie: { secure: false }`.
- Current mitigation: `server/app.ts:73` sets `trust proxy` to `true`, but `secure: false` overrides any auto-upgrade from `express-session`. HSTS is set via `helmet({ hsts: ... })` in `server/middleware/helmet/index.ts:19`.
- Recommendation: Set `cookie: { secure: true, httpOnly: true, sameSite: 'lax' }` in production. `httpOnly` and `sameSite` are not set at all today - in Express defaults `httpOnly` is true, but `sameSite` defaults to `undefined` which leaves CSRF surface open for older browsers. Drive the value from `NODE_ENV`.

**Unrestricted CORS on `/graphql`:**
- Risk: `server/graphql/setupGraphQL.ts:132` uses bare `cors<cors.CorsRequest>()`, which reflects any origin. Combined with session cookies this widens CSRF surface; mitigated only by Apollo's `csrfPrevention: true` at `setupGraphQL.ts:58`.
- Files: `server/graphql/setupGraphQL.ts:130-137`
- Current mitigation: Apollo CSRF prevention requires non-simple requests (preflight headers). Session cookie is used for auth, but `credentials: true` is not set in `cors()`, so browsers won't send cookies cross-origin anyway.
- Recommendation: Configure `cors({ origin: [allowlist], credentials: false })` explicitly to make intent clear and protect against future toggles.

**API tokens stored in MongoDB in plaintext:**
- Risk: `ApiTokenService.addToken` signs a JWT with `API_TOKEN_SECRET` and then inserts the exact JWT string into the `api_tokens` collection (`server/services/mongo/api_token.ts:79-94`). A DB read leaks a fully usable bearer credential. Token lookup in `handleTokenAuthentication` (`server/graphql/requestContext.ts:275-285`) requires the whole JWT as the filter, so a hash-only storage would need a side-channel (e.g. HMAC of the JWT + lookup by HMAC).
- Files: `server/services/mongo/api_token.ts:79-98`, `server/graphql/requestContext.ts:264-295`
- Current mitigation: JWT signature verification (`verify(apiKey, API_TOKEN_SECRET)`) guards against forgery, so a DB leak alone doesn't grant forgeable tokens - but the leaked token is still directly replayable until expiry.
- Recommendation: Store only a lookup HMAC (e.g. `sha256(apiKey + pepper)`), not the JWT itself. Compute the same HMAC at verify time for the `findOne` lookup. Also tighten `API_TOKEN_SECRET` handling (it is already flagged by `scripts/docker.sh:93` `check_required_env`).

**`tokenParams` round-tripped into the session:**
- Risk: `server/middleware/passport/index.ts:31` puts the raw OAuth `tokenParameters` from the provider into the session. In the Microsoft flow (`onVerifySignin.ts:38-121`), `tokenParameters` can include refresh/ID-token style payloads depending on the strategy. These end up in Redis session storage.
- Files: `server/middleware/passport/index.ts:18-33`, `server/middleware/passport/microsoft/onVerifySignin.ts:118-121`
- Current mitigation: Session payload was trimmed in 0.21.0 (#1378, commit `e76f67784` "minimize Redis session payload") via `pickSessionFields`, but `tokenParams` is explicitly kept.
- Recommendation: Confirm exactly which fields `tokenParams` contains at runtime and strip anything that is not consumed by downstream resolvers. Refresh tokens, if present, should live in a dedicated encrypted store, not a Redis session.

**`cors<cors.CorsRequest>()` default headers + session injection route:**
- Risk: `server/routes/auth.ts:185-263` exposes `POST /auth/inject-session` when `NODE_ENV=development` AND `ENABLE_SESSION_INJECTION=true` AND `TEST_SESSION_COOKIE` AND `SESSION_INJECTION_SECRET` are all set. The guard is correct, but the failure mode is silent: if `NODE_ENV` is misconfigured on a staging box, production-style secrets in `TEST_SESSION_COOKIE` would yield an authenticated admin session with only a shared secret guard.
- Files: `server/routes/auth.ts:179-263`
- Current mitigation: Four-factor `&&` guard, `crypto.timingSafeEqual` for secret comparison, session regeneration, and path-restricted redirect.
- Recommendation: Add a boot-time assertion that logs loudly (`console.error` in `server/app.ts`) if all four variables are set in a non-`development` environment. Consider gating by `process.env.NODE_ENV === 'development'` at module top-level with an explicit throw.

**Open-redirect after OAuth** (already fixed in 0.21.0, #1365):
- Files: `server/routes/auth.ts:101-112` and the session-injection route `auth.ts:244-252`
- Status: Both call sites now validate `redirectUrl.startsWith('/')` and reject protocol-relative `//` prefixes. Any new redirect consumer **must** replicate this guard - a regression test covers it (auth boundary tests in #1379).

**Potential stored-XSS in report tooltips via `dangerouslySetInnerHTML` + i18next:**
- Risk: `client/i18n/index.ts:18` sets `interpolation: { escapeValue: false }`. Two components feed interpolated translations directly into `dangerouslySetInnerHTML`: `client/pages/Reports/SummaryView/PeriodColumn/PeriodColumnTooltip/CustomerHours.tsx:14` (injects `{{customer}}` name) and `...TotalHours.tsx:14`. A customer name containing `<script>` or `<img onerror>` would execute for any user viewing the report.
- Files: `client/pages/Reports/SummaryView/PeriodColumn/PeriodColumnTooltip/CustomerHours.tsx`, `.../TotalHours.tsx`, `client/i18n/index.ts`
- Current mitigation: None at the component boundary. Customer names come from trusted tenant admins, but in multi-tenant invite flows any project/customer creator is effectively a content author.
- Recommendation: Either enable i18next `escapeValue: true` with an allow-list component for the `<b>` wrappers (use `<Trans>`), or HTML-escape the interpolated value in the component before passing to the template. Prefer restructuring with JSX children so `dangerouslySetInnerHTML` disappears entirely.

**Multi-tenant DB isolation relies on `subscription.db`:**
- Risk: Every request's data scope is determined by `context.subscription.db` (`server/graphql/requestContext.ts:234`). If a resolver falls back to `context.mcl.db(environment('MONGO_DB_DB_NAME'))` and reads tenant-scoped data, it would leak across tenants.
- Files:
  - `server/graphql/requestContext.ts:173-175, 234-236`
  - `server/services/mongo/subscription.ts:45`
  - `server/services/mongo/holidays.ts:28`
  - `server/services/mongo/api_token.ts:55`
  - `server/middleware/passport/microsoft/onVerifySignin.ts:42, 66`
  - `server/middleware/passport/google/onVerifySignin.ts:29, 35`
- Current mitigation: Services explicitly select the main vs tenant DB in the constructor; `subscriptions` / `api_tokens` / `users_global` live in main, everything else in tenant. Per-request subscription refresh (#1377, commit `eab7a2f4f`) reduces stale-tenant risk.
- Recommendation: Enforce tenant-scoping in `MongoDocumentService` by making the base DB required and non-default, so any service that forgets to pass a DB fails at startup rather than silently falling through to main. Add a test that instantiates every service and asserts it binds to the expected DB.

**MAINTENANCE_MODE is an env flag with no UI kill switch:**
- Risk: `MAINTENANCE_MODE` is read via `environment('MAINTENANCE_MODE', null, { isSwitch: true })` (`server/routes/maintenanceMode.ts:16`) and evaluated at **request time**, so toggling requires only an env change - good. But the flag is not per-tenant; it takes the whole deployment down.
- Files: `server/routes/maintenanceMode.ts`, `server/app.ts:216-219`
- Current mitigation: N/A.
- Recommendation: For shared-deployment multi-tenancy consider tenant-scoped maintenance by reading `subscription.settings.maintenanceMode` instead of (or in addition to) the env flag.

## Performance Bottlenecks

**Redis session payload size** (already addressed in 0.21.0, #1378, `e76f67784`):
- Fix: `pickSessionFields` in `server/middleware/passport/index.ts:18-33` now writes only `id`, `mail`, `provider`, `role`, `subscription`, `configuration`, `tokenParams`. Strips `givenName`, `surname`, `jobTitle`, `mobilePhone`, `preferredLanguage`, `displayName` from session storage.
- Watch-list: Any new `Express.User` field added in TypeScript types will **not** automatically flow to sessions. Update `pickSessionFields` or the field silently drops at serialize time.

**Per-request subscription refresh** (intentional, 0.21.0, #1377):
- Detail: `server/graphql/requestContext.ts:140-160` does a `subscriptions.findOne` on every request to refresh tenant metadata. Mitigated by short code path and single-document read.
- Concern: This is an N+1 style overhead at `1-per-request`. For a chatty UI with many parallel GraphQL calls, that is `N` MongoDB round-trips. Consider a Redis-backed, short-TTL subscription cache (2-5s) keyed on `subscriptionId` to collapse bursts, with explicit invalidation on subscription updates.
- Files: `server/graphql/requestContext.ts:140-160`

**Dynamic role resolution on every request:**
- Detail: `server/graphql/requestContext.ts:171-232` fetches user document, role document, and permissions from the tenant DB every request. Two additional `findOne` calls per GraphQL operation.
- Files: `server/graphql/requestContext.ts:171-232`
- Impact: For a page that fires 10 queries on load, that's 10 × (users + roles) tenant-DB round trips on top of the subscription refresh.
- Fix approach: Add a short-TTL in-memory LRU keyed on `(subscriptionId, userId)` with explicit invalidation from the role/user mutation resolvers. Must preserve the "role change does not require sign-out" behaviour - TTL in seconds is acceptable.

**Apollo InMemoryCache default fetch-policy:**
- Detail: `client/graphql-client/index.ts:65` sets `cache-and-network` globally. This is safe but produces a request per navigation even when cache is warm, doubling server load vs `cache-first`.
- Files: `client/graphql-client/index.ts`
- Fix approach: Switch hot-path queries (user profile, subscription, timesheet navigation) to `cache-first` + manual refetch on explicit action. Leave `cache-and-network` as a default for rarely-visited admin pages.

**Client bundle / webpack split config is minimal:**
- Detail: `webpack/getOptimizationForEnvironment.js:17-37` only splits `node_modules` into a single `vendors` chunk, no commons, no deterministic moduleIds. Client bundle has Fluent UI v9 + v8 shims + Apollo + Recharts + react-beautiful-dnd - all of which are heavy. Bundle analyzer is now wired in via `--analyze` (0.21.0), but no budget is enforced.
- Files: `webpack/getOptimizationForEnvironment.js`, `webpack/getPluginsForEnvironment.js:57-59`
- Impact: Users download a monolithic `vendors` bundle on first paint even for a small route.
- Fix approach: Split by framework boundaries: `react`, `fluentui`, `apollo`, `charts`. Add `performance: { hints: 'error', maxAssetSize, maxEntrypointSize }` to webpack config so CI fails when bundles grow. Consider route-based code splitting via `React.lazy` for Admin, Reports, and Projects pages.

**Large files suggesting complexity hotspots:**
- Files (line counts):
  - `client/components/List/List.tsx` - 1120 lines (even after the 0.19.0 rewrite; the DataGrid wrapper + selection management is dense)
  - `client/theme/iconCatalog.ts` - 730 lines (explicit import catalog for Fluent UI v9 icons; consider codegen)
  - `server/services/report/ReportService.ts` - 693 lines
  - `shared/utils/holidayUtils.ts` - 613 lines
  - `shared/utils/date.ts` - 587 lines
  - `client/pages/Admin/SubscriptionSettings/SettingsSection/HolidaysField/HolidaysField.tsx` - 579 lines
  - `server/services/msgraph/MSGraphService.ts` - 576 lines (many near-identical `try { ... } catch (error) { throw new MSGraphError(...) }` wrappers; candidate for a decorator / higher-order helper)
- Fix approach: Extract concerns - List should split into List/Selection/Columns/ExcelExport; MSGraphService should push each Graph method through a single `this._graphCall(name, fn)` wrapper to consolidate error handling.

## Fragile Areas

**`server/graphql/requestContext.ts` - RequestContext.create:**
- Files: `server/graphql/requestContext.ts:113-244`
- Why fragile: This single function handles API-key auth, session auth, tenant DB routing, subscription refresh, user context hydration, and role+permission resolution. Four fallback branches, three `get()` lookups against `request.user.*`, two try/catch blocks with string-based debug logs. Each fix (#1377, #1378, #1371, #1365) has touched it.
- Safe modification: Add tests first - `requestContext.test.ts` exists at `server/graphql/requestContext.test.ts` and is extensive, but coverage of failure modes (DB unreachable during subscription refresh, tenant DB unreachable during role resolution, malformed session user) should be audited per-branch.
- Test coverage: Good for happy paths and one refresh-miss case. Gaps: subscription refresh throwing mid-flight, malformed token payload with missing `subscriptionId`, `userDoc.role` being a non-string legacy object.

**`server/middleware/passport/microsoft/*` Entra ID sign-in chain:**
- Files: `server/middleware/passport/microsoft/onVerifySignin.ts` (193 lines), `.../retrieveSubscription.ts`, `.../synchronizeUserProfile.ts`, `.../checkSecurityGroupMembership.ts`, `.../processUserInvitation.ts`
- Why fragile: Couples subscription lookup, invitation lookup, security-group lookup, user create/update, and profile sync in one verify callback. Errors are mapped to bespoke `SigninError` subclasses, and `IProfile._json` is cast to `IProfileJson` (`onVerifySignin.ts:46`). Microsoft's `passport-azure-ad` library is deprecated; upgrade will force a rewrite.
- Safe modification: Keep `checkSecurityGroupMembership`, `synchronizeUserProfile`, `retrieveSubscription` as pure functions; add unit tests around `onVerifySignin` with faked MSGraph + Mongo. A regression in this path is a silent auth lockout (users can sign in elsewhere but not here, or worse, get the wrong tenant).
- Test coverage: `server/middleware/passport/index.test.ts` exists but does not exercise the full Microsoft chain end-to-end.

**MS Graph error handling:**
- Files: `server/services/msgraph/MSGraphService.ts:76`, `:112`, `:135`, `:182`, `:227`, `:263`, `:295`, `:372`, `:397`, `:416`, `:448`, `:526`
- Why fragile: Two distinct error styles - some methods `throw new MSGraphError(...)`, others silently `return null` / `return false`. The silent-fallback methods (`getUserPhoto`, `isUserMemberOfSecurityGroup`, `getUserManager`, `getUser`) mask 401/403/429 errors. Delta sync (`getUsersDelta`) additionally handles expired delta links elsewhere (per 0.17.0 changelog).
- Safe modification: Prefer explicit discriminated-union returns (`{ ok: true, value } | { ok: false, error }`) over mixed throw/null.
- Test coverage: None for these service methods (no `MSGraphService.test.ts`).

**Holiday parsing + timebank calculation chain:**
- Files: `shared/utils/holidayUtils.ts`, `shared/utils/DateObject.ts:4, 243`, `server/graphql/resolvers/timesheet/types/HolidayObject.ts`, `client/pages/Admin/SubscriptionSettings/SettingsSection/HolidaysField/HolidaysField.tsx` (579 lines)
- Why fragile: Timezone-sensitive math that affects pay periods. Multiple independent code paths - server-side resolver, client-side timebank UI, shared utilities - now all funnel through `parseHolidayDate` (0.21.0 #1376).
- Safe modification: Any change that touches holiday date inputs must route through `parseHolidayDate`. Add a lint-level rule or a type-level wrapper (`type HolidayDate = { __brand: 'HolidayDate' }`) so raw strings cannot sneak in.
- Test coverage: `shared/utils/holidayUtils.test.ts` (456 lines, 50+ cases) - solid.

**List component (1120 lines):**
- Files: `client/components/List/List.tsx`, `client/components/List/types/IListColumn.ts`, `client/components/List/hooks/columnSizing.ts`
- Why fragile: Rewritten in 0.19.0 to Fluent UI v9 DataGrid/TreeGrid. `isResizable` prop accepted but non-functional (`IListColumn.ts:51`). Column sizing persistence was removed in 0.21.0 (#1375) after silent collisions across lists sharing column-key sequences. Excel export state pulled from localStorage directly in 0.21.0 to avoid `useBrowserStorage` snapshot staleness (#1372).
- Safe modification: All three concerns (sizing, selection, export visibility) share state via `context.state.columns`. Any prop that re-enters the state tree needs to update everywhere at once.
- Test coverage: Unit tests for `estimateColumnWidth` added in #1375. End-to-end list interactions not covered.

## Scaling Limits

**MongoDB v3 driver connection pool defaults:**
- Files: `server/app.ts:125-138`
- Current config: `maxPoolSize: 50`, `minPoolSize: 10`, `socketTimeoutMS: 300_000`, `serverSelectionTimeoutMS: 30_000`, `retryWrites: true`
- Limit: 50 concurrent connections per app instance. The per-request role+subscription refresh (`requestContext.ts:140-232`) uses 3 reads per GraphQL operation; sustained 15-20 QPS against a single instance will saturate the pool.
- Scaling path: Upgrade to mongodb driver v5+ (uses connection pooling more efficiently), tune `maxPoolSize` per tenant load, add the subscription/role cache described above.

**Health check rate limit applies only to `/health_check`:**
- Files: `server/app.ts:200-250`
- Current config: 10 requests/minute per IP on `/health_check`. No rate limit on `/graphql` or `/auth/*`.
- Limit: Auth endpoints (`/auth/.../signin`) are not rate limited - brute force / enumeration of tenants is possible.
- Scaling path: Add a per-IP limiter on `/auth/*` and a per-IP + per-session limiter on `/graphql`. `express-rate-limit` is already in the dependency tree (`package.json:100`).

**`MAINTENANCE_MODE` is deployment-wide:**
- Files: `server/routes/maintenanceMode.ts`
- Limit: Only one knob for all tenants. Cannot schedule per-tenant maintenance.
- Scaling path: See "MAINTENANCE_MODE" under Security.

**Redis TTL and payload** (tuned in 0.21.0, commit `3da3842ca` "Harden cache semantics and tune Redis TTLs"):
- Files: `server/services/cache.ts`, `server/middleware/session/index.ts:20` (`ttl: 1_209_600` = 14 days)
- Limit: 14-day session TTL is long. Combined with `rolling: false` (`session/index.ts:26`), sessions expire absolutely at 14 days - but any credential stolen in that window is valid for the remainder. No CSRF token rotation.
- Scaling path: Consider `rolling: true` with a shorter absolute cap, or explicit idle-timeout handling in `client/app/App.tsx` (activity detector already exists per #1378).

## Dependencies at Risk

**`passport-azure-ad@4.3.5`:**
- Risk: Deprecated by Microsoft. Authentication-critical.
- Impact: No security patches; Entra ID protocol changes will not be supported upstream.
- Migration plan: Move to `@azure/msal-node` with a custom passport strategy, or drop passport entirely for MSAL. Requires restructuring `server/middleware/passport/microsoft/*` and updating `server/routes/auth.ts`.

**`mongodb@^3.7.4` + `@types/mongodb@^3.6.20`:**
- Risk: Driver v3 is EOL. No further security releases.
- Impact: CVE exposure; drift from Atlas features (new aggregation operators, transactions with resumable sessions, etc.).
- Migration plan: Upgrade to v5 or v6. Breaking changes: `useNewUrlParser`/`useUnifiedTopology` removed (already no-ops), `FilterQuery`→`Filter`, `MongoClientOptions` shape, callback-style APIs dropped. Touch `server/services/mongo/document.ts` + every service extending it.

**`redis@^3.1.2` + `connect-redis@5.2.0`:**
- Risk: Legacy node-redis v3. Different API in v4+ (promises, no more callback factory). `connect-redis@6+` requires v4 client.
- Impact: Missing features, legacy callback patterns throughout `server/services/cache.ts` and `server/middleware/redis/index.ts`.
- Migration plan: Combined upgrade. Refactor `CacheService._get/_set/_clear` to use promises. The in-test mock client (`server/middleware/redis/index.ts:62-86`) will need updates too.

**`helmet@3.23.3`:**
- Risk: v3 is ancient. Missing modern defaults and options.
- Impact: Weaker default security headers. No Content-Security-Policy configured today (`server/middleware/helmet/index.ts:12-22`).
- Migration plan: Upgrade to v8, then author a CSP policy that matches actual asset origins (Fluent UI fonts, Graph images, Google fonts if used).

**`react@17.0.2` + `react-dom@17.0.2`:**
- Risk: One major behind. React 19 is out.
- Impact: Missing automatic batching, Suspense improvements, better error boundaries.
- Migration plan: React 17 → 18 is mostly drop-in but requires `ReactDOM.createRoot`; React Router v5 then becomes the tall pole.

**`react-router-dom@5.3.4`:**
- Risk: Two majors behind.
- Impact: API drift (Switch→Routes, nested routes, loaders).
- Migration plan: Big migration because route config is spread across pages. Consider stopping at v6 for now; v7 is more disruptive.

## Missing Critical Features

**No per-request audit log:**
- Problem: `debug('...')` statements throughout `requestContext.ts`, `authChecker.ts`, and resolvers are dev-only (gated by the `DEBUG` env var). There is no structured audit log of who invoked what mutation against which tenant.
- Blocks: Compliance / forensic analysis, ability to answer "who changed this role?" without reconstructing from MongoDB updates.
- Fix approach: Add a `requestDidStart` Apollo plugin that records `{ requestId, userId, subscriptionId, operationName, variablesHash, outcome }` to a capped MongoDB collection or external sink.

**No centralized error boundary on the server:**
- Problem: Per-route try/catch scatter; `setupErrorHandling` in `server/app.ts:295-319` only handles 404s and a top-level error renderer. GraphQL errors go through `formatError` in `setupGraphQL.ts:61-89` but with no correlation ID propagation.
- Blocks: Cannot correlate client errors to server logs; client sees `message` but server log needs `requestId`.
- Fix approach: Attach `extensions.requestId = requestContext.requestId` in `formatError`; have the client surface it in the error boundary.

**No Content-Security-Policy:**
- Problem: `server/middleware/helmet/index.ts` does not configure `contentSecurityPolicy` (helmet v3 doesn't set it by default, and the current config omits it).
- Blocks: Any stored-XSS (e.g. the `dangerouslySetInnerHTML` finding above) would execute unconditionally.
- Fix approach: After helmet upgrade, define CSP that restricts `script-src` to `'self'` + Apollo + Fluent UI CDN if any.

## Test Coverage Gaps

**MSGraphService:**
- What's not tested: Every public method. No `MSGraphService.test.ts` / `.spec.ts`.
- Files: `server/services/msgraph/MSGraphService.ts` (576 lines)
- Risk: Graph SDK upgrade or permission change can regress silently.
- Priority: High - this service crosses the critical path for calendar→timesheet sync.

**Role+permission resolution branches in requestContext:**
- What's not tested: Failure modes of `tenantDb.collection('users').findOne(...)` and `tenantDb.collection('roles').findOne(...)` in `server/graphql/requestContext.ts:171-232`.
- Files: `server/graphql/requestContext.ts`, `server/graphql/requestContext.test.ts`
- Risk: A tenant with a deleted role record would silently fall back to session permissions.
- Priority: High - authz is at stake.

**Microsoft sign-in verify chain:**
- What's not tested: End-to-end behaviour of `onVerifySignin` (`server/middleware/passport/microsoft/onVerifySignin.ts`). Subfunctions (`retrieveSubscription`, `checkSecurityGroupMembership`) are simple enough to mock.
- Files: `server/middleware/passport/microsoft/*.ts`
- Risk: Regression in tenant enrollment or external invitation flow.
- Priority: High - auth regressions are user-visible immediately.

**Client Apollo link / error handling:**
- What's not tested: `client/graphql-client/apolloLink.ts`, `client/graphql-client/httpLink.ts`.
- Files: `client/graphql-client/*.ts`
- Risk: Network/auth retry logic, error-to-toast mapping.
- Priority: Medium.

**XSS-suspect tooltip components:**
- What's not tested: `client/pages/Reports/SummaryView/PeriodColumn/PeriodColumnTooltip/CustomerHours.tsx`, `.../TotalHours.tsx`.
- Files: above
- Risk: The exact XSS class flagged in Security Considerations.
- Priority: High - a single test with a payload like `<img src=x onerror=...>` as customer name demonstrates the risk or confirms the fix.

**End-to-end list interactions:**
- What's not tested: Selection state, group collapse, filter panel, Excel export at the interaction level. Unit tests exist for column sizing helpers only.
- Files: `client/components/List/*`
- Risk: Fluent UI v9 version bumps.
- Priority: Medium.

**CSRF / open-redirect regressions:**
- What's tested: 0.21.0 #1379 added auth boundary and URL state regression tests (`d46feb579`). Keep these and add equivalents any time a new redirect or session-setting endpoint lands.
- Files: Exact test files added in #1379.
- Priority: Keep-current - the regression suite is the guard.

---

*Concerns audit: 2026-04-24*

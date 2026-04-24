# Codebase Structure

**Analysis Date:** 2026-04-24

## Directory Layout

```
did/
├── client/                 # React/TypeScript SPA (Webpack-bundled)
│   ├── index.tsx           # Client bootstrap entry (fetch session, render <App />)
│   ├── app/                # Root <App />, router, global context/reducer
│   ├── components/         # Reusable UI components (one folder per component)
│   ├── parts/              # Larger app-wide UI pieces (Navigation, ErrorFallback, UserMenu, etc.)
│   ├── pages/              # Top-level routed pages (Admin, Customers, Home, Projects, Reports, Timesheet)
│   ├── graphql-client/     # Apollo Client instance, links, fragments
│   ├── graphql-queries/    # Co-located GraphQL .gql queries per entity
│   ├── graphql-mutations/  # Co-located GraphQL .gql mutations per entity
│   ├── hooks/              # Reusable hooks (browserStorage, extensions, notifications, route, user, common)
│   ├── i18n/               # i18next setup + language JSON bundles (en-GB, nb, nn)
│   ├── logging/            # Client logger (log level controlled at build time)
│   ├── theme/              # Fluent UI themes + icon catalog + <Themed /> wrapper
│   ├── utils/              # Pure client utilities (fuzzy matching, URL state, formatting, excel export, etc.)
│   ├── types/              # Shared client TypeScript types
│   ├── global.d.ts         # Ambient declarations for build-time vars (ICONS_BASE_URL, VERSION, etc.)
│   ├── tsconfig.json       # Client TS config (ES2018)
│   └── AGENTS.md           # Scoped client conventions
│
├── server/                 # Node.js/Express + TypeGraphQL API
│   ├── index.ts            # HTTP server entry (startServer on env PORT)
│   ├── app.ts              # Express App class — middleware + setup orchestration
│   ├── graphql/            # Apollo Server + TypeGraphQL wiring
│   │   ├── setupGraphQL.ts
│   │   ├── generateGraphQLSchema.ts
│   │   ├── requestContext.ts
│   │   ├── authChecker.ts
│   │   ├── generateClientInfo.ts
│   │   ├── index.ts
│   │   └── resolvers/      # One folder per entity, each with <Entity>Resolver.ts + types/
│   ├── services/           # TypeDI-injected services
│   │   ├── mongo/          # One service per Mongo collection
│   │   ├── msgraph/        # Microsoft Graph client services
│   │   ├── google/         # Google Calendar service
│   │   ├── timesheet/      # TimesheetService + TimesheetMatchingEngine
│   │   ├── notification/
│   │   ├── report/
│   │   ├── cache.ts        # Redis cache service
│   │   ├── msoauth.ts
│   │   ├── github.ts
│   │   └── index.ts
│   ├── middleware/         # Express middleware (helmet, passport, redis, session, gzip)
│   ├── routes/             # Express routes (default index, /auth, maintenanceMode)
│   ├── utils/              # Server-only utilities (environment, generateId, callback URLs, etc.)
│   ├── views/              # hbs templates (index.hbs emitted by webpack, static pages)
│   ├── public/             # Static assets served by Express (webpack output goes into public/js)
│   ├── global.d.ts
│   └── AGENTS.md
│
├── shared/                 # Platform-agnostic code shared by client + server
│   ├── config/security/    # RBAC permission scopes (permissions.ts, types.ts, index.ts)
│   ├── types/              # Shared TS types (e.g. HolidayObject.ts)
│   ├── utils/              # Shared utilities (date, DateObject, holidayUtils, firstPart, toFixed)
│   └── AGENTS.md
│
├── webpack/                # Webpack 5 config modules (one concern per file)
│   ├── config.js
│   ├── constants.js
│   ├── getRules.js
│   ├── getResolves.js
│   ├── getPluginsForEnvironment.js
│   ├── getOptimizationForEnvironment.js
│   ├── exportedVarsPlugin.js
│   ├── compileHooks.js
│   └── AGENTS.md
│
├── docker/                 # Local dev orchestration + seed data
│   ├── data/               # Seed/import data for MongoDB
│   ├── sample-data/
│   ├── import-data.sh
│   └── AGENTS.md
│
├── extension/              # Standalone browser extension (sidebar + background.js, Manifest V3)
│   ├── manifest.json
│   ├── sidebar.html
│   ├── sidebar.js
│   ├── background.js
│   ├── build.sh
│   └── icons/
│
├── scripts/                # Dev/CI shell scripts (docker.sh, agent-setup.sh, deploy.sh, etc.)
├── assets/                 # Branding/static assets used at build time
├── dist/                   # Production build output (server + bundled client)
├── docs/                   # Generated/manual developer documentation
├── .planning/              # GSD planning artifacts (including this file)
├── .changelog/             # Changelog fragments used by release tooling
├── docker-compose.yml      # Local dev compose file
├── docker-compose.override.yml
├── Dockerfile
├── apollo.config.js        # Apollo CLI config (schema lookup for tooling)
├── tsconfig.json           # Root TS config (server build target)
├── package.json            # Shared deps + scripts; separate tsconfigs for client/server
└── AGENTS.md               # Root agent instructions
```

## Directory Purposes

**`client/`:**
- Purpose: React 18 SPA rendered into `#app` inside `server/views/index.hbs`.
- Contains: Components, pages, hooks, GraphQL queries/mutations, Apollo client config, i18n, theming.
- Key files: `client/index.tsx`, `client/app/App.tsx`, `client/app/AppRouter.tsx`, `client/graphql-client/index.ts`.

**`client/components/`:**
- Purpose: Reusable UI components built on Fluent UI primitives.
- Contains: One folder per component with strict file layout (see naming conventions below).

**`client/parts/`:**
- Purpose: Larger app-wide structural UI that is not reused as a "component" (e.g. `Navigation`, `UserMenu`, `ErrorFallback`, `UserFeedback`, `UserNotifications`, `MobileBreadcrumb`).

**`client/pages/`:**
- Purpose: Routed top-level pages mounted by `AppSwitch`/`AppRouter`.
- Subfolders: `Admin/`, `Customers/`, `Home/`, `Projects/`, `Reports/`, `Timesheet/`.
- Complex pages have their own `reducer/`, `context.ts`, `hooks/`, and `types/` folders (see `client/pages/Timesheet/`).

**`client/hooks/`:**
- Purpose: Cross-page React hooks. Subgroups: `browserStorage/`, `common/`, `excel/`, `extensions/`, `notifications/`, `route/`, `user/`.
- Key files: `client/hooks/user/usePermissions.ts`, `client/hooks/useBreadcrumb.ts`, `client/hooks/useMergedState.ts`, `client/hooks/useReduxReducer.ts`.

**`client/graphql-client/`:**
- Purpose: Apollo Client singleton + link chain + shared fragments.
- Key files: `client/graphql-client/index.ts`, `client/graphql-client/apolloLink.ts`, `client/graphql-client/httpLink.ts`, `client/graphql-client/fragments/`.

**`client/graphql-queries/` and `client/graphql-mutations/`:**
- Purpose: `.gql` files grouped by entity (e.g. `client/graphql-queries/session/`, `client/graphql-mutations/project/`).

**`server/graphql/`:**
- Purpose: Apollo Server setup, schema generation, request context, auth checker, resolvers.
- Key files: `server/graphql/setupGraphQL.ts`, `server/graphql/requestContext.ts`, `server/graphql/authChecker.ts`, `server/graphql/generateGraphQLSchema.ts`.

**`server/graphql/resolvers/`:**
- Purpose: TypeGraphQL resolver classes, one folder per domain entity.
- Naming: folder lowerCamelCase (`timesheet`, `reportLink`, `personalAccessToken`); resolver class PascalCase + `Resolver` suffix (`TimesheetResolver`, `PersonalAccessTokenResolver`).
- Each folder contains: `<Entity>Resolver.ts`, `index.ts`, a `types/` (or `types.ts`) module for TypeGraphQL input/output types.

**`server/services/`:**
- Purpose: TypeDI-injected services. `@Service({ global: false })` -> one instance per GraphQL request.
- Subgroups:
  - `server/services/mongo/` - one file per collection (e.g. `user.ts` -> `UserService`, `time_entry.ts` -> `TimeEntryService`, plus `document/MongoDocumentService.ts` base class).
  - `server/services/msgraph/` - Microsoft Graph (`MSGraphService.ts`, `MSGraphDeltaService.ts`).
  - `server/services/google/` - Google Calendar.
  - `server/services/timesheet/` - `TimesheetService.ts`, `TimesheetMatchingEngine.ts`, `extensions.ts`, `utils.ts`.
  - `server/services/notification/`, `server/services/report/`.
- Root-level: `server/services/cache.ts` (Redis cache), `server/services/msoauth.ts`, `server/services/github.ts`, `server/services/index.ts` (barrel).

**`server/middleware/`:**
- Purpose: Express middleware grouped by concern. Each subfolder exports through `index.ts`; root `server/middleware/index.ts` re-exports them.
- Subfolders: `helmet/`, `passport/` (with `microsoft/`, `google/`, `errors/`), `redis/`, `session/`, `gzip/`.

**`server/routes/`:**
- Purpose: Express routes.
- Key files: `server/routes/index.ts` (default root + SPA catch-all), `server/routes/auth.ts` (`/auth/*`), `server/routes/maintenanceMode.ts`, `server/routes/utils.ts` (`renderPage`).

**`server/utils/`:**
- Purpose: Server-only utilities. Key files: `server/utils/environment.ts` (typed env var reader), `server/utils/generateId.ts`, `server/utils/getCallbackUrl.ts`, `server/utils/tryParseJson.ts`, `server/utils/toFixed.ts`, `server/utils/stripHtmlString.ts`, `server/utils/index.ts`.

**`server/views/`:**
- Purpose: Handlebars templates rendered by Express. `_template.hbs` is the source fed to HtmlWebpackPlugin; `index.hbs` is emitted into this directory by Webpack.

**`server/public/`:**
- Purpose: Static assets served via `express.static`. Webpack writes the client bundle to `server/public/js/` (dev) or `dist/server/public/js/` (prod).
- Generated: Yes (the `js/` subfolder). Other subfolders (images, icons) are committed.

**`shared/`:**
- Purpose: Cross-platform code consumed by both client and server. MUST NOT import `express`, `react`, or Node built-ins directly.
- Subfolders: `config/security/` (permission scopes — single source of truth for RBAC), `types/`, `utils/`.

**`webpack/`:**
- Purpose: Modular Webpack 5 configuration. `config.js` composes the other files via `constants.js` / `getRules.js` / `getResolves.js` / `getPluginsForEnvironment.js` / `getOptimizationForEnvironment.js`.

**`docker/`:**
- Purpose: Local dev orchestration and sample data only (no production Dockerfile here — Azure slot-swap is used in prod).
- Generated: No. Committed: Yes.

**`extension/`:**
- Purpose: Standalone browser extension (Manifest V3) that integrates with did. Independent of the main Webpack build (has its own `build.sh`).

**`scripts/`:**
- Purpose: Shell/PowerShell scripts for docker orchestration (`docker.sh`), worktree/agent setup (`agent-setup.sh`, `agent-teardown.sh`), deployment (`deploy.sh`), maintenance mode toggling.

**`dist/`:**
- Purpose: Compiled production output (`tsc` + Webpack). Generated: Yes. Committed: No.

**`.planning/`:**
- Purpose: GSD planning artifacts (phase plans, codebase maps). Committed: Yes.

## Key File Locations

**Entry Points:**
- `server/index.ts`: HTTP server entry (`startServer(PORT)`).
- `server/app.ts`: Express app class (`App.setup()` orchestrates everything).
- `client/index.tsx`: Client bootstrap (Apollo + React render).
- `webpack/config.js`: Webpack build entry.

**Configuration:**
- `.env` (local, git-ignored), `.env.sample` (committed template).
- `.nvmrc`: Node version pin.
- `tsconfig.json`: Root (server) TypeScript config; `client/tsconfig.json`: client config (ES2018 target).
- `apollo.config.js`: Apollo CLI / IDE integration.
- `docker-compose.yml` + `docker-compose.override.yml`: Local dev orchestration.
- `package.json`: Shared deps + npm scripts + `gitmoji` commit config + `BUNDLE_FILE_NAME`.

**Core Logic:**
- GraphQL setup: `server/graphql/setupGraphQL.ts`.
- Request context / multi-tenant resolution: `server/graphql/requestContext.ts`.
- Permission enforcement: `server/graphql/authChecker.ts` + `shared/config/security/permissions.ts`.
- Timesheet business logic: `server/services/timesheet/TimesheetService.ts` + `server/services/timesheet/TimesheetMatchingEngine.ts`.
- Auth strategies: `server/middleware/passport/microsoft/`, `server/middleware/passport/google/`.
- Session storage: `server/middleware/session/index.ts`, `server/middleware/redis/index.ts`.

**Client app shell:**
- `client/app/App.tsx`, `client/app/AppRouter.tsx`, `client/app/AppSwitch.tsx`, `client/app/context.ts`, `client/app/reducer.ts`, `client/app/useApp.ts`.

**Testing:**
- Test files are co-located with source using `.test.ts` (AVA). See `server/graphql/requestContext.test.ts`, `server/utils/environment.test.ts`, `shared/utils/date.test.ts`, `client/utils/*.test.ts`, etc.

## Naming Conventions

**Files (client components):**
- `client/components/<ComponentName>/` must contain exactly:
  - `<ComponentName>.tsx` — functional component.
  - `<ComponentName>.module.scss` — SCSS module (imported as `styles`).
  - `<ComponentName>.module.scss.d.ts` — generated typings.
  - `index.ts` — re-exports only.
  - `types.ts` — component TS interfaces.
  - `use<ComponentName>.ts` — business-logic hook.
- Example: `client/components/EventList/EventList.tsx`, `client/components/EventList/useColumns.tsx`.

**Files (server):**
- Resolver class files: `<Entity>Resolver.ts` in `server/graphql/resolvers/<entity>/`.
- Mongo service files: snake_case filename matching the collection (`time_entry.ts`, `api_token.ts`, `forecasted_periods.ts`) exporting a PascalCase `<Entity>Service` class.
- Other services: PascalCase filename matching the class (`TimesheetService.ts`, `MSGraphService.ts`, `TimesheetMatchingEngine.ts`).
- Test files: co-located `<source>.test.ts`.

**Folders:**
- Client component folders and page folders: PascalCase (`EventList`, `Timesheet`, `FormControl`).
- Client page-internal folders: PascalCase for sub-features (`ActionBar`, `SummaryView`) and lowerCamelCase for scaffolding (`hooks`, `reducer`, `types`, `context.ts`).
- Server resolver folders: lowerCamelCase (`timesheet`, `personalAccessToken`, `reportLink`).
- Server service groupings: lowerCamelCase (`mongo`, `msgraph`, `timesheet`, `notification`, `report`).
- GraphQL query/mutation folders: lowerCamelCase per entity (`client/graphql-queries/session/`, `client/graphql-mutations/outlookCategory/`).

**Exports:**
- Every folder exports through its `index.ts` (barrel). Prefer named exports; reserve `default` for the single canonical export (e.g. `server/app.ts` default-exports the `App` instance).

**Functions and variables:**
- camelCase for functions and variables; PascalCase for classes and React components; `use<Name>` prefix for hooks; no semicolons; 2-space indent (Prettier).

## Where to Add New Code

**New UI component:**
- Create `client/components/<Name>/` with the six-file layout above.
- Re-export from `client/components/index.ts`.

**New page (route):**
- Create `client/pages/<Name>/` with `<Name>.tsx`, `<Name>Page.tsx`, `index.ts`, and per-page `reducer/`, `context.ts`, `hooks/`, `types/` as needed.
- Register the page in `client/pages/index.ts` and `client/pages/usePages.tsx`; route wiring lives in `client/app/AppSwitch.tsx` and `client/app/AppRouter.tsx`.

**New GraphQL query/mutation (client):**
- Add `.gql` under `client/graphql-queries/<entity>/` or `client/graphql-mutations/<entity>/`.
- Consume via `useQuery` / `useMutation` inside the owning component or its `use<Component>.ts` hook.

**New GraphQL resolver (server):**
- Create `server/graphql/resolvers/<entity>/<Entity>Resolver.ts` with `@Service()` + `@Resolver(T)` and a sibling `types/` or `types.ts` for input/output classes.
- Register the resolver in `server/graphql/resolvers/index.ts` (add to the exported array).
- Guard each query/mutation with `@Authorized<IAuthOptions>({ scope: PermissionScope.XYZ })` using scopes from `shared/config/security/permissions.ts`.

**New Mongo collection access:**
- Add `server/services/mongo/<collection>.ts` (or a folder with `index.ts` + `<Entity>Service.ts` + `types.ts`) exporting a `@Service({ global: false })` class.
- Export from `server/services/mongo/index.ts`.
- Use `this.context.db.collection(...)` (injected `CONTEXT`) so the tenant DB is honoured.

**New external integration:**
- Add a service under `server/services/<integration>/` (mirroring `msgraph/` or `google/`) and export via `server/services/index.ts`.
- Put secrets in env vars and read them with `environment(...)` from `server/utils/environment.ts`.

**New permission scope:**
- Add a constant in `shared/config/security/permissions.ts`.
- Reference it from the server via `@Authorized({ scope })` and from the client via `usePermissions` (`client/hooks/user/usePermissions.ts`).

**New shared utility:**
- Add to `shared/utils/` with a co-located `.test.ts`. Keep it pure — no `express`, no `react`, no Node built-ins.

**New Express middleware:**
- Create `server/middleware/<name>/index.ts` and re-export from `server/middleware/index.ts`. Register in `server/app.ts` (preserve existing order; security/session first, routes last).

**New translation string:**
- Add the key to all three files: `client/i18n/en-GB.json`, `client/i18n/nb.json`, `client/i18n/nn.json`. Consume via `useTranslation` from `react-i18next`.

## Special Directories

**`server/public/`:**
- Purpose: Static assets served by Express.
- Generated: Partially — `server/public/js/` is generated by Webpack on build; `server/public/images/`, `server/public/assets/` contain committed assets.

**`server/views/`:**
- Purpose: Handlebars templates.
- Generated: `server/views/index.hbs` is generated by HtmlWebpackPlugin from `server/views/_template.hbs`. Static pages (`termsofservice.html`, `privacystatement.html`) are committed.

**`dist/`:**
- Purpose: Production build output. Generated: Yes. Committed: No.

**`node_modules/`:**
- Purpose: Installed dependencies. Generated: Yes. Committed: No.

**`.planning/`:**
- Purpose: GSD planning artifacts. Generated: By `/gsd-*` commands. Committed: Yes.

**`extension/`:**
- Purpose: Standalone browser extension. Built independently via `extension/build.sh`; not part of the main Webpack build.

---

*Structure analysis: 2026-04-24*

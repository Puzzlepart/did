# Technology Stack

**Analysis Date:** 2026-04-24

## Languages

**Primary:**
- TypeScript 5.9.x - Used across server (`server/**/*.ts`), client (`client/**/*.tsx`), and shared code (`shared/**/*.ts`). Configured via `tsconfig.json` (server, CommonJS output) and `client/tsconfig.json` (ESNext module, React JSX).
- JavaScript (Node.js) - Used for tooling in `.tasks/`, `webpack/*.js`, `scripts/*.sh`, and the Microsoft Edge extension under `extension/*.js`.

**Secondary:**
- SCSS / CSS Modules - Component styles (e.g. `client/components/**/*.module.scss`). Processed via `sass-loader` + `css-modules-typescript-loader` (see `webpack/getRules.js`).
- GraphQL SDL (`*.gql`, `*.graphql`) - Client queries/mutations in `client/graphql-queries/` and `client/graphql-mutations/`, loaded with `graphql-tag/loader`.
- Handlebars (`hbs`) - Server-side view engine, entry template `server/views/_template.hbs` and rendered `server/views/index.hbs`.
- Bash + PowerShell - Deployment and maintenance scripts (`scripts/deploy.sh`, `scripts/Set-MaintenanceMode.ps1`).

## Runtime

**Environment:**
- Node.js `>=22.14.0` (pinned in `package.json` engines and `.nvmrc` = `22.14.0`). Production Docker image `node:22.14.0-alpine` (`Dockerfile` stages `base` and `production`).

**Package Manager:**
- npm `>=10.0.0` (per `package.json` engines field).
- Lockfile: `package-lock.json` present at repo root (single workspace - no nested `package.json` in `client/`, `server/`, or `shared/`).

## Frameworks

**Backend (server):**
- `express` ^4.22.1 - HTTP server, see `server/app.ts` and `server/index.ts`.
- `@apollo/server` 4.13.0 - GraphQL server mounted at `/graphql` via `server/graphql/setupGraphQL.ts`.
- `type-graphql` 2.0.0-rc.4 - Decorator-based GraphQL schema, resolvers under `server/graphql/resolvers/`.
- `typedi` 0.10.0 + `reflect-metadata` 0.2.2 - Per-request DI container, reset in the Apollo `requestDidStart` plugin (`server/graphql/setupGraphQL.ts`).
- `passport` 0.7.0 + `passport-azure-ad` 4.3.5 + `passport-google-oauth20` 2.0.0 - Auth strategies in `server/middleware/passport/microsoft/index.ts` and `server/middleware/passport/google/index.ts`.
- `express-session` ^1.19.0 + `connect-redis` 5.2.0 - Redis-backed sessions (`server/middleware/session/index.ts`).
- `hbs` 4.2.0 - Handlebars view engine (`server/app.ts` `setupViewEngine`).
- `helmet` 3.23.3 - Security headers (`server/middleware/helmet/index.ts`).
- `express-rate-limit` 7.5.1 - Rate limiting on `/health_check` (`server/app.ts`).
- `morgan` ^1.10.1 - HTTP access logging.

**Frontend (client):**
- `react` 17.0.2 + `react-dom` 17.0.2 - UI library, entry `client/index.tsx`.
- `@apollo/client` 3.10.4 - GraphQL client, configured in `client/graphql-client/index.ts`.
- `@reduxjs/toolkit` 1.9.7 - State management where used.
- `@fluentui/react-components` 9.73.2 (+ `@fluentui-contrib/*`, `@fluentui/react-datepicker-compat`, `@fluentui/react-breadcrumb-preview`, `@fluentui/react-tags-preview`, `@fluentui/react-portal-compat`, `@uifabric/icons`) - Primary design system.
- `react-router-dom` 5.3.4 - Routing.
- `react-i18next` 11.18.6 + `i18next` 20.6.1 - Localization, setup in `client/i18n/index.ts` (locales: `en-GB.json`, `nb.json`, `nn.json`).
- `recharts` 2.15.4 - Charts.
- `react-beautiful-dnd` 13.1.1 - Drag-and-drop.
- `react-window` ^1.8.11 + `@fluentui-contrib/react-data-grid-react-window` ^1.4.2 - Virtualized lists/grids.
- `dayjs` 1.11.19 - Date manipulation (wrapped by `shared/utils/DateObject.ts`).

**GraphQL:**
- `graphql` 16.13.1, `graphql-scalars` 1.25.0, `graphql-tag` 2.12.6.

**Testing:**
- `ava` 6.4.1 - Test runner (config in `package.json` `ava` field: `ts-node/register`, commonjs, 2m timeout). Run via `npm test`.
- `ts-node` 10.9.2 - TypeScript execution for tests and dev server (`nodemon` exec is `ts-node ./server/index.ts -T`).

**Build / Dev:**
- `webpack` ^5.105.4 + `webpack-cli` 5.1.4 - Client bundler. Config split across `webpack/config.js`, `webpack/getRules.js`, `webpack/getPluginsForEnvironment.js`, `webpack/getOptimizationForEnvironment.js`, `webpack/getResolves.js`, `webpack/constants.js`, `webpack/exportedVarsPlugin.js`, `webpack/compileHooks.js`.
- `ts-loader` 9.5.4 + `babel-loader` 8.4.1 + `@babel/preset-env` 7.29.0 - TS compilation chain in webpack rules.
- `sass-loader` 16.0.7 + `css-loader` 5.2.7 + `style-loader` 2.0.0 + `css-modules-typescript-loader` 4.0.1 + `mini-css-extract-plugin` ^2.10.1 - Style pipeline.
- `html-webpack-plugin` 5.6.6 - Emits `server/views/index.hbs` from `server/views/_template.hbs`.
- `fork-ts-checker-webpack-plugin` 9.1.0 - Parallel TS type-checking in dev.
- `webpack-livereload-plugin` 3.0.2, `webpack-bundle-analyzer` 4.10.2, `terser-webpack-plugin` ^5.3.17.
- `git-revision-webpack-plugin` ^5.0.0 - Injects `GIT_VERSION`/`GIT_COMMITHASH`/branch into the client bundle.
- `nodemon` ^3.1.14 - Dev server watcher (`nodemonConfig` in `package.json`).
- `copyfiles` 2.4.1 + `rimraf` 3.0.2 - Build helpers.
- `archiver` ^5.3.2 - Produces `did-package.zip` during CI (`npm run package` via `.tasks/package.js`).

## Key Dependencies

**Critical:**
- `mongodb` ^3.7.4 - Driver for MongoDB / Azure Cosmos DB for MongoDB (pool settings in `server/app.ts` `setup()`).
- `redis` ^3.1.2 (legacy v3 API) - Session store and cache backend (`server/middleware/redis/index.ts`, `server/services/cache.ts`).
- `@microsoft/microsoft-graph-client` 2.2.1 - Microsoft Graph API client (`server/services/msgraph/MSGraphService.ts`, `server/services/msgraph/MSGraphDeltaService.ts`).
- `simple-oauth2` 4.3.0 - OAuth2 token refresh for Microsoft (`server/services/msoauth.ts`).
- `googleapis` ^137.1.0 - Google Calendar API client (`server/services/google/index.ts`).
- `jsonwebtoken` ^9.0.3 - API token signing/verification (see `server/graphql/requestContext.ts`).
- `class-validator` ^0.15.1 - Input validation with TypeGraphQL.

**Infrastructure:**
- `@octokit/auth-app` ^8.2.0 + `@octokit/request` ^10.0.8 - GitHub App auth for feedback issue creation (`server/services/github.ts`).
- `body-parser` ^1.20.4, `cors` 2.8.6, `http-errors` 1.8.1, `express-bearer-token` ^3.0.0, `express-favicon` 2.0.4 - Express middleware.
- `chalk` 4.1.2, `colors` 1.4.0, `debug` 4.4.3 - Logging helpers.
- `lodash` 4.17.23, `underscore` 1.13.8, `underscore.string` 3.3.6, `fast-copy` 2.1.7, `get-value` 3.0.1, `set-value` ^3.0.3 - Utilities.
- `ua-parser-js` 0.8.1, `activity-detector` ^3.0.0, `react-device-detect` 2.2.3 - Client diagnostics.

## Configuration

**Environment:**
- `.env` consumed via `dotenv` 8.6.0 in `server/app.ts` and `webpack/config.js`.
- Sample template: `.env.sample` (documents all expected variables).
- Runtime access is wrapped by `server/utils/environment.ts` (supports `splitBy`, `isSwitch`, defaults).
- Critical vars include `NODE_ENV`, `PORT`, `AUTH_PROVIDERS`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_REDIRECT_URI`, `MICROSOFT_SCOPES`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SESSION_SIGNING_KEY`, `MONGO_DB_CONNECTION_STRING`, `MONGO_DB_DB_NAME`, `REDIS_CACHE_HOSTNAME`, `REDIS_CACHE_PORT`, `REDIS_CACHE_KEY`, `APOLLO_KEY`, `APOLLO_GRAPH_REF`, `API_TOKEN_SECRET`.

**TypeScript:**
- Root `tsconfig.json`: `target: es2018`, `module: commonjs`, `esModuleInterop: true`, `experimentalDecorators: true`, `emitDecoratorMetadata: true`, includes `server/**/*.ts` and `shared/utils/generateId.ts`, outputs to `dist/`.
- `client/tsconfig.json`: `module: esnext`, `jsx: react`, `resolveJsonModule: true`, `strictNullChecks: false`, rich path aliases (`components`, `parts`, `pages`, `hooks`, `utils`, `logging`, `theme`, `i18n`, `graphql-queries`, `graphql-mutations`, `AppContext`, `DateUtils`, `security`, `package`).

**Build:**
- Client bundler: `webpack/config.js` (entry `./client`, output `server/public/js/did.[name].[fullhash].js`).
- Server compile: `tsc --project tsconfig.json` + `copyfiles -u 1 "server/public/**/*" dist/server` (`npm run build:server`).
- Package artifact: `.tasks/package.js` (invoked by `npm run package`) creates `did-package.zip`.
- Apollo config: `apollo.config.js` (service `Did-dev@v0.15.x`, includes `./client/**/*.gql`).

**Linting / Formatting:**
- ESLint 8.57.1 with plugins `@typescript-eslint`, `react`, `react-hooks`, `unicorn`, `prettier`, `tsdoc`, `unused-imports`. Config embedded in `package.json` `eslintConfig`.
- Prettier 3.8.1 with `singleQuote: true`, `semi: false`, `trailingComma: none`, `printWidth: 80`, `tabWidth: 2` (see `package.json` `prettier`).
- `prettier-plugin-organize-imports` 3.2.4.

## Platform Requirements

**Development:**
- Node.js 22.14.0 (via nvm / `.nvmrc`).
- npm 10+.
- MongoDB 7.0 and Redis 7.2 (provided via `docker-compose.yml` services `mongodb` and `redis`, ports 27017 and 6379).
- Docker + Docker Compose supported via `scripts/docker.sh` wrapper (`npm run docker:start`, `docker:watch`, etc.).
- Optional admin UIs under the `tools` profile: `mongo-express` (port 8081) and `redis-commander` (port 8082).

**Production:**
- Primary deployment target: Azure App Service slots (`didapp/dev`, `didapp/staging`) via GitHub Actions `.github/workflows/on_push_dev_deploy.yml`, `.github/workflows/on_push_staging_deploy.yml`, `.github/workflows/on_push_staging_deploy_tags.yml`, sharing the reusable workflow `.github/workflows/deploy-reusable.yml` (uses `azure/webapps-deploy@v2` with app name `didapp`).
- Kudu-style deployment supported via `.deployment` + `scripts/deploy.sh` (rsync + `npm install --omit=dev`).
- Container image alternative: multi-stage `Dockerfile` (`development`, `build`, `production` stages; exposes port 9001; healthcheck hits `/health_check`; runs as non-root `did:nodejs`). Docker build workflow at `.github/workflows/docker-build.yml`.
- Data tier: MongoDB / Azure Cosmos DB for MongoDB (timeouts tuned for Cosmos in `server/app.ts`: `socketTimeoutMS: 300000`, `serverSelectionTimeoutMS: 30000`, `maxPoolSize: 50`, `minPoolSize: 10`, `retryWrites: true`).
- Cache tier: Redis (Azure Cache for Redis supported - SSL port 6380 auto-selected when `REDIS_CACHE_KEY` is set; see `server/middleware/redis/index.ts`).

---

*Stack analysis: 2026-04-24*

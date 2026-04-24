# Testing Patterns

**Analysis Date:** 2026-04-24

## Test Framework

**Runner:**
- [AVA](https://github.com/avajs/ava) 6.4.1 (declared in `package.json > devDependencies`)
- Configured inline in `package.json > ava`:

```json
"ava": {
  "workerThreads": true,
  "timeout": "2m",
  "extensions": { "ts": "commonjs" },
  "require": ["ts-node/register"],
  "nodeArguments": ["--no-warnings"]
}
```

- `ts-node/register` compiles TypeScript on the fly - no pre-build step required before running tests
- `workerThreads: true` parallelizes tests across cores
- 2-minute per-test timeout (AVA default is 10s)

**Assertion Library:**
- AVA's built-in `t` executor: `t.is`, `t.deepEqual`, `t.true`, `t.false`, `t.truthy`, `t.falsy`, `t.throws`, `t.notThrows`, `t.notThrowsAsync`, `t.regex`, `t.pass`, `t.not`

**Run Commands:**
```bash
npm test                       # runs `ava --verbose` over all *.test.ts
npx ava server/**/*.test.ts    # run a subset (path glob)
npx ava --match '*authChecker*' # run tests whose title matches a pattern
```

No watch-mode script is registered. Coverage is not wired up (no `nyc` / `c8` dependency).

## Test File Organization

**Location:** tests are **co-located** with the file they cover. No `__tests__` or `tests/` folders.

**Naming:** `<source>.test.ts` (never `.spec.ts`).

**Extension:** `.ts` only - no `.tsx` test files. UI components are not directly rendered in tests; only their pure logic (hooks/utilities) is tested.

**Excluded from builds:**
- Root `tsconfig.json` excludes `**/*.test.ts` (tests are not emitted into `dist/`)
- ESLint `eslintIgnore` excludes `**/*.test.ts` - tests are not linted
- `.prettierignore` does NOT exclude tests - they are still formatted

**Structure:**
```
server/
├── utils/
│   ├── generateId.ts
│   ├── generateId.test.ts          # unit tests for generateId
│   ├── environment.ts
│   ├── environment.test.ts
│   └── ...
├── graphql/
│   ├── authChecker.ts
│   ├── authChecker.test.ts
│   ├── requestContext.ts
│   └── requestContext.test.ts
└── services/
    ├── report/ReportService.test.ts
    └── timesheet/extensions.test.ts

client/utils/*.test.ts              # utility tests (no JSX)
client/components/List/hooks/columnSizing.test.ts

shared/utils/*.test.ts              # cross-platform utility tests
```

All test files live under `server/`, `client/utils/`, `client/components/List/hooks/`, and `shared/utils/` (see full list by running `find . -name '*.test.ts' -not -path '*/node_modules/*'`).

## Test Structure

**Top-level test declaration (no `describe`/`suite`):**
```ts
import test from 'ava'
import { generateId } from './generateId'

test('generateId: generates a string', (t) => {
  const result = generateId()
  t.is(typeof result, 'string')
})
```

**Grouping convention:**
- AVA has no `describe` block. Grouping is done via `//` section headers and a `'<module>: <behavior>'` naming prefix - see `server/utils/generateId.test.ts`:

```ts
// Basic functionality
test('generateId: generates a string', (t) => { ... })
test('generateId: default length is 9 characters', (t) => { ... })

// Edge case: zero length
test('generateId: zero length returns empty string', (t) => { ... })
```

- Title format: `'<subjectName>: <behavior>'` - prefix makes grep/filtering easy

**Async tests:**
```ts
test('ReportService should cap extremely large limits', async (t) => {
  const result = await reportService.someAsync()
  t.is(result, 100000)
})
```

**Setup / teardown (per-test):**
AVA provides `test.beforeEach` / `test.afterEach`, storing state on `t.context`:

```ts
// server/utils/environment.test.ts
interface TestContext { originalEnv: NodeJS.ProcessEnv }

test.beforeEach((t) => {
  t.context = { originalEnv: { ...process.env } }
})

test.afterEach((t) => {
  process.env = (t.context as TestContext).originalEnv
})
```

`test.before` / `test.after` exist for once-per-file setup but are rarely used.

**Exception testing:**
```ts
// server/graphql/authChecker.test.ts
const err = t.throws(
  () => authChecker(makeResolverData(undefined), [undefined]),
  { instanceOf: GraphQLError }
)
t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
```

**Async exception testing:**
```ts
await t.notThrowsAsync(async () => {
  context = await RequestContext.create(request, mcl)
}, 'RequestContext.create should not throw when findOne throws')
```

## Mocking

**Framework:** none. No Jest-style `jest.mock`, no Sinon, no `proxyquire`. Mocks are **plain objects cast to `as any`**.

**Patterns used across the codebase:**

1. **Plain mock objects with `as any`** (server service tests):

```ts
// server/services/report/ReportService.test.ts
const mockContext = { userId: 'test-user' }
const mockProjectService = {
  getProjectsData: async () => ({ projects: [], customers: [] })
}
const mockTimeEntryService = {
  find: async () => [],
  count: async () => 0
}

const reportService = new ReportService(
  mockContext as any,
  mockProjectService as any,
  // ...
)
```

2. **Factory helpers for recurring mock shapes** (resolver tests):

```ts
// server/graphql/authChecker.test.ts
function makeResolverData(permissions?: string[], userId?: string) {
  return {
    context: { permissions, userId },
    root: {},
    args: {},
    info: {} as any
  } as any
}
```

3. **Captured-argument assertion** (verify the service called the collaborator with expected args):

```ts
let capturedQuery: any
const mockTimeEntryService = {
  count: async (query: any) => {
    capturedQuery = query
    return 123
  }
}
// ... run
t.truthy(capturedQuery?.year)
```

4. **Env var manipulation** via `process.env` with `beforeEach`/`afterEach` snapshot-restore (`server/utils/environment.test.ts`).

5. **Global window/document stubs** for browser-only client utilities (`client/utils/getUrlState.test.ts`):

```ts
function setupHashWindow(hash: string) {
  ;(global as any).document = { location: { hash } }
  ;(global as any).window = {
    atob: (s: string) => Buffer.from(s, 'base64').toString('utf-8'),
    location: { href: 'http://localhost/' }
  }
}
// Then lazy-require the module under test so it sees the stubs:
const { getUrlState: fn } = require('./getUrlState')
```

6. **`reflect-metadata` import** at the top of any test that touches TypeGraphQL / TypeDI decorators:

```ts
import 'reflect-metadata'
import { RequestContext } from './requestContext'
```

7. **Private-method access via `as any`** when safety logic is worth testing directly but too complex to reach through the public API (documented as intentional in `server/services/report/ReportService.test.ts`):

```ts
const cappedQuery = (reportService as any)._applySafetyLimits({ limit: 200000 })
```

**What to mock:**
- External collaborators (Mongo services, other injectable services, network clients)
- Environment (`process.env`, `global.window`, `global.document`)

**What NOT to mock:**
- The unit under test itself
- Pure utilities - call them directly with real inputs
- AVA's test runner - never shim `test`

## Fixtures and Factories

No fixture JSON files or `__fixtures__` folders. Test data is built inline or via small factory functions at the top of the test file (e.g. `createMockContext` in `server/services/timesheet/extensions.test.ts`, `makeResolverData` in `server/graphql/authChecker.test.ts`). Keep factories local to the test file that uses them.

## Coverage

No coverage tooling is configured. No coverage threshold enforced in CI.

## Test Types

**Unit Tests (majority):**
- Pure utility functions - `client/utils/*.test.ts`, `server/utils/*.test.ts`, `shared/utils/*.test.ts`
- Business logic extracted from React components - `client/components/List/hooks/columnSizing.test.ts`
- Isolated service logic with hand-built mocks - `server/services/report/ReportService.test.ts`

**Integration-ish Tests:**
- `server/graphql/authChecker.test.ts` - exercises the real `authChecker` function against the real `PermissionScope` enum
- `server/graphql/requestContext.test.ts` - exercises `RequestContext.create` with a mocked MongoClient but real decorator metadata
- `server/middleware/passport/index.test.ts` - tests middleware wiring

**Component Tests:**
- None. React components (`.tsx`) are not rendered in tests. Test the underlying `use<Component>.ts` hook or pure helpers instead, or extract logic into a utility and test that.

**E2E Tests:**
- None configured. There is no Playwright/Cypress/Puppeteer setup.

## Common Patterns

**Async Testing:**
```ts
test('requestContext: session branch fetches fresh subscription from DB', async (t) => {
  const context = await RequestContext.create(request, mcl)
  t.is((context.subscription as any).id, 'sub-1')
})
```

**Error Testing (sync):**
```ts
const err = t.throws(() => fn(), { instanceOf: GraphQLError })
t.is((err as GraphQLError).extensions?.code, 'UNAUTHENTICATED')
```

**Error Testing (async):**
```ts
await t.notThrowsAsync(async () => { await fn() })
await t.throwsAsync(async () => { await fn() }, { message: /not found/ })
```

**Happy-path + edge-case pairing:** each module has a block of happy-path tests followed by named edge cases (empty input, null, negative, very large, unicode, whitespace, etc.). See `server/utils/environment.test.ts` and `server/utils/generateId.test.ts` as templates.

## CI Integration

**GitHub Actions workflow:** `.github/workflows/on_pr_test_build.yml`

Triggers on PRs against `main` and `dev` (paths-ignore `**.md`):

```yaml
on:
  pull_request:
    types: [assigned, opened, synchronize, reopened]
    branches: [main, dev]
    paths-ignore: ['**.md']
```

Three parallel jobs, then an aggregating `status` job:

1. **`test`** - `npm ci` then `npm test`
2. **`build_client`** - `npm run package:client` with `NODE_OPTIONS=--max-old-space-size=8192`, `NODE_ENV=production`
3. **`build_server`** - `npm run build:server` with `NODE_ENV=production`
4. **`status`** - requires all three to pass. Configure branch protection to require this single check.

Node version comes from `vars.NODE_VERSION` (GitHub Actions repo variable). Local devs pin via `.nvmrc` (Node >= 22.14.0 LTS per `package.json > engines`).

Concurrency groups cancel in-progress runs on the same branch (`cancel-in-progress: true`).

## Commit Markers

From root `AGENTS.md`:

- `[ava]` in a commit message - **forces** test jobs to run even when they might otherwise be skipped
- `[skip-ci]` in a commit message - skips CI entirely (used for docs/readme/changelog auto-commits, e.g. the recent `docs: update readme/changelog ... [skip-ci]` commits in the log)

## Pre-commit Hook

`.githooks/pre-commit` runs `npm run lint:fix` before every commit (registered via the `prepare` script in `package.json`, which sets `git config core.hooksPath .githooks`). Tests are **not** run pre-commit - rely on CI for that.

## How to Add a New Test

1. Create `<source>.test.ts` next to the file you want to cover
2. `import test from 'ava'`
3. If the code under test uses decorators (`type-graphql`, `typedi`), add `import 'reflect-metadata'` at the top
4. Title tests as `'<subject>: <behavior>'`
5. Mock collaborators with plain objects + `as any` - no mocking library
6. Run locally: `npm test` or `npx ava path/to/file.test.ts`
7. Commit (pre-commit hook will `lint:fix`; CI will run the full suite)

## How to Run a Single Test

```bash
# Run one file
npx ava server/utils/generateId.test.ts

# Run tests whose title matches a pattern
npx ava --match '*authChecker*'

# Verbose (what CI runs)
npx ava --verbose
```

---

*Testing analysis: 2026-04-24*

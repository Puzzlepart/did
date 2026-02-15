# SQLite Migration Implementation Plan

This checklist tracks the fixes needed for the MongoDB to SQLite migration.

## Phase 1: Critical Fixes (Concurrency & Transactions)

- [x] **1.1 Add PRAGMA configuration** - Enable WAL mode, busy timeout, synchronous settings
- [x] **1.2 Add transaction support** - Add `beginTransaction()`, `commit()`, `rollback()`, `withTransaction()` to MongoClient
- [x] **1.3 Wrap multi-doc operations** - Use transactions in `insertMany()`, `deleteMany()`, `bulkWrite()`

## Phase 2: Code Quality & Deduplication

- [x] **2.1 Extract shared constants** - Create `server/services/sqlite/constants.ts`
- [x] **2.2 Extract serialization functions** - Create `server/services/sqlite/serialization.ts`
- [x] **2.3 Update import script** - Use shared serialization code instead of duplicating
- [x] **2.4 Fix mutable side effect** - Remove `Object.assign(document, nextDocument)` in `_insertDocument()`

## Phase 3: Performance & Observability

- [x] **3.1 Add warning logging** - Log when expensive operations load many documents
- [x] **3.2 Add stable sort tie-breaker** - Use `_id` as secondary sort key

## Phase 4: Documentation

- [x] **4.1 Add JSDoc** - Document all public methods in SQLite shim
- [x] **4.2 Create test suite** - Comprehensive tests for the SQLite shim (36 tests)
- [x] **4.3 Create migration docs** - `docs/SQLITE_MIGRATION.md`
- [x] **4.4 Update AGENTS.md** - Reflect SQLite changes

## Validation

- [x] `npm run lint` passes
- [x] `npm run build:server` succeeds
- [x] `npm test` passes with new tests (36 tests passing)
- [x] WAL mode confirmed active

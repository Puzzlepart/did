# SQLite Migration Guide

This document describes the migration from MongoDB to SQLite for the **did** application.

## Overview

**did** previously used MongoDB with a multi-tenant architecture where each customer had their own database. The application now uses SQLite with a unified storage model that preserves the logical multi-tenant separation.

### Migration Rationale

1. **Simplified Infrastructure**: No separate MongoDB service required
2. **Reduced Costs**: Single file storage vs. managed database service
3. **Easier Backups**: SQLite database is a single file that can be easily backed up
4. **Portability**: Self-contained database file works in any environment

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SQLITE_DB_PATH` | Absolute path to the SQLite database file | `/data/did.sqlite` |
| `SQLITE_DB_MAIN_DB_NAME` | Logical name for the main/metadata database | `main` |

### Removed Variables

The following MongoDB-specific variables are no longer used:

- `MONGO_DB_CONNECTION_STRING`
- `MONGO_DB_DATABASE_NAME`

## Schema Design

### Storage Model

All documents are stored in a single SQLite table with logical partitioning:

```sql
CREATE TABLE documents (
    id TEXT PRIMARY KEY,       -- '{db}:{collection}:{_id}'
    db TEXT NOT NULL,          -- Logical database name (e.g., 'puzzlepart', 'main')
    collection TEXT NOT NULL,  -- Collection name (e.g., 'users', 'timeEntries')
    document TEXT NOT NULL     -- JSON-serialized document
);
CREATE INDEX idx_db_collection ON documents(db, collection);
```

### Multi-Tenant Isolation

- Logical database name is part of each document's composite key
- Queries filter by `db` and `collection` columns
- Each customer's data remains logically separate
- Configuration stored in the `main` logical database

### Serialization

Documents are stored as JSON with special handling for:

- **Dates**: Stored as `{ __type: 'Date', value: ISO8601String }`
- **ObjectIds**: Stored as plain strings
- **Nested Objects**: Recursively serialized

## PRAGMA Configuration

The SQLite shim configures the following pragmas for performance and safety:

```sql
PRAGMA journal_mode = WAL;          -- Write-Ahead Logging for concurrent access
PRAGMA busy_timeout = 5000;         -- Wait 5s for locks before failing
PRAGMA synchronous = NORMAL;        -- Balance between durability and speed
```

## Transaction Support

Multi-document operations are wrapped in transactions:

- `insertMany` - All-or-nothing insert
- `bulkWrite` - Atomic batch updates
- `deleteMany` - Atomic batch deletes

Manual transactions available via:

```typescript
await client.withTransaction(async () => {
  // Operations here are atomic
})
```

## API Compatibility

The SQLite shim implements a MongoDB-compatible API:

### Supported Operations

| Operation | Status | Notes |
|-----------|--------|-------|
| `insertOne` | ✅ Full | Auto-generates `_id` |
| `insertMany` | ✅ Full | Transactional |
| `findOne` | ✅ Full | |
| `find` | ✅ Full | Returns Cursor |
| `updateOne` | ✅ Full | Supports `$set`, `$inc`, `$push`, `$pull`, upsert |
| `updateMany` | ✅ Full | |
| `deleteOne` | ✅ Full | |
| `deleteMany` | ✅ Full | Transactional |
| `bulkWrite` | ⚠️ Partial | Only `updateOne` operations |
| `aggregate` | ⚠️ Partial | Materialized in memory |
| `distinct` | ✅ Full | Warning logged for large datasets |
| `countDocuments` | ✅ Full | Warning logged for large datasets |
| `createIndex` | ❌ No-op | Indexes not supported |

### Unsupported Features

- **Database-level indexes**: All query filtering happens in-memory using `sift`
- **Complex aggregation pipelines**: Only basic `$match`, `$lookup`, `$project`, `$sort` stages
- **Change streams**: Not implemented
- **Transactions across collections**: Single-collection transactions only

## Backup & Restore

### Backup

```bash
# Option 1: Copy the database file (while app is stopped or in WAL mode)
cp /data/did.sqlite /backups/did-$(date +%Y%m%d).sqlite

# Option 2: Use sqlite3 .backup command (online backup)
sqlite3 /data/did.sqlite ".backup '/backups/did-$(date +%Y%m%d).sqlite'"
```

### Restore

```bash
# Stop the application first
cp /backups/did-YYYYMMDD.sqlite /data/did.sqlite
# Restart the application
```

### Import from MongoDB Backup

Use the import script to migrate data from MongoDB JSON backups:

```bash
node scripts/import-latest-backup-to-sqlite.js
```

See the script's header comments for configuration options.

## Performance Considerations

### Query Performance

The SQLite shim loads all matching documents into memory before applying filters. This is acceptable for typical **did** datasets but may cause performance issues for:

- Collections with > 10,000 documents
- Complex aggregation pipelines
- Frequent `distinct` or `countDocuments` operations

Warning logs are emitted for expensive operations.

### Write Performance

WAL mode enables concurrent readers with a single writer. If write performance is a concern:

1. Consider batching writes using `insertMany` or `bulkWrite`
2. Monitor SQLite busy timeout errors in logs
3. Adjust `busy_timeout` pragma if needed

## Troubleshooting

### "database is locked" errors

If you see `SQLITE_BUSY` errors:

1. Increase `busy_timeout` pragma (default: 5000ms)
2. Check for long-running transactions
3. Ensure WAL mode is enabled

### Missing data after migration

1. Verify all databases were imported from MongoDB backup
2. Check `db` column values match expected logical database names
3. Query the documents table directly to debug:

```sql
SELECT COUNT(*) FROM documents WHERE db = 'your_customer';
```

### Date fields not working correctly

Dates should round-trip through serialization. If dates appear as strings:

1. Check that documents were imported using the migration script
2. Manually fix with:

```sql
-- Example fix for a specific document
UPDATE documents 
SET document = json_replace(document, '$.createdAt', json('{"__type":"Date","value":"2024-01-01T00:00:00.000Z"}'))
WHERE id = 'db:collection:docid';
```

## Rollback Plan

To revert to MongoDB:

1. Restore MongoDB backup
2. Update environment variables:
   - Remove `SQLITE_DB_PATH` and `SQLITE_DB_MAIN_DB_NAME`
   - Add `MONGO_DB_CONNECTION_STRING`
3. Deploy previous application version
4. Verify data integrity in MongoDB

## File Locations

| Purpose | Path |
|---------|------|
| SQLite database | `$SQLITE_DB_PATH` (e.g., `.db/did.sqlite`) |
| WAL file | `${SQLITE_DB_PATH}-wal` |
| SHM file | `${SQLITE_DB_PATH}-shm` |
| SQLite shim | `server/services/sqlite/index.ts` |
| Serialization helpers | `server/services/sqlite/serialization.ts` |
| Shared constants | `server/services/sqlite/constants.ts` |
| Import script | `scripts/import-latest-backup-to-sqlite.js` |

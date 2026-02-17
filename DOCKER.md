# Docker Development Guide for did

The local Docker stack now uses **2 services only**:
- `did` (Node/Express app, GraphQL, SQLite access)
- `redis` (sessions + cache)

There is no MongoDB container, no mongo-express, and no redis-commander.

## Quick Start

```bash
# 1) Create local env (first time)
npm run create-env

# 2) Start stack
./scripts/docker.sh start

# 3) Optional: wait for health check
./scripts/docker.sh start --wait

# 4) Optional: skip auto disk preflight cleanup for this run
./scripts/docker.sh start --skip-preflight
```

Access:
- App: <http://localhost:9001>
- Health: <http://localhost:9001/health_check>

## Services

| Service | Port | Purpose |
|---|---:|---|
| did | 9001 | App server + SQLite-backed data layer |
| redis | 6379 | Session store + cache |

## SQLite Storage Model

SQLite runs **inside the `did` container** (not a separate DB container).

Compose sets:
- `SQLITE_DB_PATH=/app/did.sqlite`
- `SQLITE_DB_MAIN_DB_NAME=main`

Because the project root is bind-mounted to `/app`, the SQLite database is persisted in the repository root as `did.sqlite`.

On container start, `did` now runs `./scripts/dev-start.sh`, which auto-syncs `node_modules` via `npm ci` when:
- `package-lock.json` changed
- dependency stamp is missing
- required modules (such as `sqlite3` / `sift`) are missing

## Backup Import Workflow

Backups should be placed under:
- `.backup/backup-YYYY-MM-DD_HH-mm-ss/`

Import newest backup into SQLite:

```bash
npm run db:import-latest-backup
```

This command:
- Finds the newest folder under `.backup/` that starts with `backup`
- Imports all `*.json` NDJSON files from each tenant folder (`main`, `crayon`, etc.)
- Replaces each target collection (`database_name + collection_name`) in SQLite

## Common Commands

```bash
# Start / stop
./scripts/docker.sh start
./scripts/docker.sh stop

# Restart
./scripts/docker.sh restart

# Rebuild image without cache
./scripts/docker.sh build

# Tail app logs
./scripts/docker.sh logs

# Open shell in app container
./scripts/docker.sh shell

# Show SQLite status (path + did_documents row count)
./scripts/docker.sh db

# Open Redis CLI
./scripts/docker.sh redis

# Status overview
./scripts/docker.sh status

# Full cleanup (containers + volumes + local images)
./scripts/docker.sh clean
```

Equivalent npm scripts:
- `npm run docker:start`
- `npm run docker:stop`
- `npm run docker:logs`
- `npm run docker:shell`
- `npm run docker:db`
- `npm run docker:redis`
- `npm run docker:status`
- `npm run docker:clean`

## Automatic Disk Guard

`./scripts/docker.sh start` now runs a preflight check before startup:
- Reads reclaimable Docker data from `docker system df`
- Automatically runs `./scripts/docker-maintenance.sh` when reclaimable data is above threshold

Default behavior:
- Auto-maintenance is enabled
- Threshold: 20 GB reclaimable
- Cleanup age window: 7 days
- Aggressive image pruning: enabled

Environment overrides:

```bash
DOCKER_AUTO_MAINTENANCE_ENABLED=1
DOCKER_AUTO_MAINTENANCE_THRESHOLD_GB=20
DOCKER_AUTO_MAINTENANCE_DAYS=7
DOCKER_AUTO_MAINTENANCE_AGGRESSIVE=1
```

You can skip the preflight per run:

```bash
./scripts/docker.sh start --skip-preflight
```

## Agent / Worktree Setup

For isolated worktrees:

```bash
./scripts/agent-setup.sh
./scripts/agent-teardown.sh
```

`agent-setup.sh` assigns unique ports for:
- app
- redis

## Troubleshooting

### App fails to start

```bash
docker compose logs --tail=200 did
```

### Redis connectivity issues

```bash
docker compose exec redis redis-cli ping
```

### Reset local data completely

```bash
./scripts/docker.sh clean
./scripts/docker.sh start
```

Then re-import backup if needed:

```bash
npm run db:import-latest-backup
```

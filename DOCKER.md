## Quickstart vs Dev Script

Use `./scripts/docker-quickstart.sh --fresh` for a one-command clean start and config check. Use `./scripts/docker-dev.sh` for granular control and status checks.

To see your effective compose chain and services:
```bash
./scripts/docker-quickstart.sh --status
```
## Common Reset Recipes

To reset MongoDB and re-import seed data:
```bash
docker compose stop mongodb && docker compose rm -f mongodb && docker volume rm did_mongodb_data && docker compose up -d mongodb
```

## Disk Hygiene (Cache + Logs)

Most Docker disk growth comes from build cache. You can inspect it with:
```bash
docker builder du
```

Run a safe cleanup that keeps active containers and volumes:
```bash
./scripts/docker-maintenance.sh --days 7
```

Via npm:
```bash
npm run docker:maintenance -- --days 7
```

Optional flags:
```bash
./scripts/docker-maintenance.sh --aggressive --include-volumes --clean-dist
```

Notes:
- The compose file enables log rotation (max 10MB per file, 5 files).
- Consider scheduling the maintenance script with cron or launchd if disk usage is a recurring problem.

## Security Note

Never commit real secrets (client IDs, secrets, session keys) to the repository. Always use `docker-compose.local.yml` for local secrets and ensure it's gitignored.
# Docker Development Guide for did

This guide provides comprehensive instructions for using Docker with the did application for development, testing, and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Services](#services)
- [Configuration](#configuration)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or later)
- Git

## Quick Start

The fastest path to a working local stack (app + MongoDB + Redis) with a clean slate.

```bash
# 1. Clone (first time only)
git clone https://github.com/Puzzlepart/did.git
cd did

# 2. (Optional) Switch branch
git checkout dev

# 3. Create your local override file for secrets (only once)
cp docker-compose.override.yml docker-compose.local.yml
# Edit docker-compose.local.yml and add your real MICROSOFT_CLIENT_ID / _SECRET

# 4. (Recommended) Tell Docker Compose to always include the local file
echo 'COMPOSE_FILE=docker-compose.yml:docker-compose.override.yml:docker-compose.local.yml' >> .env

# 5. Start fresh (removes old volumes so Mongo seed import runs again)
docker compose down -v || true
docker compose up --build -d

# 6. Tail logs (optional)
docker compose logs -f did
```

Access:
- App: http://localhost:9001
- Health: http://localhost:9001/health_check
- MongoDB: localhost:27017
- Redis: localhost:6379

Need admin tools (mongo-express / redis-commander)?
```bash
docker compose --profile tools up -d
```

Clean restart later:
```bash
docker compose down -v && docker compose up -d
```

Minimal daily workflow (after initial setup):
```bash
git pull
docker compose up -d --build
```

If authentication hangs on /auth/... ensure:
- docker-compose.override.yml forces REDIS_CACHE_HOSTNAME=redis & MONGO_DB_CONNECTION_STRING=mongodb://mongodb:27017
- Your local override (docker-compose.local.yml) does NOT contain cloud Redis / Cosmos values
- `MICROSOFT_REDIRECT_URI` matches http://localhost:9001/auth/azuread-openidconnect/callback

## Authentication Troubleshooting

Common local sign‑in issues and fixes.

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `/auth/azuread-openidconnect/signin` hangs | Session store (Redis) unreachable | Ensure `REDIS_CACHE_HOSTNAME=redis` in compose overrides; remove cloud Redis vars from local file; restart: `docker compose down -v && docker compose up -d` |
| Redirect loop to sign-in for JS/CSS assets | Catch-all route intercepting static assets | Confirm updated routing logic in `server/app.ts` (no `use('*', ...)`); rebuild container |
| 401 with no Microsoft redirect | Missing / invalid `MICROSOFT_CLIENT_ID` / secret | Add values to `docker-compose.local.yml` or host env; restart containers |
| Microsoft login page shows wrong redirect URI | Mismatch between Azure app and local config | Update Azure AD app redirect to `http://localhost:9001/auth/azuread-openidconnect/callback` OR update `MICROSOFT_REDIRECT_URI` to the registered value |
| Error after callback (generic sign-in failed) | User not enrolled / subscription check failed | Seed proper subscription + user docs into Mongo (place JSON in `docker/data/<dbname>/`) and restart with fresh volume |
| Random sign-out during dev | Session lost (volume cleared or Redis restart) | Keep Redis running; avoid `down -v` unless resetting; re-login |

Diagnostic commands:
```bash
# Tail only auth + passport debug logs
docker compose logs -f did | egrep 'server/routes/auth|middleware/passport'

# Check Redis connectivity
docker compose exec redis redis-cli ping

# Verify Mongo connection from app container
docker compose exec did node -e "require('mongodb').MongoClient.connect('mongodb://mongodb:27017').then(()=>console.log('ok')||process.exit())"

# Inspect environment inside running app
docker compose exec did env | egrep 'MICROSOFT_|REDIS_|MONGO_DB_'
```

When in doubt: clean slate.
```bash
docker compose down -v && docker compose up --build -d
```

## Development Workflow (Concise)

Core script: `./scripts/docker-dev.sh`

| Action | Command |
|--------|---------|
| Start | `./scripts/docker-dev.sh start` |
| Start + tools | `./scripts/docker-dev.sh start --with-tools` |
| Logs (follow) | `./scripts/docker-dev.sh logs` |
| Shell (app) | `./scripts/docker-dev.sh shell` |
| Mongo shell | `./scripts/docker-dev.sh db-shell` |
| Redis CLI | `./scripts/docker-dev.sh redis-cli` |
| Stop | `./scripts/docker-dev.sh stop` |
| Restart | `./scripts/docker-dev.sh restart` |
| Clean (remove volumes) | `./scripts/docker-dev.sh clean` |

Quickstart script alternative: `./scripts/docker-quickstart.sh --fresh`

## Services

| Service | Port | Notes |
|---------|------|-------|
| did app | 9001 | React/GraphQL, served by Node/Express |
| MongoDB | 27017 | Seeded on first empty start via `docker/import-data.sh` |
| Redis | 6379 | Session + cache |
| mongo-express (profile tools) | 8081 | `admin/admin123` |
| redis-commander (profile tools) | 8082 | No auth |

### Seed Data Import

MongoDB can be pre-populated with tenant data for development:

1. **Export data from production** using `mongoexport`:
   ```bash
   mongoexport --uri="your-prod-connection-string" --collection=users --out=users.json
   mongoexport --uri="your-prod-connection-string" --collection=projects --out=projects.json
   mongoexport --uri="your-prod-connection-string" --collection=customers --out=customers.json
   ```

2. **Create a database-specific folder** inside `docker/data/` (this folder is gitignored). The folder name becomes the database name during import:
   ```text
   docker/data/
     └── puzzlepart/
         ├── users.json
         ├── projects.json
         └── timeentries.json
   ```

3. **Start services** - data will be imported automatically on first MongoDB startup:
   ```bash
   ./scripts/docker-dev.sh start
   ```

**Note**: Data import only happens when MongoDB starts with an empty database, and only JSON files inside subdirectories are imported.

### Admin Tools (Optional)

Include admin tools with `--with-tools` flag:

| Service | Port | Description | Access | Credentials |
|---------|------|-------------|--------|-------------|
| MongoDB Express | 8081 | MongoDB admin | http://localhost:8081 | admin/admin123 |
| Redis Commander | 8082 | Redis admin | http://localhost:8082 | None |

## Configuration (Essentials)

| Area | Key Vars / Files | Notes |
|------|------------------|-------|
| DB | `MONGO_DB_CONNECTION_STRING`, `MONGO_DB_DB_NAME` | Overridden to local in compose override |
| Cache | `REDIS_CACHE_HOSTNAME`, `REDIS_CACHE_PORT` | Use `redis` host locally |
| Auth | `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_REDIRECT_URI` | Add to `docker-compose.local.yml` |
| Debug | `DEBUG` | E.g. `server/routes/auth,middleware/passport*` |
| Compose stack | `COMPOSE_FILE` | Chain base + override + local |

Files:
- `docker-compose.yml` (base)
- `docker-compose.override.yml` (template placeholders)
- `docker-compose.local.yml` (gitignored secrets)
- `.env` (can hold `COMPOSE_FILE` + misc vars)

Override example snippet:
```yaml
services:
  did:
    environment:
      - DEBUG=graphql*,middleware/passport*
```

## Deployment Notes

Production deployments are handled manually via Azure App Service slot swaps. The Docker tooling in this repository targets development workflows only.

## Troubleshooting

### Common Issues

**1. Port conflicts:**
```bash
# Check what's using the port
lsof -i :9001

# Change port in docker-compose.override.yml
services:
  did:
    ports:
      - "9002:9001"
```

**2. Permission issues:**
```bash
# Make sure script is executable
chmod +x ./scripts/docker-dev.sh

# Fix ownership issues (Linux/macOS)
sudo chown -R $USER:$USER .
```

**3. Database connection issues:**
```bash
# Check if MongoDB is running
docker compose ps

# View MongoDB logs
docker compose logs mongodb

# Restart MongoDB
docker compose restart mongodb
```

**4. Build issues:**
```bash
# Clean build cache
docker compose build --no-cache

# Clean Docker system
docker system prune -f
```

### Debugging

**1. Application not starting:**
```bash
# Check container logs
./scripts/docker-dev.sh logs

# Check container status
docker compose ps

# Enter container for debugging
./scripts/docker-dev.sh shell
```

**2. Database issues:**
```bash
# Access MongoDB directly
./scripts/docker-dev.sh db-shell

# Check database status
docker compose exec mongodb mongosh --eval "db.runCommand('ping')"
```

**3. Cache issues:**
```bash
# Access Redis CLI
./scripts/docker-dev.sh redis-cli

# Check Redis status
docker compose exec redis redis-cli ping
```

## Advanced Usage

### Custom Docker Commands

```bash
# Build specific stage
docker build --target development -t did:dev .

# Run with custom environment
docker run -it --rm -p 9001:9001 --env-file .env.custom did:dev

# Override entrypoint for debugging
docker run -it --rm --entrypoint /bin/sh did:dev
```

### Development with Volumes

For active development, code changes are automatically reflected due to volume mounts:

```yaml
volumes:
  - .:/app
  - /app/node_modules  # Prevents overwriting container node_modules
```

### Multi-Architecture Builds

Build for multiple architectures:

```bash
# Setup buildx
docker buildx create --use

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t did:latest .
```

## Health Checks

The application includes built-in health checks:

- **Endpoint**: `http://localhost:9001/health_check`
- **Docker Health Check**: Configured in Dockerfile
- **Compose Health Check**: Available in production compose

```bash
# Check application health
curl http://localhost:9001/health_check

# Check Docker health status
docker compose ps
```

## Monitoring

For production monitoring, consider integrating:

- **Logs**: Use `docker compose logs` or external log aggregation
- **Metrics**: Application exposes metrics at `/metrics`
- **Monitoring**: Use tools like Prometheus, Grafana, or Azure Monitor

## Security Considerations

1. **Secrets Management**: Use Docker secrets or external secret management
2. **Network Security**: Configure proper network policies
3. **User Permissions**: Run containers with non-root user (handled automatically)
4. **Image Security**: Regularly update base images and scan for vulnerabilities

## Support

For issues and questions:

1. Check this guide and troubleshooting section
2. Review Docker Compose logs: `./scripts/docker-dev.sh logs`
3. Open an issue on GitHub with logs and configuration
4. Contact the development team

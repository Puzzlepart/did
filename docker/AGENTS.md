# Scoped agent context for ./docker — see root AGENTS.md for global rules

## Docker Commands (via npm scripts)

| Command | Effect |
|---|---|
| `npm run docker:start` | Start containers (wraps `./scripts/docker.sh`) |
| `npm run docker:stop` | Stop containers |
| `npm run docker:logs` | Tail container logs |
| `npm run docker:shell` | Shell into app container |
| `npm run docker:db` | MongoDB shell |
| `npm run docker:redis` | Redis CLI |
| `npm run docker:status` | Show running container status |
| `npm run docker:clean` | Remove containers and volumes (destructive) |

## Agent / Worktree Environments

For isolated development in git worktrees or CI agents where the main dev stack may already be running:

- `./scripts/agent-setup.sh` — spins up containers with unique ports to avoid conflicts
- `./scripts/agent-teardown.sh` — cleans up the agent environment

Always use `agent-setup.sh` / `agent-teardown.sh` in worktree contexts. Do not reuse main dev ports.

## Production

- Production deployment uses Azure App Service **slot swapping** — there is no prod-specific Dockerfile
- `docker-compose.yml` + `docker-compose.override.yml` handle local dev orchestration
- Maintenance mode is toggled via `MAINTENANCE_MODE=true` environment variable, not via Docker config

## Sample Data

- `./data/` and `./sample-data/` contain seed/import data
- `./import-data.sh` — script for importing sample data into a running container

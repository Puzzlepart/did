#!/usr/bin/env bash
set -euo pipefail

# agent-setup.sh
# Hands-off Docker environment setup for agent worktrees
# Uses unique ports to avoid conflicts with main dev (9001)

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

info() { echo -e "[agent-setup] $*"; }
error() { echo -e "[agent-setup][ERROR] $*" >&2; }

# --- Derive unique identifiers from worktree path ---
WORKTREE_NAME=$(basename "$ROOT_DIR")
# Generate a stable port offset from worktree name (hash to 1-99 range, add to base 9100)
PORT_OFFSET=$(echo -n "$WORKTREE_NAME" | cksum | cut -d' ' -f1)
PORT_OFFSET=$((PORT_OFFSET % 99 + 1))
APP_PORT=$((9100 + PORT_OFFSET))
MONGO_PORT=$((27100 + PORT_OFFSET))
REDIS_PORT=$((6400 + PORT_OFFSET))

export COMPOSE_PROJECT_NAME="did-${WORKTREE_NAME}"

info "Worktree: $WORKTREE_NAME"
info "Ports: app=$APP_PORT, mongo=$MONGO_PORT, redis=$REDIS_PORT"
info "Project: $COMPOSE_PROJECT_NAME"

# --- Load credentials from parent .env if exists ---
PARENT_ENV="${ROOT_DIR}/../.env"
if [[ -f "$PARENT_ENV" ]]; then
  info "Loading credentials from parent .env"
  set -a
  # shellcheck source=/dev/null
  source "$PARENT_ENV"
  set +a
fi

# --- Required env vars (from parent .env, CI secrets, or host env) ---
: "${MICROSOFT_CLIENT_ID:?Missing MICROSOFT_CLIENT_ID - set in environment or parent .env}"
: "${MICROSOFT_CLIENT_SECRET:?Missing MICROSOFT_CLIENT_SECRET - set in environment or parent .env}"
# Optional: for session injection
TEST_SESSION_COOKIE="${TEST_SESSION_COOKIE:-}"

# --- Generate docker-compose.local.yml with credentials + port overrides ---
info "Generating docker-compose.local.yml"
cat > docker-compose.local.yml <<EOF
services:
  did:
    ports:
      - "${APP_PORT}:9001"
    environment:
      - MICROSOFT_CLIENT_ID=${MICROSOFT_CLIENT_ID}
      - MICROSOFT_CLIENT_SECRET=${MICROSOFT_CLIENT_SECRET}
      - MICROSOFT_REDIRECT_URI=http://localhost:${APP_PORT}/auth/azuread-openidconnect/callback
      - ENABLE_SESSION_INJECTION=${TEST_SESSION_COOKIE:+true}
      - TEST_SESSION_COOKIE=${TEST_SESSION_COOKIE}
  mongodb:
    ports:
      - "${MONGO_PORT}:27017"
  redis:
    ports:
      - "${REDIS_PORT}:6379"
EOF

# --- Ensure .env exists with COMPOSE_FILE chain ---
COMPOSE_CHAIN="docker-compose.yml:docker-compose.override.yml:docker-compose.local.yml"
if [[ ! -f .env ]]; then
  info "Creating .env"
  cat > .env <<EOF
NODE_ENV=development
PORT=9001
COMPOSE_FILE=${COMPOSE_CHAIN}
EOF
else
  grep -q '^COMPOSE_FILE=' .env || echo "COMPOSE_FILE=${COMPOSE_CHAIN}" >> .env
fi

# --- Clean start (agent worktrees should always start fresh) ---
info "Stopping any existing containers..."
docker compose down -v 2>/dev/null || true

info "Building and starting containers..."
if ! docker compose up --build -d; then
  error "Failed to start containers"
  docker compose logs --tail=50 did
  exit 1
fi

# --- Wait for healthy services ---
info "Waiting for app to be ready..."
HEALTH_URL="http://localhost:${APP_PORT}/health_check"
TIMEOUT=120
ELAPSED=0
until curl -sf "$HEALTH_URL" > /dev/null 2>&1; do
  sleep 2
  ELAPSED=$((ELAPSED + 2))
  if (( ELAPSED >= TIMEOUT )); then
    error "Timed out waiting for $HEALTH_URL"
    docker compose logs --tail=50 did
    exit 1
  fi
  # Progress indicator every 10 seconds
  if (( ELAPSED % 10 == 0 )); then
    info "Still waiting... (${ELAPSED}s)"
  fi
done

# --- Write connection info to file for other scripts/tools to consume ---
cat > .agent-env <<EOF
APP_PORT=${APP_PORT}
APP_URL=http://localhost:${APP_PORT}
MONGO_PORT=${MONGO_PORT}
MONGO_URL=mongodb://localhost:${MONGO_PORT}
REDIS_PORT=${REDIS_PORT}
REDIS_URL=redis://localhost:${REDIS_PORT}
COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME}
WORKTREE_NAME=${WORKTREE_NAME}
EOF

# --- Output connection info ---
info "Environment ready!"
echo ""
echo "APP_URL=http://localhost:${APP_PORT}"
echo "MONGO_URL=mongodb://localhost:${MONGO_PORT}"
echo "REDIS_URL=redis://localhost:${REDIS_PORT}"
echo "COMPOSE_PROJECT=${COMPOSE_PROJECT_NAME}"
echo ""
if [[ -n "$TEST_SESSION_COOKIE" ]]; then
  info "Session injection enabled. To authenticate:"
  echo "  curl http://localhost:${APP_PORT}/auth/inject-session"
else
  info "Session injection disabled (no TEST_SESSION_COOKIE provided)"
fi
echo ""
info "To tear down: ./scripts/agent-teardown.sh"

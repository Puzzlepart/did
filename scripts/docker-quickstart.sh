#!/usr/bin/env bash
set -euo pipefail

# docker-quickstart.sh
# Opinionated quick start for did local Docker dev.
# - Ensures local override file exists
# - Appends COMPOSE_FILE to .env if missing
# - Optionally performs clean restart with fresh volumes
# - Starts stack detached

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

OVERRIDE_LOCAL="docker-compose.local.yml"
COMPOSE_CHAIN="docker-compose.yml:docker-compose.override.yml:${OVERRIDE_LOCAL}"

info() { echo -e "[quickstart] $*"; }
warn() { echo -e "[quickstart][warn] $*"; }

if [[ ! -f "$OVERRIDE_LOCAL" ]]; then
  info "Creating $OVERRIDE_LOCAL (fill in your Azure AD credentials)."
  cat > "$OVERRIDE_LOCAL" <<'EOF'
services:
  did:
    environment:
      - MICROSOFT_CLIENT_ID=##Insert Azure AD Client ID##
      - MICROSOFT_CLIENT_SECRET=##Insert Azure AD Client Secret##
EOF
fi

if [[ ! -f .env ]]; then
  warn ".env not found. Creating minimal .env (adjust as needed)."
  cat > .env <<'EOF'
NODE_ENV=development
PORT=9001
EOF
fi

# Ensure COMPOSE_FILE line present
if ! grep -q '^COMPOSE_FILE=' .env; then
  info "Adding COMPOSE_FILE to .env"
  echo "COMPOSE_FILE=${COMPOSE_CHAIN}" >> .env
else
  # Update if different
  if ! grep -q "COMPOSE_FILE=${COMPOSE_CHAIN}" .env; then
    warn "Existing COMPOSE_FILE differs; appending commented suggestion."
    echo "# Suggested for did Docker quickstart" >> .env
    echo "# COMPOSE_FILE=${COMPOSE_CHAIN}" >> .env
  fi
fi

CLEAN=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --clean|--fresh) CLEAN=1; shift ;;
    *) warn "Unknown arg: $1"; shift ;;
  esac
done

if (( CLEAN == 1 )); then
  info "Removing existing containers + volumes"
  docker compose down -v || true
fi

info "Building & starting (detached)."
if docker compose up --build -d; then
  info "Stack started. App: http://localhost:9001"
  info "Tail logs: docker compose logs -f did"
else
  warn "Startup failed. See: docker compose logs --tail=200 did"
  exit 1
fi

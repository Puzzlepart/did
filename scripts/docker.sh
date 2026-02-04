#!/usr/bin/env bash
set -euo pipefail

# docker.sh
# Unified Docker development helper for did
# Combines setup, start/stop, debugging, and maintenance operations

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info() { echo -e "${BLUE}[docker]${NC} $*"; }
success() { echo -e "${GREEN}[docker]${NC} $*"; }
warn() { echo -e "${YELLOW}[docker][warn]${NC} $*"; }
error() { echo -e "${RED}[docker][error]${NC} $*" >&2; }

# Configuration
OVERRIDE_LOCAL="docker-compose.local.yml"
COMPOSE_CHAIN="docker-compose.yml:docker-compose.override.yml:${OVERRIDE_LOCAL}"

# ─────────────────────────────────────────────────────────────────────────────
# Validation
# ─────────────────────────────────────────────────────────────────────────────

check_docker() {
  if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
    echo "  Visit: https://docs.docker.com/get-docker/"
    exit 1
  fi

  if ! docker info &> /dev/null; then
    error "Docker is not running. Please start Docker first."
    exit 1
  fi

  if ! docker compose version &> /dev/null; then
    error "Docker Compose plugin is not installed or enabled."
    echo "  Visit: https://docs.docker.com/compose/install/"
    exit 1
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
# Setup & Configuration
# ─────────────────────────────────────────────────────────────────────────────

ensure_local_override() {
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
}

ensure_env_file() {
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
  fi
}

check_placeholder_secrets() {
  if [[ -f "$OVERRIDE_LOCAL" ]] && grep -q '##Insert' "$OVERRIDE_LOCAL"; then
    warn "docker-compose.local.yml contains placeholder secrets."
    warn "Please update with your Azure AD credentials before signing in."
  fi
}

describe_seed_data() {
  local data_root="docker/data"

  if [[ ! -d "$data_root" ]]; then
    return
  fi

  if compgen -G "$data_root/*.json" > /dev/null 2>&1; then
    warn "JSON files at $data_root root will be ignored. Move them into database-named subdirectories."
  fi

  for dir in "$data_root"/*/; do
    [[ -d "$dir" ]] || continue
    if compgen -G "$dir"*.json > /dev/null 2>&1; then
      local db_name count
      db_name=$(basename "$dir")
      count=$(find "$dir" -maxdepth 1 -type f -name '*.json' | wc -l | tr -d ' ')
      info "Seed data: $db_name ($count collections)"
    fi
  done
}

# ─────────────────────────────────────────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────────────────────────────────────────

wait_for_healthy() {
  local port="${1:-9001}"
  local timeout="${2:-120}"
  local health_url="http://localhost:${port}/health_check"
  local elapsed=0

  info "Waiting for app to be ready..."
  until curl -sf "$health_url" > /dev/null 2>&1; do
    sleep 2
    elapsed=$((elapsed + 2))
    if (( elapsed >= timeout )); then
      error "Timed out waiting for $health_url"
      docker compose logs --tail=50 did
      return 1
    fi
    if (( elapsed % 10 == 0 )); then
      info "Still waiting... (${elapsed}s)"
    fi
  done
  success "App is ready!"
}

# ─────────────────────────────────────────────────────────────────────────────
# Commands
# ─────────────────────────────────────────────────────────────────────────────

cmd_start() {
  local fresh=0
  local with_tools=0
  local wait=0

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --fresh|--clean) fresh=1; shift ;;
      --with-tools) with_tools=1; shift ;;
      --wait) wait=1; shift ;;
      *) warn "Unknown start flag: $1"; shift ;;
    esac
  done

  ensure_local_override
  ensure_env_file
  check_placeholder_secrets
  describe_seed_data

  if (( fresh == 1 )); then
    info "Removing existing containers + volumes"
    docker compose down -v 2>/dev/null || true
  fi

  local profiles=""
  if (( with_tools == 1 )); then
    profiles="--profile tools"
  fi

  info "Building & starting containers..."
  if docker compose up --build -d $profiles; then
    success "Stack started!"
    echo ""
    info "App: http://localhost:9001"
    info "Health: http://localhost:9001/health_check"
    if (( with_tools == 1 )); then
      info "MongoDB Express: http://localhost:8081 (admin/admin123)"
      info "Redis Commander: http://localhost:8082"
    fi
    info "Tail logs: docker compose logs -f did"

    if (( wait == 1 )); then
      echo ""
      wait_for_healthy 9001
    fi
  else
    error "Startup failed. Check logs:"
    echo "  docker compose logs --tail=200 did"
    exit 1
  fi
}

cmd_stop() {
  info "Stopping containers..."
  docker compose down
  success "Containers stopped."
}

cmd_restart() {
  cmd_stop
  cmd_start "$@"
}

cmd_build() {
  info "Building images (no cache)..."
  docker compose build --no-cache
  success "Build complete."
}

cmd_logs() {
  docker compose logs -f did
}

cmd_shell() {
  docker compose exec did /bin/sh
}

cmd_db() {
  docker compose exec mongodb mongosh main
}

cmd_redis() {
  docker compose exec redis redis-cli
}

cmd_status() {
  info "Effective COMPOSE_FILE chain: $COMPOSE_CHAIN"
  echo ""
  docker compose ps
  echo ""
  describe_seed_data
  check_placeholder_secrets
}

cmd_clean() {
  warn "This will remove all did Docker resources including volumes (data will be lost)!"
  read -p "Are you sure? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    info "Cleaning up Docker resources..."
    docker compose down -v --remove-orphans --rmi local
    success "Cleanup complete!"
  else
    info "Cleanup cancelled."
  fi
}

cmd_maintenance() {
  ./scripts/docker-maintenance.sh "${@}"
}

cmd_help() {
  cat <<EOF
did Docker Development Helper

Usage: $0 [command] [flags]

Commands:
  start         Start the development environment (default)
  stop          Stop containers
  restart       Restart containers
  build         Rebuild images (no cache)
  logs          Tail application logs
  shell         Open shell in did container
  db            Open MongoDB shell
  redis         Open Redis CLI
  status        Show container status and configuration
  clean         Remove containers, volumes, and local images
  maintenance   Run disk cleanup (see docker-maintenance.sh)
  help          Show this help message

Start flags:
  --fresh       Remove volumes before starting (clean slate)
  --with-tools  Include admin tools (mongo-express, redis-commander)
  --wait        Wait for health check before returning

Examples:
  $0                      # Start containers
  $0 start --fresh        # Clean start with fresh volumes
  $0 start --with-tools   # Start with admin UI tools
  $0 logs                 # Tail logs
  $0 db                   # MongoDB shell
  $0 clean                # Remove everything

Agent/Worktree Setup:
  For isolated environments (CI, coding agents, worktrees), use:
    ./scripts/agent-setup.sh    # Setup with unique ports
    ./scripts/agent-teardown.sh # Cleanup

EOF
}

# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

main() {
  check_docker

  local command="${1:-start}"
  shift 2>/dev/null || true

  case "$command" in
    start)       cmd_start "$@" ;;
    stop)        cmd_stop ;;
    restart)     cmd_restart "$@" ;;
    build)       cmd_build ;;
    logs)        cmd_logs ;;
    shell)       cmd_shell ;;
    db|db-shell) cmd_db ;;
    redis|redis-cli) cmd_redis ;;
    status)      cmd_status ;;
    clean)       cmd_clean ;;
    maintenance) cmd_maintenance "$@" ;;
    help|--help|-h) cmd_help ;;
    *)
      error "Unknown command: $command"
      cmd_help
      exit 1
      ;;
  esac
}

main "$@"

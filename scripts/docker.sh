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
AUTO_MAINTENANCE_ENABLED="${DOCKER_AUTO_MAINTENANCE_ENABLED:-1}"
AUTO_MAINTENANCE_THRESHOLD_GB="${DOCKER_AUTO_MAINTENANCE_THRESHOLD_GB:-20}"
AUTO_MAINTENANCE_DAYS="${DOCKER_AUTO_MAINTENANCE_DAYS:-7}"
AUTO_MAINTENANCE_AGGRESSIVE="${DOCKER_AUTO_MAINTENANCE_AGGRESSIVE:-1}"

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

size_to_bytes() {
  local size="${1:-0B}"
  size="${size//[[:space:]]/}"
  if [[ -z "$size" || "$size" == "0" || "$size" == "0B" ]]; then
    echo 0
    return
  fi

  if ! [[ "$size" =~ ^([0-9]+([.][0-9]+)?)([[:alpha:]]+)$ ]]; then
    echo 0
    return
  fi

  local number="${BASH_REMATCH[1]}"
  local unit="${BASH_REMATCH[3]}"
  local multiplier=1
  case "${unit^^}" in
    KB|KIB) multiplier=1024 ;;
    MB|MIB) multiplier=$((1024 * 1024)) ;;
    GB|GIB) multiplier=$((1024 * 1024 * 1024)) ;;
    TB|TIB) multiplier=$((1024 * 1024 * 1024 * 1024)) ;;
    B) multiplier=1 ;;
    *) multiplier=1 ;;
  esac

  awk -v n="$number" -v m="$multiplier" 'BEGIN { printf "%.0f\n", n * m }'
}

bytes_to_gb() {
  local bytes="${1:-0}"
  awk -v value="$bytes" 'BEGIN { printf "%.1f", value / (1024 * 1024 * 1024) }'
}

get_reclaimable_bytes() {
  local rows
  rows=$(docker system df --format '{{.Type}}|{{.Reclaimable}}' 2>/dev/null || true)
  if [[ -z "$rows" ]]; then
    echo 0
    return
  fi

  local total=0
  while IFS='|' read -r _ reclaimable; do
    [[ -z "${reclaimable:-}" ]] && continue
    local size_part="${reclaimable%% *}"
    local bytes
    bytes=$(size_to_bytes "$size_part")
    total=$(( total + bytes ))
  done <<< "$rows"

  echo "$total"
}

maybe_run_preflight_maintenance() {
  if [[ "$AUTO_MAINTENANCE_ENABLED" != "1" ]]; then
    return
  fi

  if ! [[ "$AUTO_MAINTENANCE_THRESHOLD_GB" =~ ^[0-9]+$ ]]; then
    warn "Invalid DOCKER_AUTO_MAINTENANCE_THRESHOLD_GB=$AUTO_MAINTENANCE_THRESHOLD_GB. Skipping auto-maintenance preflight."
    return
  fi
  if ! [[ "$AUTO_MAINTENANCE_DAYS" =~ ^[0-9]+$ ]]; then
    warn "Invalid DOCKER_AUTO_MAINTENANCE_DAYS=$AUTO_MAINTENANCE_DAYS. Skipping auto-maintenance preflight."
    return
  fi

  local reclaimable_bytes
  reclaimable_bytes=$(get_reclaimable_bytes)
  local threshold_bytes=$(( AUTO_MAINTENANCE_THRESHOLD_GB * 1024 * 1024 * 1024 ))

  if (( reclaimable_bytes < threshold_bytes )); then
    return
  fi

  local reclaimable_gb
  reclaimable_gb=$(bytes_to_gb "$reclaimable_bytes")
  warn "Docker reclaimable data is high (~${reclaimable_gb}GB). Running preflight maintenance."

  local maintenance_args=(--days "$AUTO_MAINTENANCE_DAYS")
  if [[ "$AUTO_MAINTENANCE_AGGRESSIVE" == "1" ]]; then
    maintenance_args+=(--aggressive)
  fi

  if ./scripts/docker-maintenance.sh "${maintenance_args[@]}"; then
    success "Preflight maintenance complete."
  else
    warn "Preflight maintenance failed; continuing startup."
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
# Setup & Configuration
# ─────────────────────────────────────────────────────────────────────────────

ensure_local_override() {
  if [[ ! -f "$OVERRIDE_LOCAL" ]]; then
    info "Creating $OVERRIDE_LOCAL (optional machine-specific Docker overrides)."
    cat > "$OVERRIDE_LOCAL" <<'EOF'
# Optional local Docker Compose overrides for did.
# Add machine-specific overrides here when needed.
services:
  did:
    # Example:
    # environment:
    #   - MICROSOFT_CLIENT_ID=your-client-id
    #   - MICROSOFT_CLIENT_SECRET=your-client-secret
EOF
  fi
}

repair_placeholder_local_override() {
  if [[ ! -f "$OVERRIDE_LOCAL" ]]; then
    return
  fi

  if grep -q '##Insert' "$OVERRIDE_LOCAL"; then
    local backup="${OVERRIDE_LOCAL}.bak.$(date +%Y%m%d-%H%M%S)"
    cp "$OVERRIDE_LOCAL" "$backup"
    warn "$OVERRIDE_LOCAL contains placeholder values and will override .env credentials."
    warn "Backed up previous file to $backup and writing a safe template."
    cat > "$OVERRIDE_LOCAL" <<'EOF'
# Optional local Docker Compose overrides for did.
# Add machine-specific overrides here when needed.
services:
  did:
    # Example:
    # environment:
    #   - MICROSOFT_CLIENT_ID=your-client-id
    #   - MICROSOFT_CLIENT_SECRET=your-client-secret
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
    warn "docker-compose.local.yml still contains placeholder values."
    warn "These will override .env values; remove them or set real credentials."
  fi
}

describe_backups() {
  local backup_root=".backup"

  if [[ ! -d "$backup_root" ]]; then
    return
  fi

  local latest_backup
  latest_backup=$(find "$backup_root" -maxdepth 1 -type d -name 'backup*' | sort | tail -n 1 || true)
  if [[ -n "$latest_backup" ]]; then
    info "Latest backup folder: $latest_backup"
    info "Import to SQLite: npm run db:import-latest-backup"
  fi
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
  local wait=0
  local preflight=1

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --fresh|--clean) fresh=1; shift ;;
      --wait) wait=1; shift ;;
      --skip-preflight) preflight=0; shift ;;
      *) warn "Unknown start flag: $1"; shift ;;
    esac
  done

  ensure_local_override
  repair_placeholder_local_override
  ensure_env_file
  check_placeholder_secrets
  describe_backups

  if (( preflight == 1 )); then
    maybe_run_preflight_maintenance
  fi

  if (( fresh == 1 )); then
    info "Removing existing containers + volumes"
    docker compose down -v 2>/dev/null || true
  fi

  info "Building & starting containers..."
  if docker compose up --build -d; then
    success "Stack started!"
    echo ""
    info "App: http://localhost:9001"
    info "Health: http://localhost:9001/health_check"
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
  docker compose exec did node - <<'NODE'
const sqlite3 = require('sqlite3').verbose()
const dbPath = process.env.SQLITE_DB_PATH || 'did.sqlite'
const db = new sqlite3.Database(dbPath)
db.get('SELECT COUNT(*) AS count FROM did_documents', (err, row) => {
  if (err) {
    console.error('[docker] Failed to query SQLite:', err.message)
    process.exit(1)
  }
  console.log(`[docker] SQLite path: ${dbPath}`)
  console.log(`[docker] did_documents rows: ${row.count}`)
  db.close()
})
NODE
}

cmd_redis() {
  docker compose exec redis redis-cli
}

cmd_status() {
  info "Effective COMPOSE_FILE chain: $COMPOSE_CHAIN"
  echo ""
  docker compose ps
  echo ""
  describe_backups
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
  db            Show SQLite database status
  redis         Open Redis CLI
  status        Show container status and configuration
  clean         Remove containers, volumes, and local images
  maintenance   Run disk cleanup (see docker-maintenance.sh)
  help          Show this help message

Start flags:
  --fresh       Remove volumes before starting (clean slate)
  --wait        Wait for health check before returning
  --skip-preflight  Skip automatic Docker disk preflight cleanup check

Examples:
  $0                      # Start containers
  $0 start --fresh        # Clean start with fresh volumes
  $0 logs                 # Tail logs
  $0 db                   # SQLite status
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

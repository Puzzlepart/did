#!/usr/bin/env bash
set -euo pipefail

# agent-teardown.sh
# Clean up agent Docker environment and optionally the worktree

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

info() { echo -e "[agent-teardown] $*"; }
warn() { echo -e "[agent-teardown][WARN] $*"; }

WORKTREE_NAME=$(basename "$ROOT_DIR")
# Normalize worktree name to match agent-setup:
# - convert to lowercase
# - replace any non-alphanumeric characters with hyphens
NORMALIZED_WORKTREE_NAME="$(printf '%s' "$WORKTREE_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g')"
export COMPOSE_PROJECT_NAME="did-${NORMALIZED_WORKTREE_NAME}"

# Parse arguments
REMOVE_WORKTREE=0
FORCE=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --remove-worktree) REMOVE_WORKTREE=1; shift ;;
    --force|-f) FORCE=1; shift ;;
    *) warn "Unknown arg: $1"; shift ;;
  esac
done

info "Stopping project: $COMPOSE_PROJECT_NAME"

# Stop containers, remove volumes and locally-built images
if docker compose ps -q 2>/dev/null | grep -q .; then
  docker compose down -v --rmi local
else
  info "No running containers found"
  # Try to clean up anyway in case of partial state
  docker compose down -v --rmi local 2>/dev/null || true
fi

# Clean up generated files
info "Removing generated files"
rm -f docker-compose.local.yml .agent-env

# Optionally remove the worktree itself
if (( REMOVE_WORKTREE == 1 )); then
  WORKTREE_PATH="$ROOT_DIR"
  
  # Safety check: don't remove main repo
  if [[ "$WORKTREE_NAME" == "did" ]]; then
    warn "Refusing to remove main repository. Use --force to override."
    if (( FORCE == 0 )); then
      exit 1
    fi
  fi
  
  info "Removing worktree: $WORKTREE_PATH"
  cd ..
  git worktree remove "$WORKTREE_PATH" ${FORCE:+--force} || {
    warn "Failed to remove worktree. It may have uncommitted changes."
    warn "Use --force to remove anyway, or clean up manually:"
    echo "  git worktree remove '$WORKTREE_PATH' --force"
    exit 1
  }
  info "Worktree removed"
else
  info "Done. To also remove the worktree:"
  echo "  ./scripts/agent-teardown.sh --remove-worktree"
  echo "  # or manually:"
  echo "  git worktree remove '$ROOT_DIR'"
fi

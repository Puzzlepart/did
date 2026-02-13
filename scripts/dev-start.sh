#!/usr/bin/env sh
set -eu

# Ensures container node_modules matches package-lock before starting watch mode.
# This prevents stale anonymous Docker volumes from missing newly added packages.

LOCKFILE="package-lock.json"
STAMP_FILE="node_modules/.did-package-lock.sha256"

if [ ! -f "$LOCKFILE" ]; then
  echo "[dev-start] Missing $LOCKFILE" >&2
  exit 1
fi

lock_hash() {
  sha256sum "$LOCKFILE" | awk '{print $1}'
}

current_hash="$(lock_hash)"
needs_install=0

if [ ! -d node_modules ]; then
  echo "[dev-start] node_modules directory missing"
  needs_install=1
fi

if [ -d node_modules ] && [ ! -f "$STAMP_FILE" ]; then
  echo "[dev-start] Dependency stamp file missing"
  needs_install=1
fi

if [ -f "$STAMP_FILE" ]; then
  saved_hash="$(cat "$STAMP_FILE" 2>/dev/null || true)"
  if [ "$saved_hash" != "$current_hash" ]; then
    echo "[dev-start] package-lock hash changed"
    needs_install=1
  fi
fi

# Guard against partial/stale installs even when hash matches
if ! npm ls sqlite3 sift >/dev/null 2>&1; then
  echo "[dev-start] Required modules not present in node_modules"
  needs_install=1
fi

if [ "$needs_install" -eq 1 ]; then
  echo "[dev-start] Running npm ci to sync dependencies..."
  npm ci --no-audit --no-fund --loglevel=error
  mkdir -p "$(dirname "$STAMP_FILE")"
  printf '%s\n' "$current_hash" > "$STAMP_FILE"
else
  echo "[dev-start] Dependencies already synchronized"
fi

exec npm run watch

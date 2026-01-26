#!/bin/bash

# Docker maintenance script for did (safe defaults for periodic cleanup)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    echo "did Docker Maintenance"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --days <n>         Prune items unused for <n> days (default: 7)"
    echo "  --aggressive       Remove unused images (not just dangling)"
    echo "  --include-volumes  Remove unused volumes (no age filter)"
    echo "  --clean-dist       Remove dist/ when older than --days"
    echo "  --dry-run          Print actions without executing"
    echo "  --help             Show this help message"
    echo ""
}

check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! docker info &> /dev/null; then
        log_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

run_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY RUN] $*"
        return 0
    fi

    "$@"
}

DEFAULT_DAYS=7
DAYS=$DEFAULT_DAYS
AGGRESSIVE=false
INCLUDE_VOLUMES=false
CLEAN_DIST=false
DRY_RUN=false

while [ $# -gt 0 ]; do
    case "$1" in
        --days)
            if [ -z "${2:-}" ]; then
                log_error "--days requires a value"
                exit 1
            fi
            DAYS="$2"
            shift 2
            ;;
        --aggressive)
            AGGRESSIVE=true
            shift
            ;;
        --include-volumes)
            INCLUDE_VOLUMES=true
            shift
            ;;
        --clean-dist)
            CLEAN_DIST=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

if ! [[ "$DAYS" =~ ^[0-9]+$ ]]; then
    log_error "--days must be a number"
    exit 1
fi

check_docker

PRUNE_HOURS=$((DAYS * 24))
PRUNE_FILTER="until=${PRUNE_HOURS}h"

log_info "Pruning build cache older than ${DAYS} days..."
run_cmd docker builder prune --force --filter "$PRUNE_FILTER"

log_info "Pruning stopped containers older than ${DAYS} days..."
run_cmd docker container prune --force --filter "$PRUNE_FILTER"

if [ "$AGGRESSIVE" = true ]; then
    log_warning "Aggressive mode enabled. Removing unused images older than ${DAYS} days."
    run_cmd docker image prune --all --force --filter "$PRUNE_FILTER"
else
    log_info "Pruning dangling images older than ${DAYS} days..."
    run_cmd docker image prune --force --filter "$PRUNE_FILTER"
fi

if [ "$INCLUDE_VOLUMES" = true ]; then
    log_warning "Removing unused volumes (no age filter)."
    run_cmd docker volume prune --force
fi

if [ "$CLEAN_DIST" = true ]; then
    if [ -d "dist" ]; then
        if find dist -maxdepth 0 -mtime +"$DAYS" | grep -q dist; then
            log_warning "Removing dist/ (older than ${DAYS} days)."
            run_cmd rm -rf dist
        else
            log_info "dist/ is newer than ${DAYS} days. Skipping."
        fi
    else
        log_info "dist/ not found. Skipping."
    fi
fi

log_success "Docker maintenance complete."

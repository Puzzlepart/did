#!/bin/bash

# Docker development helper script for did application

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

# Check if Docker is installed and running
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

# Show help
show_help() {
    echo "did Docker Development Helper"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start        Start the development environment"
    echo "  stop         Stop the development environment"
    echo "  restart      Restart the development environment"
    echo "  build        Build Docker images"
    echo "  clean        Clean up Docker resources"
    echo "  maintenance  Prune Docker caches/logs safely"
    echo "  logs         Show application logs"
    echo "  shell        Open shell in the did container"
    echo "  db-shell     Open MongoDB shell"
    echo "  redis-cli    Open Redis CLI"
    echo "  setup        Initial setup for development"
    echo "  status       Show status of services"
    echo "  help         Show this help message"
    echo ""
    echo "Additional flags:"
    echo "  --with-tools Include admin tools (mongo-express, redis-commander)"
    echo ""
}

# Inspect seed data directory structure and provide feedback
describe_seed_data() {
    local data_root="docker/data"

    if [ ! -d "$data_root" ]; then
        log_info "No seed data directory detected (docker/data). MongoDB will start empty."
        log_info "Create $data_root/<database>/<collection>.json folders to preload data."
        return
    fi

    if compgen -G "$data_root/*.json" > /dev/null; then
        log_warning "JSON files at $data_root root will be ignored. Move them into database-named subdirectories."
    fi

    local has_seed_dirs=false
    for dir in "$data_root"/*/; do
        [ -d "$dir" ] || continue
        if compgen -G "$dir"*.json > /dev/null; then
            has_seed_dirs=true
            local db_name
            db_name=$(basename "$dir")
            local count
            count=$(find "$dir" -maxdepth 1 -type f -name '*.json' | wc -l | tr -d ' ')
            log_info "Seed data ready for database '$db_name' ($count collections)."
        else
            log_warning "Found directory $(basename "$dir") without JSON files; skipping."
        fi
    done

    if [ "$has_seed_dirs" = false ]; then
        log_info "No usable seed directories detected under $data_root. MongoDB will start empty."
        log_info "Create $data_root/<database>/<collection>.json to preload data."
    fi
}

# Setup development environment
setup_dev() {
    log_info "Setting up did development environment..."

    # Copy .env.sample to .env if it doesn't exist
    if [ ! -f .env ]; then
        log_info "Creating .env file from .env.sample..."
        cp .env.sample .env
        log_warning "Please edit .env file with your configuration before starting the application"
    fi

    describe_seed_data

    # Build images
    log_info "Building Docker images..."
    docker compose build

    log_success "Development environment setup complete!"
    log_info "Run './scripts/docker-dev.sh start' to start the application"
}

# Start services
start_services() {
    local profiles=""
    if [[ "$*" == *"--with-tools"* ]]; then
        profiles="--profile tools"
    fi
    
    log_info "Starting did development environment..."
    docker compose up -d $profiles

    log_success "Services started successfully!"
    log_info "Application will be available at: http://localhost:9001"
    
    if [[ "$*" == *"--with-tools"* ]]; then
        log_info "MongoDB Express: http://localhost:8081 (admin/admin123)"
        log_info "Redis Commander: http://localhost:8082"
    fi

    describe_seed_data
}

# Stop services
stop_services() {
    log_info "Stopping did development environment..."
    docker compose down
    log_success "Services stopped successfully!"
}

# Restart services
restart_services() {
    log_info "Restarting did development environment..."
    stop_services
    start_services "$@"
}

# Build images
build_images() {
    log_info "Building Docker images..."
    docker compose build --no-cache
    log_success "Images built successfully!"
}

# Clean up Docker resources
clean_docker() {
    log_warning "This will remove all did Docker resources including volumes (data will be lost)!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleaning up Docker resources..."
        docker compose down -v --remove-orphans
        docker system prune -f
        log_success "Cleanup complete!"
    else
        log_info "Cleanup cancelled."
    fi
}

# Show logs
show_logs() {
    docker compose logs -f did
}

# Open shell in did container
open_shell() {
    docker compose exec did /bin/sh
}

# Open MongoDB shell
open_db_shell() {
    docker compose exec mongodb mongosh main
}

# Open Redis CLI
open_redis_cli() {
    docker compose exec redis redis-cli
}

# Show status
show_status() {
    log_info "did Development Environment Status:"
    docker compose ps
}

# Run maintenance script
run_maintenance() {
    ./scripts/docker-maintenance.sh "${@:2}"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        start)
            start_services "$@"
            ;;
        stop)
            stop_services
            ;;
        restart)
            restart_services "$@"
            ;;
        build)
            build_images
            ;;
        clean)
            clean_docker
            ;;
        maintenance)
            run_maintenance "$@"
            ;;
        logs)
            show_logs
            ;;
        shell)
            open_shell
            ;;
        db-shell)
            open_db_shell
            ;;
        redis-cli)
            open_redis_cli
            ;;
        setup)
            setup_dev
            ;;
        status)
            show_status
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"

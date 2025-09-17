#!/bin/bash

# Docker environment validation script for DID
# This script validates that Docker is properly set up for DID development

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

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validation functions
validate_docker() {
    log_info "Checking Docker installation..."
    
    if ! command_exists docker; then
        log_error "Docker is not installed. Please install Docker first."
        echo "  Visit: https://docs.docker.com/get-docker/"
        return 1
    fi
    
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker first."
        return 1
    fi
    
    local docker_version=$(docker --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1)
    log_success "Docker v${docker_version} is installed and running"
}

validate_docker_compose() {
    log_info "Checking Docker Compose..."
    
    if docker compose version >/dev/null 2>&1; then
        local compose_version=$(docker compose version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1)
        log_success "Docker Compose v${compose_version} is available (V2)"
    elif command_exists docker-compose; then
        local compose_version=$(docker-compose --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1)
        log_warning "Docker Compose v${compose_version} is available (V1 - deprecated)"
        echo "  Consider upgrading to Docker Compose V2 for better performance"
        echo "  V1 (docker-compose) is deprecated in favor of V2 (docker compose)"
    else
        log_error "Docker Compose is not available"
        echo "  Install Docker Compose: https://docs.docker.com/compose/install/"
        return 1
    fi
}

validate_node_requirement() {
    log_info "Checking Node.js requirement..."
    
    if [ -f ".nvmrc" ]; then
        local required_node=$(cat .nvmrc)
        log_info "Required Node.js version: ${required_node}"
        log_info "Docker will use the correct Node.js version (${required_node}) automatically"
    else
        log_warning "No .nvmrc file found"
    fi
}

validate_environment_file() {
    log_info "Checking environment configuration..."
    
    if [ -f ".env" ]; then
        log_success "Environment file (.env) exists"
        
        # Check for required variables
        local required_vars=("MICROSOFT_CLIENT_ID" "MICROSOFT_CLIENT_SECRET" "SESSION_SIGNING_KEY")
        local missing_vars=()
        
        for var in "${required_vars[@]}"; do
            if ! grep -q "^${var}=" .env || grep -q "^${var}=##" .env; then
                missing_vars+=("$var")
            fi
        done
        
        if [ ${#missing_vars[@]} -eq 0 ]; then
            log_success "Required environment variables are configured"
        else
            log_warning "Some required environment variables need configuration:"
            for var in "${missing_vars[@]}"; do
                echo "  - $var"
            done
            echo "  Edit .env file to set these values"
        fi
    else
        log_warning "Environment file (.env) not found"
        echo "  Run: cp .env.sample .env"
        echo "  Then edit .env with your configuration"
    fi
}

validate_ports() {
    log_info "Checking port availability..."
    
    local ports=(9001 27017 6379 8081 8082)
    local busy_ports=()
    
    for port in "${ports[@]}"; do
        if lsof -i ":$port" >/dev/null 2>&1; then
            busy_ports+=("$port")
        fi
    done
    
    if [ ${#busy_ports[@]} -eq 0 ]; then
        log_success "All required ports are available"
    else
        log_warning "Some ports are already in use:"
        for port in "${busy_ports[@]}"; do
            echo "  - Port $port"
        done
        echo "  You may need to stop services or configure different ports"
    fi
}

validate_docker_build() {
    log_info "Testing Docker build (this may take a while)..."
    
    if timeout 120 docker build --target base -t did:validate . >/dev/null 2>&1; then
        log_success "Docker build test completed successfully"
        docker rmi did:validate >/dev/null 2>&1 || true
    else
        log_warning "Docker build test timed out or failed"
        echo "  This is normal for the first build due to dependency installation"
        echo "  Run: docker build --target base -t did:base . to test manually"
    fi
}

validate_scripts() {
    log_info "Checking helper scripts..."
    
    if [ -x "./scripts/docker-dev.sh" ]; then
        log_success "Docker development script is executable"
    else
        log_warning "Docker development script is not executable"
        echo "  Run: chmod +x ./scripts/docker-dev.sh"
    fi
}

# Main validation
main() {
    echo "=================================="
    echo "DID Docker Environment Validation"
    echo "=================================="
    echo
    
    local errors=0
    
    validate_docker || ((errors++))
    echo
    
    validate_docker_compose || ((errors++))
    echo
    
    validate_node_requirement
    echo
    
    validate_environment_file
    echo
    
    validate_ports
    echo
    
    validate_scripts
    echo
    
    validate_docker_build
    echo
    
    echo "=================================="
    if [ $errors -eq 0 ]; then
        log_success "Environment validation completed successfully!"
        echo
        echo "Next steps:"
        echo "1. Configure .env file if needed"
        echo "2. Run: ./scripts/docker-dev.sh start"
        echo "3. Access application at: http://localhost:9001"
    else
        log_warning "Environment validation completed with $errors error(s)"
        echo
        echo "Please fix the errors above before starting development"
    fi
    echo "=================================="
}

# Run validation
main "$@"
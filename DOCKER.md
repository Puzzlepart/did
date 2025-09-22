# Docker Development Guide for did

This guide provides comprehensive instructions for using Docker with the did application for development, testing, and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Services](#services)
- [Configuration](#configuration)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or later)
- Git

## Quick Start

1. **Clone and setup:**
   ```bash
   git clone https://github.com/Puzzlepart/did.git
   cd did
   git checkout dev
   ```

2. **Initialize development environment:**
   ```bash
   ./scripts/docker-dev.sh setup
   ```

3. **Configure environment:**
   Edit the `.env` file created in the previous step with your configuration values.

4. **Start services:**
   ```bash
   ./scripts/docker-dev.sh start
   ```

5. **Access the application:**
   - Application: http://localhost:9001
   - MongoDB: localhost:27017
   - Redis: localhost:6379

## Development Workflow

### Starting Development

```bash
# Start all services
./scripts/docker-dev.sh start

# Start with admin tools (MongoDB Express, Redis Commander)
./scripts/docker-dev.sh start --with-tools
```

### Working with the Application

```bash
# View application logs in real-time
./scripts/docker-dev.sh logs

# Open a shell in the did container
./scripts/docker-dev.sh shell

# Access MongoDB shell
./scripts/docker-dev.sh db-shell

# Access Redis CLI
./scripts/docker-dev.sh redis-cli
```

### Stopping and Cleanup

```bash
# Stop all services
./scripts/docker-dev.sh stop

# Restart services
./scripts/docker-dev.sh restart

# Clean up all data (WARNING: This removes all data!)
./scripts/docker-dev.sh clean
```

## Services

### Main Services

| Service | Port | Description | Access |
|---------|------|-------------|--------|
| did App | 9001 | Main application | http://localhost:9001 |
| MongoDB | 27017 | Database | localhost:27017 |
| Redis | 6379 | Cache | localhost:6379 |

### Database Data Import

MongoDB can be pre-populated with tenant data for development:

1. **Export data from production** using `mongoexport`:
   ```bash
   mongoexport --uri="your-prod-connection-string" --collection=users --out=users.json
   mongoexport --uri="your-prod-connection-string" --collection=projects --out=projects.json
   mongoexport --uri="your-prod-connection-string" --collection=customers --out=customers.json
   ```

2. **Create a database-specific folder** inside `docker/data/` (this folder is gitignored). The folder name becomes the database name during import:
   ```text
   docker/data/
     └── puzzlepart/
         ├── users.json
         ├── projects.json
         └── timeentries.json
   ```

3. **Start services** - data will be imported automatically on first MongoDB startup:
   ```bash
   ./scripts/docker-dev.sh start
   ```

**Note**: Data import only happens when MongoDB starts with an empty database, and only JSON files inside subdirectories are imported.

### Admin Tools (Optional)

Include admin tools with `--with-tools` flag:

| Service | Port | Description | Access | Credentials |
|---------|------|-------------|--------|-------------|
| MongoDB Express | 8081 | MongoDB admin | http://localhost:8081 | admin/admin123 |
| Redis Commander | 8082 | Redis admin | http://localhost:8082 | None |

## Configuration

### Environment Variables

The application uses environment variables for configuration. Key variables for Docker development:

```bash
# Database
MONGO_DB_CONNECTION_STRING=mongodb://mongodb:27017
MONGO_DB_DB_NAME=main

# Cache
REDIS_CACHE_HOSTNAME=redis
REDIS_CACHE_PORT=6379

# Application
NODE_ENV=development
PORT=9001
DEBUG=environment*,graphql*
```

### Docker Compose Files

- `docker-compose.yml`: Main development configuration
- `docker-compose.override.yml`: Local environment variable overrides

### Custom Configuration

You can override environment variables by editing the `.env` file or `docker-compose.override.yml`:

```yaml
# docker-compose.override.yml
version: '3.8'
services:
  did:
    environment:
      - DEBUG=app*,graphql*,mongodb*
```

## Deployment Notes

Production deployments are handled manually via Azure App Service slot swaps. The Docker tooling in this repository targets development workflows only.

## Troubleshooting

### Common Issues

**1. Port conflicts:**
```bash
# Check what's using the port
lsof -i :9001

# Change port in docker-compose.override.yml
services:
  did:
    ports:
      - "9002:9001"
```

**2. Permission issues:**
```bash
# Make sure script is executable
chmod +x ./scripts/docker-dev.sh

# Fix ownership issues (Linux/macOS)
sudo chown -R $USER:$USER .
```

**3. Database connection issues:**
```bash
# Check if MongoDB is running
docker compose ps

# View MongoDB logs
docker compose logs mongodb

# Restart MongoDB
docker compose restart mongodb
```

**4. Build issues:**
```bash
# Clean build cache
docker compose build --no-cache

# Clean Docker system
docker system prune -f
```

### Debugging

**1. Application not starting:**
```bash
# Check container logs
./scripts/docker-dev.sh logs

# Check container status
docker compose ps

# Enter container for debugging
./scripts/docker-dev.sh shell
```

**2. Database issues:**
```bash
# Access MongoDB directly
./scripts/docker-dev.sh db-shell

# Check database status
docker compose exec mongodb mongosh --eval "db.runCommand('ping')"
```

**3. Cache issues:**
```bash
# Access Redis CLI
./scripts/docker-dev.sh redis-cli

# Check Redis status
docker compose exec redis redis-cli ping
```

## Advanced Usage

### Custom Docker Commands

```bash
# Build specific stage
docker build --target development -t did:dev .

# Run with custom environment
docker run -it --rm -p 9001:9001 --env-file .env.custom did:dev

# Override entrypoint for debugging
docker run -it --rm --entrypoint /bin/sh did:dev
```

### Development with Volumes

For active development, code changes are automatically reflected due to volume mounts:

```yaml
volumes:
  - .:/app
  - /app/node_modules  # Prevents overwriting container node_modules
```

### Multi-Architecture Builds

Build for multiple architectures:

```bash
# Setup buildx
docker buildx create --use

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t did:latest .
```

## Health Checks

The application includes built-in health checks:

- **Endpoint**: `http://localhost:9001/health_check`
- **Docker Health Check**: Configured in Dockerfile
- **Compose Health Check**: Available in production compose

```bash
# Check application health
curl http://localhost:9001/health_check

# Check Docker health status
docker compose ps
```

## Monitoring

For production monitoring, consider integrating:

- **Logs**: Use `docker compose logs` or external log aggregation
- **Metrics**: Application exposes metrics at `/metrics`
- **Monitoring**: Use tools like Prometheus, Grafana, or Azure Monitor

## Security Considerations

1. **Secrets Management**: Use Docker secrets or external secret management
2. **Network Security**: Configure proper network policies
3. **User Permissions**: Run containers with non-root user (handled automatically)
4. **Image Security**: Regularly update base images and scan for vulnerabilities

## Support

For issues and questions:

1. Check this guide and troubleshooting section
2. Review Docker Compose logs: `./scripts/docker-dev.sh logs`
3. Open an issue on GitHub with logs and configuration
4. Contact the development team

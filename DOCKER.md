# Docker Development Guide for DID

This guide provides comprehensive instructions for using Docker with the DID application for development, testing, and deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Services](#services)
- [Configuration](#configuration)
- [Production Deployment](#production-deployment)
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

# Open a shell in the DID container
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
| DID App | 9001 | Main application | http://localhost:9001 |
| MongoDB | 27017 | Database | localhost:27017 |
| Redis | 6379 | Cache | localhost:6379 |

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
MONGO_DB_DB_NAME=did_dev

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
- `docker-compose.prod.yml`: Production configuration

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

## Production Deployment

### Building Production Image

```bash
# Build production image
docker build --target production -t did:latest .

# Or build all stages
docker build -t did:latest .
```

### Production Deployment

1. **Prepare environment:**
   ```bash
   cp .env.sample .env.production
   # Edit .env.production with production values
   ```

2. **Deploy with production compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Scale the application:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --scale did=3
   ```

### Production Environment Variables

Required for production:

```bash
NODE_ENV=production
MONGO_DB_CONNECTION_STRING=mongodb://mongodb:27017
MONGO_ROOT_USERNAME=your_mongo_user
MONGO_ROOT_PASSWORD=your_mongo_password
REDIS_PASSWORD=your_redis_password
```

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
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

**4. Build issues:**
```bash
# Clean build cache
docker-compose build --no-cache

# Clean Docker system
docker system prune -f
```

### Debugging

**1. Application not starting:**
```bash
# Check container logs
./scripts/docker-dev.sh logs

# Check container status
docker-compose ps

# Enter container for debugging
./scripts/docker-dev.sh shell
```

**2. Database issues:**
```bash
# Access MongoDB directly
./scripts/docker-dev.sh db-shell

# Check database status
docker-compose exec mongodb mongosh --eval "db.runCommand('ping')"
```

**3. Cache issues:**
```bash
# Access Redis CLI
./scripts/docker-dev.sh redis-cli

# Check Redis status
docker-compose exec redis redis-cli ping
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

### Using with External Services

You can connect to external MongoDB or Redis instances:

```yaml
# docker-compose.override.yml
services:
  did:
    environment:
      - MONGO_DB_CONNECTION_STRING=mongodb://your-external-mongo:27017
      - REDIS_CACHE_HOSTNAME=your-external-redis
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

- **Endpoint**: `http://localhost:9001/health`
- **Docker Health Check**: Configured in Dockerfile
- **Compose Health Check**: Available in production compose

```bash
# Check application health
curl http://localhost:9001/health

# Check Docker health status
docker-compose ps
```

## Monitoring

For production monitoring, consider integrating:

- **Logs**: Use `docker-compose logs` or external log aggregation
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
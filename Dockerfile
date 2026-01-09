# syntax=docker/dockerfile:1.6
# Multi-stage Dockerfile for did application
# Stage 1: Base development image
FROM node:22.14.0-alpine AS base

# Set working directory
WORKDIR /app

# Propagate git metadata collected during CI builds
ARG GIT_COMMIT=unknown
ARG GIT_BRANCH=unknown
ARG GIT_COMMIT_DATETIME=unknown
ENV GIT_COMMIT=$GIT_COMMIT \
    GIT_BRANCH=$GIT_BRANCH \
    GIT_COMMIT_DATETIME=$GIT_COMMIT_DATETIME \
    npm_config_fetch_retries=5 \
    npm_config_fetch_retry_mintimeout=20000 \
    npm_config_fetch_retry_maxtimeout=120000 \
    npm_config_progress=false

# Copy package files
COPY package*.json ./

# Install dependencies with cached downloads and retry handling
RUN --mount=type=cache,target=/root/.npm \
    set -eux; \
    for attempt in 1 2 3; do \
        npm ci --no-audit --no-fund --loglevel=error && break; \
        if [ "${attempt}" -lt 3 ]; then \
            echo "npm ci failed (attempt ${attempt}); retrying..." >&2; \
            sleep $((attempt * 5)); \
        else \
            echo "npm ci failed after ${attempt} attempts" >&2; \
            exit 1; \
        fi; \
    done

# Stage 2: Development image
FROM base AS development

# Copy source code
COPY . .

# Create .env file from sample if it doesn't exist
RUN if [ ! -f .env ]; then cp .env.sample .env; fi

# Expose port
EXPOSE 9001

# Start development server
CMD ["npm", "run", "watch"]

# Stage 3: Build stage
FROM base AS build

# Set production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Copy source code
COPY . .

# Build the application
RUN npm run package:client && npm run build:server

# Stage 4: Production image
FROM node:22.14.0-alpine AS production

# Set working directory
WORKDIR /app

# Install system dependencies for production
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install only production dependencies (with cached downloads and retries)
RUN --mount=type=cache,target=/root/.npm \
    set -eux; \
    for attempt in 1 2 3; do \
        npm ci --only=production --no-audit --no-fund --loglevel=error && break; \
        if [ "${attempt}" -lt 3 ]; then \
            echo "npm ci (production) failed (attempt ${attempt}); retrying..." >&2; \
            sleep $((attempt * 5)); \
        else \
            echo "npm ci (production) failed after ${attempt} attempts" >&2; \
            exit 1; \
        fi; \
    done

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Create non-root user early
RUN addgroup -g 1001 -S nodejs && \
    adduser -S did -u 1001 && \
    chown -R did:nodejs /app/dist

# Switch to non-root user
USER did

# Expose port
EXPOSE 9001

# Build args for metadata (optional at build time)
ARG BUILD_VERSION="unknown"
ARG GIT_COMMIT="unknown"

# Labels for observability / SBOM traceability
LABEL org.opencontainers.image.title="did" \
      org.opencontainers.image.version="${BUILD_VERSION}" \
      org.opencontainers.image.revision="${GIT_COMMIT}" \
      org.opencontainers.image.source="https://github.com/Puzzlepart/did" \
      org.opencontainers.image.licenses="MIT"

# Health check (align with implemented /health_check route)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:9001/health_check', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server/index.js"]

# Multi-stage Dockerfile for did application
# Stage 1: Base development image
FROM node:22.14.0-alpine AS base

# Set working directory
WORKDIR /app

# Install packages required for builds
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install dependencies with retry and clean cache
RUN npm cache clean --force && \
    npm ci --no-audit --no-fund --loglevel=error

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

# Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund --loglevel=error && \
    npm cache clean --force

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/revision.txt ./revision.txt

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S did -u 1001

# Change ownership of the app directory
RUN chown -R did:nodejs /app
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

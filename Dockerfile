# Production image for the DID application
FROM node:22-slim

WORKDIR /app

# Create a non-root user to run the application
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy package files and install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --no-fund --no-audit

# Copy pre-built application files
# Server
COPY ./dist/server/ ./server/
COPY ./dist/shared/ ./shared/

# Views and static assets
COPY ./server/public/ ./server/public/
COPY ./server/views/ ./server/views/

# Configuration files
COPY tsconfig.json ./

# Set permissions for the non-root user
RUN chown -R appuser:appgroup /app
USER appuser

# Set environment variables
ENV NODE_ENV=production
# Use PORT from environment, fallback to 9001
ENV PORT=${PORT:-9001}

# Expose the port the app will run on
EXPOSE ${PORT}

# Command to run the application
CMD ["sh", "-c", "npm run start"]
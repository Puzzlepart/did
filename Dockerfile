# Production image for the DID application
FROM node:22-alpine

WORKDIR /app

# Create a non-root user to run the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

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
ENV PORT=9001

# Expose the port the app will run on
EXPOSE 9001

# Command to run the application
CMD ["npm", "run", "start"]
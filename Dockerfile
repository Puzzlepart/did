# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.12.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++


# Copy all files from the current directory to the working directory.
COPY ./ .

# Set the working directory to root.
WORKDIR /

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.npm to speed up subsequent builds.
# # Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# # into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund

# Build the application server.
RUN npm run build:server

# Copy the node_modules directory to the app directory
RUN cp -r node_modules /app

# Copy the package json file to the app directory
COPY package.json ./app

# Changes the working directory to the app directory
WORKDIR /app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD npm start

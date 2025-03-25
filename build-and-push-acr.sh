#!/bin/bash

# Script to build the application locally and push Docker image to Azure Container Registry

# Exit on error
set -e

# Configuration
ACR_NAME=${1:-"yourAcrName"}  # Default ACR name (can be overridden by first argument)
IMAGE_NAME="didapp"
TAG=${2:-"latest"}  # Default tag (can be overridden by second argument)

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Building DID application for Docker deployment ===${NC}"

# Step 1: Verify we're in a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo -e "${RED}Error: Not inside a Git repository.${NC}"
  echo -e "${RED}The build process requires Git information.${NC}"
  exit 1
fi

# Step 2: Clean any previous build artifacts to ensure a fresh build
echo -e "${YELLOW}Cleaning previous build artifacts...${NC}"
rm -rf ./dist

# Step 3: Build the application locally (with Git access)
echo -e "${YELLOW}Building client package...${NC}"
npm run package:client

echo -e "${YELLOW}Building server...${NC}"
npm run build:server

# Step 4: Check if all required directories exist
echo -e "${YELLOW}Validating build artifacts...${NC}"

if [ ! -d "./dist" ]; then
  echo -e "${RED}Error: dist directory not found.${NC}"
  echo -e "${RED}Make sure the build commands completed successfully.${NC}"
  exit 1
fi

if [ ! -d "./dist/server" ]; then
  echo -e "${RED}Error: dist/server directory not found.${NC}"
  echo -e "${RED}Server build appears to have failed.${NC}"
  exit 1
fi

if [ ! -d "./server/views" ]; then
  echo -e "${RED}Error: server/views directory not found.${NC}"
  echo -e "${RED}Required server views not found.${NC}"
  exit 1
fi

if [ ! -d "./server/public" ]; then
  echo -e "${RED}Error: server/public directory not found.${NC}"
  echo -e "${RED}Required static assets not found.${NC}"
  exit 1
fi

# Step 5: Build Docker image
echo -e "${YELLOW}Building Docker image from local build artifacts...${NC}"
docker build -t "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${TAG}" .

if [ $? -ne 0 ]; then
  echo -e "${RED}Error: Docker build failed.${NC}"
  exit 1
fi

# Step 6: Push to ACR
echo -e "${YELLOW}Logging in to ACR...${NC}"
if ! az acr login --name $ACR_NAME; then
  echo -e "${RED}Error: Failed to log in to ACR '${ACR_NAME}'.${NC}"
  echo -e "${RED}Make sure:${NC}"
  echo -e "${RED}1. Azure CLI is installed${NC}"
  echo -e "${RED}2. You're logged in (az login)${NC}"
  echo -e "${RED}3. The ACR name is correct${NC}"
  exit 1
fi

echo -e "${YELLOW}Pushing image to ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${TAG}${NC}"
if ! docker push "${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${TAG}"; then
  echo -e "${RED}Error: Failed to push image to ACR.${NC}"
  exit 1
fi

echo -e "${GREEN}Successfully built and pushed image to ACR!${NC}"
echo -e "${GREEN}Image: ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${TAG}${NC}"

# Show deployed image info
echo -e "${YELLOW}Checking image in registry:${NC}"
az acr repository show-tags --name $ACR_NAME --repository $IMAGE_NAME --orderby time_desc --output table
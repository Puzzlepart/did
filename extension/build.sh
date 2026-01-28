#!/bin/bash

# Build script for did Microsoft Edge Sidebar Extension
# Creates a distributable .zip file of the extension

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXTENSION_DIR="$SCRIPT_DIR"
BUILD_DIR="$SCRIPT_DIR/build"
DIST_DIR="$SCRIPT_DIR/dist"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building did Edge Sidebar Extension...${NC}"

# Create build directory
echo "Creating build directory..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy extension files to build directory
echo "Copying extension files..."
cp "$EXTENSION_DIR/manifest.json" "$BUILD_DIR/"
cp "$EXTENSION_DIR/sidebar.html" "$BUILD_DIR/"
cp "$EXTENSION_DIR/sidebar.js" "$BUILD_DIR/"
cp "$EXTENSION_DIR/background.js" "$BUILD_DIR/"
cp "$EXTENSION_DIR/README.md" "$BUILD_DIR/"

# Copy icons
mkdir -p "$BUILD_DIR/icons"
cp "$EXTENSION_DIR/icons/"*.png "$BUILD_DIR/icons/"

# Get version from manifest
VERSION=$(grep -o '"version": "[^"]*"' "$BUILD_DIR/manifest.json" | cut -d'"' -f4)

# Create dist directory
mkdir -p "$DIST_DIR"

# Create zip file
echo "Creating distribution package..."
PACKAGE_NAME="did-edge-sidebar-extension-v${VERSION}.zip"
cd "$BUILD_DIR"
zip -r "$DIST_DIR/$PACKAGE_NAME" ./* -q

echo -e "${GREEN}✓ Build complete!${NC}"
echo ""
echo "Package: $DIST_DIR/$PACKAGE_NAME"
echo "Version: $VERSION"
echo ""
echo -e "${YELLOW}To install:${NC}"
echo "1. Open edge://extensions/ in Microsoft Edge"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked'"
echo "4. Select the extension/ directory"
echo ""
echo -e "${YELLOW}To distribute:${NC}"
echo "Upload $PACKAGE_NAME to Microsoft Partner Center"

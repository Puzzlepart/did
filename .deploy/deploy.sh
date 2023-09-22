#!/bin/bash

# ----------------------
# Did Deployment Script
# Version: 0.0.1
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

selectNodeVersion () {
  NODE_EXE=node
  NPM_CMD=npm
}

# Prerequisites
# -------------

# Verify Node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from the current environment."

# Setup
# - Installing kudusync
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi



##################################################################################################################################
# Deployment
#
# 1. rsync to copy files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET
# 2. Select Node version
# 3. Installing node_modules with --production flag
# ----------
CURRENT_PACKAGE_VERSION=$(node -p -e "require('$DEPLOYMENT_TARGET/package.json').version")

if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then

  if [[ "$IGNORE_MANIFEST" -eq "1" ]]; then
    IGNORE_MANIFEST_PARAM=-x
  fi
  rsync -a "$DEPLOYMENT_SOURCE/" "$DEPLOYMENT_TARGET/"
  exitWithMessageOnError "Rsync failed to sync files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
fi

# 2. Select Node version
selectNodeVersion

# 3. Installing node_modules with --production flag
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  echo "Running $NPM_CMD install --production --silent"
  eval $NPM_CMD install --production --silent --no-fund
  exitWithMessageOnError "Failed to install production npm dependencies"
fi

##################################################################################################################################
echo "Deployment of v$NEW_PACKAGE_VERSION was successful"

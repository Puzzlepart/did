#!/bin/bash

# ----------------------
# Did KUDU Deployment Script
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

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from the current environment."

# Setup
# - Installing kudusync
# - Installing npm v8.19.2
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

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

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --production --silent
  exitWithMessageOnError "Failed to install kudusync"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally, this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service, this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi

  echo "Installing npm v8.19.2"
  npm install -g npm@8.19.2
  exitWithMessageOnError "Failed to install npm v8.19.2"
fi

##################################################################################################################################
# Deployment
# ----------

echo Syncing Files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET

# 1. KuduSync
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then

  if [[ "$IGNORE_MANIFEST" -eq "1" ]]; then
    IGNORE_MANIFEST_PARAM=-x
  fi
  
  echo "Syncing files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
  "$KUDU_SYNC_CMD" -v 50 $IGNORE_MANIFEST_PARAM -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"
  exitWithMessageOnError "Kudu Sync failed"
fi

# 2. Installing node_modules with --production flag
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  echo "Running npm install --production"
  eval npm install --production
  exitWithMessageOnError "npm install with production flag failed"
  cd - > /dev/null
fi

##################################################################################################################################
echo "Deployment finished successfully."
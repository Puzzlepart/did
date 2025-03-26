#!/bin/bash

# ----------------------
# did deployment script
# Version: 1.0.0
# ----------------------

# Helpers
# -------

# Function to exit the script with an error message
exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Function to select node version to use
selectNodeVersion () {
  NODE_EXE=node
  NPM_CMD=npm
}

# Function to compare two version numbers
compare_versions() {
    local version1="$1"
    local version2="$2"

    IFS='.' read -ra ver1 <<< "$version1"
    IFS='.' read -ra ver2 <<< "$version2"

    for i in "${!ver1[@]}"; do
        if [[ ${ver1[i]} -lt ${ver2[i]} ]]; then
            echo "IS_OLDER"
            return
        elif [[ ${ver1[i]} -gt ${ver2[i]} ]]; then
            echo "IS_NEWER"
            return
        fi
    done

    echo "IS_SAME"
    return
}

# Prerequisites
# -------------

# Verify Node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing Node.js executable, please install Node.js, if already installed make sure it can be reached from the current environment."

# Setup
# -------------

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
# 3. Installing node_modules with npm install --omit=dev
# ----------

# Checks if package.json doesn't exist
if [ ! -e "$DEPLOYMENT_TARGET/package.json" ]; then
  echo "Cleaning of node_modules folder in $DEPLOYMENT_TARGET is temporarily disabled due to issues with deploy timeouts"
  else
  CURRENT_PACKAGE_VERSION=$(node -p -e "require('$DEPLOYMENT_TARGET/package.json').version")
  NEW_PACKAGE_VERSION=$(node -p -e "require('$DEPLOYMENT_SOURCE/package.json').version")
  COMPARE_VERSION_RESULT=$(compare_versions "$NEW_PACKAGE_VERSION" "$CURRENT_PACKAGE_VERSION")
  if [[ "$COMPARE_VERSION_RESULT" == "IS_NEWER" ]]; then
    echo "Cleaning of node_modules folder in $DEPLOYMENT_TARGET is temporarily disabled due to issues with deploy timeouts"
  fi
fi

# Checks if revision.txt exists in the $DEPLOYMENT_SOURCE folder
if [ -e "$DEPLOYMENT_SOURCE/revision.txt" ]; then
  CURRENT_REVISION=$(cat "$DEPLOYMENT_SOURCE/revision.txt")
fi

if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then

  if [[ "$IGNORE_MANIFEST" -eq "1" ]]; then
    IGNORE_MANIFEST_PARAM=-x
  fi
  echo "Syncing files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
  rsync -a --delete --force --exclude=node_modules/ "$DEPLOYMENT_SOURCE/" "$DEPLOYMENT_TARGET/"
  exitWithMessageOnError "Rsync failed to sync files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
fi

# Checks if revision.txt exists in the $DEPLOYMENT_TARGET folder
if [ -e "$DEPLOYMENT_TARGET/revision.txt" ]; then
  NEW_REVISION=$(cat "$DEPLOYMENT_TARGET/revision.txt")
fi

# 2. Select Node version
selectNodeVersion

# 3. Installing node_modules with npm install --omit=dev
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  echo "Running $NPM_CMD install --omit=dev --no-audit --no-fund"
  eval $NPM_CMD install --omit=dev --no-audit --no-fund
  exitWithMessageOnError "Failed to install production npm dependencies"
fi

##################################################################################################################################
echo "Deployment of v$NEW_PACKAGE_VERSION.$NEW_REVISION was successful"


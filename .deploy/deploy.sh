#!/bin/bash

# ----------------------
# Did Deployment Script
# Version: 0.0.1
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
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from the current environment."

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
# 3. Installing node_modules with --production flag
# ----------

# Checks if package.json doesn't exist
if [ ! -e "$DEPLOYMENT_TARGET/package.json" ]; then
  echo "package.json file doesn't exist in the $DEPLOYMENT_TARGET folder - cleaning node_modules folder"
  #rm -rf "$DEPLOYMENT_TARGET/node_modules"
  echo "Cleaning of node_modules folder in $DEPLOYMENT_TARGET is temporarily disabled due to issues with deploy timeouts"
  else
  CURRENT_PACKAGE_VERSION=$(node -p -e "require('$DEPLOYMENT_TARGET/package.json').version")
  NEW_PACKAGE_VERSION=$(node -p -e "require('$DEPLOYMENT_SOURCE/package.json').version")
  COMPARE_VERSION_RESULT=$(compare_versions "$NEW_PACKAGE_VERSION" "$CURRENT_PACKAGE_VERSION")
  if [[ "$COMPARE_VERSION_RESULT" == "IS_NEWER" ]]; then
    echo "Cleaning node_modules folder in $DEPLOYMENT_TARGET"
    #rm -rf "$DEPLOYMENT_TARGET/node_modules"
    echo "Cleaning of node_modules folder in $DEPLOYMENT_TARGET is temporarily disabled due to issues with deploy timeouts"
  fi
fi

if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then

  if [[ "$IGNORE_MANIFEST" -eq "1" ]]; then
    IGNORE_MANIFEST_PARAM=-x
  fi
  echo "Cleaning $DEPLOYMENT_TARGET folder"
  echo "- Deleting existing package-lock.json"
  rm -rf "$DEPLOYMENT_TARGET/package-lock.json"
  echo "- Deleting existing shared/ folder"
  rm -rf "$DEPLOYMENT_TARGET/shared"
  echo "- Deleting existing server/ folder"
  rm -rf "$DEPLOYMENT_TARGET/server"
  echo "Syncing files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
  rsync -a "$DEPLOYMENT_SOURCE/" "$DEPLOYMENT_TARGET/"
  exitWithMessageOnError "Rsync failed to sync files from $DEPLOYMENT_SOURCE to $DEPLOYMENT_TARGET"
fi

# 2. Select Node version
selectNodeVersion

# 3. Installing node_modules with --production flag
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  echo "Running $NPM_CMD install --production --silent"
  eval $NPM_CMD install --production --silent --no-fund --no-audit
  exitWithMessageOnError "Failed to install production npm dependencies"
fi

##################################################################################################################################
echo "Deployment of v$NEW_PACKAGE_VERSION was successful"

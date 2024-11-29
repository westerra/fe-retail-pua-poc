#!/bin/bash

# Little custom error helper
function fail { printf '%s\n' "$1" >&2; exit "${2-1}"
}

# Get the directory this script file is within ( will not work with symlinks )
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR" || fail "Failed To Locate Script Directory."

# Set up authentication to the Backbase Artifactory Registry
# Either as a node user if they exist ( assumes node container ) or the current user
cmd_prefix=""
nx="nx"
if [ -e "/home/node" ]; then
  cmd_prefix="runuser - node -c "
  nx="/home/node/global/bin/nx"
  echo "Detected Node Container.... Setting Up 'node' user account"
  chown -R node:node /home/node/app/
  $cmd_prefix 'npm --userconfig ~/.npmrc config set prefix "/home/node/global"'
fi

# Generate an auth token for the node users npmrc file
$cmd_prefix "npm --userconfig ~/.npmrc config set _auth='$(echo -n "$BB_USER:$BB_PASS" | base64)'"

echo "Installing 'nx' globally..."
$cmd_prefix "cd $DIR/westerra-retail; npm install -g nx"

echo "Installing dependencies from package-lock.json..."
$cmd_prefix "cd $DIR/westerra-retail; npm i"

echo "Starting Up Local Server..."
$cmd_prefix "cd $DIR/westerra-retail; export NODE_OPTIONS='--max-old-space-size=4096'; $nx run retail-usa:serve:local --host=0.0.0.0"
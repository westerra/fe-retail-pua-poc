#!/bin/bash

###############################################################################
##   A containerized Node 14 environment for running the Backbase Web App    ##
##
##  To use this containerized runner you'll need ....
##
##  1) To set the environment variables BB_USER and BB_PASS to the user and
##     password for that allows you to access 'https://repo.backbase.com'
##
##  2) You'll need to edit the src/proxy-ret-us-l.local.conf.js file and
##     change "localhost" to a qualified name that references the host
##     from the container. This is usually "host.docker.internal".
##     lookup how to set up host.docker.internal if you aren't sure!
##
##  3) Edit the src/apps/retail-usa/src/environments/environment.local.ts
##     file on line 32 to set the 'apiRoot' value to 'http://localhost:4200/api'
##

# Get the directory this script file is within ( will not work with symlinks )
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR" || fail "Failed To Locate Script Directory."

if [ "X$BB_USER" == "X" ]; then
  echo "Backbase Artifactory User Must Be In BB_USER Environment Variable!";
  exit 1;
fi

if [ "X$BB_PASS" == "X" ]; then
  echo "Backbase Artifactory Password Must Be In BB_PASS Environment Variable!";
  exit 1;
fi

# node:14 has Arm64 images......
if [[ $(arch) == "arm64" ]] && [[ "X$DOCKER_DEFAULT_PLATFORM" != "X" ]]; then
  echo "Detected Arm64 with Docker Default Platform Override... ";
  echo "  Removing override as node:14 images have arm64 native images";
  export DOCKER_DEFAULT_PLATFORM=""
fi

docker-compose -f run-in-container-compose.yml up

# Little custom error helper
function fail { printf '%s\n' "$1" >&2; exit "${2-1}"
}

#Open the web app in the browser: http://localhost:4200/.

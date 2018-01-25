#!/bin/sh

NAME=example-1 PORT=3000 USE_PATCH=0 node 1/index.js &
NAME=example-1-patched PORT=3001 USE_PATCH=1 node 1/index.js &
NAME=example-2 PORT=3002 USE_PATCH=0 node 2/index.js &
NAME=example-2-patched PORT=3003 USE_PATCH=1 node 2/index.js &
NAME=example-3 PORT=3004 USE_PATCH=0 node 3/index.js &
NAME=example-3-patched PORT=3005 USE_PATCH=1 node 3/index.js &

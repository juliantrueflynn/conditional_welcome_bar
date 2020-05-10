#!/usr/bin/env bash

PACKS_DIR="public/packs"
NODE_BIN_DIR="node_modules/.bin"
STATS_FILE="${PACKS_DIR}/stats.json"

export BUNDLE_ANALYZE=1

cd "$(dirname $(dirname "${BASH_SOURCE[0]}"))"
echo $PWD
mkdir -p $PACKS_DIR
${NODE_BIN_DIR}/webpack --config config/webpack/production.js --profile --json > $STATS_FILE \
  && ${NODE_BIN_DIR}/webpack-bundle-analyzer $STATS_FILE

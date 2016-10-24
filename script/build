#!/usr/bin/env bash

rm -rf lib/
export NODE_ENV=production
babel src --out-dir lib
webpack --progress -p \
  --display-error-details

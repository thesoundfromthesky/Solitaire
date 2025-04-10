#!/usr/bin/env bash

npm run gh-pages -- --dist dist/apps/solitaire --before-add $(dirname $0)/cleanup.js

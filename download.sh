#!/bin/sh

./scripts/download-locations.sh | ./scripts/convert-to-geojson.js > metro-perth-geojson.json

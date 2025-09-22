#!/bin/bash

# MongoDB data import script for did development
# This script imports JSON data files from the /data directory

set -euo pipefail

DATA_DIR="/docker-entrypoint-initdb.d/data"

echo "Checking for data files to import..."

# Wait for MongoDB to be ready
until mongosh --eval "print('MongoDB is ready')" > /dev/null 2>&1; do
    echo "Waiting for MongoDB to start..."
    sleep 2
done

shopt -s nullglob

# Warn and skip JSON files placed directly under DATA_DIR
root_files=("$DATA_DIR"/*.json)
if [ ${#root_files[@]} -gt 0 ]; then
    echo "Ignoring JSON files at $DATA_DIR root. Place files inside database-named subdirectories."
fi

db_dirs=("$DATA_DIR"/*/)

if [ ${#db_dirs[@]} -eq 0 ]; then
    echo "No database directories found in $DATA_DIR. Skipping import."
    exit 0
fi

for dir in "${db_dirs[@]}"; do
    dbname="$(basename "$dir")"
    files=("$dir"*.json)

    if [ ${#files[@]} -eq 0 ]; then
        echo "No JSON files found in $dir. Skipping."
        continue
    fi

    for file in "${files[@]}"; do
        collection="$(basename "$file" .json)"
        echo "Importing $file into $dbname.$collection ..."
        if mongoimport --db="$dbname" --collection="$collection" --file="$file"; then
            echo "Successfully imported $dbname.$collection"
        else
            echo "Failed to import $dbname.$collection"
        fi
    done
done

echo "MongoDB data import completed!"

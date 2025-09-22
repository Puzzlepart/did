#!/bin/bash

# MongoDB data import script for did development
# This script imports JSON data files from the /data directory

DATA_DIR="/docker-entrypoint-initdb.d/data"

echo "Checking for data files to import..."

# Wait for MongoDB to be ready
until mongosh --eval "print('MongoDB is ready')" > /dev/null 2>&1; do
    echo "Waiting for MongoDB to start..."
    sleep 2
done

# Recursively import all JSON files in subfolders
find "$DATA_DIR" -type f -name '*.json' | while read -r file; do
    # Get database and collection from path
    relpath="${file#$DATA_DIR/}"
    dbname="${relpath%%/*}"
    collection="$(basename "$file" .json)"

    if [ -n "$dbname" ] && [ -n "$collection" ]; then
        echo "Importing $file into $dbname.$collection ..."
        mongoimport --db="$dbname" --collection="$collection" --file="$file"
        if [ $? -eq 0 ]; then
            echo "Successfully imported $dbname.$collection"
        else
            echo "Failed to import $dbname.$collection"
        fi
    fi
done

echo "MongoDB recursive data import completed!"
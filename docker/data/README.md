# MongoDB Data Import

This folder contains JSON files exported from production using `mongoexport` for development database seeding.

## Usage

Place your exported JSON files in subfolders named after the target database. Use the following convention:
- `[database-name]/[collection-name].json` — The JSON file will be imported into the `[collection-name]` collection of the `[database-name]` database.

For example:
- `craycon/users.json` — Imported to the `users` collection in the `craycon` database
- `craycon/projects.json` — Imported to the `projects` collection in the `craycon` database
- `craycon/customers.json` — Imported to the `customers` collection in the `craycon` database
- `craycon/timeentries.json` — Imported to the `timeentries` collection in the `craycon` database

This structure helps organize data for multiple databases and ensures clarity when importing.

## Exporting from Production

Use `mongoexport` to create the JSON files:

```bash
# Export users collection
mongoexport --uri="mongodb+srv://user:pass@cluster.mongodb.net/database" --collection=users --out=users.json

# Export projects collection
mongoexport --uri="mongodb+srv://user:pass@cluster.mongodb.net/database" --collection=projects --out=projects.json

# Export customers collection
mongoexport --uri="mongodb+srv://user:pass@cluster.mongodb.net/database" --collection=customers --out=customers.json

# Export time entries (optionally with query to limit data)
mongoexport --uri="mongodb+srv://user:pass@cluster.mongodb.net/database" --collection=timeentries --query='{"date":{"$gte":{"$date":"2024-01-01T00:00:00.000Z"}}}' --out=timeentries.json
```

## Security Note

**Important**: This folder is gitignored to prevent sensitive production data from being committed to the repository.
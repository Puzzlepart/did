# MongoDB Data Import

This folder contains JSON files exported from production using `mongoexport` for development database seeding.

## Usage

Place your exported JSON files here with the naming convention:
- `[collection-name].json` - Will be imported to the `[collection-name]` collection

For example:
- `users.json` - Imported to `users` collection
- `projects.json` - Imported to `projects` collection
- `customers.json` - Imported to `customers` collection
- `timeentries.json` - Imported to `timeentries` collection

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
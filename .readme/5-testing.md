## Testing

To run all tests:

```bash
npm test
```

Tests are written in TypeScript and run with [AVA](https://github.com/avajs/ava). The current configuration uses CommonJS via `ts-node/register` to avoid ESM require cycle issues. If you migrate to full ESM, update the AVA config and ensure no circular imports.

## ➤ Release Process

1. Bump the version:
	```bash
	npm run update:version
	```
2. Add/update changelog fragment in `.changelog/` (see `.changelog/CHANGELOG.md` for structure).
3. Tag the release:
	```bash
	npm run tag
	```
4. Commit changes using the commit helper:
	```bash
	npm run commit
	```
5. Deploy to dev/staging/production as described above.
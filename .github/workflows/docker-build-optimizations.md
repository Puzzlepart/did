# Additional Docker Build Optimizations

## Further improvements to consider:

### 1. Build only on specific paths
Only trigger Docker builds when Docker-related files change:

```yaml
on:
  push:
    paths:
      - 'Dockerfile'
      - 'docker-compose*.yml'
      - '.dockerignore'
      - '.github/workflows/docker-build.yml'
      - 'client/**'
      - 'server/**'
      - 'shared/**'
      - 'package*.json'
    branches:
      - main
      - dev
```

### 2. Use npm cache from GitHub Actions cache
Replace the Docker cache mount with GitHub Actions cache for npm:

```yaml
- name: Cache npm dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

### 3. Pre-build client assets locally
Run `npm run package:client` locally and commit the built assets to skip webpack in Docker:
- Webpack: -160s
- But: Larger git repo

### 4. Separate build workflow for PRs
Create a lighter PR validation workflow that just lints/tests without Docker:

```yaml
# .github/workflows/pr-validation.yml
name: PR Validation
on:
  pull_request:
    branches: [main, dev]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

### 5. Only build Docker on main/dev pushes
Remove feat/* from Docker builds entirely - only build images when merging to main/dev.

### 6. Use smaller base image (distroless)
Replace `node:22-alpine` production image with gcr.io/distroless/nodejs22-debian12 for faster pulls.

### 7. Optimize webpack bundle
In webpack config, ensure:
- Production mode optimizations enabled
- Tree shaking working properly
- Code splitting configured
- Source maps disabled in production

### 8. Use pnpm instead of npm
pnpm is significantly faster for installs (~2-3x):
```dockerfile
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod
```

### 9. Parallel builds (experimental)
Split client and server builds into separate jobs, then combine in final stage.

# GitHub Actions Workflows

## Overview

This directory contains all GitHub Actions workflows for the **did** project.

## Workflows

### 🤖 automatic_chores.yml
**Trigger:** Push to `dev` branch (when specific paths change)

**Purpose:** Regenerates README.md and CHANGELOG.md from the `.readme/` and `.changelog/` blueprints

**Key Features:**
- Creates a PR instead of pushing directly to protected branch
- Auto-merges the PR
- Runs on file changes (docs sources, package metadata, or workflow itself)
- Skips if commit message contains `[skip-ci]`

> Lint/format are enforced via the `.githooks/pre-commit` hook and the `Test build` PR check, not by this workflow.

---

### 🚀 deploy-reusable.yml
**Type:** Reusable workflow

**Purpose:** DRY deployment pattern for Azure App Service deployments

**Used By:** `on_push_dev_deploy.yml` and `on_push_staging_deploy.yml`

**Inputs:**
- `environment` - Target environment (dev/staging)
- `slot-name` - Azure slot name
- `display-version-details` - Show version in package (0/1)

**Secrets:**
- `publish-profile` - Azure publish profile

---

### 🔧 on_push_dev_deploy.yml
**Trigger:** Push to `dev` branch (when source code changes)

**Purpose:** Build and deploy to **didapp/dev** slot

**Uses:** `deploy-reusable.yml` workflow

**Skips:** 
- `[skip-ci]` in commit message
- `[skip-deploy]` in commit message

---

### 🎯 on_push_staging_deploy.yml
**Trigger:** 
- Push to `main` branch
- Version tags (`v*`)

**Purpose:** Build and deploy to **didapp/staging** slot

**Uses:** `deploy-reusable.yml` workflow

---

### ✅ on_pr_test_build.yml
**Trigger:** Pull requests to `dev` or `main`

**Purpose:** Validates PRs with tests and builds (doesn't fix lint - that's handled by automatic_chores)

**Jobs:**
- `test` - Runs AVA test suite
- `build_client` - Validates client webpack build
- `build_server` - Validates server TypeScript compilation
- `status` - Aggregated status check for branch protection

**Key Features:**
- Parallel job execution for speed
- Uses `cache: 'npm'` for faster installs
- Standardized on actions@v4
- Doesn't push changes (leaves that to automatic_chores)

---

### 🐳 docker-build.yml
**Trigger:** Manual (`workflow_dispatch`)

**Purpose:** On-demand Docker image builds published to GitHub Container Registry

**Features:**
- Builds for `linux/amd64` (single arch; see `../../docs/docker-build-optimizations.md` for the queue of further improvements, including arm64)
- Publishes to GitHub Container Registry (ghcr.io)
- Layer caching with GitHub Actions cache
- Metadata tagging with git info

> Note: this workflow is intentionally manual. Auto-publishing on every push to `main`/`dev` would be expensive and is not currently desired. Trigger from the Actions tab when you need a fresh image.

---

## Workflow Improvements Applied

### ✅ DRY Principle
- Created `deploy-reusable.yml` to eliminate duplication between dev/staging deploys
- Reduced deployment workflows from ~60 lines each to ~20 lines

### ✅ Protected Branch Compliance
- `automatic_chores` now creates PRs instead of pushing directly
- Auto-approves and auto-merges to respect branch protection rules

### ✅ Removed Redundancy
- Eliminated duplicate `npm ci` commands in PR workflow
- Removed unused `setup` job that wasn't properly caching
- Removed lint job from PR workflow (handled by automatic_chores)

### ✅ Standardization
- All workflows pinned to current major: `actions/*@v5`, `azure/webapps-deploy@v3` (Node 24 compatible)
- Consistent Node.js setup pattern across all jobs
- Standardized on `cache: 'npm'` for faster dependency installs

### ✅ Performance
- PR jobs run in parallel (test, build_client, build_server)
- Each job manages its own cache efficiently
- Proper concurrency groups to cancel outdated runs

---

## Recommended Branch Protection Settings

For `dev` branch:
- ✅ Require status check "Test build" (the aggregated status job)
- ✅ Allow auto-merge
- ✅ Allow GitHub Actions to bypass (or set required approvals to 0)

---

## Common Patterns

### Node.js Setup Pattern
```yaml
- uses: actions/checkout@v5
- name: Use Node.js (${{ vars.NODE_VERSION }})
  uses: actions/setup-node@v5
  with:
    node-version: ${{ vars.NODE_VERSION }}
    cache: 'npm'
- run: npm ci --no-audit --no-fund --loglevel=error
```

### Skip CI Pattern
- Push workflows: Use `[skip-ci]` in commit message
- Deploy workflows: Use `[skip-ci]` or `[skip-deploy]`
- PR workflows: Always run (can't be skipped - validation required)

---

## Environment Variables

Set in repository settings under Variables:
- `NODE_VERSION` - Node.js version (e.g., "22")

## Secrets

Required repository secrets:
- `DIDAPP_DEV_PUBLISH_PROFILE` - Azure publish profile for dev slot
- `DIDAPP_STAGING_PUBLISH_PROFILE` - Azure publish profile for staging slot
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- `CI_BOT_TOKEN` - Bot PAT used for auto-approve/auto-merge in automatic_chores

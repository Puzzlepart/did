# DID Skill & CLI Design Spec

## Overview

Two deliverables that give DID users a faster way to submit hours and query time data:

1. **`did-cli`** - A standalone zsh CLI wrapping DID's GraphQL API
2. **`/did` skill** - A Claude Code skill (shipped in the DID repo) that translates natural language into `did-cli` commands

## Problem

Submitting hours and checking time data requires opening the DID web app, navigating to the right page, and clicking through the UI. For power users already in the terminal, this is friction. A CLI + Claude Code skill lets them do it without leaving their workflow.

## Architecture

```
User (natural language)
  |
  v
/did skill (Claude Code)
  |  interprets intent, builds command
  v
did-cli (zsh, in PATH)
  |  GraphQL over HTTPS, cookie auth
  v
DID GraphQL API (did.crayonconsulting.no/graphql)
```

## Component 1: `did-cli`

### Location

`~/Code/CLI/did-cli/` - alongside `get-token`, same pattern.

### Structure

```
did-cli/
├── did-cli.zsh          # Main script
├── .env.sample          # Template (url, cookie)
├── .env                 # User config (gitignored)
├── queries/             # GraphQL query files
│   ├── report.graphql
│   ├── submit-period.graphql
│   ├── status.graphql
│   └── timesheet.graphql
├── add-to-path.sh       # PATH helper
└── README.md
```

### Auth

- DID API: `didapp` session cookie stored in `.env`
- Configured via `did-cli config`

### Commands

#### `did-cli report`

Query hours with flexible filters. Uses the `report` GraphQL query.

```bash
did-cli report --customer "Crayon" --from 2026-01 --to 2026-03
did-cli report --project "Alpha" --week 15
did-cli report --from 2026-03 --to 2026-03   # all hours in March
```

**Flags:**
- `--customer <name>` - filter by customer name (maps to `customerNames`)
- `--project <name>` - filter by project name (maps to `projectNames`)
- `--from <date>` - start date. Accepts `YYYY-MM-DD` (specific day) or `YYYY-MM` (first of month). Defaults to start of current month if omitted.
- `--to <date>` - end date. Same formats. Defaults to today if omitted.
- `--week <number>` - ISO week number
- `--year <number>` - year (defaults to current)
- `--pretty` - human-readable table output (default: JSON)

**GraphQL mapping:**
- Query: `report`
- Input: `ReportsQuery` with fields `customerNames`, `projectNames`, `startDateTime`, `endDateTime`, `week`, `year`

#### `did-cli submit`

Submit/confirm a timesheet period. Uses the `submitPeriod` mutation.

```bash
did-cli submit --period current
did-cli submit --week 15 --year 2026
```

**Flow:**
1. Fetches the period data via `timesheet` query
2. Prints a summary (hours, matched events count)
3. Requires `--confirm` flag or interactive y/n prompt
4. Calls `submitPeriod` mutation

**Flags:**
- `--period current` - submit the current unconfirmed period
- `--week <number>` - specific week
- `--year <number>` - year (defaults to current)
- `--confirm` - skip interactive prompt (for scripting)

**GraphQL mapping:**
- Read: `timesheet` query (to get period details)
- Write: `submitPeriod` mutation (with `TimesheetPeriodInput`)

#### `did-cli status`

Show current period summary, time bank balance, and vacation days.

```bash
did-cli status
did-cli status --pretty
```

**Returns:**
- Current period: submitted/unsubmitted, total hours, event count
- Time bank balance (from `currentUser.timebank.balance`)
- Vacation summary (from `vacation` query: total, used, remaining)

**GraphQL mapping:**
- `timesheet` query (current period)
- `currentUser` query (time bank)
- `vacation` query (vacation days)

### Configuration

Via `.env` file (auto-created from `.env.sample` on first run):

```env
DID_URL=did.crayonconsulting.no
DID_COOKIE=<didapp session cookie value>
```

Setup command:
```bash
did-cli config --url did.crayonconsulting.no --cookie "eyJ..."
```

### Output

- Default: JSON to stdout (machine-readable for the skill)
- `--pretty`: human-readable formatted output
- Errors: JSON with `error` field, non-zero exit code

### Error handling

- 401/expired cookie: exit 1, message "Session expired. Update your cookie with: did-cli config --cookie <value>"
- Network errors: exit 1, message with details
- No matching data: exit 0, empty result set

## Component 2: `/did` Claude Code Skill

### Location

Shipped in the DID repo. Exact path TBD (e.g. `skills/did.md` or similar, depending on project convention).

### Trigger

User intent related to timesheet operations: "submit my hours", "how many hours on X", "time bank balance", "week status", etc.

### Behavior by intent

| User says | Skill does |
|-----------|-----------|
| "submit my hours" | Runs `did-cli status` to show current period, then `did-cli submit --period current --confirm` after user confirmation |
| "how many hours on Crayon in Q1" | Runs `did-cli report --customer Crayon --from 2026-01 --to 2026-03`, summarizes flexibly |
| "what's my time bank" | Runs `did-cli status`, extracts and presents balance |
| "hours last week" | Runs `did-cli report --week <N> --year <Y>`, summarizes |
| "break down March by project" | Runs `did-cli report --from 2026-03 --to 2026-03`, groups response by project |

### Safety

- **Submit**: always shows summary and asks for user confirmation before executing
- **Queries**: read-only, no confirmation gate

### Prerequisites check

On invocation, the skill verifies:
1. `did-cli` is in PATH
2. `did-cli` is configured (has a valid `.env`)

If not, walks the user through setup.

### Ambiguous queries

When the user's request is ambiguous (e.g. "hours on Alpha" but multiple customers have a project called Alpha), the skill runs `did-cli report` with available filters and asks the user to clarify, potentially using `reportFilterOptions` query data.

## Configuration

### DID instance

Base URL is configurable, defaults to `did.crayonconsulting.no`. Stored in `did-cli`'s `.env`.

### Dependencies

- `did-cli` in PATH
- `curl` (HTTP requests)
- `jq` (JSON parsing)
- Valid `didapp` session cookie

## Out of scope for v1

- Calendar event editing (separate `/did-calendar` skill)
- Personal access tokens for DID (replaces cookie auth, future)
- Automatic cookie refresh
- Remote/headless environment support
- Graph API integration (belongs to calendar skill)

## GraphQL API Reference

### Queries used

- **`report`** - time entries with filters (`customerNames`, `projectNames`, `startDateTime`, `endDateTime`, `week`, `year`, etc.)
- **`reportFilterOptions`** - available filter values (customer names, project names, etc.)
- **`timesheet`** - period data (`startDate`, `endDate`, locale/timezone options)
- **`currentUser`** - user profile including `timebank.balance`
- **`vacation`** - vacation summary (total, used, remaining)

### Mutations used

- **`submitPeriod`** - confirm a timesheet period (takes `TimesheetPeriodInput` + `TimesheetOptions`)
- **`unsubmitPeriod`** - unconfirm a period (same args)

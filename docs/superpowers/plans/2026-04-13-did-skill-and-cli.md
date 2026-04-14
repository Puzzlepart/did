# DID Skill & CLI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `did-cli` zsh tool wrapping DID's GraphQL API, plus a `/did` Claude Code skill in the DID repo that translates natural language into `did-cli` commands.

**Architecture:** Two components - (1) `did-cli` is a zsh script mirroring the `get-token` CLI pattern (`.env` config, color-coded stderr logging, JSON stdout, symlink-based PATH install). It makes authenticated GraphQL requests to DID using a session cookie. (2) The `/did` skill interprets user intent, maps it to `did-cli` commands, runs them via Bash, and formats results.

**Tech Stack:** zsh, curl, jq, GraphQL over HTTPS, Claude Code skill (markdown)

---

## File Structure

### did-cli (`~/Code/CLI/did-cli/`)

| File | Responsibility |
|------|---------------|
| `did-cli.zsh` | Main script: arg parsing, .env loading, GraphQL request execution, output formatting |
| `.env.sample` | Template config with `DID_URL` and `DID_COOKIE` |
| `queries/report.graphql` | Report query with full filter support |
| `queries/timesheet.graphql` | Timesheet period query |
| `queries/submit-period.graphql` | Submit period mutation |
| `queries/status.graphql` | Combined status queries (currentUser + vacation) |
| `queries/filter-options.graphql` | Report filter options query |
| `add-to-path.sh` | Symlink installer to `/usr/local/bin/did-cli` |
| `README.md` | Usage docs |

### /did skill (`/Users/damsleth/Code/PZL/did/`)

| File | Responsibility |
|------|---------------|
| `skills/did.md` | Claude Code skill definition |

---

### Task 1: Scaffold did-cli with .env and core utilities

**Files:**
- Create: `~/Code/CLI/did-cli/did-cli.zsh`
- Create: `~/Code/CLI/did-cli/.env.sample`
- Create: `~/Code/CLI/did-cli/.gitignore`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p ~/Code/CLI/did-cli/queries
```

- [ ] **Step 2: Create .env.sample**

Write to `~/Code/CLI/did-cli/.env.sample`:

```bash
# did-cli configuration
# [REQ] DID instance URL (without protocol)
DID_URL=did.crayonconsulting.no

# [REQ] Session cookie value from browser (cookie name: "didapp")
DID_COOKIE=""

# [OPT] Debug output (0=off, 1=on)
debug=0
```

- [ ] **Step 3: Create .gitignore**

Write to `~/Code/CLI/did-cli/.gitignore`:

```
.env
```

- [ ] **Step 4: Create did-cli.zsh with core structure**

Write to `~/Code/CLI/did-cli/did-cli.zsh`:

```zsh
#!/bin/zsh

# Resolve script directory (symlink-safe)
SCRIPT_DIR="${0:A:h}"
cd "$SCRIPT_DIR"

# --- .env loading ---
if [ ! -f .env ]; then
  if [ -f .env.sample ]; then
    if cp .env.sample .env 2>/dev/null; then
      print -P "%F{yellow}Created .env from .env.sample. Set DID_COOKIE then re-run.%f" >&2
      exit 2
    fi
  fi
  print -P "%F{red}ERROR: .env not found. Copy .env.sample to .env and configure it.%f" >&2
  exit 1
fi
source .env

# --- Defaults ---
: ${debug:=0}
: ${DID_URL:=did.crayonconsulting.no}

# --- Logging ---
debug_log() { [[ "$debug" -eq 1 ]] && print -P "%F{green}DEBUG: $1%f" >&2 }
error_log() { print -P "%F{red}ERROR: $1%f" >&2 }
info_log()  { print -P "%F{cyan}$1%f" >&2 }

# --- Dependency check ---
check_dep() {
  if ! command -v "$1" &>/dev/null; then
    error_log "Required command '$1' not found."
    exit 1
  fi
}
check_dep curl
check_dep jq

# --- Cookie validation ---
if [[ -z "$DID_COOKIE" ]]; then
  error_log "DID_COOKIE not set. Get the 'didapp' cookie from your browser and add it to .env"
  exit 1
fi

# --- GraphQL helper ---
gql_request() {
  local query_file="$1"
  local variables="$2"
  local query
  query=$(<"$SCRIPT_DIR/queries/$query_file")

  local body
  body=$(jq -n --arg q "$query" --argjson v "${variables:-null}" '{ query: $q, variables: $v }')

  debug_log "POST https://$DID_URL/graphql ($query_file)"

  local response
  response=$(curl -s -w "\n%{http_code}" \
    -X POST "https://$DID_URL/graphql" \
    -H "Content-Type: application/json" \
    -H "Cookie: didapp=$DID_COOKIE" \
    -d "$body")

  local http_code
  http_code=$(echo "$response" | tail -1)
  local body_response
  body_response=$(echo "$response" | sed '$d')

  if [[ "$http_code" == "401" ]]; then
    error_log "Session expired (401). Update your cookie: did-cli config --cookie <value>"
    exit 1
  fi

  if [[ "$http_code" != "200" ]]; then
    error_log "HTTP $http_code from DID API"
    debug_log "$body_response"
    exit 1
  fi

  local gql_errors
  gql_errors=$(echo "$body_response" | jq -r '.errors // empty')
  if [[ -n "$gql_errors" ]]; then
    error_log "GraphQL error: $(echo "$body_response" | jq -r '.errors[0].message')"
    exit 1
  fi

  echo "$body_response" | jq '.data'
}

# --- Date helpers ---
current_year() { date +%Y }
current_week() { date +%V | sed 's/^0//' }
current_month() { date +%m | sed 's/^0//' }
first_of_month() { date +%Y-%m-01 }
today() { date +%Y-%m-%d }

# Normalize date input: YYYY-MM -> YYYY-MM-01, YYYY-MM-DD -> as-is
normalize_date() {
  local d="$1"
  if [[ "$d" =~ ^[0-9]{4}-[0-9]{2}$ ]]; then
    echo "${d}-01"
  else
    echo "$d"
  fi
}

# End-of-month for YYYY-MM input, otherwise return as-is
normalize_end_date() {
  local d="$1"
  if [[ "$d" =~ ^[0-9]{4}-[0-9]{2}$ ]]; then
    # Last day of that month
    local year="${d:0:4}"
    local month="${d:5:2}"
    date -j -f "%Y-%m-%d" "${year}-${month}-01" +%Y-%m-%d 2>/dev/null | \
      xargs -I{} date -j -v+1m -v-1d -f "%Y-%m-%d" {} +%Y-%m-%d
  else
    echo "$d"
  fi
}

# --- Pretty formatting ---
format_hours() {
  local json="$1"
  echo "$json" | jq -r '
    def pad(n): tostring | if length < n then . + (" " * (n - length)) else . end;
    (map(.duration) | add // 0) as $total |
    "Customer            Project             Hours",
    "---                 ---                 ---",
    (.[] | "\(.customer.name | pad(20))\(.project.name | pad(20))\(.duration)"),
    "",
    "Total: \($total) hours"
  '
}

# --- Subcommands ---

cmd_status() {
  info_log "Fetching status from $DID_URL..."
  local data
  data=$(gql_request "status.graphql" '{}')

  local pretty="${1:-0}"
  if [[ "$pretty" -eq 1 ]]; then
    local balance
    balance=$(echo "$data" | jq -r '.user.timebank.balance // "N/A"')
    local vacation_total vacation_used vacation_remaining
    vacation_total=$(echo "$data" | jq -r '.vacation.total // "N/A"')
    vacation_used=$(echo "$data" | jq -r '.vacation.used // "N/A"')
    vacation_remaining=$(echo "$data" | jq -r '.vacation.remaining // "N/A"')
    local display_name
    display_name=$(echo "$data" | jq -r '.user.displayName // "Unknown"')

    print -P "%F{white}Status for %F{cyan}$display_name%f" >&2
    print -P "%F{white}Time bank balance: %F{cyan}${balance}h%f" >&2
    print -P "%F{white}Vacation: %F{cyan}${vacation_used}%f/%F{cyan}${vacation_total}%f days used, %F{cyan}${vacation_remaining}%f remaining" >&2
  else
    echo "$data"
  fi
}

cmd_report() {
  local customer="" project="" from="" to="" week="" year="" pretty=0

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --customer)  customer="$2"; shift 2 ;;
      --project)   project="$2"; shift 2 ;;
      --from)      from="$2"; shift 2 ;;
      --to)        to="$2"; shift 2 ;;
      --week)      week="$2"; shift 2 ;;
      --year)      year="$2"; shift 2 ;;
      --pretty)    pretty=1; shift ;;
      *) error_log "Unknown flag: $1"; exit 1 ;;
    esac
  done

  # Build variables JSON
  local vars='{}'

  if [[ -n "$customer" ]]; then
    vars=$(echo "$vars" | jq --arg c "$customer" '. + { query: (.query // {} | . + { customerNames: [$c] }) }')
  fi
  if [[ -n "$project" ]]; then
    vars=$(echo "$vars" | jq --arg p "$project" '. + { query: (.query // {} | . + { projectNames: [$p] }) }')
  fi
  if [[ -n "$from" ]]; then
    local norm_from
    norm_from=$(normalize_date "$from")
    vars=$(echo "$vars" | jq --arg d "$norm_from" '. + { query: (.query // {} | . + { startDateTime: $d }) }')
  fi
  if [[ -n "$to" ]]; then
    local norm_to
    norm_to=$(normalize_end_date "$to")
    vars=$(echo "$vars" | jq --arg d "$norm_to" '. + { query: (.query // {} | . + { endDateTime: $d }) }')
  fi
  if [[ -n "$week" ]]; then
    vars=$(echo "$vars" | jq --argjson w "$week" '. + { query: (.query // {} | . + { week: $w }) }')
  fi
  if [[ -n "$year" ]]; then
    vars=$(echo "$vars" | jq --argjson y "$year" '. + { query: (.query // {} | . + { year: $y }) }')
  fi

  # Default date range if nothing specified: current month
  if [[ -z "$from" && -z "$to" && -z "$week" ]]; then
    local default_from default_to
    default_from=$(first_of_month)
    default_to=$(today)
    vars=$(echo "$vars" | jq --arg f "$default_from" --arg t "$default_to" \
      '. + { query: (.query // {} | . + { startDateTime: $f, endDateTime: $t }) }')
  fi

  info_log "Querying hours from $DID_URL..."
  local data
  data=$(gql_request "report.graphql" "$vars")

  if [[ "$pretty" -eq 1 ]]; then
    echo "$data" | jq '.timeEntries' | format_hours /dev/stdin
  else
    echo "$data"
  fi
}

cmd_submit() {
  local week="" year="" confirm=0

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --period)
        if [[ "$2" == "current" ]]; then
          week=$(current_week)
          year=$(current_year)
        fi
        shift 2 ;;
      --week)    week="$2"; shift 2 ;;
      --year)    year="$2"; shift 2 ;;
      --confirm) confirm=1; shift ;;
      *) error_log "Unknown flag: $1"; exit 1 ;;
    esac
  done

  : ${week:=$(current_week)}
  : ${year:=$(current_year)}

  # Calculate start/end dates for the ISO week
  # macOS date: get Monday of the given ISO week
  local start_date end_date
  start_date=$(python3 -c "from datetime import datetime, timedelta; d = datetime.strptime(f'${year}-W${week}-1', '%G-W%V-%u'); print(d.strftime('%Y-%m-%d'))")
  end_date=$(python3 -c "from datetime import datetime, timedelta; d = datetime.strptime(f'${year}-W${week}-1', '%G-W%V-%u') + timedelta(days=6); print(d.strftime('%Y-%m-%d'))")

  debug_log "Fetching timesheet for week $week/$year ($start_date to $end_date)"

  # Fetch the timesheet period
  local tz_offset
  tz_offset=$(date +%z | sed 's/\([+-]\)\(.\)/\1/' | awk '{printf "%d", $1 * 60}')
  # Simpler: just use minutes offset
  tz_offset=$(python3 -c "import time; print(-time.timezone // 60 if time.daylight == 0 else -time.altzone // 60)")

  local ts_vars
  ts_vars=$(jq -n \
    --arg sd "$start_date" \
    --arg ed "$end_date" \
    --argjson tz "$tz_offset" \
    '{
      query: { startDate: $sd, endDate: $ed },
      options: { locale: "nb", dateFormat: "DD.MM.YYYY", tzOffset: $tz }
    }')

  local ts_data
  ts_data=$(gql_request "timesheet.graphql" "$ts_vars")

  # Find the matching period
  local period
  period=$(echo "$ts_data" | jq --argjson w "$week" '.periods[] | select(.week == $w)')

  if [[ -z "$period" || "$period" == "null" ]]; then
    error_log "No period found for week $week/$year"
    exit 1
  fi

  local is_confirmed
  is_confirmed=$(echo "$period" | jq -r '.isConfirmed')
  if [[ "$is_confirmed" == "true" ]]; then
    info_log "Week $week/$year is already submitted."
    exit 0
  fi

  # Show summary
  local event_count total_hours period_id period_start period_end
  event_count=$(echo "$period" | jq '.events | length')
  total_hours=$(echo "$period" | jq '[.events[].duration] | add // 0')
  period_id=$(echo "$period" | jq -r '.id')
  period_start=$(echo "$period" | jq -r '.startDate')
  period_end=$(echo "$period" | jq -r '.endDate')

  info_log "Week $week/$year: $event_count events, ${total_hours}h total"
  info_log "Period: $period_start to $period_end"

  if [[ "$confirm" -eq 0 ]]; then
    print -P -n "%F{yellow}Submit this period? (y/N): %f" >&2
    read -r answer
    if [[ "$answer" != "y" && "$answer" != "Y" ]]; then
      info_log "Aborted."
      exit 0
    fi
  fi

  # Build matched events for submission
  local matched_events
  matched_events=$(echo "$period" | jq '[.events[] | select(.project != null) | {
    id: .id,
    projectId: .project.tag,
    manualMatch: false,
    duration: .duration,
    originalDuration: .originalDuration,
    adjustedMinutes: .adjustedMinutes
  }]')

  local forecasted_hours
  forecasted_hours=$(echo "$period" | jq '.forecastedHours // 0')

  local submit_vars
  submit_vars=$(jq -n \
    --arg id "$period_id" \
    --arg sd "$period_start" \
    --arg ed "$period_end" \
    --argjson events "$matched_events" \
    --argjson fh "$forecasted_hours" \
    --argjson tz "$tz_offset" \
    '{
      period: {
        id: $id,
        startDate: $sd,
        endDate: $ed,
        matchedEvents: $events,
        forecastedHours: $fh
      },
      options: { locale: "nb", dateFormat: "DD.MM.YYYY", tzOffset: $tz }
    }')

  local result
  result=$(gql_request "submit-period.graphql" "$submit_vars")

  local success
  success=$(echo "$result" | jq -r '.result.success')
  if [[ "$success" == "true" ]]; then
    info_log "Week $week/$year submitted successfully!"
    echo "$result"
  else
    local err_msg
    err_msg=$(echo "$result" | jq -r '.result.error.message // "Unknown error"')
    error_log "Submission failed: $err_msg"
    exit 1
  fi
}

cmd_config() {
  local url="" cookie=""

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --url)    url="$2"; shift 2 ;;
      --cookie) cookie="$2"; shift 2 ;;
      *) error_log "Unknown flag: $1"; exit 1 ;;
    esac
  done

  if [[ -n "$url" ]]; then
    if [[ -f .env ]]; then
      sed -i '' "s|^DID_URL=.*|DID_URL=$url|" .env
    fi
    info_log "DID_URL set to $url"
  fi

  if [[ -n "$cookie" ]]; then
    if [[ -f .env ]]; then
      sed -i '' "s|^DID_COOKIE=.*|DID_COOKIE=$cookie|" .env
    fi
    info_log "DID_COOKIE updated"
  fi

  if [[ -z "$url" && -z "$cookie" ]]; then
    info_log "Current config:"
    info_log "  DID_URL=$DID_URL"
    info_log "  DID_COOKIE=$(echo "$DID_COOKIE" | cut -c1-20)..."
  fi
}

cmd_help() {
  cat >&2 <<'HELP'
did-cli - Command-line interface for DID timesheet

Usage: did-cli <command> [options]

Commands:
  status              Show current period, time bank, and vacation
  report              Query hours with filters
  submit              Submit a timesheet period
  config              View or update configuration
  help                Show this help

Report options:
  --customer <name>   Filter by customer name
  --project <name>    Filter by project name
  --from <date>       Start date (YYYY-MM-DD or YYYY-MM)
  --to <date>         End date (YYYY-MM-DD or YYYY-MM)
  --week <number>     ISO week number
  --year <number>     Year (default: current)
  --pretty            Human-readable output (default: JSON)

Submit options:
  --period current    Submit the current open period
  --week <number>     Specific week to submit
  --year <number>     Year (default: current)
  --confirm           Skip interactive prompt

Config options:
  --url <hostname>    Set DID instance URL
  --cookie <value>    Set didapp session cookie

Examples:
  did-cli status --pretty
  did-cli report --customer "Crayon" --from 2026-01 --to 2026-03 --pretty
  did-cli report --week 15 --pretty
  did-cli submit --period current
  did-cli config --cookie "eyJ..."
HELP
}

# --- Main dispatch ---
case "${1:-help}" in
  status)  shift; cmd_status "${@}" ;;
  report)  shift; cmd_report "$@" ;;
  submit)  shift; cmd_submit "$@" ;;
  config)  shift; cmd_config "$@" ;;
  help|--help|-h) cmd_help ;;
  *) error_log "Unknown command: $1. Run 'did-cli help' for usage."; exit 1 ;;
esac
```

- [ ] **Step 5: Make executable and commit**

```bash
chmod +x ~/Code/CLI/did-cli/did-cli.zsh
cd ~/Code/CLI/did-cli
git init
git add .env.sample .gitignore did-cli.zsh
git commit -m "feat: scaffold did-cli with core structure, .env, and all subcommands"
```

---

### Task 2: Create GraphQL query files

**Files:**
- Create: `~/Code/CLI/did-cli/queries/report.graphql`
- Create: `~/Code/CLI/did-cli/queries/timesheet.graphql`
- Create: `~/Code/CLI/did-cli/queries/submit-period.graphql`
- Create: `~/Code/CLI/did-cli/queries/status.graphql`
- Create: `~/Code/CLI/did-cli/queries/filter-options.graphql`

- [ ] **Step 1: Create report.graphql**

Write to `~/Code/CLI/did-cli/queries/report.graphql`:

```graphql
query CustomReport($query: ReportsQuery, $sortAsc: Boolean) {
  timeEntries: report(query: $query, sortAsc: $sortAsc, allowLarge: true) {
    title
    duration
    startDateTime
    endDateTime
    week
    month
    year
    customer {
      key
      name
    }
    project {
      tag
      name
      parent {
        tag
        name
      }
    }
    resource {
      id
    }
    role {
      name
      hourlyRate
    }
  }
}
```

- [ ] **Step 2: Create timesheet.graphql**

Write to `~/Code/CLI/did-cli/queries/timesheet.graphql`:

```graphql
query Timesheet($query: TimesheetQuery!, $options: TimesheetOptions!) {
  periods: timesheet(query: $query, options: $options) {
    id
    week
    month
    startDate
    endDate
    events {
      id
      title
      duration
      originalDuration
      adjustedMinutes
      startDateTime
      endDateTime
      date
      project {
        tag
        name
      }
      customer {
        key
        name
      }
    }
    isConfirmed
    isForecasted
    isForecast
    forecastedHours
  }
}
```

- [ ] **Step 3: Create submit-period.graphql**

Write to `~/Code/CLI/did-cli/queries/submit-period.graphql`:

```graphql
mutation SubmitPeriod($period: TimesheetPeriodInput!, $options: TimesheetOptions!) {
  result: submitPeriod(period: $period, options: $options) {
    success
    error {
      message
    }
  }
}
```

- [ ] **Step 4: Create status.graphql**

Write to `~/Code/CLI/did-cli/queries/status.graphql`:

```graphql
query Status {
  user: currentUser {
    id
    displayName
    mail
    timebank {
      balance
      lastUpdated
    }
  }
  vacation {
    total
    used
    usedHours
    remaining
  }
}
```

- [ ] **Step 5: Create filter-options.graphql**

Write to `~/Code/CLI/did-cli/queries/filter-options.graphql`:

```graphql
query FilterOptions($query: ReportsQuery) {
  filterOptions: reportFilterOptions(query: $query) {
    projectNames
    parentProjectNames
    customerNames
    partnerNames
    employeeNames
  }
}
```

- [ ] **Step 6: Commit**

```bash
cd ~/Code/CLI/did-cli
git add queries/
git commit -m "feat: add GraphQL query files for report, timesheet, submit, status, and filters"
```

---

### Task 3: Create add-to-path.sh and README

**Files:**
- Create: `~/Code/CLI/did-cli/add-to-path.sh`
- Create: `~/Code/CLI/did-cli/README.md`

- [ ] **Step 1: Create add-to-path.sh**

Write to `~/Code/CLI/did-cli/add-to-path.sh`:

```bash
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="/usr/local/bin/did-cli"

chmod +x "$SCRIPT_DIR/did-cli.zsh"

if [ -L "$TARGET" ] || [ -e "$TARGET" ]; then
  echo "'$TARGET' already exists. Overwrite? (y/N)"
  read -r answer
  [ "$answer" != "y" ] && echo "Aborted." && exit 1
  rm "$TARGET"
fi

ln -s "$SCRIPT_DIR/did-cli.zsh" "$TARGET"
echo "Linked $TARGET -> $SCRIPT_DIR/did-cli.zsh"
echo "Run 'did-cli help' to get started."
```

- [ ] **Step 2: Create README.md**

Write to `~/Code/CLI/did-cli/README.md`:

```markdown
# did-cli

Command-line interface for [DID](https://did.crayonconsulting.no) timesheet operations.

## Setup

1. Clone this repo
2. Run `./add-to-path.sh` to add `did-cli` to your PATH
3. Get your `didapp` session cookie from the browser (DevTools > Application > Cookies)
4. Configure: `did-cli config --cookie "your-cookie-value"`

### Configuration

```bash
did-cli config --url did.crayonconsulting.no  # set instance (default)
did-cli config --cookie "eyJ..."              # set session cookie
did-cli config                                # show current config
```

## Usage

### Check status

```bash
did-cli status --pretty
```

Shows time bank balance, vacation days, and user info.

### Query hours

```bash
did-cli report --customer "Crayon" --from 2026-01 --to 2026-03 --pretty
did-cli report --project "Alpha" --week 15 --pretty
did-cli report --from 2026-03 --pretty
```

### Submit hours

```bash
did-cli submit --period current        # submit current week
did-cli submit --week 15 --year 2026   # submit specific week
did-cli submit --period current --confirm  # skip prompt
```

## Output

Default output is JSON (for piping/scripting). Use `--pretty` for human-readable tables.

## Requirements

- zsh
- curl
- jq
- python3 (for ISO week date calculation)
```

- [ ] **Step 3: Make add-to-path.sh executable and commit**

```bash
cd ~/Code/CLI/did-cli
chmod +x add-to-path.sh
git add add-to-path.sh README.md
git commit -m "feat: add PATH installer and README"
```

---

### Task 4: Test did-cli manually

- [ ] **Step 1: Install to PATH**

```bash
cd ~/Code/CLI/did-cli
./add-to-path.sh
```

- [ ] **Step 2: Configure with a real cookie**

Get the `didapp` cookie value from the browser and run:

```bash
did-cli config --cookie "<paste cookie value>"
```

- [ ] **Step 3: Test status command**

```bash
did-cli status --pretty
```

Expected: displays user name, time bank balance, vacation info.

- [ ] **Step 4: Test report command**

```bash
did-cli report --pretty
did-cli report --week $(date +%V | sed 's/^0//') --pretty
```

Expected: shows time entries for current month / current week.

- [ ] **Step 5: Test report with filters**

```bash
did-cli report --customer "Crayon" --from 2026-01 --to 2026-03 --pretty
```

Expected: filtered results or empty set if no matching entries.

- [ ] **Step 6: Test submit (dry run)**

```bash
did-cli submit --period current
```

Expected: shows period summary, prompts for confirmation. Answer `N` to abort.

- [ ] **Step 7: Fix any issues found during testing and commit**

```bash
cd ~/Code/CLI/did-cli
git add -A
git commit -m "fix: address issues found during manual testing"
```

---

### Task 5: Create the /did Claude Code skill

**Files:**
- Create: `/Users/damsleth/Code/PZL/did/skills/did.md`

- [ ] **Step 1: Create skills directory**

```bash
mkdir -p /Users/damsleth/Code/PZL/did/skills
```

- [ ] **Step 2: Write the skill file**

Write to `/Users/damsleth/Code/PZL/did/skills/did.md`:

````markdown
---
name: did
description: Submit timesheet hours and query time data from DID via did-cli. Use when the user mentions submitting hours, checking hours, time bank, timesheet, or anything DID-related.
---

# DID Timesheet Assistant

You help the user interact with their DID timesheet using the `did-cli` tool.

## Prerequisites check

Before doing anything, verify `did-cli` is available:

```bash
command -v did-cli
```

If not found, tell the user:
> `did-cli` is not in your PATH. Set it up:
> 1. Clone the did-cli repo
> 2. Run `./add-to-path.sh`
> 3. Run `did-cli config --cookie "<your didapp cookie>"`
>
> Get the cookie from your browser: DevTools > Application > Cookies > `didapp`

If found, verify it's configured by running `did-cli config`. If `DID_COOKIE` is empty, walk the user through setting it.

## Capabilities

### 1. Submit hours

When the user wants to submit/confirm their timesheet:

1. Run `did-cli status` to check the current state
2. Show the user a summary: time bank balance, current period status
3. Run `did-cli submit --period current` (or `--week N --year Y` if they specify)
4. The CLI will print a summary and ask for confirmation - let the user see it and decide
5. **Never pass --confirm automatically.** Always let the user confirm interactively.

### 2. Query hours

When the user asks about their hours, translate to `did-cli report` with the right flags:

| User says | Command |
|-----------|---------|
| "hours on Crayon in Q1" | `did-cli report --customer "Crayon" --from 2026-01 --to 2026-03` |
| "hours last week" | `did-cli report --week <last week number>` |
| "hours on Project Alpha" | `did-cli report --project "Alpha"` |
| "hours in March" | `did-cli report --from 2026-03 --to 2026-03` |
| "hours this year" | `did-cli report --from 2026-01 --to 2026-12` |
| "break down by project" | Run report, then group the JSON output by project |

Always use the JSON output (no `--pretty`) so you can parse and present the data flexibly. Format the results in a clear, readable way adapted to what the user asked for - totals, breakdowns by customer/project, weekly summaries, etc.

For date math:
- "last week" = current ISO week minus 1
- "Q1" = --from YYYY-01 --to YYYY-03
- "Q2" = --from YYYY-04 --to YYYY-06
- "this month" = --from YYYY-MM --to YYYY-MM (current month)

### 3. Check status / time bank

When the user asks about time bank, vacation, or general status:

```bash
did-cli status
```

Parse the JSON and present: time bank balance, vacation days (used/remaining), user info.

## Handling ambiguity

If the user's query is ambiguous (e.g. a project name that could match multiple customers), run the report and check the results. If results span multiple customers/projects, ask the user to clarify.

## Error handling

- **401 / expired cookie**: Tell the user to refresh their cookie: `did-cli config --cookie "<new value>"`
- **Empty results**: Report that no matching entries were found for the given filters
- **CLI not found**: Walk through setup steps (see prerequisites)

## Output formatting

- For totals: single line with the number
- For breakdowns: markdown table
- For status: structured summary with labels
- Match the granularity to what the user asked for - don't over-explain simple queries
````

- [ ] **Step 3: Commit the skill**

```bash
cd /Users/damsleth/Code/PZL/did
git add skills/did.md
git commit -m "feat: add /did Claude Code skill for timesheet operations"
```

---

### Task 6: Test the /did skill end-to-end

- [ ] **Step 1: Verify the skill loads**

In the DID repo, check that Claude Code recognizes the skill:

```bash
# In the DID project directory, the skill should appear in the skill list
```

- [ ] **Step 2: Test "what's my time bank"**

Invoke the skill and verify it runs `did-cli status` and formats the output.

- [ ] **Step 3: Test "hours on [customer] this month"**

Verify it translates to the correct `did-cli report` command and formats results.

- [ ] **Step 4: Test "submit my hours"**

Verify it shows the summary and lets the user confirm interactively.

- [ ] **Step 5: Fix any issues and commit**

```bash
cd /Users/damsleth/Code/PZL/did
git add skills/did.md
git commit -m "fix: refine /did skill based on end-to-end testing"
```

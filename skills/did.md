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
- "Q3" = --from YYYY-07 --to YYYY-09
- "Q4" = --from YYYY-10 --to YYYY-12
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

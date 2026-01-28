# Quick Start Guide - did Edge Sidebar Extension

Get started with the did Microsoft Edge Sidebar extension in under 2 minutes.

## Prerequisites

- Microsoft Edge (Chromium-based, version 114 or later)
- Access to a did instance (production, staging, or local development)

## Installation Steps

### 1. Enable Developer Mode

1. Open Microsoft Edge
2. Navigate to `edge://extensions/`
3. Toggle **"Developer mode"** ON (bottom-left corner)

### 2. Load the Extension

1. Click the **"Load unpacked"** button
2. Navigate to the `did/extension` folder in your cloned repository
3. Click **"Select Folder"**

### 3. Verify Installation

You should see:
- ✅ "did - Timesheet Sidebar" in your extensions list
- ✅ The did icon (orange "d") in your Edge toolbar

### 4. Pin the Extension (Recommended)

1. Click the **puzzle piece icon** in your Edge toolbar
2. Find "did - Timesheet Sidebar"
3. Click the **pin icon** to keep it visible

## First Use

### Opening the Sidebar

1. Click the **did icon** in your Edge toolbar
2. The sidebar will open on the right side
3. did will load automatically (defaults to production)

### Selecting Your Environment

If you want to use a different environment:

1. Click the **⚙️ Environment** button in the sidebar header
2. Choose your environment:
   - **Production** (default) - For normal work
   - **Staging** - For testing pre-release features
   - **Development** - For testing new features
   - **Local Development** - For local development work
3. Your choice is saved automatically

### Logging In

1. When the did app loads, you'll see the login screen
2. Click **"Sign in with Microsoft"** (or your configured auth provider)
3. Complete the authentication flow in the sidebar
4. You're now ready to track your time!

## Using the Sidebar

### Best Practices

- **Keep it open**: The sidebar persists across tabs and navigation
- **Resize as needed**: Drag the left edge to adjust the width
- **Quick updates**: Log time without switching tabs
- **Calendar sync**: View your calendar events directly in the sidebar

### Keyboard Shortcuts

Currently, there are no default keyboard shortcuts, but you can:
1. Go to `edge://extensions/shortcuts`
2. Set a custom shortcut for opening the sidebar

### Common Workflows

**Logging time from Outlook:**
1. Open Outlook Web (outlook.office.com)
2. Click the did icon to open the sidebar
3. View your calendar events and log time side-by-side

**Checking timesheet from Teams:**
1. Open Microsoft Teams in the browser
2. did sidebar stays visible
3. Track meeting time without leaving Teams

**Development workflow:**
1. Set environment to "Local Development"
2. Make changes to did in your editor
3. Refresh the sidebar to see changes

## Troubleshooting

### Extension won't load
- Verify Developer mode is enabled
- Check that you selected the correct `extension/` folder
- Look for errors in `edge://extensions/`

### Sidebar is blank
- Check your internet connection
- Try clicking ⚙️ and reselecting the environment
- Check the extension console (right-click icon → Inspect)

### Can't log in
- Ensure pop-ups are not blocked
- Try opening did in a regular tab first
- Check that the environment URL is correct

### Extension disappeared
- The extension may have been disabled automatically
- Go to `edge://extensions/` and re-enable it
- If it's missing, reload it using "Load unpacked"

## Advanced Features

### Multiple Instances

You can have multiple Edge windows with different environments:
1. Open multiple Edge windows
2. Each can have the sidebar open
3. Switch environments independently in each window

### Syncing Settings

Your environment preference syncs across:
- ✅ Browser restarts
- ✅ Extension reloads
- ❌ Different computers (local storage only)

## Uninstalling

To remove the extension:
1. Go to `edge://extensions/`
2. Find "did - Timesheet Sidebar"
3. Click **"Remove"**
4. Confirm removal

## Getting Help

- **Extension Issues**: [GitHub Issues](https://github.com/Puzzlepart/did/issues)
- **did Support**: Check the main [did documentation](../README.md)
- **Extension Docs**: See the full [extension README](./README.md)

---

**Tip**: Bookmark this guide at `edge://favorites` for quick reference!

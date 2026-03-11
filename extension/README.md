# did - Microsoft Edge Sidebar Extension

This is a proof-of-concept Microsoft Edge Sidebar extension for **did**, the calendar-to-timesheet web application. The extension allows you to access your did timesheet directly from the Edge sidebar while working in Office 365 web apps and other browser-based applications.

## Overview

The did sidebar extension brings your timesheet directly into Microsoft Edge's sidebar, providing a seamless, always-accessible experience for tracking your time without switching tabs or windows.

### Use Cases

1. **Timesheet integration in Outlook on the web** - Keep your timesheet visible while managing your calendar and emails
2. **View timesheets alongside Office web apps** - Access did while working in Teams, SharePoint, Word Online, Excel Online, etc.
3. **Access from other LoB apps** - Keep your timesheet available while working in any web-based line of business application
4. **Tighter integration** - More "app-like" feel with persistent sidebar access, making did feel like a native part of your workflow

## Features

- **Sidebar Integration**: Access did from Edge's sidebar without leaving your current work context
- **Environment Switching**: Easily switch between production, staging, development, and local environments
- **Persistent Storage**: Your environment preference is saved and remembered
- **Clean UI**: Minimal, focused interface designed specifically for sidebar use
- **One-Click Access**: Click the extension icon to instantly open the did sidebar

## Installation

### Installing in Microsoft Edge

1. **Open Edge Extensions Page**
   - Navigate to `edge://extensions/` in Microsoft Edge
   - Enable "Developer mode" (toggle in the bottom-left corner)

2. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to and select the `/extension` folder from the did repository

3. **Verify Installation**
   - The "did - Timesheet Sidebar" extension should appear in your extensions list
   - You should see the did icon in your Edge toolbar

4. **Pin the Extension** (Optional but recommended)
   - Click the puzzle piece icon in the toolbar
   - Click the pin icon next to "did - Timesheet Sidebar"

## Usage

### Opening the Sidebar

1. Click the did extension icon in your Edge toolbar
2. The sidebar will open on the right side of your browser window
3. The did application will load in the sidebar

### Switching Environments

1. Click the "⚙️ Environment" button in the sidebar header
2. Select your desired environment from the dropdown:
   - **Production** - `did.puzzlepart.com` (default)
   - **Staging** - `didapp-staging.azurewebsites.net`
   - **Development** - `didapp-dev.azurewebsites.net`
   - **Local Development** - `localhost:9001`
3. The environment will be saved and used for all future sessions

### Working with the Sidebar

- The sidebar can be **resized** by dragging its left edge
- The sidebar **persists across tabs** - it stays open as you navigate
- You can **close the sidebar** by clicking the X button in Edge's sidebar interface
- You can **reopen the sidebar** anytime by clicking the extension icon

## File Structure

```
extension/
├── manifest.json       # Extension manifest (Manifest V3)
├── sidebar.html        # Main sidebar UI
├── sidebar.js          # Sidebar logic and iframe management
├── background.js       # Background service worker
├── icons/              # Extension icons
│   ├── icon-16.png     # 16x16 toolbar icon
│   ├── icon-48.png     # 48x48 extension page icon
│   └── icon-128.png    # 128x128 store icon
└── README.md           # This file
```

## Technical Details

### Manifest V3

This extension uses Manifest V3, the latest Chrome/Edge extension manifest version, with the following key components:

- **`manifest_version: 3`** - Uses latest extension API
- **`side_panel`** - Configures the sidebar interface
- **`permissions: ["sidePanel", "storage"]`** - Grants sidebar API and storage access
- **`host_permissions`** - Allows communication with did domains
- **`background.service_worker`** - Background script for extension lifecycle

### Architecture

- **Sidebar HTML**: Provides the UI frame with environment switcher
- **Sidebar JS**: Manages iframe loading, environment storage, and error handling
- **Background Worker**: Handles extension icon clicks and initialization
- **iframe Approach**: Embeds the full did web app in an iframe for complete functionality

### Browser Compatibility

This extension is designed for:
- ✅ **Microsoft Edge** (Chromium-based, version 114+)
- ✅ **Google Chrome** (with minor manifest adjustments)
- ❌ **Firefox** (requires different sidebar API)
- ❌ **Safari** (requires different extension format)

## Development

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Puzzlepart/did.git
   cd did
   ```

2. **Navigate to extension folder**
   ```bash
   cd extension
   ```

3. **Make changes** to any extension files (manifest.json, sidebar.html, etc.)

4. **Reload extension in Edge**
   - Go to `edge://extensions/`
   - Click the refresh icon on the "did - Timesheet Sidebar" extension card

### Testing with Local did Instance

1. Start your local did server:
   ```bash
   npm run watch
   ```

2. In the sidebar, click "⚙️ Environment"

3. Select "Local Development (localhost:9001)"

4. The sidebar will now connect to your local did instance

### Debugging

- **Extension Console**: Right-click the extension icon → "Inspect"
- **Sidebar Console**: Right-click in the sidebar → "Inspect"
- **Background Console**: Visit `edge://extensions/` → Click "background page" or "service worker"

## Known Limitations

This is a **proof-of-concept** with the following limitations:

1. **Authentication**: Users must be logged into did separately in the iframe
2. **Cross-origin restrictions**: Some features may be limited by iframe security policies
3. **Single Sign-On**: SSO flow requires manual login in the sidebar
4. **Mobile**: Edge mobile doesn't support sidebar extensions
5. **Persistence**: Some state may not persist across browser restarts

## Future Enhancements

Potential improvements for a production-ready version:

- [ ] Shared authentication with main browser session
- [ ] Deep linking to specific timesheet views
- [ ] Keyboard shortcuts for opening/closing sidebar
- [ ] Context menu integration
- [ ] Notification support for timesheet reminders
- [ ] Offline capability
- [ ] Publishing to Microsoft Edge Add-ons store

## Publishing to Edge Add-ons Store

To publish this extension to the Microsoft Edge Add-ons store:

1. Create a Microsoft Partner Center account
2. Package the extension as a .zip file
3. Submit through [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/overview)
4. Complete the review process (typically 1-3 business days)

See [Microsoft's publishing guide](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension) for detailed instructions.

## Resources

- [Microsoft Edge Sidebar Developer Guide](https://learn.microsoft.com/en-us/microsoft-edge/extensions/developer-guide/sidebar)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/)
- [Edge Add-ons Store](https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home)

## Support

For issues or questions:
- **did issues**: [GitHub Issues](https://github.com/Puzzlepart/did/issues)
- **Extension issues**: Create an issue with the `[extension]` tag

## License

This extension is part of the did project and follows the same license. See the main [LICENSE](../LICENSE) file for details.

---

**Note**: This is a proof-of-concept extension. For production use, additional security hardening, error handling, and feature development would be recommended.

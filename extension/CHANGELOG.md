# Changelog - did Microsoft Edge Sidebar Extension

All notable changes to the did Edge Sidebar Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-09

### Added
- Initial proof-of-concept release
- Microsoft Edge Sidebar integration with Manifest V3
- Environment switcher (Production, Staging, Development, Local)
- Extension icon with did branding
- Sidebar HTML interface with iframe embedding
- Background service worker for extension lifecycle
- Build script for packaging extension
- Comprehensive documentation:
  - README.md - Full documentation
  - QUICKSTART.md - Installation guide
  - TECHNICAL.md - Technical deep dive
  - VISUAL_GUIDE.md - Visual walkthrough
  - CHANGELOG.md - This file
- Environment preference persistence via chrome.storage
- Loading state with spinner
- Error handling with user-friendly messages
- Settings panel for environment configuration
- One-click sidebar access from toolbar icon

### Features
- **Sidebar Persistence**: Stays open across tabs and navigation
- **Multi-Environment**: Support for 4 different environments
- **Responsive Design**: Clean, minimal UI optimized for sidebar
- **Fast Loading**: Efficient iframe loading with timeout fallback
- **User Preferences**: Saves selected environment locally

### Technical Details
- Manifest Version: 3
- Permissions: `sidePanel`
- Host Permissions: did.puzzlepart.com, didapp-dev, didapp-staging
- Service Worker: background.js
- Icons: 16px, 48px, 128px (PNG format)
- Build Output: Distributable .zip package

### Use Cases Supported
1. Timesheet access from Outlook on the web
2. Integration with Microsoft Teams
3. Sidebar in SharePoint and Office 365 apps
4. Access from any web-based application
5. Local development and testing

### Known Limitations
- Authentication is iframe-based (no shared browser session)
- Requires manual login in sidebar
- No offline functionality
- Single-device only (no sync)
- Microsoft Edge only (Chromium-based)

### Browser Compatibility
- ✅ Microsoft Edge 114+
- ❌ Firefox (different sidebar API)
- ❌ Safari (different extension format)
- ⚠️ Chrome (untested, should work with minor changes)

## [Unreleased]

### Planned Features
- Keyboard shortcuts for opening/closing sidebar
- Context menu integration
- Badge notifications for unlogged hours
- Deep linking to specific views
- Chrome Web Store version
- Shared authentication exploration
- Offline mode investigation

### Under Consideration
- Firefox WebExtension version
- Safari App Extension version
- Mobile Edge support (when available)
- Multiple sidebar instances
- Quick time entry widget
- Calendar event suggestions

## Version History

### Development Milestones

**v1.0.0-alpha** - Initial development
- Basic sidebar functionality
- Environment switcher prototype
- Icon integration

**v1.0.0-beta** - Feature complete
- All planned features implemented
- Documentation completed
- Build system finalized

**v1.0.0** - Production ready
- Proof of concept complete
- Ready for user testing
- Suitable for internal deployment

## Upgrade Guide

### From Development to v1.0.0

This is the first release, so no upgrade necessary.

### Future Upgrades

When upgrading to future versions:

1. **Automatic Update** (if installed from store):
   - Extension will update automatically
   - No action required

2. **Manual Update** (if loaded unpacked):
   - Pull latest code from repository
   - Go to edge://extensions/
   - Click refresh icon on did extension card

3. **Settings Preservation**:
   - Environment preference will be preserved
   - No re-configuration needed

## Support & Feedback

### Reporting Issues

Found a bug or have a feature request?

1. Check existing issues: https://github.com/Puzzlepart/did/issues
2. Create new issue with `[extension]` tag
3. Include:
   - Extension version
   - Edge version
   - Environment (production/staging/dev/local)
   - Steps to reproduce
   - Expected vs actual behavior
   - Console errors (if any)

### Contributing

Interested in contributing to the extension?

1. Fork the repository
2. Create feature branch: `feat/extension-your-feature`
3. Make changes in `/extension` directory
4. Test thoroughly
5. Submit pull request with description

### Community

- **Project**: https://github.com/Puzzlepart/did
- **Documentation**: See /extension/README.md
- **Discussions**: GitHub Discussions (coming soon)

## License

This extension is part of the did project and follows the same license.
See the main LICENSE file in the repository root.

## Credits

### Created By
- Puzzlepart team
- did contributors

### Built With
- Microsoft Edge Extension APIs
- Manifest V3
- Chrome Storage API
- Side Panel API

### Inspired By
- Modern sidebar applications
- Office 365 integration patterns
- Browser extension best practices

## Notes

### Version Numbering

- **Major** (X.0.0): Breaking changes, major rewrites
- **Minor** (1.X.0): New features, backward compatible
- **Patch** (1.0.X): Bug fixes, minor improvements

### Release Cadence

- **Major releases**: As needed for significant changes
- **Minor releases**: Monthly or as features are completed
- **Patch releases**: As bugs are discovered and fixed
- **Emergency releases**: For critical security issues

### Deprecation Policy

Features will be deprecated with at least one minor version warning before removal.

Example:
- v1.1.0: Feature marked as deprecated
- v1.2.0: Feature still available with warning
- v1.3.0: Feature removed

---

**Last Updated**: 2026-01-09
**Current Version**: 1.0.0
**Status**: Proof of Concept - Ready for Testing

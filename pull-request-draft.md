### Your checklist for this pull request
- [x] Make sure you are requesting to **pull a feature/bugfix branch** (right side).
- [x] Make sure you are making a pull request against the **dev branch** (left side). Also you should start *your branch* off *our dev branch*.
- [x] Check your code additions locally using `npm run watch`
- [x] Make sure strings/resources are added using our [resource files](https://github.com/Puzzlepart/did/tree/dev/.resources)
- [x] Make sure [CHANGELOG.md](https://github.com/Puzzlepart/did/blob/dev/CHANGELOG.md) is updated if applicable
- [ ] Make sure [Smoke tests](https://github.com/Puzzlepart/did/blob/dev/.github/ISSUE_TEMPLATE/smoke_test.md) are updated if applicable
 
### Review checklist
- [x] Tested locally

### Review theme song
🎵 [Editable - In Control](https://open.spotify.com/track/5JTS9IngIzuqOcmGUYDRTA) 🎵 

### Description
This PR enhances form controls with improved editing capabilities and styling options:

- Added `transparent` shortcut prop to `DynamicButton` component for cleaner implementation of transparent buttons
- Enhanced `InputField` with:
  - Support for cancel events using Escape key
  - Improved styling through `styles` prop
  - Proper event handling for both Enter and Escape keys
- Upgraded `ListControl` components with:
  - Inline editing capabilities for list items
  - User feedback when editing with info message
  - Better separation of form and list props
- Added currency symbol (`kr`) to all i18n files for consistent formatting
- Updated components using buttons to use the new `transparent` shortcut prop

### How to test
1. Check out locally with [gh](https://github.com/cli/cli)
2. Navigate to a page with `ListControl` components (e.g., Project role definitions)
3. Test the inline editing:
   - Click on a list item (e.g., hourly rate) to edit it
   - Press Enter to save changes
   - Press Escape to cancel changes
4. Verify that the info message appears when editing
5. Check that transparent buttons render correctly in Customer and Project action sections
6. Verify currency symbols display properly with the hourly rate inputs

### Related issues
Closes #XXX (Replace with actual issue number)

### Related smoke tests
- Form controls functionality test
- Button appearance and behavior validation
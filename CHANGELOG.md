# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.10.0 - TBA
### Added
- Support for split week, split year scenarios #753
- Last Year option to reports #775

### Fixed
- Issue where sunday hours would not be displayed in the UI after confirming a week #785
- Issue where moving an event from a confirmed week to an unconfirmed week would cause an error #766
- Minor visual bug in unmatched hours #773
- Issue where confirmed hours would be skewed forward one hour #760
- Issue with navigating between tabs in Projects #749
- Issue with rogue customer matches in large event bodies #782
- Issue with time entry queries in Reports #790

### Changed
- Consolidated Server and Client date utils #771
- Summary view now using datepicker instead of slider #777

## 0.9.0 - 15.12.2020
### Added
- Changes to forecast/confirm actions #605
- Improvements to allocation view in Timesheet #644
- Forecast notifications #613 (can be turned off in subscription settings #639)
- Improved forecast/confirm actions #605
- Automatic Azure Active Directory sync #661
- Support for API tokens with scoped permissions #635 
- Export hours from user menu #589
- Improved project tooltip/panel #678
- When debugging, local cache is automatically cleared on first run #715
- Improved project selector #671
- Support for editing customers #672
- Resizable columns in Reports #722
- Added project tooltip to Summary view in Timesheet #677
- Side panels are now light dismissable #734
- Project suggestions in timesheet matching now also works for event body #705

### Fixed
- Fixed issue where ignored events were not persisted #730
- Minor UI adjustments in Timesheet
- Fixes in matching engine #603
- Issue with appointments occuring around midnight Sunday #703
- Lag in customer/project search #686
- Reports: Current month and year in Reports included entries after today's date #738
- Reports: Filters would persist when switching reports #733
- Reports: Current month report bug #710
- User settings: display language dropdown value would not change after switching language #740
- Customers: Searching for newly created customers would return zero results #739
- Fix for 'go to current week'-shortcut #707

### Changed
- Decreased Project and Customer keys min length to 2 #681
- Increased Project and Customer keys max length to 12 #719

### Removed
- Dependency on moment.js removed, now using day.js instead

## 0.8.0 - 15.10.2020
### Added
- Did now supports forecasting #355
- Better mobile navigation with descriptive labels #539, #588
- We now have custom error pages #502
- Better error messages #579
- Showing aggregated hours per group in Reports #541
- Support for setting Projects to inactive in UI #524
- Better log in/log out experience #485

### Fixed
- Fixed an issue with split weeks where the returned events and total hours were wrong #578
- Missing week summary on Admin page #569 
- Could not open week picker in Timesheet under certain conditions #558
- Did now properly matches ÆØÅ in customer and project keys #550

## 0.7.0 - 09.09.2020
### Added
- Rebrand to just "Did" #412
- Improved reports landing page #505
- Added customers as a separate column in the Timesheet overview #496
- Show project ID (full key) in ProjectColumnTooltip #495
- Enabling GraphQL to be called externally using authorization tokens #478
- Show labels in the Summary view #461
- Possibility of tagging projects with labels in UI #333
- Deep linking for Projects #435

### Fixed
- Fixed soft match functionality (matching without (), [], {}) #489
- Customer entries with leading/trailing spaces are un-matchable #426

## 0.6.0 - N/A
Need details.

## 0.5.0 - 22.5.2020

### Added
- Added toggle for showing/hiding inactive projects andcustomers #285
- Redirect user to timesheet after logging in #303
- Adjustments to Reports #269 
- Reports: Changed name of export button to 'Export current view' #269
- Hotkeys for Timesheet #337
- Summary view can be grouped by customer #242
- Support for Norwegian #306

### Fixed
- Fix for scrollbar glitching #302 

## 0.4.0 - 11.5.2020

### Added
- Support for split weeks #232
- Added user column to project overview #224
- Consolidating confirm buttons #270
- Confirm hours disabled when there's unmatched events #268
- Including project code in tooltip #243
- Presenting active/inactive status for customers and projects in views #168
- Changed chart library from `highcharts` to `recharts` due to licenses #273
- Support for adding DID365 as an app in Microsoft Teams #170

### Fixed
- Sorted customer options alphabetically by name in summary view(s) #260

### Fixed

## 0.3.1 - 16.04.2020

### Added
- Support for adding a project as a category in the users mailbox #202
- Icon picker in project and customer forms #213
- Support for using Did in Teams tabs. No SSO support for now #170

### Fixed
- Using `get-value` module to get `project.inactive` and `customer.inactive` from event #212
- Using `.isoWeek()` instead of `.week()` to calculate week from startTime in `timesheet` resolver #225

## 0.3.0 - 20.03.2020

### Fixed
- Set GraphService.getEvents to retrieve `500` items instead of just `50` #205
- Fixed issue with events lasting until 00:00 #197

## 0.2.0 - 05.03.2020

### Added
- Validation for new project form #163
- Validation for new customer form #164
- Added progress indicator to Timesheet/overview #190
- Functionality for deleting a customer #174

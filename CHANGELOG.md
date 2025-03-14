<!-- ⚠️ This README has been generated from the file(s) ".changelog/CHANGELOG.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#changelog)

# ➤ Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<details>
<summary>📖 Table of Contents</summary>
<br />

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Changelog](#-changelog)
	* [➤ 0.14.15 - TBA](#-01415---tba)
		* [Changed](#changed)
	* [➤ 0.14.12 - 13.03.2025](#-01412---13032025)
		* [Added](#added)
		* [Fixed](#fixed)
	* [➤ 0.13.3 - 25.02.2025](#-0133---25022025)
		* [Fixed](#fixed-1)
		* [Changed](#changed-1)
		* [Added](#added-1)
	* [➤ 0.13.2 - 22.02.2024](#-0132---22022024)
		* [Fixed](#fixed-2)
	* [➤ 0.13.1 - 21.02.2024](#-0131---21022024)
		* [Fixed](#fixed-3)
	* [➤ 0.13.0 - 21.02.2024](#-0130---21022024)
		* [Fixed](#fixed-4)
		* [Added](#added-2)
		* [Changed](#changed-2)
	* [➤ 0.12.0 - 17.04.2023](#-0120---17042023)
		* [Added](#added-3)
		* [Fixed](#fixed-5)
		* [Changed](#changed-3)
	* [➤ 0.11.4 - 21.12.2022](#-0114---21122022)
		* [Added](#added-4)
		* [Fixed](#fixed-6)
		* [Changed](#changed-4)
	* [➤ 0.11.3 - 25.11.2022](#-0113---25112022)
		* [Fixed](#fixed-7)
	* [➤ 0.11.2 - 18.11.2022](#-0112---18112022)
		* [Fixed](#fixed-8)
	* [➤ 0.11.1 - 18.11.2022](#-0111---18112022)
		* [Fixed](#fixed-9)
	* [➤ 0.11.0 - 16.11.2022](#-0110---16112022)
		* [Added](#added-5)
		* [Fixed](#fixed-10)
		* [Changed](#changed-5)
	* [➤ 0.10.0 - 27.04.2021](#-0100---27042021)
		* [Added](#added-6)
		* [Fixed](#fixed-11)
		* [Changed](#changed-6)
	* [➤ 0.9.0 - 15.12.2020](#-090---15122020)
		* [Added](#added-7)
		* [Fixed](#fixed-12)
		* [Changed](#changed-7)
		* [Removed](#removed)
	* [➤ 0.8.0 - 15.10.2020](#-080---15102020)
		* [Added](#added-8)
		* [Fixed](#fixed-13)
	* [➤ 0.7.0 - 09.09.2020](#-070---09092020)
		* [Added](#added-9)
		* [Fixed](#fixed-14)
	* [➤ 0.6.0 - N/A](#-060---na)
	* [➤ 0.5.0 - 22.5.2020](#-050---2252020)
		* [Added](#added-10)
		* [Fixed](#fixed-15)
	* [➤ 0.4.0 - 11.5.2020](#-040---1152020)
		* [Added](#added-11)
		* [Fixed](#fixed-16)
		* [Fixed](#fixed-17)
	* [➤ 0.3.1 - 16.04.2020](#-031---16042020)
		* [Added](#added-12)
		* [Fixed](#fixed-18)
	* [➤ 0.3.0 - 20.03.2020](#-030---20032020)
		* [Fixed](#fixed-19)
	* [➤ 0.2.0 - 05.03.2020](#-020---05032020)
		* [Added](#added-13)
</details>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#01415---tba)

## ➤ 0.14.15 - TBA

### Changed
- Enhanced roles and permissions management UI
- Increased time entries loading capabilities + support for custom filters [#1220](https://github.com/Puzzlepart/did/issues/1220)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#01412---13032025)

## ➤ 0.14.12 - 13.03.2025

### Added
- Added support for deleting a customer [#1165](https://github.com/Puzzlepart/did/issues/1165)

### Fixed
- Fixed hourly rate calculation in project time entries by ensuring proper handling of undefined/null values
- Improved field default values for list input controls
- Added empty message for project time entries when autoload is disabled
- Fixed hourly rate display in `UserColumn` by properly rounding hourly rates



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0133---25022025)

## ➤ 0.13.3 - 25.02.2025

### Fixed
- Fixed layout issue in Project Popover in Timesheet [#1196](https://github.com/Puzzlepart/did/issues/1196)
- Fixed issues with importing users from Entra ID [#1230](https://github.com/Puzzlepart/did/issues/1230)

### Changed
- Improved readability on customer information page [#1214](https://github.com/Puzzlepart/did/issues/1214)
- Improved readability on project information page [#1219](https://github.com/Puzzlepart/did/issues/1219)
- Add support for setting default tab on Project page [#1236](https://github.com/Puzzlepart/did/issues/1236)

### Added
- Feature to select color preset for Outlook categories [#1213](https://github.com/Puzzlepart/did/issues/1213)
- Basic functionality for Budget Tracking [#1217](https://github.com/Puzzlepart/did/issues/1217)
- You know know add a security group in subscription settings, users in this group will be automatically enrolled in did [#1182](https://github.com/Puzzlepart/did/issues/1182)
- Customer and Project key max length is now configurable in subscription settings [#1231](https://github.com/Puzzlepart/did/issues/1231)
- Initial support for enhancing the resource management capabilities within the Projects module of our time entry system. [#1237](https://github.com/Puzzlepart/did/issues/1237)
- Showing week hours summary based on user work week [#1138](https://github.com/Puzzlepart/did/issues/1138)
- Manager included in user sync [#1244](https://github.com/Puzzlepart/did/issues/1244)
- Support for simple project hierarchy [#1245](https://github.com/Puzzlepart/did/issues/1245)
- Support for locking weeks from the admin UI [#1249](https://github.com/Puzzlepart/did/issues/1249)
- Enhancements to the Project Role Management [#1245](https://github.com/Puzzlepart/did/issues/1245)
- Add Parent Project to reports and Excel export [#1253](https://github.com/Puzzlepart/did/issues/1253)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0132---22022024)

## ➤ 0.13.2 - 22.02.2024

### Fixed
- Fix for [#1204](https://github.com/Puzzlepart/did/issues/1204)
- Fix for [#1207](https://github.com/Puzzlepart/did/issues/1207)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0131---21022024)

## ➤ 0.13.1 - 21.02.2024

### Fixed
- Fix for [#1197](https://github.com/Puzzlepart/did/issues/1197)
- Fix for [#1200](https://github.com/Puzzlepart/did/issues/1200)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0130---21022024)

## ➤ 0.13.0 - 21.02.2024

### Fixed
- Fix for [#1112](https://github.com/Puzzlepart/did/issues/1112)
- Deactivated projects can no longer be selectable when resolving manually [#1171](https://github.com/Puzzlepart/did/issues/1171)
- Fixed Icon field will now be cleared when a new project has been created [#1188](https://github.com/Puzzlepart/did/issues/1188)
- Fixed Missing key prop on DetailsRowFields component [#1147](https://github.com/Puzzlepart/did/issues/1147)
- Fix for action bar glitching in Timesheet [#1132](https://github.com/Puzzlepart/did/issues/1132)

### Added
- Improved general look and feel - now using the new [Fluent UI 9](https://react.fluentui.dev/?path=/docs/concepts-developer-quick-start--page)
- Company brand support [#1170](https://github.com/Puzzlepart/did/issues/1170)
- Enriched Subscription Teams settings with fields for Teams reminder messages [#1185](https://github.com/Puzzlepart/did/issues/1185)
- Added WeekStatus GraphQL API Endpoint for User Week Confirmation Status [#1181](https://github.com/Puzzlepart/did/issues/1181)

### Changed
- Better handling of signin errors [#1176](https://github.com/Puzzlepart/did/issues/1176)
- Migrating to `@apollo/server@v4` [#1116](https://github.com/Puzzlepart/did/issues/1116)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0120---17042023)

## ➤ 0.12.0 - 17.04.2023

### Added
- Added support for uploading formatted reports and displaying them to end-users [#1096](https://github.com/Puzzlepart/did/issues/1096)

### Fixed
- Fix for [#1100](https://github.com/Puzzlepart/did/issues/1100)
- Fix for notification links [#1106](https://github.com/Puzzlepart/did/issues/1106)

### Changed
- Missing submissions is not showing hidden users [#1089](https://github.com/Puzzlepart/did/pull/1089)
- Vacation days reset per year by changing the user configuration format [#1086](https://github.com/Puzzlepart/did/pull/1086)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0114---21122022)

## ➤ 0.11.4 - 21.12.2022

### Added
- Visualize if a day is a public holiday [#1064](https://github.com/Puzzlepart/did/issues/1064)

### Fixed
- Fixed an issue with Timesheet navigation that makes it sometimes skip a year [#1028](https://github.com/Puzzlepart/did/issues/1028)
- Fixed an issue with submit commands when there's no submit actions available [#1070](https://github.com/Puzzlepart/did/issues/1070)

### Changed
- Improved Project and Customer pages [#1069](https://github.com/Puzzlepart/did/pull/1069)
- Visual upgrade for lists [#1076](https://github.com/Puzzlepart/did/pull/1076)
- Adjustments to calculation/estimation of vacation [#1080](https://github.com/Puzzlepart/did/pull/1080)
- Events without subject/title is now visible to the end user and displayed as an error that needs to be resolved before submitting [#1082](https://github.com/Puzzlepart/did/issues/1082)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0113---25112022)

## ➤ 0.11.3 - 25.11.2022

### Fixed
- Fixed issue with user reports [#1077](https://github.com/Puzzlepart/did/issues/1077)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0112---18112022)

## ➤ 0.11.2 - 18.11.2022

### Fixed
- Fixed issue with rounding of events [#1065](https://github.com/Puzzlepart/did/issues/1065)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0111---18112022)

## ➤ 0.11.1 - 18.11.2022

### Fixed
- Fixed issues with retrieving customers affecting Project creation etc [#1062](https://github.com/Puzzlepart/did/issues/1062)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0110---16112022)

## ➤ 0.11.0 - 16.11.2022

### Added
- Project code as filter to Reports [#978](https://github.com/Puzzlepart/did/issues/978)
- Added permission scope LIST_USERS [#968](https://github.com/Puzzlepart/did/issues/968)
- Support end early/start late: round appointments to nearest half hours [#105](https://github.com/Puzzlepart/did/issues/105)6
- Autofocus and up/down arrows navigation support for Autocomplete component [#105](https://github.com/Puzzlepart/did/issues/105)8
- Implemented month view [#70](https://github.com/Puzzlepart/did/issues/70)

### Fixed
- Project reports includes week number [#975](https://github.com/Puzzlepart/did/issues/975)
- Reports performance issues [#984](https://github.com/Puzzlepart/did/issues/984)
- Reports infinite loops [#994](https://github.com/Puzzlepart/did/issues/994)
- Unconfirmed hours included in summary view [#103](https://github.com/Puzzlepart/did/issues/103)1
- Added total row to summary report [#932](https://github.com/Puzzlepart/did/issues/932)
- Fix for feedback locked [#104](https://github.com/Puzzlepart/did/issues/104)2

### Changed
- Summary report shows current week [#980](https://github.com/Puzzlepart/did/issues/980)
- Moved delete button out of edit form for roles [#935](https://github.com/Puzzlepart/did/issues/935)
- Deleting API-keys and labels now requires confirmation [#953](https://github.com/Puzzlepart/did/issues/953)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#0100---27042021)

## ➤ 0.10.0 - 27.04.2021

### Added
- Support for split week, split year scenarios [#753](https://github.com/Puzzlepart/did/issues/753)
- Last year option added to reports [#775](https://github.com/Puzzlepart/did/issues/775)
- Support for deleting role [#692](https://github.com/Puzzlepart/did/issues/692)
- Improved Timesheet statusbar: Now showing on all tabs, and showing either shimmer or progress indicator, not both. [#831](https://github.com/Puzzlepart/did/issues/831)
- Nynorsk (nn-no) language support [#864](https://github.com/Puzzlepart/did/issues/864) (thanks to @paalolav ❤️)
- Support for initial signin with email [#884](https://github.com/Puzzlepart/did/issues/884)
- Showing more details in the summary view on hover [#886](https://github.com/Puzzlepart/did/issues/886)
- Summary view moved to Reports
- Differentiating 0-hour weeks from unconfirmed weeks in Summary view [#781](https://github.com/Puzzlepart/did/issues/781)
- Synchronize user photo from Azure AD [#899](https://github.com/Puzzlepart/did/issues/899)
- Breadcrumb for mobile devices
- New user setting: Start page 
- New user setting: Sticky Navigation
- Support for submitting feedback

### Fixed
- Issue where filtering on a report would crash the page [#938](https://github.com/Puzzlepart/did/issues/938)
- Issue where moving an event from a confirmed week to an unconfirmed week would cause an error [#766](https://github.com/Puzzlepart/did/issues/766)
- Issue where confirmed hours would be skewed forward one hour [#760](https://github.com/Puzzlepart/did/issues/760)
- Issue with navigating between tabs in Projects [#749](https://github.com/Puzzlepart/did/issues/749)
- Minor visual bug in unmatched hours [#773](https://github.com/Puzzlepart/did/issues/773)
- Issue with rogue customer matches in large event bodies [#782](https://github.com/Puzzlepart/did/issues/782)
- Issue where sunday hours would not be displayed in the UI after confirming a week [#785](https://github.com/Puzzlepart/did/issues/785)
- Issue with time entry queries in Reports [#790](https://github.com/Puzzlepart/did/issues/790)
- Issue with navigating to a customer from e.g. Timesheet [#791](https://github.com/Puzzlepart/did/issues/791)
- Issue with navigating directly to a page when not logged in [#889](https://github.com/Puzzlepart/did/issues/889)
- Consistent ignore/match buttons across devices in Timesheet [#894](https://github.com/Puzzlepart/did/issues/894)

### Changed
- Consolidated server and client date utils [#771](https://github.com/Puzzlepart/did/issues/771)
- Summary view now using datepicker instead of slider [#777](https://github.com/Puzzlepart/did/issues/777)
- Visual improvements on the admin sections




[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#090---15122020)

## ➤ 0.9.0 - 15.12.2020
### Added
- Changes to forecast/confirm actions [#605](https://github.com/Puzzlepart/did/issues/605)
- Improvements to allocation view in Timesheet [#644](https://github.com/Puzzlepart/did/issues/644)
- Forecast notifications [#613](https://github.com/Puzzlepart/did/issues/613) (can be turned off in subscription settings [#639](https://github.com/Puzzlepart/did/issues/639))
- Improved forecast/confirm actions [#605](https://github.com/Puzzlepart/did/issues/605)
- Automatic Azure Active Directory sync [#661](https://github.com/Puzzlepart/did/issues/661)
- Support for API tokens with scoped permissions [#635](https://github.com/Puzzlepart/did/issues/635) 
- Export hours from user menu [#589](https://github.com/Puzzlepart/did/issues/589)
- Improved project tooltip/panel [#678](https://github.com/Puzzlepart/did/issues/678)
- When debugging, local cache is automatically cleared on first run [#715](https://github.com/Puzzlepart/did/issues/715)
- Improved project selector [#671](https://github.com/Puzzlepart/did/issues/671)
- Support for editing customers [#672](https://github.com/Puzzlepart/did/issues/672)
- Resizable columns in Reports [#722](https://github.com/Puzzlepart/did/issues/722)
- Added project tooltip to Summary view in Timesheet [#677](https://github.com/Puzzlepart/did/issues/677)
- Side panels are now light dismissable [#734](https://github.com/Puzzlepart/did/issues/734)
- Project suggestions in timesheet matching now also works for event body [#705](https://github.com/Puzzlepart/did/issues/705)

### Fixed
- Fixed issue where ignored events were not persisted [#730](https://github.com/Puzzlepart/did/issues/730)
- Minor UI adjustments in Timesheet
- Fixes in matching engine [#603](https://github.com/Puzzlepart/did/issues/603)
- Issue with appointments occuring around midnight Sunday [#703](https://github.com/Puzzlepart/did/issues/703)
- Lag in customer/project search [#686](https://github.com/Puzzlepart/did/issues/686)
- Reports: Current month and year in Reports included entries after today's date [#738](https://github.com/Puzzlepart/did/issues/738)
- Reports: Filters would persist when switching reports [#733](https://github.com/Puzzlepart/did/issues/733)
- Reports: Current month report bug [#710](https://github.com/Puzzlepart/did/issues/710)
- User settings: display language dropdown value would not change after switching language [#740](https://github.com/Puzzlepart/did/issues/740)
- Customers: Searching for newly created customers would return zero results [#739](https://github.com/Puzzlepart/did/issues/739)
- Fix for 'go to current week'-shortcut [#707](https://github.com/Puzzlepart/did/issues/707)

### Changed
- Decreased Project and Customer keys min length to 2 [#681](https://github.com/Puzzlepart/did/issues/681)
- Increased Project and Customer keys max length to 12 [#719](https://github.com/Puzzlepart/did/issues/719)

### Removed
- Dependency on moment.js removed, now using day.js instead



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#080---15102020)

## ➤ 0.8.0 - 15.10.2020
### Added
- did now supports forecasting [#355](https://github.com/Puzzlepart/did/issues/355)
- Better mobile navigation with descriptive labels [#539](https://github.com/Puzzlepart/did/issues/539), [#588](https://github.com/Puzzlepart/did/issues/588)
- We now have custom error pages [#502](https://github.com/Puzzlepart/did/issues/502)
- Better error messages [#579](https://github.com/Puzzlepart/did/issues/579)
- Showing aggregated hours per group in Reports [#541](https://github.com/Puzzlepart/did/issues/541)
- Support for setting Projects to inactive in UI [#524](https://github.com/Puzzlepart/did/issues/524)
- Better log in/log out experience [#485](https://github.com/Puzzlepart/did/issues/485)

### Fixed
- Fixed an issue with split weeks where the returned events and total hours were wrong [#578](https://github.com/Puzzlepart/did/issues/578)
- Missing week summary on Admin page [#569](https://github.com/Puzzlepart/did/issues/569) 
- Could not open week picker in Timesheet under certain conditions [#558](https://github.com/Puzzlepart/did/issues/558)
- did now properly matches ÆØÅ in customer and project keys [#550](https://github.com/Puzzlepart/did/issues/550)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#070---09092020)

## ➤ 0.7.0 - 09.09.2020
### Added
- Rebrand to just "did" [#412](https://github.com/Puzzlepart/did/issues/412)
- Improved reports landing page [#505](https://github.com/Puzzlepart/did/issues/505)
- Added customers as a separate column in the Timesheet overview [#496](https://github.com/Puzzlepart/did/issues/496)
- Show project ID (full key) in ProjectColumnTooltip [#495](https://github.com/Puzzlepart/did/issues/495)
- Enabling GraphQL to be called externally using authorization tokens [#478](https://github.com/Puzzlepart/did/issues/478)
- Show labels in the Summary view [#461](https://github.com/Puzzlepart/did/issues/461)
- Possibility of tagging projects with labels in UI [#333](https://github.com/Puzzlepart/did/issues/333)
- Deep linking for Projects [#435](https://github.com/Puzzlepart/did/issues/435)

### Fixed
- Fixed soft match functionality (matching without (), [], {}) [#489](https://github.com/Puzzlepart/did/issues/489)
- Customer entries with leading/trailing spaces are un-matchable [#426](https://github.com/Puzzlepart/did/issues/426)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#060---na)

## ➤ 0.6.0 - N/A
Need details.



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#050---2252020)

## ➤ 0.5.0 - 22.5.2020

### Added
- Added toggle for showing/hiding inactive projects andcustomers [#285](https://github.com/Puzzlepart/did/issues/285)
- Redirect user to timesheet after logging in [#303](https://github.com/Puzzlepart/did/issues/303)
- Adjustments to Reports [#269](https://github.com/Puzzlepart/did/issues/269) 
- Reports: Changed name of export button to 'Export current view' [#269](https://github.com/Puzzlepart/did/issues/269)
- Hotkeys for Timesheet [#337](https://github.com/Puzzlepart/did/issues/337)
- Summary view can be grouped by customer [#242](https://github.com/Puzzlepart/did/issues/242)
- Support for Norwegian [#306](https://github.com/Puzzlepart/did/issues/306)

### Fixed
- Fix for scrollbar glitching [#302](https://github.com/Puzzlepart/did/issues/302) 



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#040---1152020)

## ➤ 0.4.0 - 11.5.2020

### Added
- Support for split weeks [#232](https://github.com/Puzzlepart/did/issues/232)
- Added user column to project overview [#224](https://github.com/Puzzlepart/did/issues/224)
- Consolidating confirm buttons [#270](https://github.com/Puzzlepart/did/issues/270)
- Confirm hours disabled when there's unmatched events [#268](https://github.com/Puzzlepart/did/issues/268)
- Including project code in tooltip [#243](https://github.com/Puzzlepart/did/issues/243)
- Presenting active/inactive status for customers and projects in views [#168](https://github.com/Puzzlepart/did/issues/168)
- Changed chart library from `highcharts` to `recharts` due to licenses [#273](https://github.com/Puzzlepart/did/issues/273)
- Support for adding DID365 as an app in Microsoft Teams [#170](https://github.com/Puzzlepart/did/issues/170)

### Fixed
- Sorted customer options alphabetically by name in summary view(s) [#260](https://github.com/Puzzlepart/did/issues/260)

### Fixed



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#031---16042020)

## ➤ 0.3.1 - 16.04.2020

### Added
- Support for adding a project as a category in the users mailbox [#202](https://github.com/Puzzlepart/did/issues/202)
- Icon picker in project and customer forms [#213](https://github.com/Puzzlepart/did/issues/213)
- Support for using did in Teams tabs. No SSO support for now [#170](https://github.com/Puzzlepart/did/issues/170)

### Fixed
- Using `get-value` module to get `project.inactive` and `customer.inactive` from event [#212](https://github.com/Puzzlepart/did/issues/212)
- Using `.isoWeek()` instead of `.week()` to calculate week from startTime in `timesheet` resolver [#225](https://github.com/Puzzlepart/did/issues/225)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#030---20032020)

## ➤ 0.3.0 - 20.03.2020

### Fixed
- Set GraphService.getEvents to retrieve `500` items instead of just `50` [#205](https://github.com/Puzzlepart/did/issues/205)
- Fixed issue with events lasting until 00:00 [#197](https://github.com/Puzzlepart/did/issues/197)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)](#020---05032020)

## ➤ 0.2.0 - 05.03.2020

### Added
- Validation for new project form [#163](https://github.com/Puzzlepart/did/issues/163)
- Validation for new customer form [#164](https://github.com/Puzzlepart/did/issues/164)
- Added progress indicator to Timesheet/overview [#190](https://github.com/Puzzlepart/did/issues/190)
- Functionality for deleting a customer [#174](https://github.com/Puzzlepart/did/issues/174)

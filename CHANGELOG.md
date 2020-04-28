# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.4.0 - [TBD]

### Added
- Support for split weeks #232
- Added user column to project overview #224
- Consolidating confirm buttons #270
- Confirm hours disabled when there's unmatched events #268
- Including project code in tooltip #243
- Presenting active/inactive status for customers and projects in views #168
- Changed chart library from `highcharts` to `recharts` due to licenses #273

### Fixed
- Sorted customer options alphabetically by name in summary view(s) #260

### Fixed

## 0.3.1 - 16.04.2020

### Added
- Support for adding a project as a category in the users mailbox #202
- Icon picker in project and customer forms #213
- Support for using Did 365 in Teams tabs. No SSO support for now #170

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
# Holiday Management System - Future Improvements

## Overview
This document tracks future enhancements, edge cases, and improvements for the holiday management system (PR #1326). Items listed here are intentionally out of scope for the initial release but should be considered for future iterations based on user feedback and business needs.

---

## 🔒 Security & Compliance

### Audit Logging
**Priority:** HIGH
**Effort:** 2-3 days

Track who changes what and when for compliance and debugging.

**Requirements:**
- Create `holiday_audit_log` table
- Track fields: `holiday_id`, `action` (create/update/delete), `changed_by`, `changed_at`, `old_value`, `new_value`
- Add UI to view audit history (Admin only)
- Include in data exports for compliance

**Use Cases:**
- Admin accidentally deletes critical holiday → can see who and when
- Dispute over timebank calculation → audit trail shows holiday config at that time
- Compliance audits require change tracking

---

### Rate Limiting
**Priority:** MEDIUM
**Effort:** 1 day

Prevent abuse of holiday management API endpoints.

**Implementation:**
```typescript
// Rate limits per user/tenant:
- Create holiday: 100/hour
- Import preset: 10/hour
- Bulk operations: 5/hour
```

**Protects against:**
- DOS attacks via repeated holiday creation
- Accidental infinite loops in integrations
- Database bloat from spam

---

## 🌍 Timezone & Internationalization

### Multi-Timezone Support
**Priority:** MEDIUM
**Effort:** 3-5 days

**Current State:** Holidays use ISO date strings without explicit timezone handling.

**Future Requirements:**
1. **Company Timezone Configuration**
   - Add `subscription.settings.timezone` field (e.g., "Europe/Oslo")
   - Store holidays in company timezone
   - Convert to user timezone for display only

2. **Multi-Office Support**
   - Different offices have different timezones
   - Holiday applies to specific office's timezone
   - Add `officeId` to holiday configuration

3. **Implementation:**
   ```typescript
   interface Holiday {
     date: string           // ISO date
     name: string
     hoursOff: number
     timezone: string       // "Europe/Oslo", "America/New_York"
     officeId?: string      // Optional: office-specific
   }
   ```

**Edge Cases to Handle:**
- User in India views timesheet with Norwegian holidays
- DST transitions (holiday on day DST starts/ends)
- Cross-timezone company (offices in multiple continents)

---

### Additional Country Presets
**Priority:** MEDIUM
**Effort:** 2-3 days per country

**Currently Supported:**
- ✅ Norway (13 holidays including movable Easter dates)

**Requested:**
- 🇺🇸 United States (10 federal holidays)
- 🇬🇧 United Kingdom (8 bank holidays + regional)
- 🇩🇪 Germany (9 national + 16 state-specific)
- 🇸🇪 Sweden (13 holidays)
- 🇩🇰 Denmark (11 holidays)

**Considerations:**
- Regional holidays (e.g., US state holidays, German Länder)
- Religious holidays (Jewish, Muslim, Hindu calendars)
- Use established library for international holidays (`date-holidays` npm package)

---

## 🏢 Organization & Scope

### Department-Specific Holidays
**Priority:** LOW
**Effort:** 3-4 days

**Use Case:** Different departments observe different holidays.

**Examples:**
- Finance department closed Dec 27-30 (year-end closing)
- Customer support works different holiday schedule
- Manufacturing has plant shutdown weeks

**Implementation:**
```typescript
interface Holiday {
  // ... existing fields
  scope: 'company' | 'department' | 'employee'
  departmentIds?: string[]
  employeeIds?: string[]
}
```

**UI Changes:**
- Holiday form: Add "Applies to" selector
- Filter holidays by current user's department
- Show "This holiday doesn't apply to you" warning

---

### Employee-Specific Holiday Overrides
**Priority:** LOW
**Effort:** 2-3 days

**Use Case:** Individual employees have different holiday schedules.

**Examples:**
- Part-time employees don't get all holidays
- Religious accommodations (swap Christmas for Hanukkah)
- Contract workers with different terms
- International remote workers

**Implementation:**
- Employee profile: "My Holidays" section
- Override company holidays with personal calendar
- Show diff: "Company holidays: X, Your holidays: Y"

---

## 📊 Data & Impact

### Impact Analysis Before Changes
**Priority:** MEDIUM
**Effort:** 2-3 days

**Feature:** Show admin what will happen before applying holiday changes.

**Display:**
```
⚠️ Adding "Company Anniversary (2025-06-15, 8h)" will affect:
- 47 employees
- 12 past timesheets (weeks containing this date)
- Estimated timebank impact: -376 hours total
- 5 employees already have negative timebank

Do you want to:
[ ] Apply and recalculate affected timesheets
[ ] Apply to future timesheets only
[ ] Cancel
```

**Implementation:**
- Query affected timesheets before save
- Calculate potential timebank changes
- Show employee list (expandable)
- Log decision for audit trail

---

### Retroactive Recalculation System
**Priority:** HIGH (if retroactive changes are allowed)
**Effort:** 5-7 days

**Problem:** Admin adds/removes/changes holiday that affected past weeks.

**Current Behavior:** No recalculation, data becomes inconsistent.

**Required Solution:**
1. **Detection:**
   - Flag timesheets affected by holiday changes
   - Store snapshot of holiday config per period

2. **Recalculation:**
   - Background job to recalculate flagged periods
   - Update timebank, expected hours
   - Maintain calculation history

3. **Notification:**
   - Email affected employees: "Your timebank for Week X was recalculated"
   - Show changelog in UI: "Jan 2025 timebank updated due to holiday change"

4. **Implementation:**
   ```typescript
   interface Period {
     // ... existing fields
     holidayConfigSnapshot: Holiday[]  // Holidays at calculation time
     recalculatedAt?: Date
     recalculationReason?: string
   }
   ```

---

### Migration Strategy for Existing Installations
**Priority:** HIGH (before production release)
**Effort:** 2-3 days

**Problem:** How do existing customers get holiday configuration?

**Options:**

**Option A: Manual Setup (Low Risk)**
- Deploy feature disabled by default
- Admin notification: "New feature: Holiday Configuration"
- Admin manually imports or creates holidays
- Feature activates when first holiday is added

**Option B: Auto-Import (Medium Risk)**
- Detect company country from subscription metadata
- Auto-import appropriate country preset
- Email admin: "We imported X holidays based on your location - please review"
- Provide undo option

**Option C: Gradual Rollout (High Control)**
- Feature flag: `features.holidays.enabled`
- Enable for pilot customers first
- Gather feedback, iterate
- Gradual rollout to all customers

**Recommended:** Option A with database migration to add schema, but no data pre-population.

---

## 🎯 Edge Cases & Special Scenarios

### Custom Work Weeks
**Priority:** LOW
**Effort:** 4-5 days

**Current Assumption:** Everyone works Monday-Friday, 8 hours/day.

**Real World:**
- Sunday-Thursday work week (Middle East)
- 4-day work week (some companies)
- Part-time: 3 days/week
- Shift workers: rotating schedules
- 24/7 operations: always someone working

**Solution:**
- Add `workWeek` configuration per employee or department
- Holiday calculation considers individual work schedule
- Update `getWorkingDaysInPeriod()` to use custom work week

---

### Partial Week Employment
**Priority:** LOW
**Effort:** 2-3 days

**Scenario:**
```
Employee starts: Wednesday, Dec 24, 2025
Holiday: Thursday, Dec 25, 2025 (8 hours)
Expected work week: 3 days (Wed, Mon, Tue) = 24 hours
Should holiday deduct 8 hours? Or pro-rated based on days worked?
```

**Requires:**
- Track employment start/end dates per week
- Pro-rate holiday hours based on days employed
- Handle mid-week hire/termination
- UI shows: "Holiday pro-rated: 4h (worked 2/4 days this week)"

---

### Historical Data Integrity
**Priority:** MEDIUM
**Effort:** 3-4 days

**Problem:** Admin changes holiday that affected past calculations.

**Solution: Soft Delete + Versioning**
```typescript
interface Holiday {
  // ... existing fields
  deletedAt?: Date
  deletedBy?: string
  version: number
  supersedes?: string  // ID of previous version
}
```

**Benefits:**
- Never lose historical data
- Can show "Holiday config as of Date X"
- Audit trail remains intact
- Can rollback changes

**UI:**
- "Deleted holidays" section (show/hide)
- "Restore holiday" option
- "View history" shows all versions

---

### Concurrent Admin Modifications
**Priority:** MEDIUM
**Effort:** 2-3 days

**Problem:** Two admins editing holidays simultaneously.

**Scenario:**
```
Admin A: Deletes "Christmas Day" at 10:00
Admin B: Edits "Christmas Day" hours at 10:01
What happens?
```

**Solution: Optimistic Locking**
```typescript
interface HolidaysConfiguration {
  holidays: Holiday[]
  version: number      // Increment on each change
  lastModified: Date
  lastModifiedBy: string
}

// On save:
if (currentVersion !== dbVersion) {
  throw new ConflictError('Holidays were modified by another user')
}
```

**UI:**
- Show conflict resolution dialog
- Display differences: "Another admin changed X"
- Options: Overwrite, Merge, Cancel

---

### Non-Working Day Holidays (Weekend Observance)
**Priority:** LOW
**Effort:** 1-2 days

**Scenario:**
```
Holiday: Saturday, May 17, 2025 (Norway Constitution Day)
Company policy: Observe on Friday, May 16 instead
```

**Current Behavior:** Warning shown but no action taken.

**Future Feature:**
- Add "Observed on" date field
- Separate `actualDate` and `observedDate`
- UI: "Falls on weekend - observe on nearest weekday?"
- Auto-calculate observed date based on rules

---

### Leap Year Improvements
**Priority:** LOW
**Effort:** 4-6 hours

**Current Behavior:** Feb 29 holidays are skipped in non-leap years with console warning.

**User Feedback Needed:**
- Should Feb 29 holidays auto-move to Feb 28 in non-leap years?
- Should admin be notified when a holiday is skipped?
- Should this be configurable per holiday?

**Proposed Solution:**
```typescript
interface Holiday {
  // ... existing fields
  leapYearFallback?: 'skip' | 'feb28' | 'mar1'
}
```

**UI:**
- When adding Feb 29 holiday, show info dialog
- "In non-leap years, this holiday will: [Skip / Move to Feb 28 / Move to Mar 1]"
- Annual notification: "These holidays were skipped this year: ..."

---

## 🛠️ Technical Debt & Refactoring

### Component Refactoring: Break Down HolidaysField.tsx
**Priority:** MEDIUM
**Effort:** 2-3 days

**Current:** Single 506-line component.

**Proposed Structure:**
```
HolidaysField/
├── HolidaysField.tsx              (~100 lines)
│   └── Orchestrates child components
├── components/
│   ├── HolidayList.tsx            (~150 lines)
│   │   └── DataGrid with warnings
│   ├── HolidayFormDialog.tsx      (~150 lines)
│   │   └── Add/Edit modal
│   ├── DeleteConfirmDialog.tsx    (~50 lines)
│   │   └── Delete confirmation
│   └── ImportPresetDropdown.tsx   (~50 lines)
│       └── Country preset selector
├── hooks/
│   ├── useHolidayForm.ts          (~80 lines)
│   │   └── Form state & validation
│   ├── useHolidayImport.ts        (~60 lines)
│   │   └── Import logic
│   └── useHolidayWarnings.ts      (~40 lines)
│       └── Warning calculation
└── types.ts
```

**Benefits:**
- Easier to test individual pieces
- Better code reusability
- Clearer separation of concerns
- Easier for other devs to understand

---

### Replace Easter Algorithm with Library
**Priority:** LOW
**Effort:** 2-3 hours

**Current:** Custom implementation of Anonymous Gregorian algorithm (10 lines).

**Recommendation:** Use `date-easter` or `@date-fns/easter`

**Why:**
- Battle-tested across centuries and edge cases
- Handles both Gregorian and Julian calendars (Orthodox Easter)
- Maintained by community
- ~2KB gzipped

**Note:** Current implementation works fine and has good test coverage. This is purely a "nice to have" for code simplification.

---

## 📈 Features & Enhancements

### Visual Holiday Calendar
**Priority:** LOW
**Effort:** 3-4 days

**Feature:** Show holidays in calendar view instead of just DataGrid.

**UI:**
```
[Calendar View]

     January 2025
Mo  Tu  We  Th  Fr  Sa  Su
          1🎉 2   3   4   5
 6   7   8   9  10  11  12
13  14  15  16  17  18  19
20  21  22  23  24  25  26
27  28  29  30  31
```

**Features:**
- Click date to add/edit holiday
- Color-coded: Full day (red), Half day (orange)
- Show multiple years
- Print/export calendar

---

### Import from External Calendar (iCal)
**Priority:** LOW
**Effort:** 2-3 days

**Feature:** Import holidays from .ics files or iCal URLs.

**Use Case:**
- Government publishes official holiday calendar
- Import directly instead of manual entry
- Keep in sync with external source

**Implementation:**
- Parse iCal format
- Map events to holidays
- Handle recurrence rules (RRULE)
- Validate and preview before import

---

### Export Holidays
**Priority:** LOW
**Effort:** 4-6 hours

**Feature:** Export holiday configuration for backup/sharing.

**Formats:**
- CSV (Excel-friendly)
- JSON (programmatic use)
- iCal (import to Outlook/Google Calendar)
- PDF (printable calendar)

**Use Case:**
- Share with accounting team
- Backup before making changes
- Template for new subsidiaries

---

### Holiday Templates by Industry
**Priority:** LOW
**Effort:** 1 week

**Feature:** Pre-built templates for common scenarios.

**Examples:**
- Technology Company (US): 10 federal holidays + company-specific
- Consulting Firm (Norway): All Norwegian holidays + summer closure
- Retail (UK): Reduced holidays, operates on bank holidays
- Healthcare (24/7): Holiday compensation instead of time off

**Implementation:**
- Template library in database
- Preview template before applying
- Customize after import
- Community-contributed templates

---

### Multi-Year Planning
**Priority:** LOW
**Effort:** 2-3 days

**Feature:** Manage holidays for multiple years at once.

**Current:** Movable holidays regenerated yearly.

**Proposed:**
```
2025 | 2026 | 2027
✓ Configured | ⚠️ Partial | ❌ Not set

[Generate next year] button
```

**Features:**
- View 3-5 years at once
- Auto-generate movable holidays for future years
- Warning when next year not configured (in December)
- Bulk operations across years

---

## 🧪 Testing & Quality

### Test Coverage for Holiday Feature (NEXT PR)
**Priority:** HIGH - Should be next PR after initial merge
**Effort:** 1-2 days
**Blockers:** None - can start immediately after PR #1326 merges

**Current State:**
- ✅ Utility functions (`holidayUtils.ts`): 50+ tests, ~95% coverage (excellent!)
- ❌ React components: 0% coverage
- ❌ GraphQL integration: 0% coverage
- ❌ React hooks: 0% coverage
- ❌ Server-side validation: 0% coverage (will be added in PR #1326)

**Test Files to Create:**

#### 1. `HolidaysField.test.tsx` (~200 lines)
**Framework:** React Testing Library + Jest
**Estimated:** 3-4 hours

```typescript
describe('HolidaysField Component', () => {
  // Rendering & Display
  it('should render empty state when no holidays configured')
  it('should render list of holidays in table')
  it('should show warnings for weekend holidays')
  it('should show warnings for duplicate dates')
  it('should show warning for Feb 29 holidays')

  // Add Holiday Flow
  it('should open add dialog when Add button clicked')
  it('should validate required fields (date, name, hours)')
  it('should validate date format (ISO YYYY-MM-DD)')
  it('should validate name length (1-100 chars)')
  it('should validate hours (0-8, 0.25 increments)')
  it('should show validation errors in dialog')
  it('should add holiday and sort by date')
  it('should close dialog after successful add')

  // Edit Holiday Flow
  it('should open edit dialog with pre-filled values')
  it('should update holiday on save')
  it('should maintain sort order after edit')

  // Delete Holiday Flow
  it('should show confirmation dialog before delete')
  it('should delete holiday on confirm')
  it('should cancel delete operation')
  it('should not show deleted holiday in list')

  // Import Preset Flow
  it('should import Norway holidays (13 items)')
  it('should not import holidays with duplicate dates')
  it('should generate movable holidays for current year')
  it('should set countryCode to NO after import')
  it('should merge with existing holidays')
  it('should handle empty holiday list on import')

  // Warning System
  it('should calculate duplicates correctly')
  it('should memoize duplicate detection')
  it('should show multiple warnings per holiday')

  // Edge Cases
  it('should handle undefined value prop')
  it('should handle holidays with missing optional fields')
  it('should prevent saving with validation errors')
})
```

#### 2. `useWorkWeekStatus.test.ts` (~150 lines)
**Framework:** @testing-library/react-hooks + Jest
**Estimated:** 2-3 hours

```typescript
describe('useWorkWeekStatus Hook', () => {
  // Basic Functionality
  it('should return null when no workWeekHours configured')
  it('should return null when loading')
  it('should return 0 diff when hours match exactly')
  it('should calculate positive diff (overtime)')
  it('should calculate negative diff (undertime)')

  // Holiday Integration (CRITICAL - Main feature)
  it('should subtract holiday hours from expected hours')
  it('should handle multiple holidays in same week')
  it('should handle periods with no holidays')
  it('should handle week with all days as holidays')
  it('should handle half-day holidays (4 hours)')
  it('should handle mixed full and half-day holidays')

  // Error Handling
  it('should handle holiday calculation errors gracefully')
  it('should continue if one period calculation fails')
  it('should log error when holiday hours exceed work week')
  it('should return default values on error')

  // Performance & Memoization
  it('should memoize calculation results')
  it('should only recalculate when periods change')
  it('should only recalculate when workWeekHours change')
  it('should not recalculate on unrelated prop changes')

  // Edge Cases
  it('should handle invalid period dates')
  it('should handle period with invalid holiday data')
  it('should handle empty periods array')
  it('should handle null/undefined holidays in period')

  // Display Values
  it('should format positive hours with "timer" text')
  it('should format negative hours with "timer" text')
  it('should set green background for overtime')
  it('should set red background for undertime')
})
```

#### 3. `subscription.resolver.test.ts` (~200 lines)
**Framework:** Jest + Supertest (GraphQL integration)
**Estimated:** 4-5 hours

```typescript
describe('Subscription Resolver - Holiday Mutations', () => {
  // Authorization Tests
  it('should require MANAGE_SUBSCRIPTION permission')
  it('should reject non-admin users')
  it('should reject unauthenticated requests')
  it('should allow users with ADMIN role')

  // Server-Side Validation - Date
  it('should reject invalid date format "12/25/2025"')
  it('should reject invalid date format "25-12-2025"')
  it('should reject invalid dates "2025-13-01"')
  it('should reject invalid dates "2025-02-30"')
  it('should accept valid ISO dates "2025-12-25"')

  // Server-Side Validation - Name
  it('should reject empty name')
  it('should reject whitespace-only name')
  it('should reject name > 100 characters')
  it('should accept valid name')
  it('should trim whitespace from name')

  // Server-Side Validation - Hours
  it('should reject negative hours')
  it('should reject hours > 8')
  it('should reject hours > dailyWorkHours')
  it('should reject non-quarter-hour increments (4.3)')
  it('should accept valid hours (0, 4, 8)')
  it('should accept quarter-hour increments (0.25, 0.5, 0.75)')

  // Input Sanitization (XSS Protection)
  it('should sanitize XSS in name field "<script>alert(1)</script>"')
  it('should sanitize XSS in notes field "<img src=x onerror=alert(1)>"')
  it('should remove HTML tags from name')
  it('should remove HTML tags from notes')

  // Successful Operations
  it('should successfully create holidays')
  it('should successfully update holidays')
  it('should successfully delete holidays')
  it('should store dates in ISO format')
  it('should store holidays in subscription settings')

  // Data Integrity
  it('should handle concurrent updates correctly')
  it('should allow duplicate dates (with warning)')
  it('should preserve existing holidays when adding new')
  it('should handle empty holidays array')

  // Response Format
  it('should return success: true on successful update')
  it('should return error details on validation failure')
  it('should include field name in validation errors')
})
```

#### 4. `holidayUtils.integration.test.ts` (~150 lines)
**Framework:** Jest
**Estimated:** 2-3 hours

```typescript
describe('Holiday System Integration Tests', () => {
  // Timebank Calculation Integration
  it('should calculate timebank correctly with holidays')
  it('should reduce expected hours by holiday hours')
  it('should handle week with multiple holidays')
  it('should handle week with all days as holidays')

  // Cross-Year Integration
  it('should handle recurring holidays across years')
  it('should handle period from Dec 31 to Jan 1')
  it('should generate correct movable holidays for multiple years')

  // Leap Year Integration
  it('should skip Feb 29 in non-leap years')
  it('should include Feb 29 in leap years')
  it('should log warning when skipping Feb 29')

  // Import Preset Integration
  it('should import Norway preset with correct dates')
  it('should generate Easter dates correctly for 2025-2030')
  it('should calculate Ascension Day (39 days after Easter)')
  it('should calculate Pentecost (49-50 days after Easter)')

  // Full User Flow
  it('should complete full flow: import → add → edit → delete')
  it('should handle user adding holiday for current week')
  it('should recalculate timebank when holiday added')

  // Error Recovery
  it('should handle invalid holiday data gracefully')
  it('should continue processing after single holiday error')
  it('should maintain data integrity after errors')
})
```

**Test Execution Plan:**
1. Run tests locally: `npm test -- holiday`
2. Ensure all tests pass
3. Check coverage: `npm run test:coverage`
4. Target: 80%+ coverage for new code
5. Commit tests in separate PR after initial feature merge

**Dependencies:**
- @testing-library/react
- @testing-library/react-hooks
- @testing-library/jest-dom
- @testing-library/user-event
- jest
- supertest (for GraphQL integration tests)

---

### Additional Test Coverage

**Additional Test Coverage (nice to have):**

1. **Integration Tests:**
   - GraphQL mutations end-to-end ⚠️ CRITICAL
   - Database constraints enforcement
   - Permission checks ⚠️ CRITICAL

2. **E2E Tests:**
   - Full user flow: Import preset → Edit → Delete
   - Admin UI interaction
   - Mobile responsiveness

3. **Performance Tests:**
   - 200+ holidays configured
   - Concurrent user modifications
   - Bulk operations

4. **Security Tests:**
   - XSS attempts in holiday names ⚠️ CRITICAL
   - SQL injection attempts
   - Permission bypass attempts ⚠️ CRITICAL

---

### Cross-Browser & Mobile Testing
**Priority:** MEDIUM
**Effort:** 1-2 days

**Test Matrix:**
| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | ✅ | ? | Test mobile |
| Safari | ? | ? | Test both |
| Firefox | ? | - | Test desktop |
| Edge | ✅ | - | Assumed OK |

**Mobile Concerns:**
- DataGrid responsiveness
- Dialog forms on small screens
- Date picker UX
- Import dropdown on touch devices

---

## 📚 Documentation

### User Guide: Holiday Configuration
**Priority:** MEDIUM
**Effort:** 1 day

**Audience:** Admins who configure holidays

**Contents:**
1. Introduction: Why configure holidays?
2. Quick Start: Import country preset
3. Adding custom holidays
4. Half-day holidays
5. Recurring vs. one-time holidays
6. Troubleshooting common issues
7. FAQ

**Format:** In-app help system + external docs

---

### Developer Guide: Holiday System Architecture
**Priority:** LOW
**Effort:** 1 day

**Audience:** Developers extending the system

**Contents:**
1. Data model & schema
2. Calculation logic flow
3. API reference (GraphQL)
4. Adding new country presets
5. Testing guidelines
6. Common pitfalls

**Keep current 312-line doc for technical reference but create shorter quick start guides.**

---

## 🔧 Infrastructure & Operations

### Monitoring & Alerting
**Priority:** LOW
**Effort:** 1 day

**Metrics to Track:**
- Holiday calculation errors (count, rate)
- Holiday configuration changes (audit log)
- Performance: Calculation time for getHolidayHoursInPeriod()
- User adoption: % of tenants with holidays configured

**Alerts:**
- High error rate in holiday calculations
- Timebank calculation failures
- Suspiciously large holiday configurations (potential abuse)

---

### Rollback Strategy
**Priority:** MEDIUM
**Effort:** 4-6 hours

**Scenario:** Feature causes issues in production.

**Requirements:**
- Feature flag to disable holiday calculations
- Fallback to old calculation method
- Database migration rollback script
- Communication plan for customers

**Testing:**
- Verify rollback works in staging
- Document rollback procedure
- Assign rollback decision-maker

---

## 🗓️ Prioritization Framework

### How to Prioritize These Items

**Tier 1 - Next Sprint:**
- Items blocking other features
- Security/compliance requirements
- High user impact + low effort

**Tier 2 - Next Quarter:**
- Medium user impact + medium effort
- Technical debt causing slowdowns
- Frequently requested features

**Tier 3 - Backlog:**
- Nice-to-have features
- Low user impact
- High effort, uncertain value

**Re-prioritize based on:**
- User feedback after launch
- Support ticket frequency
- Business requirements change
- Technical constraints discovered

---

## 📝 Notes

- This list will evolve based on real-world usage
- Prioritize user feedback over assumptions
- Keep items small and well-scoped
- Each item should be shippable independently
- Update this document as items are completed

**Last Updated:** 2026-01-08
**Next Review:** After initial launch + 30 days of user feedback

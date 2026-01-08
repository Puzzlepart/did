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

### Additional Test Coverage
**Priority:** MEDIUM
**Effort:** 1-2 days

**Current:** 50+ unit tests covering utility functions.

**Missing:**
1. **Integration Tests:**
   - GraphQL mutations end-to-end
   - Database constraints enforcement
   - Permission checks

2. **E2E Tests:**
   - Full user flow: Import preset → Edit → Delete
   - Admin UI interaction
   - Mobile responsiveness

3. **Performance Tests:**
   - 200+ holidays configured
   - Concurrent user modifications
   - Bulk operations

4. **Security Tests:**
   - XSS attempts in holiday names
   - SQL injection attempts
   - Permission bypass attempts

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

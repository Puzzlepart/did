# Holiday Configuration Guide

This guide explains the holiday management system in the `did` application and how it affects timebank calculations.

## Overview

The holiday system reduces expected work hours when national holidays or company-specific non-working days occur, ensuring accurate timebank calculations. Without holiday configuration, employees working during holiday weeks may incorrectly show negative timebank balances.

### Example: Week 52 2025

**Without holidays configured:**
- Standard work week: 40 hours
- Week 52 (Dec 22-28) has 3 Norwegian holidays (Dec 24-26)
- Employee works 16 hours (Mon-Tue only)
- **Problem**: Timebank shows -24 hours (red) ❌

**With holidays configured:**
- Holidays: Dec 24-26 with 8 hours off each (24 hours total)
- Expected hours: 40 - 24 = 16 hours
- Employee works 16 hours
- **Result**: Timebank shows 0 hours ✅

## Architecture

### Data Model

```typescript
interface Holiday {
  date: string              // ISO format: YYYY-MM-DD
  name: string              // Display name (e.g., "Christmas Eve")
  hoursOff: number          // 0-8: 0=work, 4=half, 8=full
  recurring: boolean        // Annual recurrence
  notes?: string            // Optional company-specific rules
}

interface HolidaysConfiguration {
  enabled: boolean          // Master toggle
  countryCode?: string      // Country preset used (e.g., 'NO')
  holidays: Holiday[]       // List of configured holidays
}
```

### System Components

1. **Storage**: `SubscriptionSettings.holidays` (MongoDB)
2. **GraphQL**: `SubscriptionHolidaySettings` type with mutations
3. **Service**: `HolidaysService` extends `MongoDocumentService`
4. **UI**: `HolidaysField` component in Admin > Subscription Settings
5. **Calculation**: `getHolidayHoursInPeriod()` in `holidayUtils.ts`
6. **Integration**: `useWorkWeekStatus` hook applies holidays to timebank

## Configuration

### Via Admin UI

1. Navigate to **Admin > Subscription Settings > Holidays**
2. Click **Add Holiday** to create individual holidays
3. Or use **Import from preset** → **Norway (Norge)** for Norwegian holidays

### Field Validation

The system enforces:
- **Date**: ISO format (YYYY-MM-DD), valid calendar date
- **Name**: 1-100 characters, non-empty
- **Hours Off**: 0-8 in 0.25 increments (quarter-hours)
- **Recurring**: Boolean (true = annual repetition)

Warnings are shown for:
- Holidays falling on weekends
- Duplicate dates
- Feb 29 (skipped in non-leap years)

### Norway Preset

Includes:
- **Fixed holidays** (recurring=true):
  - New Year's Day, Labour Day, Constitution Day (May 17)
  - Christmas Eve, Christmas Day, Boxing Day
  - New Year's Eve (4h half-day)

- **Movable holidays** (recurring=false):
  - Easter: Maundy Thursday, Good Friday, Easter Sunday/Monday
  - Ascension Day (39 days after Easter)
  - Pentecost/Whit Monday (49-50 days after Easter)

**Note**: Movable holidays require annual regeneration or use Easter calculation.

## Implementation Details

### Timezone Handling

Holidays are stored as ISO date strings (YYYY-MM-DD) without time components. All date comparisons use day-level precision to prevent timezone shift bugs:

```typescript
// Good: Uses ISO string and day-level comparison
$dayjs('2025-12-24').isSameOrAfter(start, 'day')

// Bad: Would cause timezone shifts
new Date('2025-12-24T00:00:00Z') // Shifts to Dec 23 in UTC-1
```

See `parseHolidayDate()` and `toISODateString()` for timezone-safe parsing.

### Calculation Flow

1. **TimesheetService** fetches holidays matching period dates
2. **Attaches** to `period.holidays` array
3. **useWorkWeekStatus** hook calls `getHolidayHoursInPeriod()`
4. **Subtracts** holiday hours from expected work hours
5. **Compares** actual hours vs. adjusted expected hours

```typescript
// In useWorkWeekStatus.ts
const totalHolidayHours = periods.reduce((sum, period) => {
  return sum + getHolidayHoursInPeriod(
    period.startDate,
    period.endDate,
    period.holidays,
    workWeekHours
  )
}, 0)

const expectedHours = Math.max(0, workWeekHours - totalHolidayHours)
const workWeekHoursDiff = actualHours - expectedHours
```

### Easter Calculation

Uses the [Anonymous Gregorian algorithm](https://en.wikipedia.org/wiki/Date_of_Easter#Anonymous_Gregorian_algorithm) to compute Easter Sunday for any year:

```typescript
const easter = calculateEasterSunday(2025) // April 20, 2025
const movableHolidays = generateMovableHolidays(2025) // All 7 Easter-related holidays
```

## Testing

### Running Tests

```bash
npm test -- holidayUtils.test.ts
```

### Test Coverage

- ✅ Validation (dates, names, hours)
- ✅ Timezone handling (ISO dates, day precision)
- ✅ Duplicate detection
- ✅ Weekend detection
- ✅ Easter calculations
- ✅ Recurring vs. non-recurring holidays
- ✅ Cross-year periods
- ✅ Leap year handling (Feb 29)
- ✅ Error handling and edge cases

## Known Limitations & Future Enhancements

### Current Limitations

1. **No User/Department Overrides**
   - All users in a subscription share the same holidays
   - Part-time workers with different schedules need manual adjustments
   - Remote workers in different countries use company defaults

2. **No Retroactive Recalculation**
   - Changing holidays doesn't automatically recalculate historical timebanks
   - Users must refresh timesheets to see updates

3. **Movable Holiday Maintenance**
   - Easter-related holidays must be regenerated annually
   - No automatic update mechanism for future years

### Planned Enhancements

#### Permission System
```typescript
// Future: Role-based access control
permissions: {
  'holidays.view': ['admin', 'manager'],
  'holidays.manage': ['admin'],
  'holidays.import': ['admin']
}
```

#### Audit Logging
```typescript
// Future: Track all holiday configuration changes
auditLog: {
  action: 'holiday.created' | 'holiday.updated' | 'holiday.deleted',
  userId: string,
  timestamp: Date,
  changes: { before: Holiday, after: Holiday }
}
```

#### Hierarchy & Overrides
```typescript
// Future: Multi-level configuration
Company → Department → User
- Inheritance with overrides
- User-specific work schedules
- Department-specific holiday policies
```

## Troubleshooting

### Holidays Not Affecting Timebank

1. **Check subscription settings**: `Admin > Subscription Settings > Holidays`
   - Verify `enabled` is true
   - Confirm holidays exist for the period

2. **Check date format**: Holidays must be ISO dates (YYYY-MM-DD)

3. **Check logs**: Open browser console for validation errors:
   ```
   Invalid hoursOff (12) for holiday Christmas: Hours off cannot exceed...
   Holiday hours (48) exceed work week hours (40)...
   ```

4. **Verify period overlap**: Holiday date must fall within the timesheet period

### Excessive Holiday Hours Warning

If you see: `Holiday hours (X) exceed work week hours (Y)`

**Causes:**
- Duplicate holidays on same dates
- Multiple holidays configured incorrectly
- Holiday hours set too high (e.g., 24 instead of 8)

**Fix:**
- Check for duplicates: UI shows warning icon for duplicate dates
- Verify `hoursOff` values (should be 0-8)
- Review logs for specific holidays causing the issue

### Feb 29 Holidays

Holidays on Feb 29 (leap year) will be skipped in non-leap years with a warning:

```
Skipping Christmas in 2025 (not a leap year)
```

**Solution**: Don't create recurring holidays on Feb 29. Create annual non-recurring holidays instead.

## API Reference

### Key Functions

```typescript
// Validation
validateHolidayDate(dateStr: string): boolean
validateHolidayName(name: string): boolean
validateHoursOff(hours: number, dailyWorkHours?: number): boolean

// Calculations
getHolidayHoursInPeriod(
  startDate: string,
  endDate: string,
  holidays: HolidayObject[],
  workWeekHours?: number
): number

// Easter
calculateEasterSunday(year: number): Date
generateMovableHolidays(year: number): Holiday[]

// Utilities
isWeekend(dateStr: string): boolean
findDuplicateHolidays(holidays: Holiday[]): string[]
parseHolidayDate(dateInput: string | Date): Dayjs
toISODateString(dateInput: string | Date): string
```

### GraphQL Mutations

```graphql
mutation UpdateSubscriptionSettings($input: SubscriptionSettingsInput!) {
  updateSubscriptionSettings(input: $input) {
    holidays {
      enabled
      countryCode
      holidays {
        date
        name
        hoursOff
        recurring
        notes
      }
    }
  }
}
```

## Best Practices

1. **Import presets first**, then customize for your company
2. **Regenerate movable holidays annually** (Easter, etc.) in January
3. **Review duplicate warnings** - usually indicates configuration errors
4. **Use half-days** (4h) for commonly shortened days (e.g., New Year's Eve)
5. **Add notes** for company-specific rules ("Office closed at noon")
6. **Test with historical periods** before rolling out company-wide
7. **Communicate changes** to users when updating holidays retroactively

## Support

For issues or questions:
- Check browser console for validation errors
- Review this documentation
- Contact development team with specific error messages

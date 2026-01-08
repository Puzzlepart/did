# Holiday Configuration Guide

This guide explains how to configure holidays in the `did` application to ensure accurate timebank calculations.

## Overview

Holidays are stored in the `holidays` collection in the customer database and are automatically fetched by the `TimesheetService`. The timebank calculation accounts for holidays by subtracting holiday hours from expected work hours.

## Integration with Existing System

The holiday system integrates with existing `did` infrastructure:
- **HolidaysService**: MongoDB service for managing holidays (`/server/services/mongo/holidays.ts`)
- **HolidayObject**: GraphQL type extended with `hoursOff` field (`/server/graphql/resolvers/timesheet/types/HolidayObject.ts`)
- **TimesheetService**: Automatically fetches holidays and attaches them to periods
- **isNationalHoliday()**: DateObject method for checking if a date is a holiday

## Example: Week 52 2025

Without holiday configuration:
- Standard work week: 40 hours
- Week 52 (Dec 22-28, 2025) has 3 national holidays (Christmas Eve, Christmas Day, Boxing Day)
- User works 16 hours (Mon, Tue only)
- **Problem**: Timebank shows -24 hours (red) ❌

With holiday configuration:
- Standard work week: 40 hours
- Holidays configured: Dec 24-26 with `hoursOff: 8` each (24 hours total)
- Expected hours: 40 - 24 = 16 hours
- User works 16 hours
- **Result**: Timebank shows 0 hours ✅

## HolidayObject Fields

The extended `HolidayObject` now includes:

```typescript
{
  _id: string              // MongoDB document ID
  date: Date               // Date of the holiday
  name: string             // Display name (e.g., "Christmas Eve")
  hoursOff: number         // Hours off (0-8): 0=work, 4=half, 8=full
  recurring: boolean       // Whether holiday recurs annually
  notes: string            // Company-specific rules
  periodId: string         // Period ID for filtering
}
```

### Field Details

- **hoursOff** (0-8): Determines how many hours to subtract from expected work hours
  - `8` = Full day off (standard national holiday)
  - `4` = Half day off (e.g., New Year's Eve)
  - `0` = Working day (useful for company-specific overrides)
- **recurring** (boolean): When `true`, holiday repeats annually on the same date
- **notes** (string): Optional documentation of company rules
- **periodId** (string): Used by `TimesheetService` to filter holidays by period

## Configuration via HolidaysService

Holidays are stored in the `holidays` collection in each customer's database. Use the `HolidaysService` to manage them:

### Adding Holidays via GraphQL

```graphql
mutation AddHoliday {
  # Example of adding a holiday
  # The mutation would use HolidaysService.insert()
  # to store in the holidays collection
}
```

### Example Holiday Documents

**Full Day Holiday:**
```json
{
  "date": "2025-12-24",
  "name": "Julaften",
  "hoursOff": 8,
  "recurring": true,
  "notes": "Christmas Eve - full day off",
  "periodId": "2025-12"
}
```

**Half Day Holiday:**
```json
{
  "date": "2025-12-31",
  "name": "Nyttårsaften",
  "hoursOff": 4,
  "recurring": true,
  "notes": "New Year's Eve - half day off",
  "periodId": "2025-12"
}
```

**Company Override (Working Day):**
```json
{
  "date": "2025-05-17",
  "name": "Grunnlovsdag",
  "hoursOff": 0,
  "recurring": true,
  "notes": "Company policy: work this day",
  "periodId": "2025-05"
}
```

## Norway National Holidays Preset

A preset of Norwegian national holidays is available in `shared/utils/holidayUtils.ts` under the `NORWAY_HOLIDAYS` constant. This includes:

- Første nyttårsdag (New Year's Day) - 8 hours
- Easter holidays (Maundy Thursday, Good Friday, Easter Sunday/Monday) - 8 hours each
- Arbeidernes dag (Labour Day) - 8 hours
- Grunnlovsdag (Constitution Day) - 8 hours  
- Ascension Day - 8 hours
- Whitsun (Pentecost) - 8 hours
- Julaften (Christmas Eve) - 8 hours (customizable)
- Første juledag (Christmas Day) - 8 hours
- Andre juledag (Boxing Day) - 8 hours
- Nyttårsaften (New Year's Eve) - 4 hours (half day, customizable)

**Note**: Easter-related holidays have `recurring: false` and need annual updates with correct dates.

## How It Works

### Data Flow

1. **Storage**: Holidays stored in `holidays` collection via `HolidaysService`
2. **Retrieval**: `TimesheetService.getTimesheet()` fetches holidays for periods
3. **Attachment**: Holidays attached to `period.holidays` array
4. **Calculation**: `useWorkWeekStatus` hook calculates holiday hours
5. **Display**: Timebank shows adjusted expected hours

### Calculation Logic

```typescript
// In useWorkWeekStatus hook:
const totalHolidayHours = periods.reduce((sum, period) => {
  if (period.holidays && period.holidays.length > 0) {
    return sum + getHolidayHoursInPeriod(
      period.startDate,
      period.endDate, 
      period.holidays
    )
  }
  return sum
}, 0)

const expectedHours = workWeekHours - totalHolidayHours
const workWeekHoursDiff = actualHours - expectedHours
```

### isNationalHoliday() Integration

The existing `DateObject.isNationalHoliday()` method checks if a date matches a holiday:

```typescript
const dateObj = new DateObject('2025-12-24')
const holiday = dateObj.isNationalHoliday(holidays)
if (holiday) {
  console.log(`${holiday.name}: ${holiday.hoursOff} hours off`)
}
```

## Testing

### Unit Tests

Tests are located in `shared/utils/holidayUtils.test.ts`:
- Week 52 2025 scenario (24 hours off)
- Recurring holidays across years
- Cross-year periods (Dec-Jan)
- Partial day holidays (half days)
- Negative hour prevention

Run tests: `npm test -- holidayUtils.test.ts`

### Manual Testing

1. Add holidays to the database for a specific week
2. Navigate to timesheet for that week
3. Verify timebank calculation
4. Example: Week with 8 hours holiday → Expected 32h (not 40h)

## Troubleshooting

### Holidays Not Affecting Timebank

1. **Check holiday storage**: Verify holidays exist in `holidays` collection
2. **Check hoursOff field**: Must be a number between 0-8
3. **Check periodId**: Should match the period format used by `TimesheetService`
4. **Check date format**: Must be a valid Date object
5. **Browser console**: Check for errors in `useWorkWeekStatus` hook

### Timebank Still Incorrect

1. **Verify work week hours**: Check user's `workWeek.hours` configuration
2. **Check period.holidays**: Ensure holidays are attached to periods
3. **Refresh page**: Ensure latest data is loaded
4. **Check calculation**: `expectedHours = workWeekHours - holidayHours`

## Future Enhancements

A UI for managing holidays will be added to the admin settings. Currently, holidays must be managed via:
- Direct database access
- GraphQL mutations using `HolidaysService`
- Import scripts for bulk holiday creation

## Support

For issues or questions:
- Check existing holidays with `isNationalHoliday()` method
- Verify `HolidaysService` queries return expected data
- Review `TimesheetService` to ensure holidays are fetched
- Create issue in repository with details

---

**Note**: This implementation extends the existing holiday infrastructure with `hoursOff` support for accurate timebank calculations. The system automatically uses holidays stored in the database without requiring additional configuration.

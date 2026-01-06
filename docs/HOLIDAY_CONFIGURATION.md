# Holiday Configuration Guide

This guide explains how to configure holidays in the `did` application to ensure accurate timebank calculations.

## Overview

Holidays are configured at the subscription level and affect timebank calculations for all users in that subscription. When holidays are configured and enabled, the system will automatically reduce the expected work hours for weeks containing holidays.

## Example: Week 52 2025

Without holiday configuration:
- Standard work week: 40 hours
- Week 52 (Dec 22-28, 2025) has 3 national holidays (Christmas Eve, Christmas Day, Boxing Day)
- User works 16 hours (Mon, Tue only)
- **Problem**: Timebank shows -24 hours (red) ❌

With holiday configuration:
- Standard work week: 40 hours
- Holidays configured: Dec 24-26 (24 hours off)
- Expected hours: 40 - 24 = 16 hours
- User works 16 hours
- **Result**: Timebank shows 0 hours ✅

## Configuration via GraphQL API

Holidays are stored in the `settings.holidays` field of the subscription document in the `main` database.

### Data Structure

\`\`\`typescript
{
  "settings": {
    "holidays": {
      "enabled": true,
      "countryCode": "NO",  // Optional: for reference
      "holidays": [
        {
          "date": "2025-12-24",
          "name": "Julaften",
          "hoursOff": 8,
          "recurring": true,
          "notes": "Christmas Eve - full day off"
        },
        {
          "date": "2025-12-31",
          "name": "Nyttårsaften",
          "hoursOff": 4,
          "recurring": true,
          "notes": "New Year's Eve - half day off"
        }
      ]
    }
  }
}
\`\`\`

### Field Descriptions

- **enabled** (boolean): Whether holiday calculations are active
- **countryCode** (string, optional): Country code for reference (e.g., 'NO', 'SE', 'DK')
- **holidays** (array): List of holiday configurations
  - **date** (string, required): ISO date format (YYYY-MM-DD)
  - **name** (string, required): Display name of the holiday
  - **hoursOff** (number, required): Hours off (0-8). Examples:
    - \`8\` = Full day off
    - \`4\` = Half day off
    - \`0\` = Working day (useful for overriding recurring holidays)
  - **recurring** (boolean, optional, default: true): Whether holiday repeats annually
  - **notes** (string, optional): Additional notes about company-specific rules

## Norway National Holidays Preset

A preset of Norwegian national holidays is available in the codebase at \`shared/utils/holidayUtils.ts\` under the \`NORWAY_HOLIDAYS\` constant.

## How It Works

1. **Subscription Level**: Holidays are configured per subscription in the \`main\` database
2. **Client-Side Calculation**: When rendering timesheet views, the client fetches holiday settings
3. **Expected Hours Calculation**:
   - Start with standard work week hours (e.g., 40)
   - Calculate holiday hours within the period
   - Subtract holiday hours from work week hours
   - \`expectedHours = workWeekHours - holidayHours\`
4. **Timebank Display**: Show difference between actual hours and expected hours

## Future Enhancements

A UI for managing holidays will be added to the admin subscription settings page in a future update. Currently, holidays must be configured via the GraphQL API.

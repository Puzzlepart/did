# Implementation Plan: Optional AAD accountEnabled Property Synchronization

## Overview

This plan outlines the implementation of making the "accountEnabled" property an optional synchronization property from Azure Active Directory (AAD), rather than automatically synchronized. The plan includes adding this property to the subscription settings and implementing a UI checkbox for editing the property in the user edit panel.

## Requirements

1. **Add "accountEnabled" to optional AAD sync properties**: Currently hardcoded as always synchronized, needs to be configurable
2. **Update subscription settings UI**: Add accountEnabled option to the AAD sync properties configuration
3. **Implement accountEnabled checkbox in UserForm**: Add a new checkbox control for the accountEnabled property
4. **Disable checkbox when property is synced from AAD**: Similar to other AAD-synced properties
5. **Add translations**: Add necessary translation keys for the new UI elements
6. **Update server-side synchronization logic**: Ensure accountEnabled is only synced when configured

## Implementation Steps

### 1. Update Subscription Settings Configuration

**File**: useSubscriptionConfig.ts

- **Location**: Around line 320 in the `adsync` section, within the `properties` field options
- **Action**: Add `accountEnabled` option to the `checkboxmulti` options object
- **Code**: Add `accountEnabled: t('common.accountEnabledLabel')` to the options

### 2. Update Translation Files

**Files**: 
- en-GB.json
- nb.json 
- nn.json

**Actions**:
- Add translation key `"accountEnabledLabel": "Account enabled"` (and appropriate translations)
- Add description key `"accountEnabledDescription": "Whether the user account is enabled or disabled"`

### 3. Update UserForm Component

**File**: UserForm.tsx

**Actions**:
- Import `CheckboxControl` (already imported)
- Add new `CheckboxControl` for `accountEnabled` property after the existing checkboxes
- Use `inputProps` helper to determine if field should be disabled based on AAD sync configuration
- Position the checkbox appropriately in the form layout

### 4. Update useUsersSync Hook

**File**: useUsersSync.ts

**Actions**:
- **Current state**: `accountEnabled` is hardcoded in the default properties array: `['accountEnabled', 'manager']`
- **Change**: Remove `accountEnabled` from the default hardcoded list
- **Reasoning**: Only sync accountEnabled when explicitly configured in subscription settings

### 5. Update Server-side Synchronization Logic

**File**: synchronizeUserProfile.ts

**Actions**:
- **Current behavior**: The function already uses the `properties` array from subscription settings
- **Verification needed**: Ensure `accountEnabled` synchronization respects the subscription configuration
- **Note**: Based on current code, this should already work correctly as it uses the configured properties list

### 6. Update GraphQL Types (if needed)

**Files**: 
- SubscriptionADSyncSettings.ts

**Actions**:
- **Verification**: Confirm that the existing `properties` field can handle `accountEnabled`
- **Note**: Based on current code structure, this should already support any property name

### 7. Test Authentication Logic

**File**: onVerifySignin.ts

**Actions**:
- **Verification needed**: Ensure that when `accountEnabled` is not synced from AAD, manual changes to the property are preserved
- **Current logic**: Around line 100, there's a check for `dbUser?.accountEnabled === false` that throws `USER_ACCOUNT_DISABLED`
- **Important**: This check should continue to work regardless of sync configuration

### 8. Update useUserForm Hook

**File**: useUserForm.ts

**Actions**:
- **Current logic**: The `inputProps` function already handles AAD sync properties correctly
- **Verification**: Ensure `accountEnabled` works with the existing disabled/description logic for AAD-synced fields

### 9. Testing Considerations

**Areas to test**:
1. **Subscription settings**: Verify `accountEnabled` appears in AAD sync properties list
2. **UserForm behavior**: 
   - Checkbox appears and functions correctly
   - Checkbox is disabled when `accountEnabled` is in sync properties
   - Checkbox shows appropriate description when synced from AAD
3. **Synchronization**: 
   - `accountEnabled` only syncs when configured
   - Manual changes persist when not configured for sync
4. **Authentication**: User login blocking still works when account is disabled

### 10. Edge Cases and Considerations

1. **Default behavior**: When upgrading existing subscriptions, `accountEnabled` should not be automatically added to sync properties to avoid changing current behavior
2. **External users**: Verify that external users can have their `accountEnabled` property modified independently
3. **Bulk operations**: Ensure bulk user sync operations respect the new configuration
4. **Migration**: No database migration needed as the property already exists

### 11. Documentation Updates

**Files to potentially update**:
- Update any relevant documentation about AAD synchronization capabilities
- Update user administration documentation to mention the new checkbox

This implementation plan provides a comprehensive approach to making `accountEnabled` an optional AAD synchronization property while maintaining backward compatibility and following the existing patterns in the codebase.
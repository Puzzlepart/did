# Personal Access Tokens - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let any authenticated user create personal API tokens for scripting/automation, with user identity, scoped permissions, and admin oversight.

**Architecture:** Extend the existing `ApiToken` model with `type` and `userId` fields. Add a new `PersonalAccessTokenResolver` for user-facing CRUD. Modify `handleTokenAuthentication()` to populate `userId` from PAT payloads. Add a tenant kill-switch setting. Add an "API tokens" tab to the UserSettings panel.

**Tech Stack:** TypeGraphQL, MongoDB, jsonwebtoken, React, Fluent UI, i18next

---

### Task 1: Extend ApiToken Types with `type` and `userId`

**Files:**
- Modify: `server/graphql/resolvers/apiToken/types.ts`

- [ ] **Step 1: Add `type` and `userId` fields to the `ApiToken` ObjectType**

In `server/graphql/resolvers/apiToken/types.ts`, add two new fields to the `ApiToken` class after the `subscriptionId` field (line 55):

```typescript
/**
 * The type of API token - 'subscription' (admin-created) or 'personal' (user-created).
 */
@Field(() => String, { nullable: true, defaultValue: 'subscription' })
type?: 'subscription' | 'personal'

/**
 * The user ID that owns this token (personal tokens only).
 */
@Field(() => String, { nullable: true, defaultValue: null })
userId?: string
```

- [ ] **Step 2: Verify the server compiles**

Run: `npx tsc --noEmit --project server/tsconfig.json`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add server/graphql/resolvers/apiToken/types.ts
git commit -m "feat(pat): add type and userId fields to ApiToken type"
```

---

### Task 2: Add `tokenSource` to RequestContext

**Files:**
- Modify: `server/graphql/requestContext.ts`

- [ ] **Step 1: Add `tokenSource` property to the `RequestContext` class**

In `server/graphql/requestContext.ts`, add after the `permissions` property (line 74):

```typescript
/**
 * Source of authentication for this request.
 * 'pat' for personal access tokens, 'api' for subscription API tokens,
 * null for interactive user sessions.
 */
public tokenSource?: 'pat' | 'api' | null
```

- [ ] **Step 2: Verify the server compiles**

Run: `npx tsc --noEmit --project server/tsconfig.json`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add server/graphql/requestContext.ts
git commit -m "feat(pat): add tokenSource property to RequestContext"
```

---

### Task 3: Modify `handleTokenAuthentication` to Support PATs

**Files:**
- Modify: `server/graphql/requestContext.ts`

- [ ] **Step 1: Update `handleTokenAuthentication` return type and logic**

Replace the entire `handleTokenAuthentication` function (lines 228-252) with:

```typescript
const handleTokenAuthentication = async (
  apiKey: string,
  database: MongoDatabase
) => {
  const payload = verify(
    apiKey,
    environment('API_TOKEN_SECRET')
  ) as any
  const { expires, subscriptionId: _id, type, userId } = payload
  const expired = new DateObject(expires).jsDate < new Date()
  if (expired) throw new GraphQLError('The specified token is expired.')
  const [token, subscription] = await Promise.all([
    database.collection('api_tokens').findOne({
      apiKey,
      expires: {
        $gte: new Date()
      }
    }),
    database.collection('subscriptions').findOne({
      _id
    })
  ])
  if (!token || !subscription)
    throw new GraphQLError('Failed to authenticate with the specified token.')
  const tokenSource = type === 'personal' ? 'pat' : 'api'
  return {
    subscription,
    permissions: token.permissions,
    tokenSource,
    userId: type === 'personal' ? userId : null
  }
}
```

- [ ] **Step 2: Update the API key path in `RequestContext.create` to use new return fields**

In `RequestContext.create` (around lines 117-124), replace:

```typescript
      if (apiKey) {
        // API key path remains snapshot-based as before
        const { permissions, subscription } = await handleTokenAuthentication(
          apiKey,
          database
        )
        context.permissions = permissions
        context.subscription = subscription
```

With:

```typescript
      if (apiKey) {
        const { permissions, subscription, tokenSource, userId } =
          await handleTokenAuthentication(apiKey, database)
        context.permissions = permissions
        context.subscription = subscription
        context.tokenSource = tokenSource
        if (userId) {
          context.userId = userId
        }
```

- [ ] **Step 3: Verify the server compiles**

Run: `npx tsc --noEmit --project server/tsconfig.json`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add server/graphql/requestContext.ts
git commit -m "feat(pat): populate userId and tokenSource from PAT tokens"
```

---

### Task 4: Create the PersonalAccessToken Resolver

**Files:**
- Create: `server/graphql/resolvers/personalAccessToken/index.ts`
- Modify: `server/graphql/resolvers/index.ts`

- [ ] **Step 1: Create the resolver file**

Create `server/graphql/resolvers/personalAccessToken/index.ts`:

```typescript
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { GraphQLError } from 'graphql'
import _ from 'underscore'
import get from 'get-value'
import { ApiTokenService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from '../apiToken/types'

const debug = require('debug')('graphql/personalAccessToken')

/**
 * Resolver for Personal Access Tokens.
 *
 * Unlike subscription API tokens, PATs are owned by individual users
 * and carry user identity when used for authentication.
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(ApiToken)
export class PersonalAccessTokenResolver {
  constructor(private readonly _apiToken: ApiTokenService) {}

  /**
   * Get the current user's personal access tokens.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [ApiToken], { description: 'Get personal access tokens for the current user' })
  personalAccessTokens(@Ctx() context: RequestContext): Promise<ApiToken[]> {
    return this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal'
    })
  }

  /**
   * Create a personal access token.
   * Validates that requested permissions are a subset of the user's current permissions.
   * Checks that PATs are enabled for the subscription.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => String, { description: 'Create a personal access token' })
  async addPersonalAccessToken(
    @Arg('token') token: ApiTokenInput,
    @Ctx() context: RequestContext
  ): Promise<string> {
    const patEnabled = get(
      context.subscription,
      'settings.security.personalAccessTokensEnabled',
      { default: true }
    )
    if (!patEnabled) {
      throw new GraphQLError(
        'Personal access tokens are disabled for this organization',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }

    const invalidPermissions = token.permissions.filter(
      (p) => !_.contains(context.permissions, p)
    )
    if (invalidPermissions.length > 0) {
      debug(
        `User ${context.userId} attempted to create PAT with permissions they don't have: ${invalidPermissions.join(', ')}`
      )
      throw new GraphQLError(
        'Cannot create token with permissions you do not have',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }

    const existing = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal',
      name: token.name
    })
    if (existing.length > 0) {
      throw new GraphQLError(
        'A personal access token with this name already exists',
        { extensions: { code: 'BAD_USER_INPUT' } }
      )
    }

    const patToken = {
      ...token,
      type: 'personal' as const,
      userId: context.userId
    }
    return this._apiToken.addToken(patToken, context.subscription.id)
  }

  /**
   * Delete a personal access token owned by the current user.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, { description: 'Delete a personal access token' })
  async deletePersonalAccessToken(
    @Arg('name') name: string,
    @Ctx() context: RequestContext
  ): Promise<BaseResult> {
    const [token] = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal',
      name
    })
    if (!token) {
      throw new GraphQLError('Token not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    }
    await this._apiToken.deleteToken(
      name,
      context.subscription.id,
      context.userId
    )
    return { success: true, error: null }
  }
}
```

- [ ] **Step 2: Register the resolver**

In `server/graphql/resolvers/index.ts`, add the import and include in the array:

Add import after line 2:
```typescript
import { PersonalAccessTokenResolver } from './personalAccessToken'
```

Add `PersonalAccessTokenResolver` to the default export array (after `ApiTokenResolver`).

Add a named export at the bottom:
```typescript
export { PersonalAccessTokenResolver } from './personalAccessToken'
```

- [ ] **Step 3: Verify the server compiles**

Run: `npx tsc --noEmit --project server/tsconfig.json`
Expected: May fail because `deleteToken` signature doesn't yet accept `userId`. That's Task 5.

- [ ] **Step 4: Commit**

```bash
git add server/graphql/resolvers/personalAccessToken/index.ts server/graphql/resolvers/index.ts
git commit -m "feat(pat): add PersonalAccessTokenResolver with CRUD operations"
```

---

### Task 5: Update ApiTokenService for PAT Support

**Files:**
- Modify: `server/services/mongo/api_token.ts`

- [ ] **Step 1: Update `addToken` to include `type` and `userId` in the JWT payload**

The current `addToken` method (lines 52-71) already handles this correctly because it does `_.omit(token, 'created')` which will include any `type` and `userId` fields passed in. No change needed to `addToken`.

- [ ] **Step 2: Update `deleteToken` to support user-scoped deletion**

Replace the `deleteToken` method (lines 79-88) with:

```typescript
  /**
   * Delete token
   *
   * @param name - Token name
   * @param subscriptionId - Subscription id
   * @param userId - Optional user id (for personal tokens, ensures ownership)
   */
  public async deleteToken(
    name: string,
    subscriptionId: string,
    userId?: string
  ): Promise<void> {
    try {
      const query: FilterQuery<ApiToken> = { name, subscriptionId }
      if (userId) {
        query.userId = userId
      }
      await this.collection.deleteOne(query)
    } catch (error) {
      throw error
    }
  }
```

- [ ] **Step 3: Verify the server compiles**

Run: `npx tsc --noEmit --project server/tsconfig.json`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add server/services/mongo/api_token.ts
git commit -m "feat(pat): update deleteToken to support user-scoped deletion"
```

---

### Task 6: Add i18n Translation Keys

**Files:**
- Modify: `shared/config/security/permissions.ts` (if PAT-specific permissions labels needed)
- Find and modify: the English translation file (likely `client/i18n/` or similar)

- [ ] **Step 1: Find the translation files**

Run: `find client -name '*.json' -path '*/i18n/*' -o -name '*.json' -path '*/locales/*' | head -20`

Identify the English translation file and add these keys under appropriate namespaces:

```json
{
  "common": {
    "apiTokens": "API tokens"
  },
  "userSettings": {
    "apiTokens": {
      "tabTitle": "API tokens",
      "emptyState": "You don't have any personal access tokens yet. Create one to access the API from scripts or integrations.",
      "addNew": "Create token",
      "delete": "Delete",
      "tokenNameLabel": "Token name",
      "tokenDescriptionDescription": "Describe what this token will be used for (minimum {{minLength}} characters)",
      "tokenExpiryLabel": "Expiry",
      "permissionsLabel": "Permissions",
      "permissionsDescription": "Select which permissions this token should have. You can only grant permissions you currently have.",
      "apiKeyGenerated": "Your new personal access token",
      "tokenCreated": "Personal access token created",
      "tokenDeleted": "Personal access token deleted",
      "deleteConfirmTitle": "Delete personal access token",
      "deleteConfirmMessage": "Are you sure you want to delete the token \"{{name}}\"? Any integrations using this token will stop working."
    }
  },
  "admin": {
    "subscriptionSettings": {
      "personalAccessTokensEnabledLabel": "Allow personal access tokens",
      "personalAccessTokensEnabledDescription": "When enabled, users can create personal API tokens for scripting and automation"
    },
    "apiTokens": {
      "tokenType": "Type",
      "tokenTypeSubscription": "Subscription",
      "tokenTypePersonal": "Personal",
      "tokenOwner": "Owner"
    }
  }
}
```

Note: Find the actual translation file paths and JSON structure first. The keys above should be merged into the existing structure. Also add Norwegian (nb) translations.

- [ ] **Step 2: Commit**

```bash
git add client/
git commit -m "feat(pat): add i18n translation keys for personal access tokens"
```

---

### Task 7: Add Tenant Kill-Switch Setting

**Files:**
- Modify: `client/pages/Admin/SubscriptionSettings/useSubscriptionConfig.ts`

- [ ] **Step 1: Add the PAT toggle to the security section**

In `client/pages/Admin/SubscriptionSettings/useSubscriptionConfig.ts`, find the security section's `fields` array (starts at line 192). Add a new field entry at the end of the security fields array (before the closing `]` of the security section, around line 262):

```typescript
        {
          id: 'personalAccessTokensEnabled',
          type: 'bool',
          props: {
            label: t('admin.subscriptionSettings.personalAccessTokensEnabledLabel'),
            description: t('admin.subscriptionSettings.personalAccessTokensEnabledDescription'),
            defaultValue: true
          }
        }
```

- [ ] **Step 2: Verify the client compiles**

Run: `npx tsc --noEmit --project client/tsconfig.json` (or `npx webpack --mode development --stats errors-only`)
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add client/pages/Admin/SubscriptionSettings/useSubscriptionConfig.ts
git commit -m "feat(pat): add personalAccessTokensEnabled tenant setting"
```

---

### Task 8: Create GraphQL Operations for PAT Client

**Files:**
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/personalAccessTokens.gql`
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/addPersonalAccessToken.gql`
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/deletePersonalAccessToken.gql`

- [ ] **Step 1: Create the query file**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/personalAccessTokens.gql`:

```graphql
query PersonalAccessTokens {
  tokens: personalAccessTokens {
    name
    description
    created
    expires
    secret: apiKey
  }
}
```

- [ ] **Step 2: Create the add mutation file**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/addPersonalAccessToken.gql`:

```graphql
mutation AddPersonalAccessToken($token: ApiTokenInput!) {
  apiKey: addPersonalAccessToken(token: $token)
}
```

- [ ] **Step 3: Create the delete mutation file**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/deletePersonalAccessToken.gql`:

```graphql
mutation DeletePersonalAccessToken($name: String!) {
  result: deletePersonalAccessToken(name: $name) {
    success
    error {
      message
    }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add client/parts/UserMenu/UserSettings/Tabs/ApiTokens/
git commit -m "feat(pat): add GraphQL operations for personal access tokens"
```

---

### Task 9: Create the PAT Management Hook

**Files:**
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokens.tsx`

- [ ] **Step 1: Create the hook**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokens.tsx`:

```typescript
import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useConfirmationDialog } from 'hooks'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from '../../../../../../shared/graphql/types'
import $addPersonalAccessToken from './addPersonalAccessToken.gql'
import $deletePersonalAccessToken from './deletePersonalAccessToken.gql'
import $personalAccessTokens from './personalAccessTokens.gql'

export function usePersonalAccessTokens() {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const [newToken, setNewToken] = useState<ApiToken>(null)
  const [selectedToken, setSelectedToken] = useState<ApiToken>(null)

  const { data, refetch } = useQuery($personalAccessTokens, {
    fetchPolicy: 'cache-and-network'
  })
  const items: ApiToken[] = data?.tokens ?? []

  const [addToken] = useMutation($addPersonalAccessToken)
  const [deleteToken] = useMutation($deletePersonalAccessToken)

  const onTokenAdded = useCallback(
    async (token: ApiToken) => {
      try {
        const { data } = await addToken({
          variables: { token }
        })
        setNewToken({ ...token, apiKey: data.apiKey })
        appContext.displayToast(
          t('userSettings.apiTokens.tokenCreated'),
          'success'
        )
        refetch()
      } catch (error) {
        appContext.displayToast(error.message, 'error')
      }
    },
    [addToken, refetch]
  )

  const onDeleteConfirmed = useCallback(async () => {
    if (!selectedToken) return
    try {
      await deleteToken({
        variables: { name: selectedToken.name }
      })
      appContext.displayToast(
        t('userSettings.apiTokens.tokenDeleted'),
        'success'
      )
      setSelectedToken(null)
      refetch()
    } catch (error) {
      appContext.displayToast(error.message, 'error')
    }
  }, [selectedToken, deleteToken, refetch])

  const [confirmationDialog, onDelete] = useConfirmationDialog({
    title: t('userSettings.apiTokens.deleteConfirmTitle'),
    subText: t('userSettings.apiTokens.deleteConfirmMessage', {
      name: selectedToken?.name
    }),
    onConfirm: onDeleteConfirmed
  })

  const onKeyCopied = useCallback(() => {
    setNewToken(null)
  }, [])

  return {
    items,
    newToken,
    selectedToken,
    onSelectionChanged: setSelectedToken,
    onTokenAdded,
    onDelete,
    onKeyCopied,
    confirmationDialog
  }
}
```

Note: Verify the import paths match the project's alias configuration (the project uses webpack aliases like `AppContext`, `hooks`, etc.). Adjust the relative import for `ApiToken` type based on how the project resolves shared types. Check how `useConfirmationDialog` is imported in `useApiTokens.tsx` and match that pattern.

- [ ] **Step 2: Verify the client compiles**

Run: `npx tsc --noEmit` or check webpack build
Expected: No errors (or expected errors if translation keys aren't wired yet)

- [ ] **Step 3: Commit**

```bash
git add client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokens.tsx
git commit -m "feat(pat): add usePersonalAccessTokens hook"
```

---

### Task 10: Create the PAT Form Component

**Files:**
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/PersonalAccessTokenForm.tsx`
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokenForm.ts`

- [ ] **Step 1: Create the form hook**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokenForm.ts`:

```typescript
import { useFormControlModel, useFormControls } from 'components/FormControl'
import { ApiTokenInput } from '../../../../../../server/graphql/resolvers/apiToken/types'
import { PersonalAccessTokenForm } from './PersonalAccessTokenForm'
import { useExpiryOptions } from '../../../../../pages/Admin/ApiTokens/ApiTokenForm/useExpiryOptions'

export function usePersonalAccessTokenForm(props: {
  onTokenAdded: (token: any) => void
  onDismiss: () => void
}) {
  const model = useFormControlModel<keyof ApiTokenInput>()
  const register = useFormControls<keyof ApiTokenInput>(
    model,
    PersonalAccessTokenForm
  )
  const expiryOptions = useExpiryOptions()

  const submitProps = {
    text: 'Create',
    onClick: async () => {
      const token = model.$
      await props.onTokenAdded(token)
      model.reset()
      props.onDismiss()
    }
  }

  return { expiryOptions, submitProps, model, register }
}
```

Note: Check how `useApiTokenFormSubmit` works in the admin form and mirror the pattern. The imports above use direct paths - adjust to match the project's alias pattern.

- [ ] **Step 2: Create the form component**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/PersonalAccessTokenForm.tsx`:

```typescript
import { DateObject } from 'DateUtils'
import {
  BaseControlOptions,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  InputControl
} from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { fuzzyMap } from 'utils'
import { EditPermissions } from '../../../../pages/Admin/RolesPermissions'
import { usePersonalAccessTokenForm } from './usePersonalAccessTokenForm'

interface IPersonalAccessTokenFormProps {
  open: boolean
  onTokenAdded: (token: any) => void
  onDismiss: () => void
  tokens: any[]
}

export const PersonalAccessTokenForm: StyledComponent<
  IPersonalAccessTokenFormProps
> = (props) => {
  const { t } = useTranslation()
  const { expiryOptions, submitProps, model, register } =
    usePersonalAccessTokenForm(props)
  return (
    <FormControl
      id={PersonalAccessTokenForm.displayName}
      model={model}
      submitProps={submitProps}
      panel={{
        title: t('userSettings.apiTokens.addNew'),
        open: props.open,
        onDismiss: props.onDismiss
      }}
    >
      <InputControl
        {...register('name', { required: true })}
        label={t('userSettings.apiTokens.tokenNameLabel')}
      />
      <InputControl
        {...register('description', {
          required: true,
          validators: [{ minLength: 20 }]
        })}
        rows={8}
        label={t('common.descriptionFieldLabel')}
        description={t('userSettings.apiTokens.tokenDescriptionDescription', {
          minLength: 20
        })}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('expires', {
          required: true,
          preTransformValue: ({ optionValue }) =>
            new DateObject().add(optionValue).jsDate
        })}
        label={t('userSettings.apiTokens.tokenExpiryLabel')}
        values={fuzzyMap<any>(expiryOptions, (value, key) => ({
          value: key,
          text: value
        }))}
      />
      <EditPermissions
        {...register<BaseControlOptions>('permissions', {
          validators: [
            {
              state: 'invalid',
              func: (v: string[]) => !v || v.length === 0,
              message: t('admin.apiTokens.editPermissionsDescription')
            }
          ]
        })}
        label={t('userSettings.apiTokens.permissionsLabel')}
        description={t('userSettings.apiTokens.permissionsDescription')}
        selectedPermissions={model.value('permissions')}
        onChange={(selectedPermissions) =>
          model.set('permissions', selectedPermissions)
        }
      />
    </FormControl>
  )
}

PersonalAccessTokenForm.displayName = 'PersonalAccessTokenForm'
```

Note: The `EditPermissions` component without `api={true}` will show all permissions. For PATs we want to show only permissions the user has. Check if `EditPermissions` supports filtering by user permissions or if you need to pass `scopeIds` to limit the options. The `usePermissions` hook accepts `scopeIds` as first arg - you may need to pass the user's current permissions to `EditPermissions` to filter the available options.

- [ ] **Step 3: Commit**

```bash
git add client/parts/UserMenu/UserSettings/Tabs/ApiTokens/
git commit -m "feat(pat): add PersonalAccessTokenForm component"
```

---

### Task 11: Create the ApiTokens Tab Component

**Files:**
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/ApiTokens.tsx`
- Create: `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/index.ts`

- [ ] **Step 1: Create the tab component**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/ApiTokens.tsx`:

```typescript
import { SelectionMode } from 'components/List/types'
import { List, ListMenuItem } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiKeyDisplay } from '../../../../../pages/Admin/ApiTokens/ApiKeyDisplay'
import { PersonalAccessTokenForm } from './PersonalAccessTokenForm'
import { usePersonalAccessTokens } from './usePersonalAccessTokens'

export const ApiTokensTab: React.FC = () => {
  const { t } = useTranslation()
  const {
    items,
    newToken,
    onTokenAdded,
    onDelete,
    onKeyCopied,
    onSelectionChanged,
    selectedToken,
    confirmationDialog
  } = usePersonalAccessTokens()
  const [formOpen, setFormOpen] = useState(false)

  const columns = [
    {
      fieldName: 'name',
      key: 'name',
      name: t('userSettings.apiTokens.tokenNameLabel'),
      minWidth: 100,
      maxWidth: 150
    },
    {
      fieldName: 'description',
      key: 'description',
      name: t('common.descriptionFieldLabel'),
      minWidth: 150,
      maxWidth: 250,
      isMultiline: true
    },
    {
      fieldName: 'expires',
      key: 'expires',
      name: t('userSettings.apiTokens.tokenExpiryLabel'),
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: any) =>
        item.expires ? new Date(item.expires).toLocaleDateString() : ''
    }
  ]

  if (items.length === 0 && !newToken) {
    return (
      <div>
        <p>{t('userSettings.apiTokens.emptyState')}</p>
        <PersonalAccessTokenForm
          open={formOpen}
          onTokenAdded={onTokenAdded}
          onDismiss={() => setFormOpen(false)}
          tokens={items}
        />
      </div>
    )
  }

  return (
    <div>
      <ApiKeyDisplay
        label={t('userSettings.apiTokens.apiKeyGenerated')}
        apiKey={newToken?.apiKey}
        onKeyCopied={() => onKeyCopied()}
      />
      <List
        columns={columns}
        items={items}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          new ListMenuItem(t('userSettings.apiTokens.addNew'))
            .withIcon('Add')
            .setOnClick(() => setFormOpen(true)),
          new ListMenuItem(t('userSettings.apiTokens.delete'))
            .setOnClick(onDelete)
            .withIcon('Delete')
            .setGroup('actions')
            .setDisabled(!selectedToken)
        ]}
      />
      {formOpen && (
        <PersonalAccessTokenForm
          open={formOpen}
          onTokenAdded={onTokenAdded}
          onDismiss={() => setFormOpen(false)}
          tokens={items}
        />
      )}
      {confirmationDialog}
    </div>
  )
}

ApiTokensTab.displayName = 'ApiTokensTab'
```

Note: Check how the admin `ApiTokens` component uses `List`, `ListMenuItem`, `SelectionMode`, and columns. Mirror that exact pattern. The column definitions may need to use `IListColumn` type from `components/List`. Verify the `onRender` pattern matches the project's column API.

- [ ] **Step 2: Create the barrel export**

Create `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/index.ts`:

```typescript
export { ApiTokensTab } from './ApiTokens'
```

- [ ] **Step 3: Commit**

```bash
git add client/parts/UserMenu/UserSettings/Tabs/ApiTokens/
git commit -m "feat(pat): add ApiTokensTab component for user settings"
```

---

### Task 12: Wire the Tab into UserSettings

**Files:**
- Modify: `client/parts/UserMenu/UserSettings/UserSettings.tsx`
- Modify: `client/parts/UserMenu/UserSettings/Tabs/index.ts`

- [ ] **Step 1: Export the new tab from the Tabs barrel**

In `client/parts/UserMenu/UserSettings/Tabs/index.ts`, add:

```typescript
export { ApiTokensTab } from './ApiTokens'
```

- [ ] **Step 2: Add the tab to UserSettings**

In `client/parts/UserMenu/UserSettings/UserSettings.tsx`:

Add import for the new tab and the subscription settings hook. Replace the imports on line 7:

```typescript
import { General, Timesheet, Vacation, ApiTokensTab } from './Tabs'
```

Add import for the subscription settings hook:

```typescript
import { useSubscriptionSettings } from 'AppContext'
```

Add import for `get`:

```typescript
import get from 'get-value'
```

Inside the `UserSettings` component, before the `return useMemo(...)`, add:

```typescript
  const settings = useSubscriptionSettings()
  const patEnabled = get(settings, 'security.personalAccessTokensEnabled', { default: true })
```

In the `Tabs` `items` object, add the new tab after `vacation` (conditionally):

```typescript
              ...(patEnabled
                ? {
                    apiTokens: [
                      ApiTokensTab,
                      {
                        text: t('userSettings.apiTokens.tabTitle'),
                        iconName: 'Key'
                      },
                      formControlProps
                    ]
                  }
                : {})
```

Update the `useMemo` dependencies (line 55) to include `patEnabled`:

```typescript
    [formControlProps.model, patEnabled]
```

- [ ] **Step 3: Verify the client compiles**

Run: `npx tsc --noEmit` or check webpack
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add client/parts/UserMenu/UserSettings/ client/parts/UserMenu/UserSettings/Tabs/index.ts
git commit -m "feat(pat): wire ApiTokens tab into UserSettings panel"
```

---

### Task 13: Update Admin ApiTokens Page to Show Token Type

**Files:**
- Modify: `client/pages/Admin/ApiTokens/useColumns.tsx` (or wherever columns are defined)

- [ ] **Step 1: Add a type column to the admin token list**

In the admin token columns file, add a column that shows the token type. Find the columns array and add:

```typescript
{
  fieldName: 'type',
  key: 'type',
  name: t('admin.apiTokens.tokenType'),
  minWidth: 80,
  maxWidth: 100,
  onRender: (item: ApiToken) =>
    item.type === 'personal'
      ? t('admin.apiTokens.tokenTypePersonal')
      : t('admin.apiTokens.tokenTypeSubscription')
}
```

- [ ] **Step 2: Update the admin GraphQL query to include new fields**

In `client/pages/Admin/ApiTokens/tokens.gql`, add `type` and `userId` to the query:

```graphql
query ApiTokens {
  tokens: apiTokens {
    name
    description
    created
    expires
    secret: apiKey
    type
    userId
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add client/pages/Admin/ApiTokens/
git commit -m "feat(pat): show token type in admin API tokens list"
```

---

### Task 14: End-to-End Smoke Test

**Files:** None (manual verification)

- [ ] **Step 1: Start the dev server**

Run: `npm run watch`
Expected: Server and client start without errors

- [ ] **Step 2: Test the PAT creation flow**

1. Log in as a regular user
2. Click avatar > Settings
3. Verify the "API tokens" tab appears
4. Click "API tokens" tab
5. Verify empty state message shows
6. Create a new PAT with name, description, permissions
7. Verify the API key is displayed
8. Copy the key

- [ ] **Step 3: Test the PAT in a request**

```bash
curl -H "Authorization: Bearer <copied-token>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ me { displayName } }"}' \
  http://localhost:3000/graphql
```

Expected: Returns user data (because PAT carries userId)

- [ ] **Step 4: Test admin visibility**

1. Log in as admin
2. Go to Admin > API Tokens
3. Verify the PAT appears with type "Personal"

- [ ] **Step 5: Test the kill switch**

1. As admin, go to Admin > Subscription Settings > Security
2. Disable "Allow personal access tokens"
3. As regular user, verify the "API tokens" tab is hidden in settings
4. Verify existing PATs still work for API calls

- [ ] **Step 6: Test PAT deletion**

1. As user, go to Settings > API tokens
2. Select a token and delete it
3. Verify the token no longer works for API calls

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix(pat): address issues found during smoke testing"
```

---

## File Map Summary

| Action | File |
|--------|------|
| Modify | `server/graphql/resolvers/apiToken/types.ts` |
| Modify | `server/graphql/requestContext.ts` |
| Create | `server/graphql/resolvers/personalAccessToken/index.ts` |
| Modify | `server/graphql/resolvers/index.ts` |
| Modify | `server/services/mongo/api_token.ts` |
| Modify | `client/pages/Admin/SubscriptionSettings/useSubscriptionConfig.ts` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/personalAccessTokens.gql` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/addPersonalAccessToken.gql` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/deletePersonalAccessToken.gql` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokens.tsx` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/PersonalAccessTokenForm.tsx` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/usePersonalAccessTokenForm.ts` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/ApiTokens.tsx` |
| Create | `client/parts/UserMenu/UserSettings/Tabs/ApiTokens/index.ts` |
| Modify | `client/parts/UserMenu/UserSettings/UserSettings.tsx` |
| Modify | `client/parts/UserMenu/UserSettings/Tabs/index.ts` |
| Modify | `client/pages/Admin/ApiTokens/useColumns.tsx` |
| Modify | `client/pages/Admin/ApiTokens/tokens.gql` |
| Modify | i18n translation files (en, nb) |

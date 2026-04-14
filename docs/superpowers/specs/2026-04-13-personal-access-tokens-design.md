# Personal Access Tokens (PATs) - Design Spec

## Overview

Add self-service Personal Access Tokens so any authenticated user can create tokens for personal integrations (CLI tools, Power Automate flows, scripts) without requiring admin privileges. PATs carry user identity, making actions attributable but distinguishable from interactive sessions.

## Approach

Extend the existing subscription-level API token system rather than building a parallel one. The `ApiToken` model gains `type` and `userId` fields. JWT signing, validation, and storage reuse the existing pipeline.

## Data Model

Two new fields on the `ApiToken` document (MongoDB `api_tokens` collection):

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'subscription' \| 'personal'` | Token type. Existing tokens implicitly default to `'subscription'`. |
| `userId` | `string \| null` | User ID for personal tokens. `null` for subscription tokens. |

Both fields are included in the JWT payload so they're available during validation without a DB round-trip.

**Backward compatibility:** Existing tokens continue to work. Missing `type` is treated as `'subscription'`, missing `userId` as `null`. No data migration required.

**Token name uniqueness:** PAT names are unique per user. Subscription token names remain unique per subscription. A user and a subscription token can share the same name.

## Authentication Flow

Changes to `handleTokenAuthentication()` in `server/graphql/requestContext.ts`:

1. JWT is verified and token looked up in DB (unchanged).
2. If `token.type === 'personal'`: populate `context.userId` from the JWT payload.
3. Add `context.tokenSource: 'pat' | 'api' | null` to the request context.

Key behavioral difference: PATs **can** access resolvers marked with `requiresUserContext: true` because they carry a valid `userId`. Subscription tokens cannot (unchanged).

The `tokenSource` field allows resolvers and downstream code to distinguish PAT-authenticated requests from interactive sessions for audit/logging purposes.

## Server - Resolver

A new `personalAccessToken` resolver, separate from the existing `apiToken` resolver:

### Queries

- `personalAccessTokens(): ApiToken[]` - List the current user's PATs. Requires user context. No special permission needed.

### Mutations

- `addPersonalAccessToken(token: ApiTokenInput): string` - Create a PAT. Requires user context. Server validates that requested permissions are a subset of the user's current role permissions. Sets `type: 'personal'` and `userId` from context. Returns the signed JWT.

- `deletePersonalAccessToken(name: string): BaseResult` - Delete a PAT. Requires user context. Server enforces `userId` match (users can only delete their own).

### Admin Extensions

- The existing `apiTokens` query returns all tokens (subscription and personal) by default so admins can view PATs. An optional `type` filter parameter can narrow results.
- The existing `deleteApiToken` mutation continues to work for admins to revoke any token, including PATs.

## Server - Service

Changes to `ApiTokenService` (`server/services/mongo/api_token.ts`):

- `addToken` accepts the new fields (`type`, `userId`), includes them in the JWT payload.
- `getTokens` supports filtering by `type` and/or `userId`.
- JWT signing and storage logic unchanged.

## Tenant Setting - PAT Kill Switch

New boolean setting: `security.personalAccessTokensEnabled`

- **Default:** `true`
- **Location:** Security section of Admin > Subscription Settings
- **Label:** "Allow users to create personal access tokens"

### Enforcement

- **Server:** `addPersonalAccessToken` mutation checks the setting before creating. Returns a GraphQL error if disabled.
- **Client:** The "API tokens" tab in user settings is hidden when the setting is `false`.
- **Existing PATs:** Continue to function when the setting is toggled off. Only new creation is blocked. Admins can revoke existing PATs individually.

## Client UI

### User Settings - New "API tokens" Tab

Added to the UserSettings panel (`client/parts/UserMenu/UserSettings/`) alongside "general", "timesheet", and "vacation".

**Components:**

- **Token list:** Table with columns: name, description, created, expires. No permission column for end users.
- **Create form:** Fields: name (required, unique per user), description (required, min 20 chars), expiry dropdown (same options as admin: 1mo, 3mo, 6mo, 1yr, 3yr, 5yr, 15yr), permission picker (shows only permissions the user currently has).
- **Delete:** Per-token delete button with confirmation dialog.
- **ApiKey display:** One-time display with copy-to-clipboard. Reuse or extract shared component from existing admin `ApiKeyDisplay`.
- **Empty state:** Explanatory text about what PATs are and when to use them.
- **Visibility:** Tab hidden when `security.personalAccessTokensEnabled` is `false`.

### Admin ApiTokens Page - Minor Update

Add a column or indicator showing token type (`subscription` vs `personal`) and the owning user's display name for PATs, so admins can identify and revoke user tokens.

## Security

- **Permission ceiling:** Server enforces PAT permissions are a strict subset of the user's current role permissions. The UI only shows available permissions, but the server validates regardless.
- **No privilege escalation:** If a user's role is later downgraded, existing PATs retain their original permissions. Admins can revoke PATs to address this.
- **Same signing secret:** PATs share `API_TOKEN_SECRET` with subscription tokens. The `type` field in the JWT distinguishes them during validation.
- **One-time display:** JWT shown once on creation, never retrievable again.
- **No token-to-token creation:** PATs require user context to create. A PAT cannot create another PAT.
- **Rate limiting:** PATs go through the same Express rate limiter as all other requests.

## Out of Scope

- Automatic revocation when user permissions change (future enhancement)
- Warning/logging when a PAT is used with permissions the user no longer holds (future enhancement)
- Admin-configurable max expiry duration
- Token refresh/rotation

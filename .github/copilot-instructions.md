# GitHub Copilot Instructions for did

**did** (always stylised in lowercase) is a calendar-to-timesheet web application that syncs Microsoft calendar events into time entries.

## Tech Stack

Use these technologies and patterns:

- **Frontend:** React 17 with TypeScript, functional components with hooks only
- **Backend:** Node.js 22 LTS, Express, TypeScript
- **API:** GraphQL with Apollo Client (client) and TypeGraphQL (server)
- **Database:** MongoDB with multi-tenant architecture (separate database per customer)
- **Cache:** Redis for sessions and API caching
- **Styling:** SCSS modules, Fluent UI components
- **i18n:** react-i18next (support en-GB, nb, nn)

## Critical Patterns

### Component Structure

Follow this exact structure for all React components in `/client/components/[ComponentName]/`:

```
ComponentName/
├── ComponentName.tsx           # Main component (functional with hooks)
├── ComponentName.module.scss   # SCSS module
├── index.ts                    # Re-exports
├── types.ts                    # TypeScript interfaces
└── useComponentName.ts         # Business logic hook
```

- Separate business logic into `use[ComponentName].ts` hooks
- Import styles as `styles` from `.module.scss` files
- Include JSDoc comments for all functions/components
- Use explicit TypeScript return types

### Multi-Tenant Architecture

Respect the multi-tenant database architecture:

- Each customer has their own MongoDB database (e.g., `puzzlepart`, `crayon`)
- Configuration/metadata stored in `main` database
- Database name determined by user's subscription during authentication
- Scripts/tools must specify customer database explicitly

### Internationalization

Use `useTranslation` hook for ALL user-facing text:

```typescript
const { t } = useTranslation()
return <Button>{t('common.save')}</Button>
```

Add strings to `/client/i18n/[language].json` files (en-GB, nb, nn).

### GraphQL Organization

- Queries: `/client/graphql-queries/[entity]/`
- Mutations: `/client/graphql-mutations/[entity]/`
- Fragments: `/client/graphql-client/fragments/`
- Server resolvers: `/server/graphql/resolvers/`

## Essential Commands

- `npm run watch` - Primary development command (concurrent client/server with hot reload)
- `npm run create-env` - Generate .env file (run this first for local setup)
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier:write` - Auto-format code (single quotes, no semicolons, 2-space indent)
- `npm test` - Run AVA test suite

## Comprehensive Documentation

For complete architectural details, authentication/security patterns, deployment workflows, GraphQL conventions, environment setup, testing strategies, and performance guidelines, see [AGENTS.md](../AGENTS.md).

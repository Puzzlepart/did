# did Code Review Instructions

These instructions guide automated code reviews for the **did** calendar-to-timesheet application.

## Critical: Multi-Tenant Architecture

**ALWAYS CHECK:** Each customer has their own MongoDB database
- Never assume a single database for all data
- Database selection must use authentication context
- Test multi-tenant scenarios carefully
- Customer data (time entries, projects, users) in customer-specific databases
- Configuration/metadata in `main` database only

## Component Structure (MANDATORY)

All React components MUST follow this exact structure:

```
ComponentName/
├── ComponentName.tsx          # Functional component with hooks
├── ComponentName.module.scss  # SCSS module (import as `styles`)
├── index.ts                   # Re-exports
├── types.ts                   # TypeScript interfaces
└── useComponentName.ts        # Business logic hook
```

**REJECT if:**
- Class components are used (must be functional with hooks)
- Business logic is mixed in component file (must be in custom hook)
- SCSS is not in a module file
- Missing JSDoc comments on functions/components
- Missing `types.ts` for TypeScript interfaces

## Code Quality (ENFORCED)

### ESLint Rules - MUST PASS
- ❌ No `console.log` statements (use `debug` module on server)
- ✅ Single quotes for strings
- ✅ No semicolons
- ✅ Explicit return types on all functions
- ✅ No unused imports
- ✅ React Hooks exhaustive deps
- ✅ Single quotes in JSX attributes

### Formatting - MUST PASS
- Run `npm run prettier:write` before committing
- 2-space indentation
- 80-character line width
- No trailing commas

**REJECT if:**
- Code doesn't pass `npm run lint`
- Code isn't formatted with Prettier

## Internationalization (MANDATORY)

**ALL user-facing text MUST be internationalized**

**REJECT if:**
- Hardcoded English strings in components
- Missing translations in any language file:
  - `/client/i18n/en-GB.json`
  - `/client/i18n/nb.json` (Norwegian Bokmål)
  - `/client/i18n/nn.json` (Norwegian Nynorsk)
- Not using `useTranslation` hook from `react-i18next`

**Required pattern:**
```typescript
const { t } = useTranslation()
return <Text>{t('key.path')}</Text>
```

## GraphQL Organization (REQUIRED)

**Structure:**
- Client Queries: `/client/graphql-queries/[entity]/`
- Client Mutations: `/client/graphql-mutations/[entity]/`
- Fragments: `/client/graphql-client/fragments/`
- Server Resolvers: `/server/graphql/resolvers/`

**REJECT if:**
- GraphQL files in wrong location
- Not using TypeGraphQL decorators on server
- Missing fragments for reusable fields
- Over-fetching (requesting unnecessary fields)

## Testing Requirements

**MUST have tests for:**
- New functionality
- Modified behavior
- Utility functions in `/shared/utils/` and `/client/utils/`

**Test location:** Alongside source files with `.test.ts` extension

**REJECT if:**
- New functionality lacks tests
- Tests fail (`npm test`)
- External dependencies not mocked
- Tests timeout (>2 minutes)

## Security Checks (CRITICAL)

**REJECT if:**
- User input not validated (use `class-validator`)
- SQL/NoSQL injection risk (must use parameterized queries)
- Missing role/permission checks before sensitive operations
- Secrets or environment values hardcoded
- CORS not properly configured
- Missing input sanitization
- Rate limiting bypassed

## Accessibility (WCAG COMPLIANCE)

**REJECT if:**
- Interactive elements missing ARIA attributes
- No keyboard navigation support
- Non-semantic HTML elements used
- Insufficient color contrast
- Images/icons missing alt text
- Poor focus management in dynamic content

## Performance Requirements

**Client-side:**
- Lists >100 items must use virtualization
- Expensive components must use `React.memo`
- Expensive calculations must use `useMemo`/`useCallback`
- GraphQL queries must fetch only needed fields
- Large components must be lazy loaded

**Server-side:**
- Frequent queries must use Redis caching
- MongoDB queries must be optimized with indexes
- GraphQL resolvers must batch operations
- Rate limiting must be applied to API endpoints

**REJECT if:**
- Obvious performance issues present
- Large lists not virtualized
- Heavy computations not memoized

## Common Mistakes (AUTO-REJECT)

1. **Component structure violated** - Not following the mandatory pattern
2. **Missing i18n** - Hardcoded user-facing text
3. **console.log statements** - In client code
4. **Mixed logic and UI** - Business logic in component instead of hook
5. **No JSDoc comments** - Missing documentation
6. **Class components** - Must use functional components with hooks
7. **Unformatted code** - Not run through Prettier
8. **Failing tests** - Tests don't pass
9. **Security issues** - Input validation, auth checks missing
10. **Multi-tenant ignored** - Assuming single database

## TypeScript Standards

**REJECT if:**
- Using `any` type without justification
- Missing return types on functions
- Using `type` instead of `interface` for objects
- Not using strict mode
- Decorators missing on TypeGraphQL resolvers

## Git Commit Convention

**Must use gitmoji conventions:**
- ✨ `feat:` - New features
- 🐛 `fix:` - Bug fixes
- ♻️ `refactor:` - Code refactoring
- ⚡ `perf:` - Performance improvements
- ✅ `test:` - Add/update tests
- 📝 `docs:` - Documentation
- 💄 `style:` - UI/styling
- 🌐 `i18n:` - Internationalization
- 🛂 `auth:` - Authorization/permissions

**Format:** `[emoji] [type]: [description]`

## File-Specific Rules

### `/client/components/**/*`
- Must follow component structure pattern
- Must separate logic into hooks
- Must use SCSS modules
- Must have JSDoc comments
- Must internationalize all text

### `/client/graphql-queries/**/*` and `/client/graphql-mutations/**/*`
- Must organize by entity
- Must use fragments for reusable fields
- Must optimize field selection
- Must have `.gql` extension

### `/server/graphql/resolvers/**/*`
- Must use TypeGraphQL decorators
- Must use TypeDI for dependency injection
- Must validate inputs with `class-validator`
- Must check permissions with `@Authorized` decorator
- Must handle multi-tenant database selection

### `/server/services/**/*`
- Must use TypeDI `@Service` decorator
- Must handle errors properly
- Must use `debug` module for logging (not `console.log`)
- Must respect multi-tenant architecture

### `/client/i18n/**/*.json`
- Must maintain all three languages (en-GB, nb, nn)
- Must use dot-notation keys
- Must have consistent terminology

## Review Checklist

Before approving, verify:

- [ ] Component structure pattern followed
- [ ] All user-facing text internationalized
- [ ] ESLint passes (`npm run lint`)
- [ ] Code formatted with Prettier
- [ ] Tests pass (`npm test`)
- [ ] No security vulnerabilities
- [ ] Multi-tenant architecture respected
- [ ] GraphQL operations properly organized
- [ ] Accessibility standards met
- [ ] Performance optimized
- [ ] JSDoc comments on public functions
- [ ] No `console.log` statements

## Auto-Approve Criteria

**ONLY auto-approve if ALL of these are true:**
- Changes are trivial (typo fixes, formatting only)
- No functional changes
- All automated checks pass
- No user-facing changes
- No security-sensitive code modified
- No database schema changes
- No GraphQL schema changes

## Questions to Ask

When reviewing, consider:
1. Does this respect the multi-tenant architecture?
2. Is all user-facing text internationalized?
3. Does this follow the component structure pattern?
4. Are there security implications?
5. Does this need tests?
6. Is this accessible?
7. Is this performant?
8. Is this properly typed?
9. Is this properly documented?
10. Could this break existing functionality?

---

**Remember:** did is a production SaaS application serving multiple enterprise customers. Quality, security, and consistency are paramount. When in doubt, request changes.

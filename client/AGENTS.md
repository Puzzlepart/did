# Scoped agent context for ./client — see root AGENTS.md for global rules

## Component Structure

All components live in `./components/[ComponentName]/` and follow this exact pattern:

```
ComponentName/
├── ComponentName.tsx         # Functional component with hooks
├── ComponentName.module.scss # SCSS module (import as `styles`)
├── index.ts                  # Re-exports only
├── types.ts                  # TypeScript interfaces for this component
└── useComponentName.ts       # Business logic hook
```

- Always separate business logic into a `use[ComponentName].ts` hook
- Include JSDoc comments on all exported functions and components
- Export everything through `index.ts`

## Styling

- SCSS modules with `.module.scss` extension — always import as `styles`
- BEM-like naming within SCSS files
- Fluent UI components throughout — prefer Fluent UI primitives over custom HTML

## GraphQL (Client Side)

- Queries: `./graphql-queries/[entity]/`
- Mutations: `./graphql-mutations/[entity]/`
- Fragments: `./graphql-client/fragments/`
- Apollo Client is configured with `InMemoryCache` and `cache-and-network` fetchPolicy
- Use Apollo Client hooks (`useQuery`, `useMutation`) inside components or hooks
- Fetch only the fields you need — no over-fetching

## Internationalization

- All user-facing strings go through `useTranslation` from `react-i18next`
- Add new strings to `./i18n/[language].json` — languages: `en-GB`, `nb`, `nn`
- Maintain consistent terminology across all three languages

## Accessibility

- All interactive elements need appropriate ARIA attributes
- Maintain keyboard navigation support throughout
- Use semantic HTML — don't use `div` where a `button` or `nav` belongs
- WCAG contrast and visual hierarchy compliance required
- Provide alt text for images and icons
- Manage focus explicitly in dynamic/modal content

## Error Handling

- React Error Boundary lives in `./parts/ErrorFallback/`
- User-facing errors surface via toast notifications
- `console.log` is disabled in production by ESLint rule — do not add debug logs

## Performance

- Virtualize long lists (>100 items)
- Use `React.memo` for expensive render-heavy components
- Memoize expensive calculations with `useMemo`/`useCallback`
- Lazy load routes and heavy components where possible
- Optimize GraphQL queries — avoid fetching unused fields

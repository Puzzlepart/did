# GitHub Copilot Instructions for DID

This document provides instructions and context for GitHub Copilot to better assist with development in the DID project.

## Project Overview

did is a web application built with React and Node.js that manages projects, time reporting, and customer data. The application uses GraphQL for data fetching and manipulation.

## Project Structure

- `/client`: Frontend React application
  - `/app`: Core application files
  - `/components`: Reusable React components
  - `/graphql-client`: Apollo client setup
  - `/graphql-mutations`: GraphQL mutation definitions
  - `/graphql-queries`: GraphQL query definitions
  - `/hooks`: Custom React hooks
  - `/i18n`: Internationalization files
  - `/pages`: Application pages organized by feature
  - `/parts`: Page sections and partial components
  - `/theme`: Styling and theme configuration
  - `/utils`: Utility functions

- `/server`: Backend Node.js application
  - `/graphql`: GraphQL schema and resolvers
  - `/middleware`: Express middleware
  - `/routes`: API routes
  - `/services`: Business logic services
  - `/utils`: Server-side utility functions
  
- `/shared`: Code shared between client and server
  - `/config`: Configuration files
  - `/utils`: Shared utilities

## Code Conventions

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object definitions
- Use explicit return types for functions

### React

- Use functional components with hooks
- Follow the file structure pattern in existing components
- Component files should be named with PascalCase

### GraphQL

- Place fragments in `/client/graphql-client/fragments`
- Organize queries and mutations by entity/domain
- Follow naming conventions in existing GraphQL files

### Styling

- Use SCSS modules for component styling
- Import styles as `styles` from the corresponding `.module.scss` file
- Follow BEM-like naming within SCSS files

## Project-specific Guidelines

- For internationalization, use the `useTranslation` hook and add new strings to the i18n files
- User data should include manager information when appropriate
- Excel exports should maintain consistent formatting with column widths and filters
- When creating search functionality, implement count display and proper loading states

## Common Tasks

- **Adding a new component**: Create files in `/client/components/[ComponentName]/`
- **Adding a new page**: Create files in `/client/pages/[Feature]/`
- **Adding GraphQL operations**: Add to corresponding directories based on operation type
- **Adding translations**: Update files in `/client/i18n/`

## Testing Approach

- Unit tests should be placed next to the file they test with a `.test.tsx` extension
- Mock external dependencies when testing components

## Performance Considerations

- Implement virtualization for long lists
- Use memoization for expensive calculations
- Optimize GraphQL queries to fetch only needed fields

## Accessibility Requirements

- Ensure all interactive elements have appropriate ARIA attributes
- Maintain keyboard navigation support
- Use semantic HTML elements

This guide should be updated as the project evolves and new patterns emerge.

## Additional Context
When asked for help to create commit messages, you should propose running the npm script "commit".

It works as follows:

```bash
commit "[changes]" "[type]" "[message]"
```

Where `[type]` is found in the `package.json` file under the `gitmoji` key, and `[message]` is the commit message you want to create
based on the type you chose and the git changes. `[changes]` is the git changes you want to commit, use `all` to commit all changes.
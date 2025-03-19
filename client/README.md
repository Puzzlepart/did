# did-client

The did client is built using [React](https://reactjs.org/).

## Project Structure

The client folder is organized as follows:

### Core Application Files

- `/app`: Core application files including the main App component, context, and router
- `/components`: Reusable React components that are used throughout the application
- `/graphql-client`: Apollo client setup for GraphQL data fetching
- `/graphql-mutations`: GraphQL mutation definitions
- `/graphql-queries`: GraphQL query definitions
- `/hooks`: Custom React hooks for reusable logic
- `/i18n`: Internationalization files
- `/pages`: Application pages organized by feature
- `/parts`: Page sections and partial components
- `/theme`: Styling and theme configuration including dark and light themes
- `/utils`: Utility functions for various tasks

### Key Architectural Patterns

- **Component Structure**: Components follow a consistent pattern with separate files for the component, hooks, types, and styles
- **GraphQL**: Used for data fetching with Apollo Client
- **Theming**: Supports both dark and light themes using Fluent UI
- **Internationalization**: Supports multiple languages (English, Norwegian Bokmål, Norwegian Nynorsk)
- **Form Handling**: Uses custom form controls with validation
- **Routing**: Uses React Router for navigation between pages

### Feature Organization

Pages are organized by domain/feature (Projects, Customers, Reports, etc.) with each typically containing:

- Component files (.tsx)
- Custom hooks for component logic
- GraphQL queries and mutations
- Types and interfaces
- Context providers and consumers

### Development Guidelines

- Use TypeScript for all new code
- Write components as functional components with hooks
- Follow the file structure patterns in existing components
- Use SCSS modules for component styling
- For new components, use the Template component as a starting point
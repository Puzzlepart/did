# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**did** is a web application that transforms your calendar into your timesheet - "the calendar is your timesheet". It's built with React/TypeScript frontend and Node.js/Express backend, using GraphQL for API communication and integrating with Microsoft Graph API and Google APIs for calendar synchronization.

## Architecture Overview

This is a full-stack TypeScript monorepo with clear separation between client, server, and shared code:

- **Frontend**: React 17 with TypeScript, Fluent UI components, Apollo Client for GraphQL, SCSS modules
- **Backend**: Node.js with Express, TypeScript, Apollo Server, GraphQL schema with resolvers
- **Database**: MongoDB for data storage, Redis for sessions and caching
- **Authentication**: Passport.js with Azure AD (primary) and Google OAuth (experimental)
- **Build System**: Webpack 5 with custom configuration, TypeScript compilation

### Key Integration Points

- **Microsoft Graph API**: Primary calendar and user data source
- **Google APIs**: Secondary calendar integration (experimental)
- **Time Tracking**: Calendar events automatically become time entries
- **Project Management**: Links time entries to projects and customers
- **Reporting**: Excel exports and analytics dashboard

## Essential Development Commands

### Development Workflow
- `npm run watch` - Primary development command (concurrent client/server watching)
- `npm run debug:server` - Server debugging with TypeScript compilation and inspector
- `npm start` - Start production server

### Building
- `npm run package` - Full production build (client + server + archive)
- `npm run package:client` - Build client only
- `npm run build:server` - Build server with TypeScript compilation and asset copying

### Code Quality
- `npm run lint` - ESLint check for client/server TypeScript
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier` - Check code formatting
- `npm run prettier:write` - Auto-format code

### Testing
- `npm test` - Run AVA test suite with verbose output (2-minute timeout per test)

### Environment Setup
- `npm run create-env` - Generate .env file for local development

### Version/Commit Management
- `npm run commit` - Interactive commit with emojis using sexy-commits
- `npm run tag` - Create git tags
- `npm run update:version` - Update version numbers

## Project Structure & Patterns

### Component Architecture
- Components follow feature-based organization under `/client/components/[ComponentName]/`
- Each component includes: main component file, SCSS module, types, and logic hook
- Logic hooks pattern: `use[ComponentName].ts` to separate business logic from presentation
- All functions/components require JSDoc comments

### Styling Conventions
- SCSS modules with `.module.scss` extension
- Import styles as `styles` from corresponding module
- Follow BEM-like naming within SCSS files
- Fluent UI theme integration

### GraphQL Organization
- Queries: `/client/graphql-queries/[entity]/`
- Mutations: `/client/graphql-mutations/[entity]/`
- Fragments: `/client/graphql-client/fragments/`
- Resolvers: `/server/graphql/resolvers/`

### Key Configuration Files
- **Node Version**: Node 22.14.0 LTS (see `.nvmrc`)
- **TypeScript**: Separate configs for client/server with different targets
- **ESLint**: Comprehensive rules including TypeScript, React, Unicorn, and unused imports
- **Prettier**: Single quotes, no semicolons, 2-space indentation
- **AVA Testing**: CommonJS extensions, worker threads, TypeScript support

## Security & Authentication

### Supported Auth Providers
- **Primary**: Azure AD OpenID Connect (`azuread-openidconnect`)
- **Experimental**: Google OAuth 2.0 (for external users)

### Key Environment Variables
Required for development:
- `MICROSOFT_CLIENT_ID` / `MICROSOFT_CLIENT_SECRET` - Azure AD app registration
- `SESSION_SIGNING_KEY` - Session security
- `REDIS_CACHE_HOSTNAME` / `REDIS_CACHE_KEY` - Session storage
- `MONGO_DB_CONNECTION_STRING` / `MONGO_DB_DB_NAME` - Database
- `API_TOKEN_SECRET` - API authentication

### Permission System
Shared configuration in `/shared/config/security/` defines roles and permissions used across client and server.

## Data Flow & Services

### Microsoft Graph Integration
- Calendar events sync to time entries
- User profiles and manager relationships
- Teams integration for conversations

### Database Services
Located in `/server/services/mongo/`:
- User management with roles/permissions
- Project and customer data
- Time entry tracking and confirmed periods
- API tokens and subscriptions

### Caching Strategy
Redis used for:
- Session management
- API response caching
- Rate limiting

## Development Best Practices

### Internationalization
- Use `useTranslation` hook
- Add strings to `/client/i18n/[language].json`
- Support for English (GB), Norwegian Bokmål, and Nynorsk

### Error Handling
- React Error Boundary in `/client/parts/ErrorFallback/`
- Server-side logging with debug module
- User-friendly error messages

### Performance Considerations
- Implement virtualization for long lists
- Use memoization for expensive calculations
- Optimize GraphQL queries to fetch only needed fields
- Bundle analysis available via webpack-bundle-analyzer

## Testing Strategy

- **Framework**: AVA with TypeScript support
- **Location**: Tests alongside source files with `.test.ts` extension
- **Coverage**: Focus on utility functions and business logic
- **Mocking**: Mock external dependencies (Graph API, database)

## CI/CD & Deployment

### Branches
- **main**: Production branch (did.puzzlepart.com)
- **dev**: Development branch (didapp-dev.azurewebsites.net)
- **feat/**: Feature branches (also deploy to dev environment)

### Branch Naming Conventions
Use prefixes: `hotfix/`, `bugfix/`, `feat/`

### GitHub Actions
- Automatic deployment pipelines
- Test execution on PRs
- Conditional testing based on commit messages (`[ava]` to run tests, `[skip-ci]` to skip)

### Maintenance Mode
Set `MAINTENANCE_MODE=true` environment variable to enable maintenance page (API routes remain functional).

## Special Notes

- Excel exports maintain consistent formatting with column widths and filters
- Search functionality should include count display and proper loading states
- User data should include manager information when appropriate
- Commit messages use emoji-based conventional commits via `npm run commit`
- The application uses activity detection to track user engagement
- Azure App Service deployment with slot swapping for zero-downtime releases
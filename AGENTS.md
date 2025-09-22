# AGENTS.md

**did** (always stylised in lowercase) is a calendar-to-timesheet web application built with React/TypeScript frontend and Node.js/Express backend, using GraphQL for API communication with Microsoft Graph API integration.

## Essential Commands

### Development
- `npm run watch` - Primary development command (concurrent client/server watching with hot reload)
- `npm run debug:server` - Server debugging with TypeScript compilation and Node inspector
- `npm run create-env` - Generate .env file for local development (run this first)

### Build & Deploy
- `npm run package` - Full production build (client + server + archive)
- `npm run package:client` - Build client only
- `npm run build:server` - Build server with TypeScript compilation

### Code Quality
- `npm run lint` - ESLint check for client/server TypeScript
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier:write` - Auto-format code (single quotes, no semicolons, 2-space indent)
- `npm test` - Run AVA test suite (2-minute timeout per test)

### Version Control
- `npm run commit` - Interactive commit with emojis using sexy-commits (recommended)
- Format: `commit "[changes]" "[type]" "[message]"` where type is from package.json gitmoji config

## Architecture Patterns

### Component Structure
All components follow this pattern in `/client/components/[ComponentName]/`:
```
ComponentName/
├── ComponentName.tsx       # Main component (functional with hooks)
├── ComponentName.module.scss # SCSS module (import as `styles`)
├── index.ts               # Re-exports
├── types.ts              # TypeScript interfaces
└── useComponentName.ts    # Logic hook (business logic separation)
```

### GraphQL Organization
- Queries: `/client/graphql-queries/[entity]/`
- Mutations: `/client/graphql-mutations/[entity]/`
- Fragments: `/client/graphql-client/fragments/`
- Server resolvers: `/server/graphql/resolvers/`
- Apollo Client configured with InMemoryCache and cache-and-network fetchPolicy

### Styling Conventions
- SCSS modules with `.module.scss` extension
- Import styles as `styles` from corresponding module
- Fluent UI components throughout
- BEM-like naming within SCSS files

### TypeScript Setup
- Separate tsconfig for client (ES2018) and server (Node.js)
- Decorators enabled for TypeGraphQL on server
- Prefer interfaces over types
- Explicit return types required

## Key Integration Points

### Microsoft Graph API
- Primary calendar and user data source
- Authentication via Azure AD (passport-azure-ad)
- Calendar events automatically become time entries
- User profiles include manager relationships

### Database & Caching
- MongoDB for persistent data storage
- Redis for sessions and API response caching
- TypeDI dependency injection on server
- Connection strings in environment variables

### Authentication Flow
- Primary: Azure AD OpenID Connect (`azuread-openidconnect`)
- Experimental: Google OAuth 2.0 for external users
- Session-based with Redis storage
- Bearer token support for API access

## Development Workflows

### Adding New Components
1. Create component structure following the pattern above
2. Include JSDoc comments for all functions/components
3. Separate logic into `use[ComponentName].ts` hook
4. Add SCSS module for styling
5. Export from component index.ts

### Working with GraphQL
1. Define fragments in `/client/graphql-client/fragments/`
2. Organize queries/mutations by entity domain
3. Use Apollo Client hooks in components
4. Server resolvers use TypeGraphQL decorators

### Internationalization
- Use `useTranslation` hook from react-i18next
- Add strings to `/client/i18n/[language].json` files
- Support for en-GB, nb (Norwegian Bokmål), nn (Norwegian Nynorsk)

## Environment Setup

### Required Environment Variables
```bash
# Authentication
MICROSOFT_CLIENT_ID=your_azure_ad_client_id
MICROSOFT_CLIENT_SECRET=your_azure_ad_client_secret

# Database
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017
MONGO_DB_DB_NAME=did

# Sessions & Security
SESSION_SIGNING_KEY=your_session_key
REDIS_CACHE_HOSTNAME=localhost
REDIS_CACHE_KEY=your_redis_key
API_TOKEN_SECRET=your_api_secret
```

### Node Requirements
- Node.js >= 22.14.0 LTS (see .nvmrc)
- npm >= 10.0.0

## Testing Strategy

### Framework & Setup
- AVA test framework with TypeScript support
- Tests alongside source files with `.test.ts` extension
- 2-minute timeout per test (configurable)
- Worker threads enabled for performance

### Running Tests
- `npm test` - Run all tests with verbose output
- Tests automatically run on PRs via GitHub Actions
- Use `[ava]` in commit message to trigger tests
- Use `[skip-ci]` to skip CI entirely

## Build System Details

### Webpack Configuration
- Custom Webpack 5 config in `/webpack/`
- TypeScript compilation with ts-loader
- SCSS modules with CSS extraction
- Bundle analysis available with `analyze` flag
- Hot reloading in development mode

### Production Optimizations
- Terser minification with custom config
- CSS extraction and optimization
- Source maps disabled in production
- Asset compression with gzip middleware

## Error Handling & Debugging

### Client-Side
- React Error Boundary in `/client/parts/ErrorFallback/`
- Console logging disabled in production (eslint rule)
- User-friendly error messages with toast notifications

### Server-Side
- Debug module for structured logging (`debug('namespace')`)
- Express error handling middleware
- GraphQL error formatting and reporting
- Rate limiting on API endpoints

## Security Considerations

### Authentication & Authorization
- Role-based permissions system in `/shared/config/security/`
- JWT tokens for API authentication
- Session-based auth for web interface
- CORS configuration for API access

### Data Protection
- Helmet middleware for security headers
- Input validation with class-validator
- SQL injection protection via MongoDB
- Environment variable validation

## Docker Support

### Development
- `npm run docker:setup` - Initial Docker environment setup
- `npm run docker:start` - Start containers
- `npm run docker:logs` - View container logs
- `npm run docker:shell` - Access container shell

### Production
- Multi-stage Dockerfile for optimized builds
- docker-compose for service orchestration
- Environment-specific overrides in compose files

## Performance Guidelines

### Client Optimizations
- Implement virtualization for long lists (>100 items)
- Use React.memo for expensive components
- Optimize GraphQL queries to fetch only needed fields
- Lazy load routes and components where possible

### Server Optimizations
- Redis caching for frequent queries
- Database query optimization
- GraphQL resolver batching
- Rate limiting to prevent abuse

## Deployment Notes

### Branch Strategy
- `main` - Production (did.crayonconsulting.no)
- `dev` - Development (didapp-dev.azurewebsites.net)
- `feat/` - Feature branches (deploy to dev)

### Azure App Service
- Slot swapping for zero-downtime deployments
- Environment-specific configuration
- Automatic scaling based on load
- Maintenance mode via `MAINTENANCE_MODE=true` environment variable

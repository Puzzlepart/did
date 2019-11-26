# Did 365 #

## Structure ##
### Server ###
Folder/File | Description
--- | --- | 
`/public` |
`/public/css` | CSS files
`/public/js` | JS files (hidden from `vscode`, `/client` puts the bundle here)
`/routes` | Express routes using HBS views
`/middleware` | Middleware like e.g. /graphql
`/middleware/graphql` | GraphQL implementation
`/middleware/graphql/resolvers` | GraphQL resolvers, queries and mutations
`/services` | Services (Graph and Table Storage)
`/utils` | Utilities
`/views` | Express HBS views
`app.js` | Express app
`server.js` | Node server  

### Client ###
Client files resides under `/client`. The resulting bundle ends up under `/public/js`.
 
## Development ##

### 1. Install npm packages using pnpm ###
`pnpm i`

### 2. Add Azure App Service extension to vscode ###



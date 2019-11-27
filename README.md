# Did365 #

## Structure ##

### Server ###
Folder/File | Description
--- | --- | 
`/public` |
`/public/css` | CSS files
`/public/js` | JS files (hidden from `vscode`, `/client` puts the bundle here)
`/routes` | Express routes using HBS views
`/middleware` |
`/middleware/graphql` | GraphQL implementation
`/middleware/graphql/resolvers` | GraphQL resolvers, queries and mutations
`/services` | Services (Graph and Table Storage)
`/utils` | Utilities
`/views` | Express HBS views
`app.js` | Express app
`server.js` | Node server  
***


### Client ###
Client files resides under `/client`. The resulting bundle ends up under `/public/js`.
 
## Development ##

### 1. Install npm packages using pnpm ###
`pnpm i`

### 2. Add the Azure App Service extension to vscode ###
https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice

### 3. Create an app registration in the Azure Portal ###

*  Log on to portal.azure.com with your subscription
*  Navigate to Azure Active Directory -> App registrations
*  Create a New registration with multi tenant support. Note down the App id - this is your OAUTH_APP_ID env variable
*  Authentication
   *  set the redirect URI's (localhost:port/auth/callback for dev, [yourwebsite].azurewebsites.net/auth/callback if you've created an enterprise app)
   *  Enable Implicit grant flow using both Access tokens and ID tokens
   *  Ensure Supported account types are set to Multitenant
*  Under Certificates & secrets, create a new Client secret and note it down - this is your OAUTH_APP_PASSWORD environment variables
* API permissions - all Delegated
    * Calendars.Read
    * User.Read
    * offline_access
    * openid
* Exposed APIs
  * Add a scope for Calendar.Read

### 4. Set up Azure Table Storage ###

#### TODO

### 5. Developing locally ###

At the moment you need to run two terminal instances to watch both client and server changes.  
* `npm run-script watch:server` 
* `npm run-script watch:client:development`

## Deploying ##

The `/master` branch - requiring pull requests, is set up with a CI/CD pipeline which deploys to did365.azurewebsites.net


### Maintainers

@olemp, @damsleth, @okms
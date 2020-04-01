# Structure #

Folder/File | Description
--- | --- | 
`/client` | Client TypeScript source using e.g. [React](https://reactjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/)`.
`/client/components` | React components
`/public` | Public assets, static files hosted under "/"
`/public/css` | CSS files
`/public/js` | JS files (hidden from `vscode`, the react bundle ends up here)
`/routes` | [Express](https://expressjs.com/) routes using [HBS](https://handlebarsjs.com/) views
`/middleware` | Server side Express middleware functions
`/middleware/passport` | [Passport](http://www.passportjs.org/) authentication middleware
`/middleware/graphql` | [GraphQL](https://github.com/graphql/graphql-js/) implementation
`/middleware/graphql/resolvers` | GraphQL resolvers, queries and mutations
`/services` | Services ([MS Graph](https://developer.microsoft.com/en-us/graph) and [Azure Table Storage](https://azure.microsoft.com/en-us/services/storage/tables/))
`/utils` | Utilities
`/views` | Express HBS views
`app.js` | Express app
`server.js` | [Node.js](http://nodejs.org/) server  
 
# Development #

* Check out the dev branch
* Run `pnpm install`
* Make a copy of `.env.sample` and rename it `.env`
* Set neccessary parameters in your new `.env` file (see `Set up .env` below)
* Install the [Azure App Service extension for vscode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
* Create an Azure app registration, or ask one of the [maintainers](#maintainers) for access to an existing one
* Run `npm run-script watch` to watch both `server` and `client` changes concurrently  

## Set up .env ##
You've copied `.env.sample` into `.env`.

Now you need to set the following properties/parameters:

**OAUTH_APP_ID**
ID of the AD application registration.

**OAUTH_APP_PASSWORD**
Password/key of the AD application registration.

**AZURE_STORAGE_CONNECTION_STRING**
Connection string for the Azure Table Storage

**SESSION_SIGNING_KEY**
Just a random string to secure the sessions.

# Branching / Deploying #

The `/master` branch requires pull requests, and is set up with a CI/CD pipeline which deploys to [did365.puzzlepart.com](https://did365.puzzlepart.com)  
The `/dev` branch also requires pull requests, and is set up with a CI/CD pipeline which deploys to [did365-dev.azurewebsites.net](https://did365-dev.azurewebsites.net)  
`/feature/*`-prefixed branches may or may not be included in future releases.

You are encouraged to branch with either of the following prefixes  
*  hotfix/
*  bugfix/
*  feature/

See also ["A successful Git branching model"](https://nvie.com/posts/a-successful-git-branching-model/)


If you want to test with your web app, checkout [Creating your own app registration in the Azure Portal](https://github.com/Puzzlepart/did365/wiki/Creating-your-own-app-registration-in-the-Azure-Portal) in our wiki.

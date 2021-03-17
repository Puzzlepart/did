## Contributing

_Contributions are very velcome! Here's some guidance to get started!_ :heart:


### Getting started

1. Check out the dev branch
2. Run `npm install`
3. Run `npm run-script create-env` to create your own `.env` file for local testing
4. Set neccessary parameters in your new `.env` file (see `Set up .env` below)
5. Install the [Azure App Service extension for vscode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
6. Install the [ESLint extension for vscode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
7. Install the [i18n Ally extension for vscode](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
8. Create an Azure app registration, or ask one of the [maintainers](#maintainers) for access to an existing one
9. Run `npm run-script watch` to watch both `server` and `client` changes concurrently  

The following permissions are required by Azure App Registration:

![azure-ad-app-registration-permissions](.assets/azure-ad-app-registration-permissions.png)


#### Set up environment

You've copied `.env.sample` into `.env`, anually or using `npm run-script create-env`.

Now you need to set the required environment variables from this table:

| Key                             | Description                                                  | Required |
| ------------------------------- | ------------------------------------------------------------ | -------- |
| `AUTH_PROVIDERS`          | Auth providers. E.g. `azuread-openidconnect` and `google`.   | **Yes**  |
| `MICROSOFT_CLIENT_ID` | ID of the AD application registration. | **Yes** |
| `MICROSOFT_CLIENT_SECRET` | Password/secret of the AD application registration. | **Yes** |
| `MICROSOFT_REDIRECT_URI` | Redirect URL for Microsoft (`azuread-openidconnect`) login   | **Yes**  |
| `MICROSOFT_SCOPES` | Scopes for Microsoft Graph queries. See https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent. | **Yes**  |
| `GOOGLE_CLIENT_ID` | ID of the Google application registration | No |
| `GOOGLE_CLIENT_SECRET` | Password/secret of the Google registration. | No |
| `GOOGLE_REDIRECT_URI` | Redirect URL for Google login | No |
| `GOOGLE_SCOPES` | Scopes for Google APIs and login | No |
| `PORT` | Defaults to `9001` | No       |
| `SESSION_NAME` | A unique name for the sessions. | No |
| `SESSION_SIGNING_KEY` | Just a random string to secure the sessions. | **Yes** |
| `REDIS_CACHE_HOSTNAME` | Hostname for the [Redis cache]([Redis](https://redis.io/)) | **Yes** |
| `REDIS_CACHE_KEY` | Secret key for the [Redis cache]([Redis](https://redis.io/)) | **Yes** |
| `APOLLO_KEY` | Key for reporting to [Apollo Studio](https://studio.apollographql.com/org/puzzlepart/graphs) | **Yes**  |
| `APOLLO_GRAPH_VARIANT` | Graph variant for reporting to [Apollo Studio](https://studio.apollographql.com/org/puzzlepart/graphs) | **Yes**  |
| `APOLLO_SCHEMA_REPORTING` | Report schema to [Apollo Studio](https://studio.apollographql.com/org/puzzlepart/graphs) | No       |
| `MONGO_DB_CONNECTION_STRING` | Connection string for MongoDB                                | **Yes**  |
| `MONGO_DB_DB_NAME` | Database name for MongoDB                                    | **Yes**  |
| `API_TOKEN_SECRET` | Secret to generate API tokens                                | **Yes**  |
| `BUNDLE_ANALYZER_MODE`          | See https://www.npmjs.com/package/webpack-bundle-analyzer. Default is server. | No       |
| `OPEN_DELAY`                    | Delay in seconds for opening Did in browser when running `watch`. | No       |
| `DEBUG`                         | To debug the Node backend. E.g. `app*` to see all logs from app. See https://www.npmjs.com/package/debug. | No       |
| `NO_BROWSER`                    | Set to `1` if you don't want to automatically open Did in the browser when running `watch` task. | No       |
|                     |  | No       |


### Code structure

| Folder/File                   | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `/client`                     | Client TypeScript source using e.g. [React](https://reactjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/)`. |
| `/client/common`              | Common elements like icons etc                               |
| `/client/components`          | React components reusable throughout the solution            |
| `/client/config`              | Conifguration                                                |
| `/client/graphql`             | Graphql implementation for the client using `@apollo/client` |
| `/client/helpers`             | Helper functions                                             |
| `/client/pages`               | Main pages of the solution                                   |
| `/client/types`               | Types, models and interfaces                                 |
| `/client/utils`               | Utility functions                                            |
| `/client/index.tsx`           | Main entry point for the app                                 |
| `/server/public`              | Public assets, static files hosted under "/"                 |
| `/server/public/css`          | CSS files                                                    |
| `/server/public/js`           | JS files (hidden from `vscode`, the react bundle ends up here) |
| `/server/routes`              | [Express](https://expressjs.com/) routes using [HBS](https://handlebarsjs.com/) views |
| `/server/graphql`             | [GraphQL](https://github.com/graphql/graphql-js/) implementation |
| `/server/graphql/resolvers`   | GraphQL resolvers, queries and mutations                     |
| `/server/middleware`          | Server side Express middleware functions                     |
| `/server/middleware/passport` | [Passport](http://www.passportjs.org/) authentication middleware |
| `/server/services`            | Services ([MS Graph](https://developer.microsoft.com/en-us/graph) and [Azure Table Storage](https://azure.microsoft.com/en-us/services/storage/tables/)) |
| `/server/utils`               | Utilities                                                    |
| `/server/views`               | Express HBS views                                            |
| `/server/app.ts`              | Express app                                                  |
| `/server/index.ts`            | [Node.js](http://nodejs.org/) server                         |

### Node version

**NB: Did should be developed with node >=12.18.3**


### Commits and `commitlint`
We are using [husky](https://github.com/typicode/husky) hooks to automatically run npm script `lint:fix` before commits. This is to make sure all files are linted and ready to go at all times. This is easy to forget when working on a branch.

You ***can** (but shouldn't) bypass pre-commit and commit-msg hooks using Git `--no-verify` option:

```shell
git commit -m "yolo!" --no-verify
```

For Git commands that don't have a `--no-verify` option, you can use HUSKY environment variable:

```shell
HUSKY=0 git push # yolo!
```

We are also using the `commit-msg` hook to enforce good commit messages with [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).

See `commitlint` in [package.json](./package.json). The commit message needs to be lowercase and have a prefix.

### Branching / Deploying

#### Main branch
The `/main` branch requires pull requests, and is set up with a CI/CD pipeline which deploys to [did.puzzlepart.com](https://did.puzzlepart.com)  

#### Dev branch
The `/dev` branch also requires pull requests, and is set up with a CI/CD pipeline which deploys to [didapp-dev.azurewebsites.net](https://didapp-dev.azurewebsites.net)  
`/feature/*`-prefixed branches may or may not be included in future releases.

#### Naming conventions
You are encouraged to branch with either of the following prefixes  
*  **hotfix/**
*  **bugfix/**
*  **feature/**

#### See also
See also [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

If you want to test with your web app, checkout [Creating your own app registration in the Azure Portal](https://github.com/Puzzlepart/did365/wiki/Creating-your-own-app-registration-in-the-Azure-Portal) in our wiki.


### GraphQL

#### Extensions for VS Code
The extension [Apollo extension for VS Code](https://www.apollographql.com/docs/devtools/editor-plugins/) is recommended for working with GraphQL in vscode.

> The Apollo [VS Code extension](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) provides an all-in-one tooling experience for developing apps with Apollo.
>
> The extension enables you to:
>
> - Add [syntax highlighting](https://www.apollographql.com/docs/devtools/editor-plugins/#syntax-highlighting) for GraphQL files and gql templates inside JavaScript files
> - Get instant feedback and [intelligent autocomplete](https://www.apollographql.com/docs/devtools/editor-plugins/#intelligent-autocomplete) for fields, arguments, types, and variables as you write queries
> - Manage client side schema alongside remote schema
> - See [performance information](https://www.apollographql.com/docs/devtools/editor-plugins/#performance-insights) inline with your query definitions
> - Validate field and argument usage in operations
> - [Navigate projects more easily](https://www.apollographql.com/docs/devtools/editor-plugins/#navigating-projects) with jump-to and peek-at definitions
> - Manage [client-only](https://www.apollographql.com/docs/devtools/editor-plugins/#client-only-schemas) schemas
> - [Switch graph variants](https://www.apollographql.com/docs/devtools/editor-plugins/#graph-variant-switching) to work with schemas running on different environments


### Documentation
 
The client is documented [here](./client/.docs/README.md) and the server is documented [here](./server/.docs/README.md).

_We use https://studio.apollographql.com/ for GraphQL schema documentation._

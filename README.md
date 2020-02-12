![DID365](https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2019/Nov/24/3199596412-11-pzl-did365-logo_avatar.png)  
_-The Calendar is The Timesheet in The Cloud!_  
[https://did365.puzzlepart.com/](https://did365.puzzlepart.com)  


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
* Install the [Azure App Service extension for vscode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
* Create an Azure app registration, or ask one of the [maintainers](#maintainers) for access to an existing one
* Run `npm run-script watch` to watch both `server` and `client` changes concurrently  

## Creating your own app registration in the Azure Portal ##

### **NOTE** This is if you want to test with your own development tenant. We have a registration in the Puzzlepart Azure ###

*  Log on to [portal.azure.com](https://portal.azure.com) with your subscription
*  Navigate to `Azure Active Directory -> App registrations`
*  Create a New registration 
   *  With multi tenant support.
   *  Note down the App id - this is your `OAUTH_APP_ID` env variable
*  Authentication
   *  Set the redirect URIs 
      *  localhost:port/auth/callback for dev
      *  _yourwebsite_.azurewebsites.net/auth/callback if you've created an enterprise app
   *  Enable Implicit grant flow using both `Access tokens` and `ID tokens`
   *  Ensure Supported account types are set to `Multitenant`
*  Certificates & secrets
   *  Create a new Client secret and note it down - this is your `OAUTH_APP_PASSWORD` environment variables
* API permissions - all Delegated
    * Calendars.Read
    * User.Read
    * offline_access
    * openid
* Exposed APIs
  * Add a scope for Calendar.Read

## Create Web App in Azure ##

Use Azure CLI Script

```cli
SUBSCRIPTION="Azure CSP"
RESOURCEGROUP="pzl-did"
LOCATION="westeurope"
PLANNAME="ASP-pzldid-a0b2"
PLANSKU="S1"
SITENAME="did365"

# login supports device login, username/password, and service principals
# see https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest#az_login
az login
# list all of the available subscriptions
az account list -o table
# set the default subscription for subsequent operations
az account set --subscription $SUBSCRIPTION
# create a resource group for your application
az group create --name $RESOURCEGROUP --location $LOCATION
# create an appservice plan (a machine) where your site will run
az appservice plan create --name $PLANNAME --location $LOCATION --sku $PLANSKU --resource-group $RESOURCEGROUP
# create the web application on the plan
# specify the node version your app requires
az webapp create --name $SITENAME --plan $PLANNAME --resource-group $RESOURCEGROUP

# To set up deployment from a local git repository, uncomment the following commands.
# first, set the username and password (use environment variables!)
# USERNAME=""
# PASSWORD=""
# az webapp deployment user set --user-name $USERNAME --password $PASSWORD

# now, configure the site for deployment. in this case, we will deploy from the local git repository
# you can also configure your site to be deployed from a remote git repository or set up a CI/CD workflow
# az webapp deployment source config-local-git --name $SITENAME --resource-group $RESOURCEGROUP

# the previous command returned the git remote to deploy to
# use this to set up a new remote named "azure"
# git remote add azure "https://$USERNAME@$SITENAME.scm.azurewebsites.net/$SITENAME.git"
# push master to deploy the site
# git push azure master

# browse to the site
# az webapp browse --name $SITENAME --resource-group $RESOURCEGROUP
```

## Azure Table Storage Configuration ##

### `TODO`

# Branching / Deploying #
##### NB: Ensure you're pushing an updated version of the bundle from `/client` until we have a working kudu deployment script #####

To make this easier use `npm run-script git:add:all` instead of `git add --all`.

This will do the same as `git add --all` but it will build a production build of the bundle as a pre task (see `pregit:add:all`).


The `/master` branch requires pull requests, and is set up with a CI/CD pipeline which deploys to [did365.azurewebsites.net](https://did365.azurewebsites.net)  
The `/dev` branch also requires pull requests, and is set up with a CI/CD pipeline which deploys to [https://did365-development.azurewebsites.net](https://did365-development.azurewebsites.net)  
`/feature/*`-prefixed branches may or may not be included in future releases.

You are encouraged to branch with either of the following prefixes  
*  hotfix/
*  bugfix/
*  feature/

See also ["A successful Git branching model"](https://nvie.com/posts/a-successful-git-branching-model/)


# Maintainers #

[@olemp](https://app.slack.com/client/T03QM007Y/D03QK7951), [@damsleth](https://app.slack.com/client/T03QM007Y/D1HRA2U4E), [@okms](https://app.slack.com/client/T03QM007Y/D03QN3XCH)  
[#DID365 on PzlSlack](https://app.slack.com/client/T03QM007Y/GQK65AT0S)

[did-server - v0.9.11](../README.md) / [App](../modules/app.md) / App

# Class: App

[App](../modules/app.md).App

Did `express` App

Defines our `express` app with our middleware
for helmet, passport and redis.

- Setting up session handling
- Setting [hbs](https://www.npmjs.com/package/hbs) as view engine
- Setting up static assets
- Setting up auth with [passport](https://www.npmjs.com/package/passport)
- Setting up [GraphQL](https://graphql.org/)
- Setting up routess
- Setting up error handling

Uses the following modules directly:

* [body-parser](https://www.npmjs.com/package/body-parser)
* [express](https://www.npmjs.com/package/express)
* [express-bearer-token](https://www.npmjs.com/package/express-bearer-token)
* [express-favicon](https://www.npmjs.com/package/express-favicon)
* [http-errors](https://www.npmjs.com/package/http-errors)
* [passport](https://www.npmjs.com/package/passport)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [morgan](https://www.npmjs.com/package/morgan)
* [underscore](https://www.npmjs.com/package/underscore)

## Table of contents

### Constructors

- [constructor](app.app-1.md#constructor)

### Properties

- [\_mongoClient](app.app-1.md#_mongoclient)
- [instance](app.app-1.md#instance)

### Methods

- [setup](app.app-1.md#setup)
- [setupAssets](app.app-1.md#setupassets)
- [setupAuth](app.app-1.md#setupauth)
- [setupErrorHandling](app.app-1.md#setuperrorhandling)
- [setupGraphQL](app.app-1.md#setupgraphql)
- [setupRoutes](app.app-1.md#setuproutes)
- [setupSession](app.app-1.md#setupsession)
- [setupViewEngine](app.app-1.md#setupviewengine)

## Constructors

### constructor

\+ **new App**(): [*App*](app.app-1.md)

Bootstrapping the express application

**Returns:** [*App*](app.app-1.md)

Defined in: [app.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L63)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [app.ts:63](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L63)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [app.ts:58](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L58)

## Methods

### setup

▸ **setup**(): *Promise*<void\>

Setup app

* Connecting to our Mongo client
* Setting up sessions
* Setting up view engine
* Setting up static assets
* Setting up authentication
* Setting up our [GraphQL](https://graphql.org/) API
* Setting up routes
* Setting up error handling

**Returns:** *Promise*<void\>

Defined in: [app.ts:93](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L93)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

* Serving *.js gzipped
* Serving our public folder

**Returns:** *void*

Defined in: [app.ts:131](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L131)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

* Using passport for user login
* Using express-bearer-token package to support external API calls
* Setting up auth route at /auth

**Returns:** *void*

Defined in: [app.ts:143](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L143)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling using http-errors

**Returns:** *void*

Defined in: [app.ts:181](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L181)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [app.ts:154](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L154)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

* Setting up * to use our index route giving the React
Router full control of the routing.

**Returns:** *void*

Defined in: [app.ts:164](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L164)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions using connect-redis

**Returns:** *void*

Defined in: [app.ts:113](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L113)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup hbs as view engine

**Returns:** *void*

Defined in: [app.ts:120](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L120)

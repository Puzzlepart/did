[did-server - v0.9.11](../README.md) / [App](../modules/app.md) / App

# Class: App

[App](../modules/app.md).App

Did Express.js App

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

Defined in: [app.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L40)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [app.ts:40](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L40)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [app.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L35)

## Methods

### setup

▸ **setup**(): *Promise*<void\>

Setup app

* Connecting to our Mongo client
* Setting up sessions
* Setting up view engine
* Setting up static assets
* Setting up authentication
* Setting up our GraphQL API
* Setting up routes
* Setting up error handling

**Returns:** *Promise*<void\>

Defined in: [app.ts:70](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L70)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

* Serving *.js gzipped
* Serving our public folder

**Returns:** *void*

Defined in: [app.ts:108](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L108)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

* Using passport for user login
* Using express-bearer-token package to support external API calls
* Setting up auth route at /auth

**Returns:** *void*

Defined in: [app.ts:120](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L120)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling using http-errors

**Returns:** *void*

Defined in: [app.ts:158](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L158)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [app.ts:131](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L131)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

* Setting up * to use our index route giving the React
Router full control of the routing.

**Returns:** *void*

Defined in: [app.ts:141](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L141)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions using connect-redis

**Returns:** *void*

Defined in: [app.ts:90](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L90)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup hbs as view engine

**Returns:** *void*

Defined in: [app.ts:97](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L97)

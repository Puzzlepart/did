[did-server - v0.9.8](../README.md) / [index](../modules/index.md) / App

# Class: App

[index](../modules/index.md).App

Did Express.js App

## Table of contents

### Constructors

- [constructor](index.app.md#constructor)

### Properties

- [\_mongoClient](index.app.md#_mongoclient)
- [instance](index.app.md#instance)

### Methods

- [setup](index.app.md#setup)
- [setupAssets](index.app.md#setupassets)
- [setupAuth](index.app.md#setupauth)
- [setupErrorHandling](index.app.md#setuperrorhandling)
- [setupGraphQL](index.app.md#setupgraphql)
- [setupRoutes](index.app.md#setuproutes)
- [setupSession](index.app.md#setupsession)
- [setupViewEngine](index.app.md#setupviewengine)

## Constructors

### constructor

\+ **new App**(): [*App*](app.app-1.md)

Bootstrapping the express application

**Returns:** [*App*](app.app-1.md)

Defined in: [server/app.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L35)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [server/app.ts:35](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L35)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [server/app.ts:30](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L30)

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

Defined in: [server/app.ts:65](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L65)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

* Serving *.js gzipped
* Serving our public folder

**Returns:** *void*

Defined in: [server/app.ts:103](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L103)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

* Using passport for user login
* Using express-bearer-token package to support external API calls
* Setting up auth route at /auth

**Returns:** *void*

Defined in: [server/app.ts:115](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L115)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling using http-errors

**Returns:** *void*

Defined in: [server/app.ts:147](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L147)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:126](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L126)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

* Setting up * to use our index route giving the React
Router full control of the routing.

**Returns:** *void*

Defined in: [server/app.ts:136](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L136)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions using connect-redis

**Returns:** *void*

Defined in: [server/app.ts:85](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L85)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup hbs as view engine

**Returns:** *void*

Defined in: [server/app.ts:92](https://github.com/Puzzlepart/did/blob/dev/server/app.ts#L92)

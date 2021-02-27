[did-server](../README.md) / [index](../modules/index.md) / App

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

Defined in: [server/app.ts:34](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L34)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [server/app.ts:34](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L34)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [server/app.ts:29](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L29)

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

Defined in: [server/app.ts:64](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L64)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

* Serving *.js gzipped
* Serving our public folder

**Returns:** *void*

Defined in: [server/app.ts:102](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L102)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

* Using passport for user login
* Using express-bearer-token package to support external API calls
* Setting up auth route at /auth

**Returns:** *void*

Defined in: [server/app.ts:114](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L114)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling using http-errors

**Returns:** *void*

Defined in: [server/app.ts:146](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L146)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:125](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L125)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

* Setting up * to use our index route giving the React
Router full control of the routing.

**Returns:** *void*

Defined in: [server/app.ts:135](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L135)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions using connect-redis

**Returns:** *void*

Defined in: [server/app.ts:84](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L84)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup hbs as view engine

**Returns:** *void*

Defined in: [server/app.ts:91](https://github.com/Puzzlepart/did/blob/45604452/server/app.ts#L91)

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

Defined in: [server/app.ts:29](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L29)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [server/app.ts:29](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L29)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [server/app.ts:24](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L24)

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

Defined in: [server/app.ts:59](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L59)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

* Serving *.js gzipped
* Serving our public folder

**Returns:** *void*

Defined in: [server/app.ts:97](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L97)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

* Using passport for user login
* Using express-bearer-token package to support external API calls
* Setting up auth route at /auth

**Returns:** *void*

Defined in: [server/app.ts:109](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L109)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling using http-errors

**Returns:** *void*

Defined in: [server/app.ts:141](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L141)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:120](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L120)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

* Setting up * to use our index route giving the React
Router full control of the routing.

**Returns:** *void*

Defined in: [server/app.ts:130](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L130)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions using connect-redis

**Returns:** *void*

Defined in: [server/app.ts:79](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L79)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup hbs as view engine

**Returns:** *void*

Defined in: [server/app.ts:86](https://github.com/Puzzlepart/did/blob/7f92b547/server/app.ts#L86)

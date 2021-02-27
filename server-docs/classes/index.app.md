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

Defined in: [server/app.ts:31](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L31)

## Properties

### \_mongoClient

• `Private` **\_mongoClient**: *MongoClient*

Mongo client

Defined in: [server/app.ts:31](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L31)

___

### instance

• **instance**: *Application*

The express.Application instance

Defined in: [server/app.ts:26](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L26)

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

Defined in: [server/app.ts:61](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L61)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

**Returns:** *void*

Defined in: [server/app.ts:96](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L96)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

**Returns:** *void*

Defined in: [server/app.ts:104](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L104)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling

**Returns:** *void*

Defined in: [server/app.ts:133](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L133)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:115](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L115)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

**Returns:** *void*

Defined in: [server/app.ts:122](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L122)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions

**Returns:** *void*

Defined in: [server/app.ts:81](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L81)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup view engine

**Returns:** *void*

Defined in: [server/app.ts:88](https://github.com/Puzzlepart/did/blob/553eb42d/server/app.ts#L88)

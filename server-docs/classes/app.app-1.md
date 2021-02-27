[did-server](../README.md) / [app](../modules/app.md) / App

# Class: App

[app](../modules/app.md).App

## Table of contents

### Constructors

- [constructor](app.app-1.md#constructor)

### Properties

- [\_client](app.app-1.md#_client)
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

**Returns:** [*App*](app.app-1.md)

Defined in: [server/app.ts:21](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L21)

## Properties

### \_client

• `Private` **\_client**: *MongoClient*

Defined in: [server/app.ts:21](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L21)

___

### instance

• **instance**: *Application*

Defined in: [server/app.ts:20](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L20)

## Methods

### setup

▸ **setup**(): *Promise*<void\>

Setup app

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:39](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L39)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

**Returns:** *void*

Defined in: [server/app.ts:74](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L74)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

**Returns:** *void*

Defined in: [server/app.ts:82](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L82)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling

**Returns:** *void*

Defined in: [server/app.ts:111](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L111)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:93](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L93)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

**Returns:** *void*

Defined in: [server/app.ts:100](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L100)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions

**Returns:** *void*

Defined in: [server/app.ts:59](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L59)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup view engine

**Returns:** *void*

Defined in: [server/app.ts:66](https://github.com/Puzzlepart/did/blob/c2c7c3a8/server/app.ts#L66)

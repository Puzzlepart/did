[did-server](../README.md) / [index](../modules/index.md) / App

# Class: App

[index](../modules/index.md).App

## Table of contents

### Constructors

- [constructor](index.app.md#constructor)

### Properties

- [\_client](index.app.md#_client)
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

**Returns:** [*App*](app.app-1.md)

Defined in: [server/app.ts:21](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L21)

## Properties

### \_client

• `Private` **\_client**: *MongoClient*

Defined in: [server/app.ts:21](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L21)

___

### instance

• **instance**: *Application*

Defined in: [server/app.ts:20](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L20)

## Methods

### setup

▸ **setup**(): *Promise*<void\>

Setup app

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:39](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L39)

___

### setupAssets

▸ **setupAssets**(): *void*

Setup static assets

**Returns:** *void*

Defined in: [server/app.ts:74](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L74)

___

### setupAuth

▸ **setupAuth**(): *void*

Setup authentication

**Returns:** *void*

Defined in: [server/app.ts:82](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L82)

___

### setupErrorHandling

▸ **setupErrorHandling**(): *void*

Setup error handling

**Returns:** *void*

Defined in: [server/app.ts:111](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L111)

___

### setupGraphQL

▸ **setupGraphQL**(): *Promise*<void\>

Setup graphql

**Returns:** *Promise*<void\>

Defined in: [server/app.ts:93](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L93)

___

### setupRoutes

▸ **setupRoutes**(): *void*

Setup routes

**Returns:** *void*

Defined in: [server/app.ts:100](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L100)

___

### setupSession

▸ **setupSession**(): *void*

Setup sessions

**Returns:** *void*

Defined in: [server/app.ts:59](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L59)

___

### setupViewEngine

▸ **setupViewEngine**(): *void*

Setup view engine

**Returns:** *void*

Defined in: [server/app.ts:66](https://github.com/Puzzlepart/did/blob/f9e4ba75/server/app.ts#L66)

[did-server](../README.md) / [services](../modules/services.md) / MongoService

# Class: MongoService

[services](../modules/services.md).MongoService

## Table of contents

### Constructors

- [constructor](services.mongoservice.md#constructor)

### Accessors

- [apiToken](services.mongoservice.md#apitoken)
- [customer](services.mongoservice.md#customer)
- [label](services.mongoservice.md#label)
- [project](services.mongoservice.md#project)
- [reports](services.mongoservice.md#reports)
- [role](services.mongoservice.md#role)
- [subscription](services.mongoservice.md#subscription)
- [user](services.mongoservice.md#user)

## Constructors

### constructor

\+ **new MongoService**(`context`: [*Context*](graphql_context.context.md)): [*MongoService*](services.mongoservice.md)

Constructor

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`context` | [*Context*](graphql_context.context.md) | Injected context through typedi    |

**Returns:** [*MongoService*](services.mongoservice.md)

Defined in: [server/services/mongo/index.ts:15](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L15)

## Accessors

### apiToken

• get **apiToken**(): [*ApiTokenService*](services.apitokenservice.md)

**Returns:** [*ApiTokenService*](services.apitokenservice.md)

Defined in: [server/services/mongo/index.ts:51](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L51)

___

### customer

• get **customer**(): [*CustomerService*](services.customerservice.md)

**Returns:** [*CustomerService*](services.customerservice.md)

Defined in: [server/services/mongo/index.ts:39](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L39)

___

### label

• get **label**(): *LabelService*

**Returns:** *LabelService*

Defined in: [server/services/mongo/index.ts:43](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L43)

___

### project

• get **project**(): [*ProjectService*](services.projectservice.md)

**Returns:** [*ProjectService*](services.projectservice.md)

Defined in: [server/services/mongo/index.ts:35](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L35)

___

### reports

• get **reports**(): [*ReportsService*](services.reportsservice.md)

**Returns:** [*ReportsService*](services.reportsservice.md)

Defined in: [server/services/mongo/index.ts:47](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L47)

___

### role

• get **role**(): [*RoleService*](services.roleservice.md)

**Returns:** [*RoleService*](services.roleservice.md)

Defined in: [server/services/mongo/index.ts:27](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L27)

___

### subscription

• get **subscription**(): [*SubscriptionService*](services.subscriptionservice.md)

**Returns:** [*SubscriptionService*](services.subscriptionservice.md)

Defined in: [server/services/mongo/index.ts:31](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L31)

___

### user

• get **user**(): [*UserService*](services.userservice.md)

**Returns:** [*UserService*](services.userservice.md)

Defined in: [server/services/mongo/index.ts:23](https://github.com/Puzzlepart/did/blob/efc2ef18/server/services/mongo/index.ts#L23)

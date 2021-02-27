[did-server](../README.md) / [Modules](../modules.md) / [@custom-types](../modules/_custom_types.md) / [Express](../modules/_custom_types.express.md) / Session

# Interface: Session

[@custom-types](../modules/_custom_types.md).[Express](../modules/_custom_types.express.md).Session

## Hierarchy

* [*SessionData*](_custom_types.express.sessiondata.md)

  ↳ **Session**

## Table of contents

### Properties

- [cookie](_custom_types.express.session.md#cookie)
- [id](_custom_types.express.session.md#id)

### Methods

- [destroy](_custom_types.express.session.md#destroy)
- [regenerate](_custom_types.express.session.md#regenerate)
- [reload](_custom_types.express.session.md#reload)
- [save](_custom_types.express.session.md#save)
- [touch](_custom_types.express.session.md#touch)

## Properties

### cookie

• **cookie**: [*SessionCookie*](_custom_types.express.sessioncookie.md)

Overrides: [SessionData](_custom_types.express.sessiondata.md).[cookie](_custom_types.express.sessiondata.md#cookie)

Defined in: node_modules/@types/express-session/index.d.ts:51

___

### id

• **id**: *string*

Defined in: node_modules/@types/express-session/index.d.ts:45

## Methods

### destroy

▸ **destroy**(`callback`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/express-session/index.d.ts:47

___

### regenerate

▸ **regenerate**(`callback`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/express-session/index.d.ts:46

___

### reload

▸ **reload**(`callback`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/express-session/index.d.ts:48

___

### save

▸ **save**(`callback`: (`err`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`err`: *any*) => *void* |

**Returns:** *void*

Defined in: node_modules/@types/express-session/index.d.ts:49

___

### touch

▸ **touch**(): *void*

**Returns:** *void*

Defined in: node_modules/@types/express-session/index.d.ts:50

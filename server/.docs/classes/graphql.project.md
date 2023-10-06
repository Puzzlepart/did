[did-server - v0.13.0](../README.md) / [GraphQL](../modules/graphql.md) / Project

# Class: Project

[GraphQL](../modules/graphql.md).Project

## Table of contents

### Constructors

- [constructor](graphql.project.md#constructor)

### Properties

- [\_id](graphql.project.md#_id)
- [customer](graphql.project.md#customer)
- [customerKey](graphql.project.md#customerkey)
- [description](graphql.project.md#description)
- [externalSystemURL](graphql.project.md#externalsystemurl)
- [icon](graphql.project.md#icon)
- [inactive](graphql.project.md#inactive)
- [key](graphql.project.md#key)
- [labels](graphql.project.md#labels)
- [name](graphql.project.md#name)
- [outlookCategory](graphql.project.md#outlookcategory)
- [tag](graphql.project.md#tag)
- [webLink](graphql.project.md#weblink)

## Constructors

### constructor

\+ **new Project**(`input?`: [*ProjectInput*](graphql.projectinput.md)): [*Project*](graphql.project.md)

Constructs a new Project.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`input?` | [*ProjectInput*](graphql.projectinput.md) | The input to construct the project from.    |

**Returns:** [*Project*](graphql.project.md)

Defined in: [graphql/resolvers/project/types.ts:158](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L158)

## Properties

### \_id

• **\_id**: *string*

The unique identifier of the project.

Defined in: [graphql/resolvers/project/types.ts:86](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L86)

___

### customer

• `Optional` **customer**: [*Customer*](graphql.customer.md)

The customer of the project.

Defined in: [graphql/resolvers/project/types.ts:140](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L140)

___

### customerKey

• **customerKey**: *string*

The customer key of the project.

Defined in: [graphql/resolvers/project/types.ts:104](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L104)

___

### description

• **description**: *string*

The description of the project.

Defined in: [graphql/resolvers/project/types.ts:116](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L116)

___

### externalSystemURL

• `Optional` **externalSystemURL**: *string*

The external system URL of the project.

Defined in: [graphql/resolvers/project/types.ts:134](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L134)

___

### icon

• **icon**: *string*

The icon of the project.

Defined in: [graphql/resolvers/project/types.ts:122](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L122)

___

### inactive

• `Optional` **inactive**: *boolean*

Whether the project is inactive or not.

Defined in: [graphql/resolvers/project/types.ts:152](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L152)

___

### key

• **key**: *string*

The key of the project.

Defined in: [graphql/resolvers/project/types.ts:98](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L98)

___

### labels

• `Optional` **labels**: *string*[] \| [*LabelObject*](graphql.labelobject.md)[]

The labels of the project.

Defined in: [graphql/resolvers/project/types.ts:158](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L158)

___

### name

• **name**: *string*

The name of the project.

Defined in: [graphql/resolvers/project/types.ts:110](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L110)

___

### outlookCategory

• `Optional` **outlookCategory**: [*OutlookCategory*](graphql.outlookcategory.md)

The outlook category of the project.

Defined in: [graphql/resolvers/project/types.ts:146](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L146)

___

### tag

• `Optional` **tag**: *string*

The tag of the project.

Defined in: [graphql/resolvers/project/types.ts:92](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L92)

___

### webLink

• `Optional` **webLink**: *string*

The web link of the project.

Defined in: [graphql/resolvers/project/types.ts:128](https://github.com/Puzzlepart/did/blob/dev/server/graphql/resolvers/project/types.ts#L128)

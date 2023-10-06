[did-shared - v0.13.0](../README.md) / [Security](../modules/security.md) / IPermissionInfo

# Interface: IPermissionInfo

[Security](../modules/security.md).IPermissionInfo

## Table of contents

### Properties

- [api](security.ipermissioninfo.md#api)
- [category](security.ipermissioninfo.md#category)
- [description](security.ipermissioninfo.md#description)
- [disabled](security.ipermissioninfo.md#disabled)
- [iconName](security.ipermissioninfo.md#iconname)
- [id](security.ipermissioninfo.md#id)
- [name](security.ipermissioninfo.md#name)

## Properties

### api

• `Optional` **api**: *boolean*

Callable from external API

Defined in: [shared/config/security/types.ts:58](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L58)

___

### category

• `Optional` **category**: *timesheet* \| *customers* \| *projects* \| *admin* \| *reports* \| *api*

Category for the permission

Defined in: [shared/config/security/types.ts:40](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L40)

___

### description

• `Optional` **description**: *string*

Description of the permission

Defined in: [shared/config/security/types.ts:35](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L35)

___

### disabled

• `Optional` **disabled**: *boolean*

Disabled (not available for use)

Defined in: [shared/config/security/types.ts:63](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L63)

___

### iconName

• `Optional` **iconName**: *string*

Icon that describe the permission

**`see`** https://developer.microsoft.com/en-us/fluentui#/styles/web/icons

Defined in: [shared/config/security/types.ts:53](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L53)

___

### id

• `Optional` **id**: [*PermissionScope*](../enums/security.permissionscope.md)

Permission ID

Defined in: [shared/config/security/types.ts:25](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L25)

___

### name

• **name**: *string*

Name of the permission

Defined in: [shared/config/security/types.ts:30](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/types.ts#L30)

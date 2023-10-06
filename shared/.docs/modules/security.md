[did-shared - v0.13.0](../README.md) / Security

# Module: Security

Shared security configuration used by
both the client and the server.

## Table of contents

### Enumerations

- [PermissionScope](../enums/security.permissionscope.md)

### Interfaces

- [IPermissionInfo](../interfaces/security.ipermissioninfo.md)

### Functions

- [getPermissions](security.md#getpermissions)

## Functions

### getPermissions

▸ `Const`**getPermissions**(`t`: TFunction): *Record*<string, [*IPermissionInfo*](../interfaces/security.ipermissioninfo.md)\>

Get all permissions available in the system.

Need to provide `t`(translate function) since this is not
a React hook or component.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate funcion    |

**Returns:** *Record*<string, [*IPermissionInfo*](../interfaces/security.ipermissioninfo.md)\>

Defined in: [shared/config/security/permissions.ts:12](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/permissions.ts#L12)

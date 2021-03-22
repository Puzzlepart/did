[did-shared - v0.9.11](../README.md) / Security

# Module: Security

Shared security configuration used by
both the client and the server.

## Table of contents

### Enumerations

- [PermissionScope](../enums/security.permissionscope.md)

### Interfaces

- [IPermission](../interfaces/security.ipermission.md)

### Functions

- [getPermissions](security.md#getpermissions)

## Functions

### getPermissions

▸ **getPermissions**(`t`: TFunction): [*IPermission*](../interfaces/security.ipermission.md)[]

Get permissions

Specifiy translate function for i18n

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`t` | TFunction | Translate funcion    |

**Returns:** [*IPermission*](../interfaces/security.ipermission.md)[]

Defined in: [shared/config/security/permissions.ts:59](https://github.com/Puzzlepart/did/blob/dev/shared/config/security/permissions.ts#L59)

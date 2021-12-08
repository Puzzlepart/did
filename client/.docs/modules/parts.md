[did-client - v0.10.6](../README.md) / Parts

# Module: Parts

App components

## Table of contents

### Classes

- [NotificationModel](../classes/parts.notificationmodel.md)

### Navigation Interfaces

- [INavItemProps](../interfaces/parts.inavitemprops.md)

### Other Interfaces

- [IMobileBreadcrumbItem](../interfaces/parts.imobilebreadcrumbitem.md)
- [IMobileBreadcrumbProps](../interfaces/parts.imobilebreadcrumbprops.md)
- [INotificationsPanelProps](../interfaces/parts.inotificationspanelprops.md)
- [IUserNotificationProps](../interfaces/parts.iusernotificationprops.md)
- [IUserNotificationsProps](../interfaces/parts.iusernotificationsprops.md)

### Function Component Variables

- [FeedbackPanel](parts.md#feedbackpanel)
- [MobileBreadcrumb](parts.md#mobilebreadcrumb)
- [Navigation](parts.md#navigation)
- [NotificationsPanel](parts.md#notificationspanel)
- [UserFeedback](parts.md#userfeedback)
- [UserMenu](parts.md#usermenu)
- [UserNotification](parts.md#usernotification)
- [UserNotifications](parts.md#usernotifications)

### Navigation Variables

- [NavItem](parts.md#navitem)

### Function Component Functions

- [ErrorFallback](parts.md#errorfallback)

### Other Functions

- [useMobileBreadcrumb](parts.md#usemobilebreadcrumb)

## Function Component Variables

### FeedbackPanel

• `Const` **FeedbackPanel**: *React.FC*<IPanelProps\>

Defined in: [client/parts/UserFeedback/FeedbackPanel/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserFeedback/FeedbackPanel/index.tsx#L18)

___

### MobileBreadcrumb

• `Const` **MobileBreadcrumb**: *React.FC*<[*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md)\>

Defined in: [client/parts/MobileBreadcrumb/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/parts/MobileBreadcrumb/index.tsx#L14)

___

### Navigation

• `Const` **Navigation**: React.FC

Defined in: [client/parts/Navigation/index.tsx:18](https://github.com/Puzzlepart/did/blob/dev/client/parts/Navigation/index.tsx#L18)

___

### NotificationsPanel

• `Const` **NotificationsPanel**: *React.FC*<IPanelProps\>

Defined in: [client/parts/UserNotifications/NotificationsPanel/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/NotificationsPanel/index.tsx#L14)

___

### UserFeedback

• `Const` **UserFeedback**: *React.FC*<IUserFeedbackProps\>

User feedback

Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
is set to `true`.

An icon name is optional and defaults to **Emoji2**

Defined in: [client/parts/UserFeedback/index.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserFeedback/index.tsx#L21)

___

### UserMenu

• `Const` **UserMenu**: React.FC

Defined in: [client/parts/UserMenu/index.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserMenu/index.tsx#L23)

___

### UserNotification

• `Const` **UserNotification**: *React.FC*<[*IUserNotificationProps*](../interfaces/parts.iusernotificationprops.md)\>

Defined in: [client/parts/UserNotifications/NotificationsPanel/UserNotification/index.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/NotificationsPanel/UserNotification/index.tsx#L14)

___

### UserNotifications

• `Const` **UserNotifications**: *React.FC*<[*IUserNotificationsProps*](../interfaces/parts.iusernotificationsprops.md)\>

User notifications

Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
is set to `true`.

An icon name is optional and defaults to **Ringer**

Defined in: [client/parts/UserNotifications/index.tsx:24](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/index.tsx#L24)

___

## Navigation Variables

### NavItem

• `Const` **NavItem**: *React.FC*<[*INavItemProps*](../interfaces/parts.inavitemprops.md)\>

Defined in: [client/parts/Navigation/NavItem/index.tsx:12](https://github.com/Puzzlepart/did/blob/dev/client/parts/Navigation/NavItem/index.tsx#L12)

## Function Component Functions

### ErrorFallback

▸ `Const`**ErrorFallback**(`__namedParameters`: IErrorFallbackProps): *Element*

Error fallback for `<ErrorBoundary />`  from
`react-error-boundary`

Shows the `error` message and provides two
buttons. One that redirects the user to
GitHub to create a new **bug** and one that
executes `resetErrorBoundary` that might
temporarily solve the issue.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | IErrorFallbackProps |

**Returns:** *Element*

Defined in: [client/parts/ErrorFallback/index.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/parts/ErrorFallback/index.tsx#L21)

___

## Other Functions

### useMobileBreadcrumb

▸ **useMobileBreadcrumb**(`props`: [*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md)): IBreadcrumbItem[]

Returns the items that should be rendered by
`<MobileBreadcrumb />`

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md) |

**Returns:** IBreadcrumbItem[]

Defined in: [client/parts/MobileBreadcrumb/useMobileBreadcrumb.ts:11](https://github.com/Puzzlepart/did/blob/dev/client/parts/MobileBreadcrumb/useMobileBreadcrumb.ts#L11)

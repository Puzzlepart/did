[did-client - v0.13.0](../README.md) / Parts

# Module: Parts

App components

## Table of contents

### Namespaces

- [ErrorFallback](parts.errorfallback.md)
- [MobileBreadcrumb](parts.mobilebreadcrumb.md)
- [NavItem](parts.navitem.md)
- [Navigation](parts.navigation.md)
- [NotificationsPanel](parts.notificationspanel.md)
- [UserFeedback](parts.userfeedback.md)
- [UserMenu](parts.usermenu.md)
- [UserNotification](parts.usernotification.md)
- [UserNotifications](parts.usernotifications.md)

### Classes

- [NotificationModel](../classes/parts.notificationmodel.md)

### Navigation Interfaces

- [INavItemProps](../interfaces/parts.inavitemprops.md)

### Other Interfaces

- [IErrorFallbackProps](../interfaces/parts.ierrorfallbackprops.md)
- [IMobileBreadcrumbItem](../interfaces/parts.imobilebreadcrumbitem.md)
- [IMobileBreadcrumbProps](../interfaces/parts.imobilebreadcrumbprops.md)
- [INotificationsPanelProps](../interfaces/parts.inotificationspanelprops.md)
- [IUserNotificationProps](../interfaces/parts.iusernotificationprops.md)
- [IUserNotificationsProps](../interfaces/parts.iusernotificationsprops.md)

### Function Component Variables

- [ErrorFallback](parts.md#errorfallback)
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

### Functions

- [useMobileBreadcrumb](parts.md#usemobilebreadcrumb)

## Function Component Variables

### ErrorFallback

• `Const` **ErrorFallback**: *StyledComponent*<[*IErrorFallbackProps*](../interfaces/parts.ierrorfallbackprops.md)\>

Error fallback for `<ErrorBoundary />`  from
`react-error-boundary`

Shows the `error` message and provides a
button that  executes `resetErrorBoundary` that might
temporarily solve the issue (in some cases).

Defined in: [client/parts/ErrorFallback/ErrorFallback.tsx:20](https://github.com/Puzzlepart/did/blob/dev/client/parts/ErrorFallback/ErrorFallback.tsx#L20)

___

### FeedbackPanel

• `Const` **FeedbackPanel**: *FC*<IPanelProps\>

Defined in: [client/parts/UserFeedback/FeedbackPanel/index.tsx:17](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserFeedback/FeedbackPanel/index.tsx#L17)

___

### MobileBreadcrumb

• `Const` **MobileBreadcrumb**: *StyledComponent*<[*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md)\>

Defined in: [client/parts/MobileBreadcrumb/MobileBreadcrumb.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/parts/MobileBreadcrumb/MobileBreadcrumb.tsx#L13)

___

### Navigation

• `Const` **Navigation**: StyledComponent

Defined in: [client/parts/Navigation/Navigation.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/parts/Navigation/Navigation.tsx#L21)

___

### NotificationsPanel

• `Const` **NotificationsPanel**: *StyledComponent*<IPanelProps\>

Defined in: [client/parts/UserNotifications/NotificationsPanel/index.tsx:16](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/NotificationsPanel/index.tsx#L16)

___

### UserFeedback

• `Const` **UserFeedback**: *StyledComponent*<IUserFeedbackProps\>

User feedback

Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
is set to `true`.

An icon name is optional and defaults to **Emoji2**

Defined in: [client/parts/UserFeedback/index.tsx:22](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserFeedback/index.tsx#L22)

___

### UserMenu

• `Const` **UserMenu**: StyledComponent

Defined in: [client/parts/UserMenu/UserMenu.tsx:21](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserMenu/UserMenu.tsx#L21)

___

### UserNotification

• `Const` **UserNotification**: *StyledComponent*<[*IUserNotificationProps*](../interfaces/parts.iusernotificationprops.md)\>

Defined in: [client/parts/UserNotifications/NotificationsPanel/UserNotification/index.tsx:13](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/NotificationsPanel/UserNotification/index.tsx#L13)

___

### UserNotifications

• `Const` **UserNotifications**: *StyledComponent*<[*IUserNotificationsProps*](../interfaces/parts.iusernotificationsprops.md)\>

User notifications

Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
is set to `true`.

An icon name is optional and defaults to **Ringer**

Defined in: [client/parts/UserNotifications/index.tsx:23](https://github.com/Puzzlepart/did/blob/dev/client/parts/UserNotifications/index.tsx#L23)

___

## Navigation Variables

### NavItem

• `Const` **NavItem**: *StyledComponent*<[*INavItemProps*](../interfaces/parts.inavitemprops.md)\>

Defined in: [client/parts/Navigation/NavItem/NavItem.tsx:14](https://github.com/Puzzlepart/did/blob/dev/client/parts/Navigation/NavItem/NavItem.tsx#L14)

## Functions

### useMobileBreadcrumb

▸ **useMobileBreadcrumb**(`props`: [*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md)): IBreadcrumbItem[]

Returns the items that should be rendered by
`<MobileBreadcrumb />`

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IMobileBreadcrumbProps*](../interfaces/parts.imobilebreadcrumbprops.md) |

**Returns:** IBreadcrumbItem[]

Defined in: [client/parts/MobileBreadcrumb/useMobileBreadcrumb.ts:10](https://github.com/Puzzlepart/did/blob/dev/client/parts/MobileBreadcrumb/useMobileBreadcrumb.ts#L10)

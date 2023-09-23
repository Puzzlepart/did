[did-client - v0.13.0](../README.md) / [Pages](../modules/pages.md) / IProjectsState

# Interface: IProjectsState

[Pages](../modules/pages.md).IProjectsState

Represents the state of the Projects component.

## Table of contents

### Properties

- [editProject](pages.iprojectsstate.md#editproject)
- [error](pages.iprojectsstate.md#error)
- [outlookCategories](pages.iprojectsstate.md#outlookcategories)
- [projects](pages.iprojectsstate.md#projects)
- [selected](pages.iprojectsstate.md#selected)

## Properties

### editProject

• `Optional` **editProject**: *Project*

The project being edited.

Defined in: [client/pages/Projects/types.tsx:36](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/types.tsx#L36)

___

### error

• `Optional` **error**: *ApolloError*

The error that occurred while fetching or updating data.

Defined in: [client/pages/Projects/types.tsx:46](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/types.tsx#L46)

___

### outlookCategories

• `Optional` **outlookCategories**: *OutlookCategory*[]

The list of Outlook categories for the current user.

Defined in: [client/pages/Projects/types.tsx:41](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/types.tsx#L41)

___

### projects

• `Optional` **projects**: *Project*[]

The list of projects.

Defined in: [client/pages/Projects/types.tsx:31](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/types.tsx#L31)

___

### selected

• `Optional` **selected**: *Project*

The currently selected project.

Defined in: [client/pages/Projects/types.tsx:26](https://github.com/Puzzlepart/did/blob/dev/client/pages/Projects/types.tsx#L26)

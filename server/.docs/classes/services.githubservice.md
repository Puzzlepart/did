[did-server - v0.13.0](../README.md) / [Services](../modules/services.md) / GitHubService

# Class: GitHubService

[Services](../modules/services.md).GitHubService

GitHub service

## Table of contents

### Constructors

- [constructor](services.githubservice.md#constructor)

### Properties

- [\_auth](services.githubservice.md#_auth)

### Methods

- [\_getAccessToken](services.githubservice.md#_getaccesstoken)
- [createIssue](services.githubservice.md#createissue)

## Constructors

### constructor

\+ **new GitHubService**(): [*GitHubService*](services.githubservice.md)

**Returns:** [*GitHubService*](services.githubservice.md)

## Properties

### \_auth

• `Private` **\_auth**: *AuthInterface*<[AuthOptions], Authentication\>

Defined in: [services/github.ts:13](https://github.com/Puzzlepart/did/blob/dev/server/services/github.ts#L13)

## Methods

### \_getAccessToken

▸ `Private`**_getAccessToken**(): *Promise*<string\>

Retrieves an access token for the GitHub API.

**Returns:** *Promise*<string\>

A Promise that resolves to a string representing
the access token.

Defined in: [services/github.ts:27](https://github.com/Puzzlepart/did/blob/dev/server/services/github.ts#L27)

___

### createIssue

▸ **createIssue**(`title`: *string*, `body`: *string*, `labels`: *string*[], `owner?`: *string*, `repo?`: *string*): *Promise*<number\>

Creates a new issue in the specified GitHub repository.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`title` | *string* | The title of the issue.   |
`body` | *string* | The body of the issue.   |
`labels` | *string*[] | An array of labels to apply to the issue.   |
`owner` | *string* | The owner of the repository. Defaults to the value of the GITHUB_FEEDBACK_OWNER environment variable.   |
`repo` | *string* | The name of the repository. Defaults to the value of the GITHUB_FEEDBACK_REPO environment variable.    |

**Returns:** *Promise*<number\>

The number of the newly created issue.

Defined in: [services/github.ts:45](https://github.com/Puzzlepart/did/blob/dev/server/services/github.ts#L45)

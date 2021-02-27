[did-server](../README.md) / middleware

# Module: middleware

## Table of contents

### Functions

- [redisSession](middleware.md#redissession)

## Functions

### redisSession

▸ `Const`**redisSession**(): *RequestHandler*<ParamsDictionary, any, any, ParsedQs\>

Defines session configuration; we use Redis for the session store.
"secret" will be used to create the session ID hash (the cookie id and the redis key value)
"name" will show up as your cookie name in the browser
"cookie" is provided by default; you can add it to add additional personalized options
The "store" ttl is the expiration time for each Redis session ID, in seconds

**Returns:** *RequestHandler*<ParamsDictionary, any, any, ParsedQs\>

Defined in: [server/middleware/session/index.ts:14](https://github.com/Puzzlepart/did/blob/846b6048/server/middleware/session/index.ts#L14)

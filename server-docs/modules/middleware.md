[did-server](../README.md) / middleware

# Module: middleware

## Table of contents

### Variables

- [RedisClient](middleware.md#redisclient)
- [helmetMiddleware](middleware.md#helmetmiddleware)

### Functions

- [passportMiddleware](middleware.md#passportmiddleware)
- [redisSessionMiddleware](middleware.md#redissessionmiddleware)
- [serveGzippedMiddleware](middleware.md#servegzippedmiddleware)

## Variables

### RedisClient

• `Const` **RedisClient**: *RedisClient*

Redis client

Defined in: [server/middleware/redis/index.ts:7](https://github.com/Puzzlepart/did/blob/7f92b547/server/middleware/redis/index.ts#L7)

___

### helmetMiddleware

• `Const` **helmetMiddleware**: *any*

Helmet configuration

Defined in: [server/middleware/helmet/index.ts:6](https://github.com/Puzzlepart/did/blob/7f92b547/server/middleware/helmet/index.ts#L6)

## Functions

### passportMiddleware

▸ `Const`**passportMiddleware**(`mongoClient`: *MongoClient*): *PassportStatic*

Setup passport to be used for authentication

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mongoClient` | *MongoClient* | Mongo client    |

**Returns:** *PassportStatic*

Defined in: [server/middleware/passport/index.ts:17](https://github.com/Puzzlepart/did/blob/7f92b547/server/middleware/passport/index.ts#L17)

___

### redisSessionMiddleware

▸ `Const`**redisSessionMiddleware**(`req`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `res`: *Response*<any, number\>, `next`: NextFunction): *any*

Defines session configuration; we use Redis for the session store.
"secret" will be used to create the session ID hash (the cookie id and the redis key value)
"name" will show up as your cookie name in the browser
"cookie" is provided by default; you can add it to add additional personalized options
The "store" ttl is the expiration time for each Redis session ID, in seconds

#### Parameters:

Name | Type |
:------ | :------ |
`req` | *Request*<ParamsDictionary, any, any, ParsedQs\> |
`res` | *Response*<any, number\> |
`next` | NextFunction |

**Returns:** *any*

Defined in: [server/middleware/session/index.ts:14](https://github.com/Puzzlepart/did/blob/7f92b547/server/middleware/session/index.ts#L14)

___

### serveGzippedMiddleware

▸ `Const`**serveGzippedMiddleware**(`contentType`: *string*): (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Serve gzipped

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`contentType` | *string* | Content type    |

**Returns:** *function*

Defined in: [server/middleware/gzip/index.ts:9](https://github.com/Puzzlepart/did/blob/7f92b547/server/middleware/gzip/index.ts#L9)

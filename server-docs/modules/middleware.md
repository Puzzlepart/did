[did-server](../README.md) / middleware

# Module: middleware

## Table of contents

### Variables

- [helmetMiddleware](middleware.md#helmetmiddleware)
- [redisMiddlware](middleware.md#redismiddlware)

### Functions

- [passportMiddleware](middleware.md#passportmiddleware)
- [redisSessionMiddleware](middleware.md#redissessionmiddleware)
- [serveGzippedMiddleware](middleware.md#servegzippedmiddleware)

## Variables

### helmetMiddleware

• `Const` **helmetMiddleware**: *any*

Helmet configuration

Defined in: [server/middleware/helmet/index.ts:6](https://github.com/Puzzlepart/did/blob/4fe732f3/server/middleware/helmet/index.ts#L6)

___

### redisMiddlware

• `Const` **redisMiddlware**: *RedisClient*

Redis client

- Using hosname from env REDIS_CACHE_HOSTNAME
- Using auth_pass from env REDIS_CACHE_KEY
- Using tls.servername from env REDIS_CACHE_HOSTNAME
- Using socket_keepalive to true

**`see`** https://github.com/Puzzlepart/did/issues/812

Defined in: [server/middleware/redis/index.ts:14](https://github.com/Puzzlepart/did/blob/4fe732f3/server/middleware/redis/index.ts#L14)

## Functions

### passportMiddleware

▸ `Const`**passportMiddleware**(`mongoClient`: *MongoClient*): *PassportStatic*

Setup passport to be used for authentication

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mongoClient` | *MongoClient* | Mongo client    |

**Returns:** *PassportStatic*

Defined in: [server/middleware/passport/index.ts:14](https://github.com/Puzzlepart/did/blob/4fe732f3/server/middleware/passport/index.ts#L14)

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

Defined in: [server/middleware/session/index.ts:14](https://github.com/Puzzlepart/did/blob/4fe732f3/server/middleware/session/index.ts#L14)

___

### serveGzippedMiddleware

▸ `Const`**serveGzippedMiddleware**(`contentType`: *string*): (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Serve gzipped

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`contentType` | *string* | Content type    |

**Returns:** *function*

Defined in: [server/middleware/gzip/index.ts:9](https://github.com/Puzzlepart/did/blob/4fe732f3/server/middleware/gzip/index.ts#L9)

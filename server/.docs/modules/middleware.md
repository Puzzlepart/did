[did-server - v0.9.11](../README.md) / Middleware

# Module: Middleware

NodeJS Express App middleware

## Table of contents

### Express middleware Variables

- [redisMiddlware](middleware.md#redismiddlware)

### Express middleware Functions

- [helmetMiddleware](middleware.md#helmetmiddleware)
- [passportMiddleware](middleware.md#passportmiddleware)
- [redisSessionMiddleware](middleware.md#redissessionmiddleware)
- [serveGzippedMiddleware](middleware.md#servegzippedmiddleware)

## Express middleware Variables

### redisMiddlware

• `Const` **redisMiddlware**: *RedisClient*

Redis client

- Using hosname from env REDIS_CACHE_HOSTNAME
- Using auth_pass from env REDIS_CACHE_KEY
- Using tls.servername from env REDIS_CACHE_HOSTNAME
- Using socket_keepalive to true

**`see`** https://github.com/Puzzlepart/did/issues/812

Defined in: [middleware/redis/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/middleware/redis/index.ts#L17)

## Express middleware Functions

### helmetMiddleware

▸ `Const`**helmetMiddleware**(): *any*

Helmet configuration

We allow framing from `https://teams.microsoft.com`

**`see`** https://github.com/helmetjs/helmet

**Returns:** *any*

Defined in: [middleware/helmet/index.ts:13](https://github.com/Puzzlepart/did/blob/dev/server/middleware/helmet/index.ts#L13)

___

### passportMiddleware

▸ `Const`**passportMiddleware**(`mcl`: *MongoClient*): *PassportStatic*

Setup passport to be used for authentication

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mcl` | *MongoClient* | Mongo client    |

**Returns:** *PassportStatic*

Defined in: [middleware/passport/index.ts:14](https://github.com/Puzzlepart/did/blob/dev/server/middleware/passport/index.ts#L14)

___

### redisSessionMiddleware

▸ `Const`**redisSessionMiddleware**(`req`: *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `res`: *Response*<any, Record<string, any\>, number\>, `next`: NextFunction): *void*

Defines session configuration; we use Redis for the session store.
"secret" will be used to create the session ID hash (the cookie id and the redis key value)
"name" will show up as your cookie name in the browser
"cookie" is provided by default; you can add it to add additional personalized options
The "store" ttl is the expiration time for each Redis session ID, in seconds

#### Parameters:

Name | Type |
:------ | :------ |
`req` | *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\> |
`res` | *Response*<any, Record<string, any\>, number\> |
`next` | NextFunction |

**Returns:** *void*

Defined in: [middleware/session/index.ts:17](https://github.com/Puzzlepart/did/blob/dev/server/middleware/session/index.ts#L17)

___

### serveGzippedMiddleware

▸ `Const`**serveGzippedMiddleware**(`contentType`: *string*): *function*

Serve gzipped

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`contentType` | *string* | Content type    |

**Returns:** (`request`: *Request*<ParamsDictionary, any, any, ParsedQs\>, `response`: *Response*<any\>, `next`: NextFunction) => *void*

Defined in: [middleware/gzip/index.ts:12](https://github.com/Puzzlepart/did/blob/dev/server/middleware/gzip/index.ts#L12)

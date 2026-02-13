import test from 'ava'
import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'
import { Collection, MongoClient } from './index'
import { TABLE_NAME } from './constants'

const TEST_DB_DIR = path.join(process.cwd(), '.test-db')
const getTestDbPath = () =>
  path.join(TEST_DB_DIR, `test-${randomUUID()}.sqlite`)

test.before(() => {
  fs.mkdirSync(TEST_DB_DIR, { recursive: true })
})

test.after.always(() => {
  // Clean up test databases
  if (fs.existsSync(TEST_DB_DIR)) {
    const files = fs.readdirSync(TEST_DB_DIR)
    for (const file of files) {
      try {
        fs.unlinkSync(path.join(TEST_DB_DIR, file))
      } catch {
        // Ignore cleanup errors
      }
    }
    try {
      fs.rmdirSync(TEST_DB_DIR)
    } catch {
      // Ignore cleanup errors
    }
  }
})

// ============================================================================
// Connection & Setup Tests
// ============================================================================

test('MongoClient.connect creates database file', async (t) => {
  const dbPath = getTestDbPath()
  const client = await MongoClient.connect(dbPath)
  t.true(client.topology.isConnected())
  t.true(fs.existsSync(dbPath))
  await client.close()
  t.false(client.topology.isConnected())
})

test('MongoClient.db returns Db instance', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const db = client.db('testdb')
  t.is(db.databaseName, 'testdb')
  await client.close()
})

test('MongoClient.db defaults to main', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const db = client.db()
  t.is(db.databaseName, 'main')
  await client.close()
})

// ============================================================================
// Basic CRUD Tests
// ============================================================================

test('insertOne generates _id when missing', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const result = await collection.insertOne({ name: 'test' })
  t.is(result.insertedCount, 1)
  t.truthy(result.insertedId)
  t.is(typeof result.insertedId, 'string')
  t.is(result.ops[0].name, 'test')
  t.is(result.ops[0]._id, result.insertedId)

  await client.close()
})

test('insertOne preserves existing _id', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const customId = 'custom-id-123'
  const result = await collection.insertOne({ _id: customId, name: 'test' })
  t.is(result.insertedId, customId)

  const doc = await collection.findOne({ _id: customId })
  t.is(doc?.name, 'test')

  await client.close()
})

test('findOne returns null when not found', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const doc = await collection.findOne({ _id: 'nonexistent' })
  t.is(doc, null)

  await client.close()
})

test('findOne returns document by _id', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ name: 'findme' })
  const doc = await collection.findOne({ _id: insertedId })
  t.is(doc?.name, 'findme')

  await client.close()
})

test('updateOne with $set modifies fields', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ name: 'original', count: 1 })
  const result = await collection.updateOne(
    { _id: insertedId },
    { $set: { name: 'updated' } }
  )

  t.is(result.matchedCount, 1)
  t.is(result.modifiedCount, 1)

  const doc = await collection.findOne({ _id: insertedId })
  t.is(doc?.name, 'updated')
  t.is(doc?.count, 1) // Unchanged

  await client.close()
})

test('updateOne with $inc increments numbers', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ count: 5 })
  await collection.updateOne({ _id: insertedId }, { $inc: { count: 3 } })

  const doc = await collection.findOne({ _id: insertedId })
  t.is(doc?.count, 8)

  await client.close()
})

test('updateOne with upsert creates document when not found', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const result = await collection.updateOne(
    { name: 'newitem' },
    { $set: { value: 42 } },
    { upsert: true }
  )

  t.is(result.matchedCount, 0)
  t.is(result.upsertedCount, 1)
  t.truthy(result.upsertedId)

  const doc = await collection.findOne({ _id: result.upsertedId })
  t.is(doc?.name, 'newitem')
  t.is(doc?.value, 42)

  await client.close()
})

test('deleteOne removes matching document', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ name: 'deleteme' })
  t.truthy(await collection.findOne({ _id: insertedId }))

  const result = await collection.deleteOne({ _id: insertedId })
  t.is(result.deletedCount, 1)

  t.is(await collection.findOne({ _id: insertedId }), null)

  await client.close()
})

test('deleteMany removes multiple documents', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { category: 'a' },
    { category: 'a' },
    { category: 'b' }
  ])

  const result = await collection.deleteMany({ category: 'a' })
  t.is(result.deletedCount, 2)

  const remaining = await collection.find({}).toArray()
  t.is(remaining.length, 1)
  t.is(remaining[0].category, 'b')

  await client.close()
})

// ============================================================================
// Date Serialization Tests
// ============================================================================

test('Dates survive round-trip serialization', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const testDate = new Date('2024-06-15T10:30:00.000Z')
  const { insertedId } = await collection.insertOne({ createdAt: testDate })

  const doc = await collection.findOne({ _id: insertedId })
  t.true(doc?.createdAt instanceof Date)
  t.is(doc?.createdAt.toISOString(), testDate.toISOString())

  await client.close()
})

test('Nested Date objects are preserved', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const testDate = new Date('2024-01-01T00:00:00.000Z')
  const { insertedId } = await collection.insertOne({
    metadata: {
      timestamps: {
        created: testDate
      }
    }
  })

  const doc = await collection.findOne({ _id: insertedId })
  t.true(doc?.metadata.timestamps.created instanceof Date)
  t.is(doc?.metadata.timestamps.created.toISOString(), testDate.toISOString())

  await client.close()
})

test('Date marker collision: extra keys prevent Date decoding', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const legacyLike = {
    __did_sqlite_type__: 'date',
    value: '2024-06-15T10:30:00.000Z',
    note: 'this should not become a Date'
  }

  const { insertedId } = await collection.insertOne({ createdAt: legacyLike })
  const doc = await collection.findOne({ _id: insertedId })

  t.true(typeof doc?.createdAt === 'object')
  t.false(doc?.createdAt instanceof Date)
  t.is(doc?.createdAt.__did_sqlite_type__, 'date')
  t.is(doc?.createdAt.value, legacyLike.value)
  t.is(doc?.createdAt.note, legacyLike.note)

  await client.close()
})

test('Legacy encoded Date shape still decodes', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())

  const databaseName = 'test'
  const collectionName = 'items'
  const documentId = 'legacy-doc'
  const legacyDateValue = '2024-06-15T10:30:00.000Z'

  const legacyJson = JSON.stringify({
    _id: documentId,
    createdAt: {
      __did_sqlite_type__: 'date',
      value: legacyDateValue
    }
  })

  await (client as any)._run(
    `INSERT INTO ${TABLE_NAME}
      (database_name, collection_name, document_id, document_json)
     VALUES (?, ?, ?, ?)`,
    [databaseName, collectionName, documentId, legacyJson]
  )

  const doc = await client
    .db(databaseName)
    .collection(collectionName)
    .findOne({ _id: documentId })

  t.true(doc?.createdAt instanceof Date)
  t.is(doc?.createdAt.toISOString(), legacyDateValue)

  await client.close()
})

test('Arrays of Dates work correctly', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const dates = [
    new Date('2024-01-01'),
    new Date('2024-06-15'),
    new Date('2024-12-31')
  ]
  const { insertedId } = await collection.insertOne({ dates })

  const doc = await collection.findOne({ _id: insertedId })
  t.is(doc?.dates.length, 3)
  t.true(doc?.dates.every((d: unknown) => d instanceof Date))

  await client.close()
})

// ============================================================================
// Query Operator Tests
// ============================================================================

test('Query operators: $gt, $lt, $gte, $lte', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { value: 1 },
    { value: 5 },
    { value: 10 }
  ])

  const gt = await collection.find({ value: { $gt: 5 } }).toArray()
  t.is(gt.length, 1)
  t.is(gt[0].value, 10)

  const gte = await collection.find({ value: { $gte: 5 } }).toArray()
  t.is(gte.length, 2)

  const lt = await collection.find({ value: { $lt: 5 } }).toArray()
  t.is(lt.length, 1)
  t.is(lt[0].value, 1)

  const lte = await collection.find({ value: { $lte: 5 } }).toArray()
  t.is(lte.length, 2)

  await client.close()
})

test('Query operators: $in, $nin', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { status: 'active' },
    { status: 'pending' },
    { status: 'archived' }
  ])

  const inResult = await collection.find({ status: { $in: ['active', 'pending'] } }).toArray()
  t.is(inResult.length, 2)

  const ninResult = await collection.find({ status: { $nin: ['archived'] } }).toArray()
  t.is(ninResult.length, 2)

  await client.close()
})

test('Query operators: $and, $or', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { a: 2, b: 2 }
  ])

  const andResult = await collection.find({ $and: [{ a: 1 }, { b: 2 }] }).toArray()
  t.is(andResult.length, 1)

  const orResult = await collection.find({ $or: [{ a: 2 }, { b: 3 }] }).toArray()
  t.is(orResult.length, 2)

  await client.close()
})

test('Nested field queries', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { user: { name: 'Alice', age: 30 } },
    { user: { name: 'Bob', age: 25 } }
  ])

  const result = await collection.find({ 'user.name': 'Alice' }).toArray()
  t.is(result.length, 1)
  t.is(result[0].user.age, 30)

  await client.close()
})

// ============================================================================
// Update Operator Tests
// ============================================================================

test('$push adds to array', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ tags: ['a'] })
  await collection.updateOne({ _id: insertedId }, { $push: { tags: 'b' } })

  const doc = await collection.findOne({ _id: insertedId })
  t.deepEqual(doc?.tags, ['a', 'b'])

  await client.close()
})

test('$push with $each adds multiple items', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ tags: [] })
  await collection.updateOne(
    { _id: insertedId },
    { $push: { tags: { $each: ['x', 'y', 'z'] } } }
  )

  const doc = await collection.findOne({ _id: insertedId })
  t.deepEqual(doc?.tags, ['x', 'y', 'z'])

  await client.close()
})

test('$pull removes from array', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ tags: ['a', 'b', 'c'] })
  await collection.updateOne({ _id: insertedId }, { $pull: { tags: 'b' } })

  const doc = await collection.findOne({ _id: insertedId })
  t.deepEqual(doc?.tags, ['a', 'c'])

  await client.close()
})

// ============================================================================
// Cursor Operations Tests
// ============================================================================

test('Cursor.limit restricts results', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }])

  const docs = await collection.find({}).limit(3).toArray()
  t.is(docs.length, 3)

  await client.close()
})

test('Cursor.skip offsets results', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }])

  const docs = await collection.find({}).sort({ n: 1 }).skip(2).toArray()
  t.is(docs.length, 3)
  t.is(docs[0].n, 3)

  await client.close()
})

test('Cursor.sort orders results', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([{ n: 3 }, { n: 1 }, { n: 2 }])

  const asc = await collection.find({}).sort({ n: 1 }).toArray()
  t.deepEqual(asc.map(d => d.n), [1, 2, 3])

  const desc = await collection.find({}).sort({ n: -1 }).toArray()
  t.deepEqual(desc.map(d => d.n), [3, 2, 1])

  await client.close()
})

test('Cursor chaining: sort.skip.limit', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }
  ])

  const docs = await collection.find({}).sort({ n: 1 }).skip(1).limit(2).toArray()
  t.is(docs.length, 2)
  t.deepEqual(docs.map(d => d.n), [2, 3])

  await client.close()
})

test('Cursor.project includes/excludes fields', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertOne({ a: 1, b: 2, c: 3 })

  const included = await collection.find({}).project({ a: 1 }).toArray()
  t.truthy(included[0]._id)
  t.is(included[0].a, 1)
  t.is(included[0].b, undefined)

  const excluded = await collection.find({}).project({ b: 0 }).toArray()
  t.is(excluded[0].a, 1)
  t.is(excluded[0].b, undefined)
  t.is(excluded[0].c, 3)

  await client.close()
})

// ============================================================================
// Transaction Tests
// ============================================================================

test('insertMany rolls back on failure', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  // Insert one document first
  await collection.insertOne({ _id: 'existing', n: 0 })

  // Try to insert multiple, including a duplicate - should fail
  await t.throwsAsync(async () => {
    await collection.insertMany([
      { _id: 'new1', n: 1 },
      { _id: 'existing', n: 2 }, // Duplicate - will fail
      { _id: 'new2', n: 3 }
    ])
  })

  // Verify rollback: 'new1' should not exist
  const doc = await collection.findOne({ _id: 'new1' })
  t.is(doc, null)

  await client.close()
})

test('Nested withTransaction uses savepoints (inner rollback, outer continues)', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await client.withTransaction(async () => {
    await collection.insertOne({ _id: 'outer-1', ok: true })

    await t.throwsAsync(async () => {
      await client.withTransaction(async () => {
        await collection.insertOne({ _id: 'inner-1', ok: false })
        throw new Error('boom')
      })
    })

    await collection.insertOne({ _id: 'outer-2', ok: true })
  })

  t.truthy(await collection.findOne({ _id: 'outer-1' }))
  t.truthy(await collection.findOne({ _id: 'outer-2' }))
  t.is(await collection.findOne({ _id: 'inner-1' }), null)

  await client.close()
})

// ============================================================================
// Edge Cases
// ============================================================================

test('Empty collection operations', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('empty')

  t.deepEqual(await collection.find({}).toArray(), [])
  t.is(await collection.findOne({}), null)
  t.is(await collection.countDocuments(), 0)
  t.deepEqual(await collection.distinct('field'), [])

  await client.close()
})

test('Empty query {} matches all documents', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([{ a: 1 }, { b: 2 }, { c: 3 }])

  const all = await collection.find({}).toArray()
  t.is(all.length, 3)

  await client.close()
})

test('null and undefined in documents', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({
    nullField: null,
    undefinedField: undefined
  })

  const doc = await collection.findOne({ _id: insertedId })
  t.is(doc?.nullField, null)
  // undefined is not serialized in JSON
  t.false('undefinedField' in (doc || {}))

  await client.close()
})

test('Prototype pollution is prevented on encode/decode', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const payload: any = { normal: 1 }
  // Using an object literal with __proto__ changes the object's prototype.
  // Define an explicit enumerable own property instead.
  Object.defineProperty(payload, '__proto__', {
    value: { polluted: true },
    enumerable: true,
    writable: true,
    configurable: true
  })

  await collection.insertOne(payload)

  // Should not leak to global Object prototype
  t.is(({} as any).polluted, undefined)

  const [doc] = await collection.find({ normal: 1 }).toArray()
  const desc = Object.getOwnPropertyDescriptor(doc as any, '__proto__')
  t.truthy(desc)
  t.deepEqual(desc?.value, { polluted: true })
  t.is(({} as any).polluted, undefined)

  await client.close()
})

test('Unsafe update paths are rejected', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const { insertedId } = await collection.insertOne({ ok: true })
  await t.throwsAsync(async () => {
    await collection.updateOne(
      { _id: insertedId },
      { $set: { '__proto__.polluted': true } }
    )
  })

  t.is(({} as any).polluted, undefined)
  await client.close()
})

test('countDocuments returns correct count', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([{ n: 1 }, { n: 2 }, { n: 3 }])

  t.is(await collection.countDocuments(), 3)
  t.is(await collection.countDocuments({ n: { $gt: 1 } }), 2)

  await client.close()
})

test('distinct returns unique values', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertMany([
    { category: 'a' },
    { category: 'b' },
    { category: 'a' },
    { category: 'c' }
  ])

  const values = await collection.distinct('category')
  t.is(values.length, 3)
  t.true(values.includes('a'))
  t.true(values.includes('b'))
  t.true(values.includes('c'))

  await client.close()
})

test('bulkWrite executes multiple operations', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  await collection.insertOne({ _id: 'doc1', n: 0 })

  const result = await collection.bulkWrite([
    { updateOne: { filter: { _id: 'doc1' }, update: { $inc: { n: 1 } } } },
    { updateOne: { filter: { _id: 'doc2' }, update: { $set: { n: 5 } }, upsert: true } }
  ])

  t.is(result.matchedCount, 1)
  t.is(result.modifiedCount, 1)
  t.is(result.upsertedCount, 1)

  const doc1 = await collection.findOne({ _id: 'doc1' })
  t.is(doc1?.n, 1)

  const doc2 = await collection.findOne({ _id: 'doc2' })
  t.is(doc2?.n, 5)

  await client.close()
})

test('createIndex returns index name (no-op)', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items') as Collection

  const indexName = await collection.createIndex({ field: 1 })
  t.is(indexName, 'field')

  const compoundName = await collection.createIndex({ a: 1, b: -1 })
  t.is(compoundName, 'a_b')

  await client.close()
})

test('_id is immutable on update', async (t) => {
  const client = await MongoClient.connect(getTestDbPath())
  const collection = client.db('test').collection('items')

  const originalId = 'original-id'
  await collection.insertOne({ _id: originalId, name: 'test' })

  // Try to change _id via $set (should be ignored or blocked)
  await collection.updateOne(
    { _id: originalId },
    { $set: { _id: 'new-id', name: 'updated' } }
  )

  // _id should still be original
  const doc = await collection.findOne({ _id: originalId })
  t.is(doc?._id, originalId)
  t.is(doc?.name, 'updated')

  await client.close()
})

/* eslint-disable @typescript-eslint/no-var-requires */
import { randomUUID } from 'crypto'
import Debug from 'debug'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import sqlite3 from 'sqlite3'
import sift from 'sift'
import { TABLE_NAME } from './constants'
import {
  deserializeDocument,
  isPlainObject as isObject,
  serializeDocument
} from './serialization'

const log = Debug('sqlite')

const Sqlite = sqlite3.verbose()

const isOperatorObject = (value: unknown): boolean => {
  if (!isObject(value)) return false
  return Object.keys(value).some((key) => key.startsWith('$'))
}

const clone = <T>(value: T): T => structuredClone(value)

const normalizeComparable = (value: any): any => {
  if (value instanceof Date) return value.getTime()
  if (value === undefined) return null
  if (value === null) return null
  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value
  }
  return JSON.stringify(value)
}

const uniqueValues = (values: any[]): any[] => {
  const mapped = new Map<string, any>()
  for (const value of values) {
    const key =
      value instanceof Date
        ? `date:${value.toISOString()}`
        : `${typeof value}:${JSON.stringify(value)}`
    if (!mapped.has(key)) mapped.set(key, value)
  }
  return [...mapped.values()]
}

const applyProjection = <T>(
  document: T,
  projection?: Record<string, any>
): T => {
  if (!projection || _.isEmpty(projection)) return clone(document)
  const projectionEntries = Object.entries(projection)
  const includeKeys = projectionEntries
    .filter(([, value]) => value === 1 || value === true || isObject(value))
    .map(([key]) => key)
  const excludeKeys = projectionEntries
    .filter(([, value]) => value === 0 || value === false)
    .map(([key]) => key)

  if (includeKeys.length > 0) {
    const projected: Record<string, any> = {}
    const includeId = projection._id !== 0 && projection._id !== false
    if (includeId && _.has(document as any, '_id')) {
      projected._id = _.get(document as any, '_id')
    }
    for (const key of includeKeys) {
      if (_.has(document as any, key)) {
        _.set(projected, key, _.get(document as any, key))
      }
    }
    return projected as T
  }

  const projected = clone(document) as Record<string, any>
  for (const key of excludeKeys) {
    _.unset(projected, key)
  }
  return projected as T
}

const applySort = <T>(documents: T[], sort?: Record<string, any>): T[] => {
  if (!sort || _.isEmpty(sort)) return [...documents]
  const criteria = Object.entries(sort).filter(
    ([, direction]) => typeof direction === 'number'
  )
  if (criteria.length === 0) return [...documents]
  return [...documents].sort((left, right) => {
    for (const [key, direction] of criteria) {
      const multiplier = direction === -1 ? -1 : 1
      const leftValue = normalizeComparable(_.get(left as any, key))
      const rightValue = normalizeComparable(_.get(right as any, key))
      if (leftValue === rightValue) continue
      return leftValue > rightValue ? multiplier : -1 * multiplier
    }
    // Tie-breaker: sort by _id for stable ordering
    const leftId = String((left as any)._id || '')
    const rightId = String((right as any)._id || '')
    return leftId.localeCompare(rightId)
  })
}

const extractUpsertBase = (filter: Record<string, any>): Record<string, any> => {
  return Object.entries(filter || {}).reduce<Record<string, any>>(
    (base, [key, value]) => {
      if (key.startsWith('$')) return base
      if (isOperatorObject(value)) return base
      _.set(base, key, clone(value))
      return base
    },
    {}
  )
}

const toDocumentId = (value: any): string => {
  if (value === undefined || value === null) return randomUUID()
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value)
  }
  return JSON.stringify(value)
}

const applyUpdateDocument = <T>(
  document: T,
  update: Record<string, any>
): T => {
  const next = clone(document) as Record<string, any>
  if (!update || _.isEmpty(update)) return next as T
  const hasOperators = Object.keys(update).some((key) => key.startsWith('$'))

  if (!hasOperators) {
    return {
      ...next,
      ...clone(update)
    } as T
  }

  if (isObject(update.$set)) {
    for (const [key, value] of Object.entries(update.$set)) {
      _.set(next, key, clone(value))
    }
  }

  if (isObject(update.$inc)) {
    for (const [key, value] of Object.entries(update.$inc)) {
      const currentValue = Number(_.get(next, key, 0))
      const increment = Number(value || 0)
      _.set(next, key, currentValue + increment)
    }
  }

  if (isObject(update.$push)) {
    for (const [key, value] of Object.entries(update.$push)) {
      const currentValue = _.get(next, key)
      const arrayValue = Array.isArray(currentValue) ? currentValue : []
      const pushValues =
        isObject(value) && Array.isArray(value.$each) ? value.$each : [value]
      _.set(next, key, [...arrayValue, ...clone(pushValues)])
    }
  }

  if (isObject(update.$pull)) {
    for (const [key, value] of Object.entries(update.$pull)) {
      const currentValue = _.get(next, key)
      if (!Array.isArray(currentValue)) continue
      const shouldRemove =
        isObject(value) || Array.isArray(value)
          ? sift(clone(value))
          : (entry: any) => _.isEqual(entry, value)
      _.set(
        next,
        key,
        currentValue.filter((entry) => !shouldRemove(entry))
      )
    }
  }

  return next as T
}

export type FilterQuery<_T> = Record<string, any>

export type OptionalId<T> = T & { _id?: any }

export type WithId<T> = T & { _id: any }

export interface InsertOneWriteOpResult<TSchema> {
  insertedCount: number
  insertedId: any
  ops: TSchema[]
  result: {
    ok: number
    n: number
  }
}

export interface DeleteWriteOpResultObject {
  deletedCount: number
  result: {
    ok: number
    n: number
  }
}

type UpdateResult = {
  matchedCount: number
  modifiedCount: number
  upsertedCount: number
  upsertedId?: any
  result: {
    ok: number
    n: number
    nModified: number
  }
}

type BulkWriteResult = {
  matchedCount: number
  modifiedCount: number
  upsertedCount: number
}

type InsertManyResult<TSchema> = {
  insertedCount: number
  insertedIds: Record<number, any>
  ops: TSchema[]
  result: {
    ok: number
    n: number
  }
}

type StoredRow = {
  document_id: string
  document_json: string
}

type StoredDocument<T> = {
  documentId: string
  document: T
}

type FindOptions = {
  sort?: Record<string, any>
  limit?: number
  skip?: number
}

const getSqliteFilePath = (connectionString?: string): string => {
  const fallbackPath = process.env.SQLITE_DB_PATH || 'did.sqlite'

  if (!connectionString) {
    return path.resolve(process.cwd(), fallbackPath)
  }

  if (
    connectionString.startsWith('mongodb://') ||
    connectionString.startsWith('mongodb+srv://')
  ) {
    return path.resolve(process.cwd(), fallbackPath)
  }

  if (connectionString.startsWith('sqlite://')) {
    const stripped = connectionString.replace(/^sqlite:\/\//, '')
    if (stripped.startsWith('/')) return stripped
    return path.resolve(process.cwd(), stripped)
  }

  if (connectionString.startsWith('file:')) {
    const fileUrl = new URL(connectionString)
    return fileUrl.pathname
  }

  return path.resolve(process.cwd(), connectionString)
}

/**
 * A cursor for iterating over query results with support for chaining
 * operations like limit, skip, sort, and project.
 *
 * @typeParam T - The document type
 */
export class Cursor<T> implements AsyncIterable<T> {
  private _limitValue: number | null = null
  private _skipValue = 0
  private _sortValue: Record<string, any> | null = null
  private _projectionValue: Record<string, any> | null = null

  constructor(private readonly _documentsPromise: Promise<T[]>) {}

  /**
   * Limits the number of documents returned.
   *
   * @param value - Maximum number of documents to return
   * @returns This cursor for chaining
   */
  public limit(value: number): Cursor<T> {
    this._limitValue = value
    return this
  }

  /**
   * Skips a number of documents in the result set.
   *
   * @param value - Number of documents to skip
   * @returns This cursor for chaining
   */
  public skip(value: number): Cursor<T> {
    this._skipValue = value
    return this
  }

  /**
   * Sorts the documents by the specified fields.
   *
   * @param value - Sort specification (e.g., `{ createdAt: -1 }` for descending)
   * @returns This cursor for chaining
   */
  public sort(value: Record<string, any>): Cursor<T> {
    this._sortValue = value
    return this
  }

  /**
   * Projects (includes or excludes) specific fields from documents.
   *
   * @param value - Projection specification (1 to include, 0 to exclude)
   * @returns This cursor for chaining
   */
  public project(value: Record<string, any>): Cursor<T> {
    this._projectionValue = value
    return this
  }

  /**
   * Executes the cursor and returns all matching documents as an array.
   *
   * @returns Promise resolving to array of documents
   */
  public async toArray(): Promise<T[]> {
    let documents = await this._documentsPromise
    if (this._sortValue) {
      documents = applySort(documents, this._sortValue)
    }
    if (this._skipValue > 0) {
      documents = documents.slice(this._skipValue)
    }
    if (typeof this._limitValue === 'number') {
      documents = documents.slice(0, this._limitValue)
    }
    documents = this._projectionValue
      ? documents.map((document) =>
          applyProjection(document, this._projectionValue)
        )
      : documents.map((document) => clone(document))
    return documents
  }

  /**
   * Async iterator implementation for `for await...of` loops.
   */
  public async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    const documents = await this.toArray()
    for (const document of documents) {
      yield document
    }
  }
}

/**
 * A MongoDB-compatible collection backed by SQLite storage.
 * Provides CRUD operations with MongoDB-style query syntax using sift.
 *
 * @typeParam T - The document type
 *
 * @remarks
 * This is a compatibility layer that emulates MongoDB Collection API.
 * Queries not using `_id` perform full collection scans.
 */
export class Collection<T = Record<string, any>> {
  constructor(
    private readonly _client: MongoClient,
    private readonly _databaseName: string,
    private readonly _collectionName: string
  ) {}

  private _decodeRows(rows: StoredRow[]): StoredDocument<T>[] {
    return rows.map((row) => ({
      documentId: row.document_id,
      document: deserializeDocument(row.document_json) as T
    }))
  }

  private async _readDocuments(): Promise<StoredDocument<T>[]> {
    const rows = await this._client._all<StoredRow>(
      `SELECT document_id, document_json
       FROM ${TABLE_NAME}
       WHERE database_name = ? AND collection_name = ?
       ORDER BY rowid ASC`,
      [this._databaseName, this._collectionName]
    )

    return this._decodeRows(rows)
  }

  private async _readDocumentsSlice(
    skip: number = 0,
    limit?: number
  ): Promise<StoredDocument<T>[]> {
    const parameters: any[] = [this._databaseName, this._collectionName]
    let sql = `SELECT document_id, document_json
               FROM ${TABLE_NAME}
               WHERE database_name = ? AND collection_name = ?
               ORDER BY rowid ASC`

    if (typeof limit === 'number') {
      sql += ' LIMIT ?'
      parameters.push(limit)
      if (skip > 0) {
        sql += ' OFFSET ?'
        parameters.push(skip)
      }
    } else if (skip > 0) {
      sql += ' LIMIT -1 OFFSET ?'
      parameters.push(skip)
    }

    const rows = await this._client._all<StoredRow>(sql, parameters)
    return this._decodeRows(rows)
  }

  private async _readDocumentById(
    documentId: string
  ): Promise<StoredDocument<T> | null> {
    const rows = await this._client._all<StoredRow>(
      `SELECT document_id, document_json
       FROM ${TABLE_NAME}
       WHERE database_name = ? AND collection_name = ? AND document_id = ?
       LIMIT 1`,
      [this._databaseName, this._collectionName, documentId]
    )
    if (rows.length === 0) return null
    return this._decodeRows(rows)[0]
  }

  private async _readDocumentsByIds(
    documentIds: string[]
  ): Promise<StoredDocument<T>[]> {
    if (documentIds.length === 0) return []
    const placeholders = documentIds.map(() => '?').join(', ')
    const rows = await this._client._all<StoredRow>(
      `SELECT document_id, document_json
       FROM ${TABLE_NAME}
       WHERE database_name = ? AND collection_name = ?
         AND document_id IN (${placeholders})
       ORDER BY rowid ASC`,
      [this._databaseName, this._collectionName, ...documentIds]
    )
    return this._decodeRows(rows)
  }

  private _extractExactDocumentId(query: FilterQuery<T>): string | null {
    if (!isObject(query)) return null
    const keys = Object.keys(query)
    if (keys.length !== 1 || keys[0] !== '_id') return null

    const idQuery = (query as any)._id
    if (idQuery === undefined || idQuery === null) return null

    if (isObject(idQuery)) {
      const idKeys = Object.keys(idQuery)
      if (idKeys.length !== 1 || idKeys[0] !== '$eq') return null
      const eqValue = idQuery.$eq
      if (eqValue === undefined || eqValue === null) return null
      return toDocumentId(eqValue)
    }

    return toDocumentId(idQuery)
  }

  private _extractDocumentIdsFromInQuery(
    query: FilterQuery<T>
  ): string[] | null {
    if (!isObject(query)) return null
    const keys = Object.keys(query)
    if (keys.length !== 1 || keys[0] !== '_id') return null

    const idQuery = (query as any)._id
    if (!isObject(idQuery)) return null
    const idKeys = Object.keys(idQuery)
    if (idKeys.length !== 1 || idKeys[0] !== '$in') return null
    if (!Array.isArray(idQuery.$in)) return null

    return idQuery.$in
      .filter((value) => value !== undefined && value !== null)
      .map((value) => toDocumentId(value))
  }

  private async _insertDocument(
    document: Record<string, any>
  ): Promise<{ documentId: string; insertedDocument: Record<string, any> }> {
    const nextDocument = clone(document)
    if (nextDocument._id === undefined || nextDocument._id === null) {
      nextDocument._id = randomUUID()
    }
    const documentId = toDocumentId(nextDocument._id)
    await this._client._run(
      `INSERT INTO ${TABLE_NAME}
        (database_name, collection_name, document_id, document_json)
       VALUES (?, ?, ?, ?)`,
      [
        this._databaseName,
        this._collectionName,
        documentId,
        serializeDocument(nextDocument)
      ]
    )
    return { documentId, insertedDocument: nextDocument }
  }

  private async _writeDocument(
    documentId: string,
    document: Record<string, any>
  ): Promise<void> {
    await this._client._run(
      `UPDATE ${TABLE_NAME}
       SET document_json = ?, updated_at = CURRENT_TIMESTAMP
       WHERE database_name = ? AND collection_name = ? AND document_id = ?`,
      [
        serializeDocument(document),
        this._databaseName,
        this._collectionName,
        documentId
      ]
    )
  }

  private _findMatchingDocument(
    documents: StoredDocument<T>[],
    query: FilterQuery<T>
  ): StoredDocument<T> | null {
    const matcher = sift(query || {})
    return documents.find((entry) => matcher(entry.document)) || null
  }

  /**
   * Finds documents matching the query filter.
   *
   * @param query - MongoDB-style query filter (uses sift for matching)
   * @param options - Optional find options
   * @returns Cursor for iterating results
   *
   * @remarks
   * For queries not using `_id`, this performs a full collection scan.
   *
   * @example
   * ```typescript
   * const users = await collection.find({ role: 'admin' }, { limit: 10 }).toArray()
   * ```
   */
  public find(query: FilterQuery<T> = {}, options: FindOptions = {}): Cursor<T> {
    const exactDocumentId = this._extractExactDocumentId(query)
    const documentIds = this._extractDocumentIdsFromInQuery(query)
    const canUseSliceQuery =
      _.isEmpty(query || {}) &&
      !options.sort &&
      (options.skip !== undefined || options.limit !== undefined)

    let documentsPromise: Promise<T[]>
    if (exactDocumentId === null) {
      if (documentIds === null) {
        if (canUseSliceQuery) {
          const skip = options.skip || 0
          const limit = typeof options.limit === 'number' ? options.limit : undefined
          documentsPromise = this._readDocumentsSlice(skip, limit).then((documents) =>
            documents.map((entry) => entry.document)
          )
        } else {
          documentsPromise = this._readDocuments().then((documents) => {
            const matcher = sift(query || {})
            return documents
              .map((entry) => entry.document)
              .filter((document) => matcher(document))
          })
        }
      } else {
        documentsPromise = this._readDocumentsByIds(documentIds).then((documents) => {
          const matcher = sift(query || {})
          return documents
            .map((entry) => entry.document)
            .filter((document) => matcher(document))
        })
      }
    } else {
      documentsPromise = this._readDocumentById(exactDocumentId).then((document) =>
        document ? [document.document] : []
      )
    }

    const cursor = new Cursor<T>(documentsPromise)
    if (!canUseSliceQuery) {
      if (options.skip !== undefined) cursor.skip(options.skip)
      if (options.limit !== undefined) cursor.limit(options.limit)
    }
    if (options.sort) cursor.sort(options.sort)
    return cursor
  }

  /**
   * Finds a single document matching the query.
   *
   * @param query - MongoDB-style query filter
   * @returns The first matching document, or null if none found
   */
  public async findOne<S = T>(query: FilterQuery<T> = {}): Promise<S | null> {
    const exactDocumentId = this._extractExactDocumentId(query)
    if (exactDocumentId !== null) {
      const document = await this._readDocumentById(exactDocumentId)
      return (document?.document as unknown as S) || null
    }
    const [document] = await this.find(query, { limit: 1 }).toArray()
    return (document as unknown as S) || null
  }

  /**
   * Inserts a single document into the collection.
   *
   * @param document - Document to insert (may omit `_id` for auto-generation)
   * @returns Insert result with the inserted document and ID
   */
  public async insertOne<S = T>(
    document: OptionalId<S>
  ): Promise<InsertOneWriteOpResult<WithId<S>>> {
    const { insertedDocument } = await this._insertDocument(
      document as Record<string, any>
    )

    return {
      insertedCount: 1,
      insertedId: insertedDocument._id,
      ops: [clone(insertedDocument) as WithId<S>],
      result: {
        ok: 1,
        n: 1
      }
    }
  }

  /**
   * Inserts multiple documents into the collection atomically.
   *
   * @param documents - Array of documents to insert
   * @returns Insert result with all inserted documents and IDs
   *
   * @remarks
   * This operation is wrapped in a transaction; if any insert fails,
   * all inserts are rolled back.
   */
  public async insertMany<S = T>(
    documents: OptionalId<S>[]
  ): Promise<InsertManyResult<WithId<S>>> {
    return await this._client.withTransaction(async () => {
      const insertedIds: Record<number, any> = {}
      const ops: WithId<S>[] = []
      let insertedCount = 0

      for (const [index, document] of documents.entries()) {
        const { insertedDocument } = await this._insertDocument(
          document as Record<string, any>
        )
        insertedIds[index] = insertedDocument._id
        ops.push(clone(insertedDocument) as WithId<S>)
        insertedCount++
      }

      return {
        insertedCount,
        insertedIds,
        ops,
        result: {
          ok: 1,
          n: insertedCount
        }
      }
    })
  }

  /**
   * Updates a single document matching the filter.
   *
   * @param filter - Query filter to match documents
   * @param update - Update operations (`$set`, `$inc`, `$push`, `$pull`, or replacement)
   * @param options - Update options
   * @param options.upsert - If true, inserts a new document when no match found
   * @returns Update result with match and modification counts
   */
  public async updateOne(
    filter: FilterQuery<T>,
    update: Record<string, any>,
    options: { upsert?: boolean } = {}
  ): Promise<UpdateResult> {
    const exactDocumentId = this._extractExactDocumentId(filter)
    const match =
      exactDocumentId === null
        ? this._findMatchingDocument(await this._readDocuments(), filter)
        : await this._readDocumentById(exactDocumentId)

    if (!match) {
      if (!options.upsert) {
        return {
          matchedCount: 0,
          modifiedCount: 0,
          upsertedCount: 0,
          result: { ok: 1, n: 0, nModified: 0 }
        }
      }

      const baseDocument = extractUpsertBase(filter as Record<string, any>)
      const upsertedDocument = applyUpdateDocument(baseDocument, update)
      if (
        (upsertedDocument as Record<string, any>)._id === undefined ||
        (upsertedDocument as Record<string, any>)._id === null
      ) {
        ;(upsertedDocument as Record<string, any>)._id = randomUUID()
      }
      const { insertedDocument } = await this._insertDocument(
        upsertedDocument as Record<string, any>
      )

      return {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 1,
        upsertedId: insertedDocument._id,
        result: {
          ok: 1,
          n: 1,
          nModified: 0
        }
      }
    }

    const nextDocument = applyUpdateDocument(match.document, update) as Record<
      string,
      any
    >
    // Mirror MongoDB behavior: _id is immutable
    nextDocument._id = (match.document as any)._id

    const modified = !_.isEqual(nextDocument, match.document)
    if (modified) {
      await this._writeDocument(match.documentId, nextDocument)
    }

    return {
      matchedCount: 1,
      modifiedCount: modified ? 1 : 0,
      upsertedCount: 0,
      result: {
        ok: 1,
        n: 1,
        nModified: modified ? 1 : 0
      }
    }
  }

  /**
   * Deletes a single document matching the filter.
   *
   * @param filter - Query filter to match the document to delete
   * @returns Delete result with count of deleted documents
   */
  public async deleteOne(
    filter: FilterQuery<T>
  ): Promise<DeleteWriteOpResultObject> {
    const exactDocumentId = this._extractExactDocumentId(filter)
    if (exactDocumentId !== null) {
      const result = await this._client._run(
        `DELETE FROM ${TABLE_NAME}
         WHERE database_name = ? AND collection_name = ? AND document_id = ?`,
        [this._databaseName, this._collectionName, exactDocumentId]
      )
      return {
        deletedCount: result.changes || 0,
        result: {
          ok: 1,
          n: result.changes || 0
        }
      }
    }

    const documents = await this._readDocuments()
    const match = this._findMatchingDocument(documents, filter)
    if (!match) {
      return {
        deletedCount: 0,
        result: {
          ok: 1,
          n: 0
        }
      }
    }
    const result = await this._client._run(
      `DELETE FROM ${TABLE_NAME}
       WHERE database_name = ? AND collection_name = ? AND document_id = ?`,
      [this._databaseName, this._collectionName, match.documentId]
    )
    return {
      deletedCount: result.changes || 0,
      result: {
        ok: 1,
        n: result.changes || 0
      }
    }
  }

  /**
   * Deletes all documents matching the filter atomically.
   *
   * @param filter - Query filter to match documents to delete
   * @returns Delete result with count of deleted documents
   *
   * @remarks
   * For bulk deletes, this operation is wrapped in a transaction.
   */
  public async deleteMany(
    filter: FilterQuery<T>
  ): Promise<DeleteWriteOpResultObject> {
    const exactDocumentId = this._extractExactDocumentId(filter)
    if (exactDocumentId !== null) {
      return this.deleteOne(filter)
    }

    const documentIds = this._extractDocumentIdsFromInQuery(filter)
    if (documentIds !== null) {
      if (documentIds.length === 0) {
        return {
          deletedCount: 0,
          result: {
            ok: 1,
            n: 0
          }
        }
      }
      return this._client.withTransaction(async () => {
        let deletedCount = 0
        for (const documentId of documentIds) {
          const result = await this._client._run(
            `DELETE FROM ${TABLE_NAME}
             WHERE database_name = ? AND collection_name = ? AND document_id = ?`,
            [this._databaseName, this._collectionName, documentId]
          )
          deletedCount += result.changes || 0
        }
        return {
          deletedCount,
          result: {
            ok: 1,
            n: deletedCount
          }
        }
      })
    }

    const documents = await this._readDocuments()
    const matcher = sift(filter || {})
    const matchingDocumentIds = documents
      .filter((entry) => matcher(entry.document))
      .map((entry) => entry.documentId)

    if (matchingDocumentIds.length === 0) {
      return {
        deletedCount: 0,
        result: {
          ok: 1,
          n: 0
        }
      }
    }

    return this._client.withTransaction(async () => {
      let deletedCount = 0
      for (const documentId of matchingDocumentIds) {
        const result = await this._client._run(
          `DELETE FROM ${TABLE_NAME}
           WHERE database_name = ? AND collection_name = ? AND document_id = ?`,
          [this._databaseName, this._collectionName, documentId]
        )
        deletedCount += result.changes || 0
      }

      return {
        deletedCount,
        result: {
          ok: 1,
          n: deletedCount
        }
      }
    })
  }

  /**
   * Returns distinct values for a field across matching documents.
   *
   * @param field - Field path to get distinct values for
   * @param query - Optional query filter
   * @returns Array of unique values
   *
   * @remarks
   * This loads all matching documents into memory. Large collections
   * with many documents will impact performance.
   */
  public async distinct(
    field: string,
    query: FilterQuery<T> = {}
  ): Promise<any[]> {
    const documents = await this.find(query).toArray()
    if (documents.length > 1000) {
      log(
        'PERF: distinct() loaded %d documents for %s.%s',
        documents.length,
        this._databaseName,
        this._collectionName
      )
    }
    const values = documents.reduce<any[]>((allValues, document) => {
      const value = _.get(document as any, field)
      if (Array.isArray(value)) return [...allValues, ...value]
      return [...allValues, value]
    }, [])
    return uniqueValues(values.filter((value) => value !== undefined))
  }

  /**
   * Counts documents matching the query.
   *
   * @param query - Query filter (empty for total count)
   * @returns Number of matching documents
   *
   * @remarks
   * Empty query uses optimized SQL COUNT(*). Filtered queries
   * except exact `_id` lookups load documents into memory.
   */
  public async countDocuments(query: FilterQuery<T> = {}): Promise<number> {
    if (_.isEmpty(query || {})) {
      const rows = await this._client._all<{ count: number }>(
        `SELECT COUNT(*) AS count
         FROM ${TABLE_NAME}
         WHERE database_name = ? AND collection_name = ?`,
        [this._databaseName, this._collectionName]
      )
      return rows[0]?.count || 0
    }

    const exactDocumentId = this._extractExactDocumentId(query)
    if (exactDocumentId !== null) {
      const document = await this._readDocumentById(exactDocumentId)
      return document ? 1 : 0
    }

    const documents = await this.find(query).toArray()
    if (documents.length > 1000) {
      log(
        'PERF: countDocuments() loaded %d documents for %s.%s',
        documents.length,
        this._databaseName,
        this._collectionName
      )
    }
    return documents.length
  }

  /**
   * Executes multiple write operations atomically.
   *
   * @param operations - Array of write operations (currently supports updateOne)
   * @param options - Bulk write options
   * @param options.ordered - If true (default), stops on first error
   * @returns Bulk write result with counts
   *
   * @remarks
   * All operations are wrapped in a single transaction.
   */
  public async bulkWrite(
    operations: any[],
    options: { ordered?: boolean } = {}
  ): Promise<BulkWriteResult> {
    const ordered = options.ordered !== false

    return await this._client.withTransaction(async () => {
      let matchedCount = 0
      let modifiedCount = 0
      let upsertedCount = 0

      for (const operation of operations) {
        try {
          if (operation.updateOne) {
            const result = await this.updateOne(
              operation.updateOne.filter,
              operation.updateOne.update,
              { upsert: operation.updateOne.upsert }
            )
            matchedCount += result.matchedCount
            modifiedCount += result.modifiedCount
            upsertedCount += result.upsertedCount
          }
        } catch (error) {
          if (ordered) throw error
        }
      }

      return {
        matchedCount,
        modifiedCount,
        upsertedCount
      }
    })
  }

  /**
   * Creates an index specification (no-op stub).
   *
   * @param indexSpec - Index specification
   * @param _options - Index options (ignored)
   * @returns Promise resolving to index name
   *
   * @deprecated This method is a no-op stub for MongoDB API compatibility.
   * SQLite shim does NOT create actual database indexes.
   * Queries filter documents in-memory using sift.
   */
  public createIndex(
    indexSpec: Record<string, any>,
    _options: Record<string, any> = {}
  ): Promise<string> {
    return Promise.resolve(Object.keys(indexSpec).join('_'))
  }
}

/**
 * Represents a logical database containing collections.
 */
export class Db {
  constructor(
    private readonly _client: MongoClient,
    public readonly databaseName: string
  ) {}

  /**
   * Gets a collection from this database.
   *
   * @param name - Collection name
   * @returns Collection instance for the specified name
   */
  public collection<T = Record<string, any>>(name: string): Collection<T> {
    return new Collection<T>(this._client, this.databaseName, name)
  }
}

type RunResult = {
  lastID: number
  changes: number
}

/**
 * SQLite-backed MongoDB-compatible client.
 * Provides a MongoDB-like API backed by SQLite storage.
 *
 * @remarks
 * This is a compatibility layer designed for migration from MongoDB.
 * Documents are stored in a single SQLite table partitioned by
 * database name and collection name.
 */
export class MongoClient {
  private _connected = false
  public readonly topology = {
    isConnected: () => this._connected
  }

  private constructor(private readonly _database: sqlite3.Database) {
    this._connected = true
  }

  private async _ensureSchema(): Promise<void> {
    // Enable WAL mode for concurrent reads during writes
    await this._run('PRAGMA journal_mode = WAL')
    // Wait up to 30 seconds for locks to clear
    await this._run('PRAGMA busy_timeout = 30000')
    // NORMAL sync is safe with WAL and faster than FULL
    await this._run('PRAGMA synchronous = NORMAL')

    await this._run(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        rowid INTEGER PRIMARY KEY AUTOINCREMENT,
        database_name TEXT NOT NULL,
        collection_name TEXT NOT NULL,
        document_id TEXT NOT NULL,
        document_json TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(database_name, collection_name, document_id)
      )`
    )
    await this._run(
      `CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_scope
       ON ${TABLE_NAME}(database_name, collection_name)`
    )
  }

  /**
   * Connects to a SQLite database, creating it if necessary.
   *
   * @param connectionString - SQLite file path or connection string
   *   - If empty, uses `SQLITE_DB_PATH` env var or defaults to `did.sqlite`
   *   - Supports `sqlite://path`, `file:path`, or direct file paths
   *   - MongoDB connection strings are ignored (falls back to default)
   * @param _options - Connection options (ignored, for MongoDB API compatibility)
   * @returns Connected MongoClient instance
   */
  public static async connect(
    connectionString?: string,
    _options?: Record<string, any>
  ): Promise<MongoClient> {
    const sqlitePath = getSqliteFilePath(connectionString)
    fs.mkdirSync(path.dirname(sqlitePath), { recursive: true })

    const database = await new Promise<sqlite3.Database>((resolve, reject) => {
      const instance = new Sqlite.Database(sqlitePath, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(instance)
      })
    })

    const client = new MongoClient(database)
    await client._ensureSchema()
    return client
  }

  /**
   * Gets a database instance.
   *
   * @param databaseName - Logical database name (defaults to 'main')
   * @returns Db instance for the specified database
   */
  public db(databaseName = 'main'): Db {
    return new Db(this, databaseName || 'main')
  }

  /**
   * Closes the database connection.
   */
  public async close(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this._database.close((error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })
    this._connected = false
  }

  /**
   * Begins a database transaction with IMMEDIATE lock.
   * Use this for atomic multi-document operations.
   */
  public async beginTransaction(): Promise<void> {
    await this._run('BEGIN IMMEDIATE')
  }

  /**
   * Commits the current transaction.
   */
  public async commit(): Promise<void> {
    await this._run('COMMIT')
  }

  /**
   * Rolls back the current transaction.
   */
  public async rollback(): Promise<void> {
    await this._run('ROLLBACK')
  }

  /**
   * Executes a function within a transaction.
   * Automatically commits on success or rolls back on error.
   *
   * @param fn - Async function to execute within the transaction
   * @returns The result of the function
   */
  public async withTransaction<T>(fn: () => Promise<T>): Promise<T> {
    await this.beginTransaction()
    try {
      const result = await fn()
      await this.commit()
      return result
    } catch (error) {
      await this.rollback()
      throw error
    }
  }

  /** @internal */
  public async _run(sql: string, parameters: any[] = []): Promise<RunResult> {
    return await new Promise<RunResult>((resolve, reject) => {
      this._database.run(sql, parameters, function (error) {
        if (error) {
          reject(error)
          return
        }
        resolve({
          lastID: this.lastID,
          changes: this.changes
        })
      })
    })
  }

  /** @internal */
  public async _all<T = Record<string, any>>(
    sql: string,
    parameters: any[] = []
  ): Promise<T[]> {
    return await new Promise<T[]>((resolve, reject) => {
      this._database.all(sql, parameters, (error, rows) => {
        if (error) {
          reject(error)
          return
        }
        resolve((rows as T[]) || [])
      })
    })
  }
}

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Collection, Db, FilterQuery, OptionalId } from 'mongodb'
import _ from 'lodash'
import { RequestContext } from '../../../graphql/requestContext'
import { CacheService } from '../../cache'
import { Extension, ExtensionMetadata, Extensions, FieldType } from './types'
import { tryParseJson } from '../../../utils'

export class MongoDocumentService<T> {
  public cache: CacheService = null
  public collection: Collection<T>
  private _fieldTypes: Map<keyof T, any> = new Map()
  private _extensions: Extensions = new Map()

  /**
   * Constructer for `MongoDocumentService`
   *
   * Specify `cachePrefix` to use an underlying `CacheService`
   *
   * @param context - Injected context through `typedi`
   * @param collectionName - Collection name
   * @param cachePrefix - Cache prefix
   * @param database - Database
   */
  constructor(
    public readonly context: RequestContext,
    public collectionName: string,
    public cachePrefix?: string,
    database?: Db
  ) {
    this.collection = (database || context.db).collection(collectionName)
    if (cachePrefix) {
      this.cache = new CacheService(this.context, cachePrefix)
    }
  }

  /**
   * Extend query to be able to check for false OR null.
   * Ref: https://stackoverflow.com/questions/11634601/mongodb-null-field-or-true-false
   *
   * @example Query
   *
   * ```{ hiddenFromReports: false }```
   *
   * will be converted to
   *
   * ```{ hiddenFromReports: { $in: [false, null] } }```
   *
   * @param query - Filter query
   */
  private _extendQuery(query: FilterQuery<T>) {
    return Object.keys(query || {}).reduce((q, key) => {
      const isFalse = query[key] === false
      q[key] = isFalse
        ? {
            $in: [false, null]
          }
        : query[key]
      return q
    }, {})
  }

  /**
   * Parses JSON string to object before inserting into the mongo collection.
   * Also merges the extensions metadata with the extensions object.
   *
   * @param document Document to parse
   * @param key Key of the field
   */
  private _parseJson(document: T, key: keyof T) {
    try {
      const json = tryParseJson(document[key] as string, null)
      if (!json) return null
      switch (key) {
        case 'extensions': {
          return [...this._extensions.entries()].reduce(
            (extensions, [key, metadata]) => {
              return {
                ...extensions,
                [key]: {
                  ...metadata,
                  ...extensions[key]
                }
              }
            },
            json
          )
        }
        default: {
          return json
        }
      }
    } catch {
      return null
    }
  }

  /**
   * Handles field types for the given action on the provided documents.
   *
   * @param action - The action to perform ('get' or 'set').
   * @param documents_ - The documents to handle field types for.
   *
   * @returns The transformed documents with field types handled.
   */
  private _handleFieldTypes(action: 'get' | 'set', ...documents_: T[]): T[] {
    if (this._fieldTypes.size === 0) {
      return documents_
    }
    const transformed = documents_.map((document) => {
      for (const key of this._fieldTypes.keys()) {
        if (document[key] !== undefined) {
          switch (this._fieldTypes.get(key)) {
            case 'JSON': {
              document[key as string] =
                action === 'get'
                  ? JSON.stringify(document[key])
                  : this._parseJson(document, key)
            }
          }
        }
      }
      return document
    })
    return transformed
  }

  /**
   * Wrapper on `_.find().toArray()` that also handles field types like `JSON`.
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
   *
   * @param query - Filter query
   * @param sort - Sort options
   */
  public async find<S = any>(query: FilterQuery<T>, sort?: S): Promise<T[]> {
    const array = await this.collection
      .find(this._extendQuery(query), { sort })
      .toArray()
    return this._handleFieldTypes('get', ...array)
  }

  /**
   * Wrapper on insertMany() that also sets `updatedAt` and `createdAt` properties
   *
   * @remarks Returns void if documents_ is empty
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany
   *
   * @param documents_ - Documents
   */
  public insertMultiple(documents_: OptionalId<any>[]) {
    if (_.isEmpty(documents_)) return
    const documents = documents_.map((document_) => ({
      ...document_,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    return this.collection.insertMany(documents)
  }

  /**
   * Wrapper on insertOne() that also sets `updatedAt` and `createdAt` properties,
   * and handles field types like `JSON`.
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
   *
   * @param document_ - Document
   */
  public insert(document_: OptionalId<any>) {
    const [document] = this._handleFieldTypes('set', document_)
    return this.collection.insertOne({
      ...document,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  /**
   * Wrapper on updateOne() that also updates `updatedAt` property and handles field types like `JSON`.
   *
   * @see — https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne
   *
   * @param query - Query
   * @param document_ - Document
   */
  public update(query: FilterQuery<T>, document_: OptionalId<any>) {
    const [document] = this._handleFieldTypes('set', document_)
    return this.collection.updateOne(query, {
      $set: {
        ...document,
        updatedAt: new Date()
      }
    })
  }

  /**
   * Register field type for special handling.
   *
   * @param fieldName Field name to register
   * @param type The field type
   */
  protected _registerType(fieldName: keyof T, type: FieldType) {
    this._fieldTypes.set(fieldName, type)
  }

  /**
   * Register JSON field type for special handling.
   */
  public registerJsonType(fieldName: keyof T) {
    this._registerType(fieldName, 'JSON')
  }

  /**
   * Registers an extension with the given extension ID and optional metadata.
   * If the extension ID is an instance of `Extension`, the metadata parameter is ignored.
   * If the extension ID is a string or a number, the metadata parameter is used.
   * If the `extensions` field type is not registered, it will be registered as `JSON`.
   *
   * @param extensionId - The ID of the extension to register, either a string, number, or an instance of `Extension`.
   * @param metadata - Optional metadata for the extension.
   */
  public registerExtension(
    extensionId: string | Extension,
    metadata?: ExtensionMetadata
  ) {
    if (extensionId instanceof Extension) {
      this._extensions.set(extensionId.id, extensionId.metadata)
    } else {
      this._extensions.set(extensionId, metadata)
    }
    if (!this._fieldTypes.has('extensions' as any)) {
      this._registerType('extensions' as any, 'JSON')
    }
  }
}

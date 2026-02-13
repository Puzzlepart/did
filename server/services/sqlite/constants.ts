/**
 * SQLite storage constants shared between runtime and import utilities.
 * @module server/services/sqlite/constants
 */

/** Name of the main SQLite table storing all documents */
export const TABLE_NAME = 'did_documents'

/** Field name used for type metadata in serialized documents */
export const TYPE_FIELD = '__did_sqlite_type__'

/** Type identifier for serialized Date objects */
export const DATE_TYPE = 'date'

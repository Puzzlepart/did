/**
 * SQLite storage constants shared between runtime and import utilities.
 * @module server/services/sqlite/constants
 */

/** Name of the main SQLite table storing all documents */
export const TABLE_NAME = 'did_documents'

/** Field name used for type metadata in serialized documents */
export const TYPE_FIELD = '__did_sqlite_type__'

/** Field name used to mark values as shim-encoded (reduces type marker collisions) */
export const ENCODED_FIELD = '__did_sqlite_encoded__'

/** Type identifier for serialized Date objects */
export const DATE_TYPE = 'date'

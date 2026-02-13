import { environment } from './environment'

/**
 * Returns the SQLite file path connection value.
 */
export const getDatabaseConnectionString = (): string => {
  return environment('SQLITE_DB_PATH', 'did.sqlite')
}

/**
 * Returns the logical main database name used for shared collections.
 */
export const getMainDatabaseName = (): string => {
  return environment('SQLITE_DB_MAIN_DB_NAME', 'main')
}

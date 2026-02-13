#!/usr/bin/env node
/* eslint-disable no-console */
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()

const TABLE_NAME = 'did_documents'
const TYPE_FIELD = '__did_sqlite_type__'
const DATE_TYPE = 'date'

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

function toNativeFromMongoExport(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => toNativeFromMongoExport(entry))
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value)
    if (keys.length === 1) {
      const [key] = keys
      const only = value[key]

      if (key === '$oid' || key === '$uuid') return String(only)
      if (key === '$numberInt' || key === '$numberLong') return Number(only)
      if (key === '$numberDouble' || key === '$numberDecimal')
        return Number(only)
      if (key === '$date') {
        if (typeof only === 'string' || typeof only === 'number') {
          return new Date(only)
        }
        if (isPlainObject(only) && '$numberLong' in only) {
          return new Date(Number(only.$numberLong))
        }
        return new Date(only)
      }
    }

    return Object.entries(value).reduce((out, [k, v]) => {
      out[k] = toNativeFromMongoExport(v)
      return out
    }, {})
  }

  return value
}

function encodeForSqlite(value) {
  if (value instanceof Date) {
    return {
      [TYPE_FIELD]: DATE_TYPE,
      value: value.toISOString()
    }
  }

  if (Array.isArray(value)) {
    return value.map((entry) => encodeForSqlite(entry))
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((out, [k, v]) => {
      out[k] = encodeForSqlite(v)
      return out
    }, {})
  }

  return value
}

function getSqlitePathFromConfig() {
  const sqlitePath = process.env.SQLITE_DB_PATH
  const raw = sqlitePath || 'did.sqlite'

  if (raw.startsWith('sqlite://')) {
    const stripped = raw.replace(/^sqlite:\/\//, '')
    return stripped.startsWith('/')
      ? stripped
      : path.resolve(process.cwd(), stripped)
  }

  if (raw.startsWith('file:')) {
    return new URL(raw).pathname
  }

  return path.resolve(process.cwd(), raw)
}

function openSqliteDatabase(sqlitePath) {
  fs.mkdirSync(path.dirname(sqlitePath), { recursive: true })

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(sqlitePath, (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve(db)
    })
  })
}

function run(db, sql, parameters = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, parameters, function (error) {
      if (error) {
        reject(error)
        return
      }
      resolve({ changes: this.changes, lastID: this.lastID })
    })
  })
}

function all(db, sql, parameters = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, parameters, (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows || [])
    })
  })
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

function findLatestBackupFolder(projectRoot) {
  const backupRoot = path.join(projectRoot, '.backup')
  if (!fs.existsSync(backupRoot)) {
    throw new Error(`Missing backup root: ${backupRoot}`)
  }

  const parseBackupTimestamp = (name) => {
    const match = /^backup-(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})$/.exec(
      name
    )
    if (!match) return null
    const [, year, month, day, hour, minute, second] = match
    return Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    )
  }

  const candidates = fs
    .readdirSync(backupRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('backup'))
    .map((entry) => {
      const fullPath = path.join(backupRoot, entry.name)
      const stat = fs.statSync(fullPath)
      const timestampFromName = parseBackupTimestamp(entry.name)
      return {
        name: entry.name,
        fullPath,
        mtimeMs: stat.mtimeMs,
        sortTimeMs:
          timestampFromName === null ? stat.mtimeMs : timestampFromName
      }
    })

  if (candidates.length === 0) {
    throw new Error(`No backup folders found under ${backupRoot}`)
  }

  candidates.sort((left, right) => {
    if (right.sortTimeMs !== left.sortTimeMs) {
      return right.sortTimeMs - left.sortTimeMs
    }
    return right.name.localeCompare(left.name)
  })

  return candidates[0].fullPath
}

async function importCollection(db, databaseName, collectionName, filePath) {
  await run(
    db,
    `DELETE FROM ${TABLE_NAME} WHERE database_name = ? AND collection_name = ?`,
    [databaseName, collectionName]
  )

  const insertStatement = db.prepare(
    `INSERT INTO ${TABLE_NAME}
      (database_name, collection_name, document_id, document_json)
     VALUES (?, ?, ?, ?)`
  )

  const statementRun = (parameters) =>
    new Promise((resolve, reject) => {
      insertStatement.run(parameters, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })

  const finalizeStatement = () =>
    new Promise((resolve, reject) => {
      insertStatement.finalize((error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })

  let inserted = 0
  try {
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' })
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      const trimmed = line.trim()
      if (!trimmed) continue

      const parsed = JSON.parse(trimmed)
      const nativeDocument = toNativeFromMongoExport(parsed)

      const withId =
        nativeDocument._id === undefined || nativeDocument._id === null
          ? { ...nativeDocument, _id: crypto.randomUUID() }
          : nativeDocument

      const documentId = String(withId._id)
      const encodedJson = JSON.stringify(encodeForSqlite(withId))
      await statementRun([
        databaseName,
        collectionName,
        documentId,
        encodedJson
      ])
      inserted += 1

      if (inserted % 10000 === 0) {
        process.stdout.write(
          `[import] ${databaseName}.${collectionName}: ${inserted} inserted\n`
        )
      }
    }
  } finally {
    await finalizeStatement()
  }
  return inserted
}

async function main() {
  const projectRoot = process.cwd()
  const latestBackupFolder = findLatestBackupFolder(projectRoot)
  const sqlitePath = getSqlitePathFromConfig()

  console.log(`Using backup folder: ${latestBackupFolder}`)
  console.log(`Using SQLite database: ${sqlitePath}`)

  const db = await openSqliteDatabase(sqlitePath)
  try {
    await run(
      db,
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

    await run(
      db,
      `CREATE INDEX IF NOT EXISTS idx_${TABLE_NAME}_scope
       ON ${TABLE_NAME}(database_name, collection_name)`
    )

    const dbDirs = fs
      .readdirSync(latestBackupFolder, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()

    let totalInserted = 0

    for (const databaseName of dbDirs) {
      const databasePath = path.join(latestBackupFolder, databaseName)
      const files = fs
        .readdirSync(databasePath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
        .map((entry) => entry.name)
        .sort()

      for (const fileName of files) {
        const collectionName = path.basename(fileName, '.json')
        const filePath = path.join(databasePath, fileName)

        await run(db, 'BEGIN TRANSACTION')
        let inserted = 0
        try {
          inserted = await importCollection(
            db,
            databaseName,
            collectionName,
            filePath
          )
          await run(db, 'COMMIT')
        } catch (error) {
          await run(db, 'ROLLBACK')
          throw new Error(
            `Failed importing ${databaseName}.${collectionName}: ${error.message}`
          )
        }

        totalInserted += inserted
        console.log(
          `[done] ${databaseName}.${collectionName}: ${inserted} inserted`
        )
      }
    }

    const counts = await all(
      db,
      `SELECT database_name, collection_name, COUNT(*) AS count
       FROM ${TABLE_NAME}
       GROUP BY database_name, collection_name
       ORDER BY database_name, collection_name`
    )

    console.log(`Imported ${totalInserted} documents`)
    console.log('Collection counts:')
    for (const row of counts) {
      console.log(` - ${row.database_name}.${row.collection_name}: ${row.count}`)
    }
  } finally {
    await close(db)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

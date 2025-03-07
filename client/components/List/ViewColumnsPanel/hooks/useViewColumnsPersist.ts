/* eslint-disable unicorn/no-unreadable-array-destructuring */
import { useListContext } from 'components/List/context'
import { IListColumn } from 'components/List/types'
import { useBrowserStorage } from 'hooks'
import _ from 'lodash'
import { useCallback } from 'react'

type PersistedColumn = {
  key: string
  hidden: boolean
}

/**
 * Custom hook to persist column settings in local storage, and apply them to the columns.
 *
 * @param columns - The list of columns to be persisted.
 * @returns An object containing two functions:
 * - `apply`: A function that takes a list of columns and returns the list with persisted settings applied.
 * - `update`: A function that updates the persisted column settings based on the current columns.
 */
export function useViewColumnsPersist(columns: IListColumn[]) {
  const context = useListContext()
  const [persistedColumns, , , set] = useBrowserStorage<PersistedColumn[]>({
    key: `${context.props.persistViewColumns
      ?.replace(' ', '_')
      ?.toLowerCase()}_columns`,
    initialValue: []
  })

  const apply = useCallback((columns: IListColumn[]) => {
    if (!context.props.persistViewColumns) return columns
    if (_.isEmpty(persistedColumns)) return columns
    return [...columns]
      .sort((a, b) => {
        const aIndex = persistedColumns.findIndex((c) => c.key === a.key)
        const bIndex = persistedColumns.findIndex((c) => c.key === b.key)
        return aIndex - bIndex
      })
      .map((column) => {
        const persistedColumn = persistedColumns.find(
          (c) => c.key === column.key
        )
        return {
          ...column,
          data: {
            ...column.data,
            hidden:
              persistedColumn === undefined
                ? column?.data?.hidden
                : persistedColumn.hidden
          }
        }
      })
  }, [])

  const update = useCallback(() => {
    if (context.props.persistViewColumns) {
      set(
        columns.map<PersistedColumn>((column) => ({
          key: column.key,
          hidden: column.data?.hidden
        }))
      )
    }
  }, [columns])

  return { apply, update } as const
}

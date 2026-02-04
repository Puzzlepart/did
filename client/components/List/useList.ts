/* eslint-disable unicorn/prevent-abbreviations */
import { useEffect, useMemo } from 'react'
import _ from 'underscore'
import { IListContext } from './context'
import useListReducer, { PROPS_UPDATED } from './reducer'
import { IListProps } from './types'
import { useListPersistedSearch } from './useListPersistedSearch'
import { getUrlState } from 'utils'
import * as arraySort from 'array-sort'

/**
 * Hook that returns a list of items and selection state for a given set of props.
 *
 * @param props The props for the list.
 *
 * @returns An object containing the list props and context.
 */
export function useList(props: IListProps) {
  const [state, dispatch] = useListReducer({
    origItems: props.items,
    items: props.items,
    itemsPreFilter: props.items,
    columns: props.columns,
    searchTerm: getUrlState('q', 'hash') ?? ''
  })

  useEffect(
    () => dispatch(PROPS_UPDATED(props)),
    [props.items, props.filterValues, props.columns]
  )

  const context = { props, state, dispatch } as IListContext

  const columns = useMemo(() => {
    const groupBy = context.props.listGroupProps?.fieldName
    return _.filter(context.state.columns, (col) => {
      if (col?.data?.hidden) return false
      if (groupBy && col.fieldName === groupBy) return false
      return true
    })
  }, [context.state.columns, context.props.listGroupProps?.fieldName])

  const items = useMemo(() => {
    if (!context.state.sortOpts) return context.state.items
    return arraySort([...context.state.items], context.state.sortOpts[0], {
      reverse: context.state.sortOpts[1] === 'asc'
    })
  }, [context.state.items, context.state.sortOpts])

  useEffect(() => {
    if (props.onFilter) {
      props.onFilter({
        filters: state.filters,
        isFiltered: state.items.length !== state.origItems.length
      })
    }
  }, [state.items])

  useListPersistedSearch(context)

  return { context, columns, items } as const
}

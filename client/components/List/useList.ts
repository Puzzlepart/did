import { Selection, SelectionMode } from '@fluentui/react'
import { useEffect, useMemo } from 'react'
import _ from 'underscore'
import { IListContext } from './context'
import useListReducer, { PROPS_UPDATED } from './reducer'
import { IListProps } from './types'
import { useListGroups } from './useListGroups'
import { useListProps } from './useListProps'

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
    searchTerm: ''
  })

  useEffect(
    () => dispatch(PROPS_UPDATED(props)),
    [props.items, props.filterValues]
  )

  const selection = useMemo(() => {
    const [selectionMode = SelectionMode.none, onChanged] = props.selectionProps
    if (!onChanged) return null
    return new Selection({
      onSelectionChanged: () => {
        const _selection = selection.getSelection()
        if (selectionMode === SelectionMode.single) {
          onChanged(_.first(_selection))
        } else {
          onChanged(_selection)
        }
      }
    })
  }, [props.selectionProps])

  const context = { props, state, dispatch } as IListContext

  const [groups, items] = useListGroups(context)

  const listProps = useListProps({
    context,
    groups,
    items,
    selection
  })

  useEffect(() => {
    if (props.onFilter) {
      props.onFilter({
        filters: state.filters,
        isFiltered: state.items.length !== state.origItems.length
      })
    }
  }, [state.items])

  return { listProps, context } as const
}

/* eslint-disable react-hooks/exhaustive-deps */
import { Selection, SelectionMode } from '@fluentui/react'
import { useEffect, useMemo } from 'react'
import _ from 'underscore'
import { IListContext } from './context'
import useListReducer, { PROPS_UPDATED } from './reducer'
import { IListProps } from './types'
import { useListGroups } from './useListGroups'
import { useListProps } from './useListProps'

/**
 * Component logic hook for `<List />
`
 *
 * @param props - Props
 *
 * @category List
 */
export function useList(props: IListProps) {
  const [state, dispatch] = useListReducer({
    origItems: props.items,
    items: props.items,
    searchTerm: ''
  })

  useEffect(
    () => dispatch(PROPS_UPDATED(props)),
    [props.items, props.filterValues]
  )

  const selection = useMemo(() => {
    if (!props.selectionProps) return null
    return new Selection({
      onSelectionChanged: () => {
        const _selection = selection.getSelection()
        if (props.selectionProps?.mode === SelectionMode.single) {
          props.selectionProps.onChanged(_.first(_selection))
        } else {
          props.selectionProps.onChanged(_selection)
        }
      }
    })
  }, [props.selectionProps])

  const context: IListContext = { props, state, dispatch }

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

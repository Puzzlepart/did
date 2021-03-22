/* eslint-disable tsdoc/syntax */
import { Selection, SelectionMode } from 'office-ui-fabric-react'
import { useEffect, useMemo } from 'react'
import { first } from 'underscore'
import useListReducer, { PROPS_UPDATED } from './reducer'
import { IListProps } from './types'
import { useListGroups } from './useListGroups'
import { useListProps } from './useListProps'

type UseList = {
  props: IListProps
}

/**
 * Component logic hook for `<List />`
 *
 * @category List
 */
export function useList({ props }: UseList) {
  const [state, dispatch] = useListReducer({
    origItems: props.items || [],
    items: props.items || [],
    searchTerm: null
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(PROPS_UPDATED(props)), [props.items])

  const selection = useMemo(() => {
    if (!props.selectionProps) return null
    return new Selection({
      onSelectionChanged: () => {
        const _selection = selection.getSelection()
        if (props.selectionProps?.mode === SelectionMode.single) {
          props.selectionProps.onChanged(first(_selection))
        } else {
          props.selectionProps.onChanged(_selection)
        }
      }
    })
  }, [props.selectionProps])

  const [groups, items] = useListGroups([...state.items], props.listGroupProps)

  const [delay, transitionDuration] = props.fadeIn || [0, 0]

  const listProps = useListProps({
    props,
    state,
    dispatch,
    groups,
    items,
    selection
  })

  return {
    delay,
    transitionDuration,
    listProps
  }
}

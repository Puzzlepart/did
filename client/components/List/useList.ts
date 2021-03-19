/* eslint-disable tsdoc/syntax */
import { Selection, SelectionMode } from 'office-ui-fabric-react'
import { useEffect, useMemo } from 'react'
import { first } from 'underscore'
import { generateListGroups } from './generateListGroups'
import useListReducer, { PROPS_UPDATED } from './reducer'
import { IListProps } from './types'
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
        switch (props.selectionProps?.mode) {
          case SelectionMode.single:
            props.selectionProps.onChanged(first(_selection))
            break
          case SelectionMode.multiple:
            props.selectionProps.onChanged(_selection)
            break
        }
      }
    })
  }, [props.selectionProps])

  let groups = null
  let items = [...state.items]
  if (props.listGroupProps)
    [groups, items] = generateListGroups(items, props.listGroupProps)

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

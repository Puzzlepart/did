import { useEffect, useRef } from 'react'
import { useAutocompleteControlReducer } from './reducer'
import { INIT, RESET_SELECTION } from './reducer/actions'
import { IAutocompleteControlProps } from './types'
import _ from 'lodash'

/**
 * Component logic hook for AutocompleteControl component. This hook is responsible for
 * managing the state of the component and providing the necessary callbacks.
 *
 * - Uses `useAutocompleteReducer` to manage the state of the component.
 * `props.items` or `props.defaultSelectedKey` changes.
 * - Uses `useEffect` to reset the state of the component when `props.selectedKey`
 * is `null` or `undefined`.
 *
 * @param props - Props
 *
 * @category AutocompleteControl
 */
export function useAutocompleteControl(props: IAutocompleteControlProps) {
  const [state, dispatch] = useAutocompleteControlReducer(props)

  useEffect(() => {
    dispatch(INIT({ props }))
  }, [props.items, props.selectedKey])

  useEffect(() => {
    if (props.selectedKey === null && state.selectedItem) {
      dispatch(RESET_SELECTION())
    }
  }, [props.selectedKey])

  useEffect(() => {
    if (_.isEmpty(state.items)) return
    props.onSelected(state.selectedItem ?? null)
  }, [state.selectedItem])

  const ref = useRef<HTMLDivElement>(null)

  return { ref, state, dispatch }
}

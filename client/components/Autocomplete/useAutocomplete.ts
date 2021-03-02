/* eslint-disable tsdoc/syntax */
import { useLayoutEffect, useMemo, useReducer, useRef } from 'react'
import styles from './Autocomplete.module.scss'
import createReducer, { INIT } from './reducer'
import { IAutocompleteProps } from './types'
import { useAutocompleteEvents } from './useAutocompleteEvents'

/**
 * Hook for Autocomplete
 *
 * @category Autocomplete
 *
 * @param props - Props
 */
export function useAutocomplete(props: IAutocompleteProps) {
  const reducer = useMemo(() => createReducer(), [])
  const [state, dispatch] = useReducer(reducer, {
    selectedIndex: -1,
    suggestions: []
  })
  const reference = useRef<HTMLDivElement>()

  useLayoutEffect(() => dispatch(INIT({ props })), [props])

  const classNames = [styles.root, props.errorMessage && styles.hasError]

  const suggestions = useMemo(
    () =>
      state.suggestions.map((s, index) => ({
        ...s,
        isSelected: index === state.selectedIndex
      })),
    [state.suggestions, state.selectedIndex]
  )

  const {
    onDismissCallout,
    onSetSelected,
    onSearch,
    onClear,
    onKeyDown
  } = useAutocompleteEvents({ props, dispatch })

  return {
    state,
    dispatch,
    ref: reference,
    className: classNames.join(' '),
    suggestions,
    onDismissCallout,
    onSetSelected,
    onSearch,
    onClear,
    onKeyDown
  }
}

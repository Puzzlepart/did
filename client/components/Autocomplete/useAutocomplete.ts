/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { ISearchBox } from '@fluentui/react'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { INIT } from './actions'
import styles from './Autocomplete.module.scss'
import { useAutocompleteReducer } from './reducer'
import { IAutocompleteProps } from './types'
import { useAutocompleteEvents } from './useAutocompleteEvents'

/**
 * Hook for `<Autocomplete />`
 *
 * @param props - Props
 *
 * @category Autocomplete
 */
export function useAutocomplete(props: IAutocompleteProps) {
  const [state, dispatch] = useAutocompleteReducer({
    value: '',
    selectedItem: null,
    selectedIndex: -1,
    suggestions: []
  })
  const ref = useRef<HTMLDivElement>()

  useLayoutEffect(
    () => dispatch(INIT({ props })),
    [props.defaultSelectedKey, props.items]
  )

  const classNames = [styles.root, props.errorMessage && styles.hasError]

  const suggestions = useMemo(
    () =>
      state.suggestions.map((suggestion_, index) => ({
        ...suggestion_,
        isSelected: index === state.selectedIndex
      })),
    [state.suggestions, state.selectedIndex]
  )

  const { onDismissCallout, onSetSelected, onSearch, onClear, onKeyDown } =
    useAutocompleteEvents({ props, dispatch })

  const searchBoxRef = useRef<ISearchBox>()
  useEffect(() => {
    if (props.autoFocus) searchBoxRef?.current.focus()
  }, [props])

  return {
    state,
    ref,
    searchBoxRef,
    className: classNames.join(' '),
    suggestions,
    onDismissCallout,
    onSetSelected,
    onSearch,
    onClear,
    onKeyDown
  } as const
}

/* eslint-disable unicorn/prevent-abbreviations */
import { useEffect, useMemo, useRef } from 'react'
import { AutocompleteControl } from './AutocompleteControl'
import styles from './AutocompleteControl.module.scss'
import { useAutocompleteControlReducer } from './reducer'
import { INIT, RESET } from './reducer/actions'
import { IAutocompleteControlProps } from './types'

/**
 * Component logic hook for AutocompleteControl component. This hook is responsible for
 * managing the state of the component and providing the necessary callbacks.
 *
 * - Uses `useAutocompleteReducer` to manage the state of the component.
 * - Uses `useAutocompleteEvents` to provide the necessary callbacks.
 * - Uses `useLayoutEffect` to initialize the state of the component when
 * `props.items` or `props.defaultSelectedKey` changes.
 * - Uses `useEffect` to reset the state of the component when `props.selectedKey`
 * is `null` or `undefined`.
 * - Uses `useMemo` to memoize the `suggestions` array.
 * - Uses `useRef` and `useEffect` to focus the search box when `props.autoFocus` is `true`.
 *
 * @param props - Props
 *
 * @category AutocompleteControl
 */
export function useAutocompleteControl(props: IAutocompleteControlProps) {
  const [state, dispatch] = useAutocompleteControlReducer()

  useEffect(
    () => dispatch(INIT({ props })),
    [props.defaultSelectedKey, props.items]
  )

  useEffect(() => {
    if (props.selectedKey === null) dispatch(RESET())
  }, [props.selectedKey])

  const classNames = [
    AutocompleteControl.className,
    props.errorMessage && styles.hasError
  ]

  const suggestions = useMemo(
    () =>
      state.suggestions.map((suggestion_, index) => ({
        ...suggestion_,
        isSelected: index === state.selectedIndex
      })),
    [state.suggestions, state.selectedIndex]
  )

  const ref = useRef<HTMLDivElement>(null)

  return {
    state,
    dispatch,
    ref,
    className: classNames.join(' '),
    suggestions
  }
}

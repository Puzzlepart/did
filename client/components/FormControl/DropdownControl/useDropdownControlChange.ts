import { DropdownProps } from '@fluentui/react-components'
import { useCallback, useEffect } from 'react'
import { IDropdownControlProps } from './types'
import _ from 'lodash'

/**
 * Custom hook to handle changes in a dropdown control.
 *
 * @param props - The properties for the dropdown control.
 * @returns A callback function to handle the option selection change.
 *
 * @remarks
 * The `onChange` callback function is memoized using `useCallback` to ensure
 * it does not change between renders. It updates the model with the selected
 * option's value, optionally transforming the value if a `preTransformValue`
 * function is provided in the options.
 *
 * The `useEffect` hook is used to automatically select the first option if
 * `selectFirstOption` is true and there are available values.
 *
 * @param props.options - The options for the dropdown control, including an optional
 * `preTransformValue` function to transform the selected value.
 * @param props.model - The model to update with the selected value.
 * @param props.name - The name of the control, used as the key to update the model.
 * @param props.selectFirstOption - A flag indicating whether to automatically select
 * the first option.
 * @param props.values - The available values for the dropdown control.
 */
export function useDropdownControlChange(props: IDropdownControlProps) {
  const onChange = useCallback<DropdownProps['onOptionSelect']>(
    (_event, data) => {
      const value = props.options?.preTransformValue
        ? props.options.preTransformValue(data)
        : data.optionValue
      props.model.set(props.name, value)
    },
    []
  )

  useEffect(() => {
    if (!props.selectFirstOption) return
    if (_.isEmpty(props.values)) return
    onChange(null, {
      selectedOptions: [],
      optionValue: props.values[0].value,
      optionText: props.values[0].text
    })
  }, [props.selectFirstOption])

  return onChange
}

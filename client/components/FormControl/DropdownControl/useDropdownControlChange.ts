import { DropdownProps } from '@fluentui/react-components'
import { useCallback, useEffect } from 'react'
import { IDropdownControlProps } from './types'
import _ from 'lodash'

export function useDropdownControlChange(props: IDropdownControlProps) {
  const onChange = useCallback<DropdownProps['onOptionSelect']>((_event, data) => {
    const value = props.options?.preTransformValue
      ? props.options.preTransformValue(data)
      : data.optionValue
    props.model.set(props.name, value)
  }, [])

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

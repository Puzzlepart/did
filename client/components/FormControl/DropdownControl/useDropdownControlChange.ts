import { DropdownProps } from '@fluentui/react-components'
import { useCallback } from 'react'
import { IDropdownControlProps } from './types'

export function useDropdownControlChange(props: IDropdownControlProps) {
  return useCallback<DropdownProps['onOptionSelect']>((_event, data) => {
    const value = props.options?.preTransformValue
      ? props.options.preTransformValue(data)
      : data.optionValue
    props.model.set(props.name, value)
  }, [])
}

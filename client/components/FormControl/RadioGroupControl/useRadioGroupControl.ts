import { RadioGroupProps } from '@fluentui/react-components'
import { useCallback } from 'react'
import { IRadioGroupControlProps } from './types'

export function useRadioGroupControl(props: IRadioGroupControlProps) {
  const value = props.model.value(props.name)

  const onChange = useCallback<RadioGroupProps['onChange']>(
    (_event, data) => {
      const value = data.value
      props.model.set(props.name, value)
    },
    [props.model]
  )

  return { value, onChange }
}

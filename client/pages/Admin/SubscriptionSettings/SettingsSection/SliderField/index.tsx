import { Label, Slider, useId } from '@fluentui/react-components'
import get from 'get-value'
import React, { FC, useContext } from 'react'
import { SubscriptionContext } from '../../context'
import { ISliderFieldProps } from './types'

export const SliderField: FC<ISliderFieldProps> = (props) => {
  const { settings, onChange } = useContext(SubscriptionContext)
  const id = useId()
  const value = get(settings, props.settingsKey, {
    default: props.defaultValue
  })

  return (
    <div style={{ width: '100%' }}>
      <div>
        <Label htmlFor={id} weight='semibold'>
          {props.label} ({value})
        </Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Label aria-hidden>{props.min}</Label>
        <Slider
          {...props}
          id={id}
          defaultValue={value}
          onChange={(_, data) => onChange(props.settingsKey, data?.value)}
          style={{ width: '100%' }}
        />
        <Label aria-hidden>{props.max}</Label>
      </div>
    </div>
  )
}

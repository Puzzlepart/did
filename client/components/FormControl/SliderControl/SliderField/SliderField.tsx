import { Slider } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import { Field } from '../../Field'
import styles from './SliderField.module.scss'
import { ISliderFieldProps } from './types'

export const SliderField: ReusableComponent<ISliderFieldProps> = (props) => {
  return (
    <Field
      className={SliderField.className}
      {..._.pick(props, 'name', 'label', 'description', 'required', 'hidden')}
      label={
        props.formatValue
          ? `${props.label} (${props.formatValue(props.value)})`
          : props.label
      }
    >
      <Slider
        {..._.pick(
          props,
          'value',
          'defaultValue',
          'min',
          'max',
          'step',
          'onChange'
        )}
      />
    </Field>
  )
}

SliderField.className = styles.sliderField

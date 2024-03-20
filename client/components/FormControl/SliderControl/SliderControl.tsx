import React from 'react'
import { FormControlContext } from '../context'
import { FormInputControlComponent } from '../types'
import { SliderField } from './SliderField'
import { ISliderControlProps } from './types'
import { useSliderControl } from './useSliderControl'

/**
 * Text field based on `<Slider />` from [@fluentui/react-components](@fluentui/react-components)
 * but also supports binding to a `model`
 *
 * @category Reusable Component
 */
export const SliderControl: FormInputControlComponent<ISliderControlProps> = (
  props
) => {
  const { onChange, value } = useSliderControl(props)
  return (
    <FormControlContext.Consumer>
      {(context) => (
        <SliderField
          {...props}
          onBlur={context.onBlurCallback}
          onChange={(event, data) => onChange(event, data.value)}
          value={value}
        />
      )}
    </FormControlContext.Consumer>
  )
}

SliderControl.displayName = 'SliderControl'

import { SliderProps } from '@fluentui/react-components'
import { BaseControlOptions, FormInputControlBase } from '../types'
import { ISliderFieldProps } from './SliderField'

export interface SliderControlOptions extends BaseControlOptions {}

export interface ISliderControlProps
  extends FormInputControlBase<SliderControlOptions>,
    Pick<ISliderFieldProps, 'formatValue'>,
    Pick<SliderProps, 'defaultValue' | 'max' | 'min' | 'step'> {}

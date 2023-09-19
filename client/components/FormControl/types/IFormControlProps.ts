import { IBasePanelProps } from 'components/BasePanel'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'
import { ISubmitProps } from './ISubmitProps'

export interface IFormControlProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /**
   * Specify the model used for the form control.
   */
  model?: ReturnType<typeof useMap>

  /**
   * Submit  props
   */
  submitProps?: ISubmitProps

  /**
   * Specify panel props to open the form control in
   * a `<Panel />`
   */
  panelProps?: IBasePanelProps

  /**
   * Enable validation on blur
   */
  validateOnBlur?: boolean

  /**
   * Model of type `T` to be edited
   */
  edit?: T

  /**
   * Running in debug mode will show the model JSON in the bottom of the form.
   */
  debug?: boolean
}

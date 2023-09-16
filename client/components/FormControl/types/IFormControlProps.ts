import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'
import { IFormControlPanelProps } from './IFormControlPanelProps'
import { ISubmitProps } from './ISubmitProps'

export interface IFormControlProps
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
  panelProps?: IFormControlPanelProps

  /**
   * Model to be edited
   */
  edit?: any

  /**
   * Running in debug mode will show the model JSON in the bottom of the form.
   */
  debug?: boolean
}

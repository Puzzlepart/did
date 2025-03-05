import { IPanelProps } from 'components/Panel'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'
import { ISubmitProps } from './ISubmitProps'
import { useFormControls } from '../useFormControls'
import { IDynamicButtonProps } from 'components'
export interface IFormControlProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /**
   * Specify the model used for the form control.
   */
  model?: ReturnType<typeof useMap>

  /**
   * Callback for registering form controls.
   */
  register?: ReturnType<typeof useFormControls>

  /**
   * Submit  props
   */
  submitProps?: ISubmitProps

  /**
   * Additional actions to be added to the form control.
   */
  additonalActions?: IDynamicButtonProps[]

  /**
   * Specify panel props to open the form control in
   * a `<Panel />`
   */
  panel?: IPanelProps

  /**
   * Enable validation on blur
   */
  validateOnBlur?: boolean

  /**
   * Model of type `T` to be edited
   */
  edit?: T

  /**
   * Skip validation for the form control.
   */
  skipValidation?: boolean

  /**
   * If the form control is in edit mode.
   */
  isEditMode?: boolean

  /**
   * Running in debug mode will show the model JSON in the bottom of the form.
   */
  debug?: boolean

  /**
   * Additional context to be passed to the form controls.
   */
  additionalContext?: Map<string, any>
}

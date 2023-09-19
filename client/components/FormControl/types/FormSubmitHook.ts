/* eslint-disable @typescript-eslint/ban-types */
import { useFormControlModel } from '../useFormControlModel'
import { ISubmitProps } from './ISubmitProps'

export type FormSubmitHook<
  TProps = {},
  TModel = ReturnType<typeof useFormControlModel>,
  TOptions = {}
> = (props?: TProps, model?: TModel, options?: TOptions) => ISubmitProps

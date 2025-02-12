import { useFormControlModel, useFormControls } from 'components'
import { ApiTokenInput } from 'types'
import { IApiTokenFormProps } from './types'
import { useApiTokenFormSubmit } from './useApiTokenFormSubmit'
import { useExpiryOptions } from './useExpiryOptions'
import { ApiTokenForm } from './ApiTokenForm'

/**
 * Component logic hook for `<ApiTokenForm />`
 */
export function useApiTokenForm(props: IApiTokenFormProps) {
  const model = useFormControlModel<keyof ApiTokenInput>()
  const register = useFormControls<keyof ApiTokenInput>(model, ApiTokenForm)
  const submitProps = useApiTokenFormSubmit(props, model)
  const expiryOptions = useExpiryOptions()
  return {
    expiryOptions,
    submitProps,
    model,
    register
  }
}

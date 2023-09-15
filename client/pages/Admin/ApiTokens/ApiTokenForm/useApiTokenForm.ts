import { useFormControlModel, useFormControls } from 'components'
import { ApiTokenInput } from '../../../../../server/graphql'
import { IApiTokenFormProps } from './types'
import { useApiTokenFormSubmit } from './useApiTokenFormSubmit'
import { useExpiryOptions } from './useExpiryOptions'

/**
 * Component logic hook for `<ApiTokenForm />`
 */
export function useApiTokenForm(props: IApiTokenFormProps) {
  const model = useFormControlModel<keyof ApiTokenInput>()
  const register = useFormControls<keyof ApiTokenInput>(model)
  const submitProps = useApiTokenFormSubmit(props, model)
  const expiryOptions = useExpiryOptions()
  return {
    expiryOptions,
    submitProps,
    model,
    register
  }
}

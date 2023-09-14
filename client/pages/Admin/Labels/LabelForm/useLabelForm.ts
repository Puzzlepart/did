import { useFormControls } from 'components/FormControl'
import { ILabelFormProps } from './types'
import { useLabelFormSubmit } from './useLabelFormSubmit'
import { useLabelModel } from './useLabelModel'

/**
 * Custom hook that returns an object with the label form model, form control registration function, and form submission function.
 * 
 * @param props - The props object containing the initial values for the label form.
 * 
 * @returns An object with the label form model, form control registration function, and form submission function.
 */
export function useLabelForm(props: ILabelFormProps) {
  const model = useLabelModel(props)
  const register = useFormControls(model)
  const submit = useLabelFormSubmit(props, model)
  return {
    model,
    register,
    submit
  } as const
}

import { useFormControls } from 'components/FormControl'
import { ILabelFormProps } from './types'
import { useLabelFormSubmit } from './useLabelFormSubmit'
import { useLabelModel } from './useLabelModel'

export function useLabelForm(props: ILabelFormProps) {
  const model = useLabelModel(props)
  const register = useFormControls(model)
  const submit = useLabelFormSubmit(props, model)
  return {
    model,
    register,
    submit
  }
}

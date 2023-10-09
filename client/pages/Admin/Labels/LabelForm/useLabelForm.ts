import { IFormControlProps, useFormControls } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
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
  const { t } = useTranslation()
  const model = useLabelModel(props)
  const register = useFormControls(model)
  const submitProps = useLabelFormSubmit(props, model)
  const panelProps: IFormControlProps['panel'] = {
    ..._.omit(props, 'onSave'),
    title: props.edit
      ? t('admin.labels.editText')
      : t('admin.labels.addNewText')
  }
  return {
    model,
    register,
    submitProps,
    panelProps
  }
}

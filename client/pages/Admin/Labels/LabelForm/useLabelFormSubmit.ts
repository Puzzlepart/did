import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook } from 'components/FormControl'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateLabel from './addOrUpdateLabel.gql'
import { CreateOrUpdateLabelVariables, ILabelFormProps } from './types'
import { useLabelModel } from './useLabelModel'

/**
 * Hook that returns an object with properties needed for submitting a label form.
 *
 * @template ILabelFormProps - The type of the props passed to the label form.
 * @template ReturnType<typeof useLabelModel> - The return type of the `useLabelModel` hook.
 *
 * @param props - The props passed to the label form.
 * @param model - The model returned by the `useLabelModel` hook.
 *
 * @returns - An object with properties needed for submitting a label form.
 */
export const useLabelFormSubmit: FormSubmitHook<
  ILabelFormProps,
  ReturnType<typeof useLabelModel>
> = (props, model) => {
  const { t } = useTranslation()
  const [createOrUpdateLabel, { loading }] = useMutation<
    any,
    CreateOrUpdateLabelVariables
  >($addOrUpdateLabel)
  const { displayToast } = useAppContext()

  /**
   * On save label
   */
  const onSave = useCallback(async () => {
    const variables: CreateOrUpdateLabelVariables = {
      label: _.omit(model.$, '__typename'),
      update: !!props.edit
    }
    try {
      await createOrUpdateLabel({ variables })
      displayToast(
        variables.update
          ? t('admin.labels.updateSuccess', model.$)
          : t('admin.labels.createSuccess', model.$),
        'success'
      )
      model.reset()
      props.onSave(model.$)
    } catch {
      displayToast(
        variables.update
          ? t('admin.labels.updateError')
          : t('admin.labels.createError'),
        'error'
      )
    }
  }, [model, createOrUpdateLabel, props])

  /**
   * Checks if form is valid
   */
  const isFormValid = (): boolean =>
    !s.isBlank(model.value('name', '')) && !s.isBlank(model.value('color', ''))

  return {
    text: t('common.save'),
    onClick: onSave,
    disabled: !isFormValid() || loading
  }
}

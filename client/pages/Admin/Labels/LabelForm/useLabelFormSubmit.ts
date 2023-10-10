import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook } from 'components/FormControl'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateLabel from './addOrUpdateLabel.gql'
import { ILabelFormProps } from './types'
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
  const [mutate, { loading }] = useMutation($addOrUpdateLabel)
  const { setToast } = useAppContext()

  /**
   * On save label
   */
  const onSave = useCallback(async () => {
    try {
      await mutate({
        variables: {
          label: _.omit(model.$, '__typename'),
          update: !!props.edit
        }
      })
      setToast({
        text: props.edit
          ? t('admin.labels.updateSuccess', model.$)
          : t('admin.labels.createSuccess', model.$),
        intent: 'success'
      })
      model.reset()
      props.onSave(model.$)
    } catch {
      setToast({
        text: props.edit
          ? t('admin.labels.createError')
          : t('admin.labels.createError'),
        intent: 'error'
      })
    }
  }, [model, mutate, props])

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

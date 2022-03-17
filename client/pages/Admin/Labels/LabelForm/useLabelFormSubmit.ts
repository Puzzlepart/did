/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useToast } from 'components'
import { ISubmitProps } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateLabel from './addOrUpdateLabel.gql'
import { ILabelFormProps } from './types'
import { useLabelModel } from './useLabelModel'

export function useLabelFormSubmit(
  props: ILabelFormProps,
  model: ReturnType<typeof useLabelModel>
): ISubmitProps {
  const { t } = useTranslation()
  const [mutate, { loading }] = useMutation($addOrUpdateLabel)
  const [toast, setToast] = useToast(8000, { isMultiline: true })

  /**
   * On save label
   */
  const onSave = async () => {
    try {
      await mutate({
        variables: {
          label: _.omit(model.$, '__typename'),
          update: !!props.edit
        }
      })
      setToast({
        text: !props.edit
          ? t('admin.labels.createSuccess', model.$)
          : t('admin.labels.updateSuccess', model.$),
        type: 'success'
      })
      model.reset()
      props.onSave(model.$)
    } catch {
      setToast({
        text: !props.edit
          ? t('admin.labels.createError')
          : t('admin.labels.createError'),
        type: 'error'
      })
    }
  }

  /**
   * Checks if form is valid
   */
  const isFormValid = (): boolean =>
    !s.isBlank(model.value('name', '')) && !s.isBlank(model.value('color', ''))

  return {
    toast,
    text: t('common.save'),
    onClick: onSave,
    disabled: !isFormValid() || loading
  }
}

import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook, useFormControlModel } from 'components'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import $addApiToken from './addApiToken.gql'
import { IApiTokenFormProps } from './types'
/**
 * Hook that returns an object with properties needed for submitting a ApiToken form.
 */
export const useApiTokenFormSubmit: FormSubmitHook<
  IApiTokenFormProps,
  ReturnType<typeof useFormControlModel>
> = (props, model) => {
  const { t } = useTranslation()
  const [addApiToken] = useMutation<ApiToken>($addApiToken)
  const { displayToast } = useAppContext()

  /**
   * On save API token
   */
  const onSave = useCallback(async () => {
    try {
      const { data } = await addApiToken({
        variables: {
          token: model.$
        }
      })
      displayToast(t('admin.tokenGeneratedText'), 'success', 20)
      model.reset()
      props.onTokenAdded({
        ...(model.$ as ApiToken),
        ...data
      })
    } catch {
      displayToast(t('admin.tokenErrorText'), 'error')
      props.onDismiss()
    }
  }, [model, props])

  return {
    text: t('common.save'),
    onClick: onSave
  }
}

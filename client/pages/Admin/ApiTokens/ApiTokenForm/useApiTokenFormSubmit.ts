import { useMutation } from '@apollo/client'
import { FormSubmitHook, useFormControlModel, useToast } from 'components'
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
  const [toast, setToast] = useToast(8000)

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
      setToast({ text: t('admin.tokenGeneratedText') }, 20_000)
      model.reset()
      props.onTokenAdded({
        ...(model.$ as ApiToken),
        ...data
      })
    } catch {
      setToast({
        intent: 'error',
        text: t('admin.tokenErrorText')
      })
      props.onDismiss()
    }
  }, [model, props])

  return {
    toast,
    text: t('common.save'),
    onClick: onSave
  }
}

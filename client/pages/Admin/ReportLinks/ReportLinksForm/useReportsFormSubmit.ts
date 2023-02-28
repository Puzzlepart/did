/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useToast } from 'components'
import { ISubmitProps } from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateReportLink from './addOrUpdateReportLink.gql'
import { IReportLinksFormProps } from './types'
import { useReportLinksModel } from './useReportLinksModel'

/**
 * Check if URL is valid using HTML5 input type url validation.
 *
 * @param urlString URL string to validate
 */
const isValidUrl = (urlString: string) => {
  if (s.isBlank(urlString) || s.isBlank(urlString.trim())) {
    return false
  }
  const inputElement = document.createElement('input')
  inputElement.type = 'url'
  inputElement.value = urlString

  return !inputElement.checkValidity() ? false : true
}

/**
 * Hook for handling the form submit. Handles the GraphQL
 * mutation and messages to the user using a toast.
 *
 * @param props Props from `<ReportLinksForm />`
 * @param model Model from `useReportLinksModel`
 */
export function useReportsFormSubmit(
  props: IReportLinksFormProps,
  model: ReturnType<typeof useReportLinksModel>
): ISubmitProps {
  const { t } = useTranslation()
  const [mutate, { loading }] = useMutation($addOrUpdateReportLink)
  const [toast, setToast] = useToast(8000, { isMultiline: true })

  /**
   * On save report link function callback.
   */
  const onSave = async () => {
    try {
      await mutate({
        variables: {
          reportLink: _.omit(model.$, '__typename', 'createdAt', 'updatedAt'),
          update: !!props.edit
        }
      })
      setToast({
        text: !props.edit
          ? t('admin.reportLinks.createSuccess', model.$)
          : t('admin.reportLinks.updateSuccess', model.$),
        type: 'success'
      })
      model.reset()
      props.onSave(model.$)
    } catch {
      setToast({
        text: !props.edit
          ? t('admin.reportLinks.createError')
          : t('admin.reportLinks.updateError'),
        type: 'error'
      })
    }
  }

  /**
   * Checks if form is valid
   */
  const isFormValid = (): boolean =>
    !s.isBlank(model.value('name', '')) &&
    isValidUrl(model.value('externalUrl', '')) &&
    !s.isBlank(model.value('icon', '')) &&
    !s.isBlank(model.value('iconColor', '')) &&
    !s.isBlank(model.value('description', ''))

  return {
    toast,
    text: t('common.save'),
    onClick: onSave,
    disabled: !isFormValid() || loading
  } as const
}

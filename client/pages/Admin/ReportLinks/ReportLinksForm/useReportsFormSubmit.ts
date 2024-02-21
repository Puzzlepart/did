import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { FormSubmitHook } from 'components/FormControl'
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

  return inputElement.checkValidity() ? true : false
}

/**
 * Hook for handling the form submit. Handles the GraphQL
 * mutation and messages to the user using a toast.
 *
 * @param props Props from `<ReportLinksForm />`
 * @param model Model from `useReportLinksModel`
 */
export const useReportsFormSubmit: FormSubmitHook<
  IReportLinksFormProps,
  ReturnType<typeof useReportLinksModel>
> = (props, model) => {
  const { t } = useTranslation()
  const [mutate, { loading }] = useMutation($addOrUpdateReportLink)
  const { displayToast } = useAppContext()

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
      displayToast(
        props.edit
          ? t('admin.reportLinks.updateSuccess', model.$)
          : t('admin.reportLinks.createSuccess', model.$),
        'success'
      )
      model.reset()
      props.onSave(model.$)
    } catch {
      displayToast(
        props.edit
          ? t('admin.reportLinks.updateError')
          : t('admin.reportLinks.createError'),
        'error'
      )
    }
  }

  /**
   * Checks if form is valid
   */
  const isFormValid =
    !s.isBlank(model.value('name', '')) &&
    isValidUrl(model.value('externalUrl', '')) &&
    !s.isBlank(model.value('icon', '')) &&
    !s.isBlank(model.value('iconColor', '')) &&
    !s.isBlank(model.value('description', ''))

  return {
    text: t('common.save'),
    onClick: onSave,
    disabled: !isFormValid || loading
  }
}

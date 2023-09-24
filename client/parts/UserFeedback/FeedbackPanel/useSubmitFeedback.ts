import { useMutation } from '@apollo/client'
import { IPanelProps } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { FormSubmitHook, useFormControlModel } from 'components/FormControl'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import $submit_feedback from './submit-feedback.gql'
import { BaseResult } from 'types'

/**
 * Hook that returns props for submitting feedback.
 *
 * @param model - The map of feedback data.
 * @param panel - The props for the feedback panel.
 * @returns An object containing the text for the submit button, a toast object, a click handler, and a disabled flag.
 */
export const useSubmitFeedback: FormSubmitHook<
  IPanelProps,
  ReturnType<typeof useFormControlModel>
> = (props, model) => {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const [submitFeedback] = useMutation<{result: BaseResult}>($submit_feedback)

  /**
   * On submit feedback
   */
  const onSubmitFeedback = useCallback(async () => {
    const feedback = {
      ...(model.$ as any),
      reporter:
        !model.value('anonymous') &&
        _.pick(appContext.user, 'displayName', 'mail')
    }
    const { data } = await submitFeedback({
      variables: { feedback }
    })
    return data.result
  }, [model.$])

  return {
    text: t('feedback.submitButtonText'),
    onClick: async () => {
      const result = await onSubmitFeedback()
      if (result.success) {
        appContext.setToast({
          text: t('feedback.submitSuccessMessageText', result),
          intent: 'success'
        })
      } else {
        appContext.setToast({
          text: t('feedback.submitErrorMessageText'),
          intent: 'warning'
        })
      }
      model.reset()
      props.onDismiss()
    }
  }
}

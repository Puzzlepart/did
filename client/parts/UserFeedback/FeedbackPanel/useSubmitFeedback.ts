import { useMutation } from '@apollo/client'
import { IPanelProps } from '@fluentui/react'
import { FormSubmitHook } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import $submit_feedback from './submit-feedback.gql'
import { useFeedbackModel } from './useFeedbackModel'

/**
 * Hook that returns props for submitting feedback.
 *
 * @param model - The map of feedback data.
 * @param panel - The props for the feedback panel.
 * @returns An object containing the text for the submit button, a toast object, a click handler, and a disabled flag.
 */
export const useSubmitFeedback: FormSubmitHook<
  IPanelProps,
  ReturnType<typeof useFeedbackModel>
> = (props, model) => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)
  const [submitFeedback] = useMutation($submit_feedback)
  const [toast, setToast] = useToast(8000)

  /**
   * On submit feedback
   */
  const onSubmitFeedback = useCallback(async () => {
    setDisabled(true)
    const { data } = await submitFeedback({
      variables: { feedback: model.$ }
    })
    setDisabled(false)
    return data.result
  }, [model.$])

  return {
    text: t('feedback.submitButtonText'),
    toast,
    onClick: async () => {
      const result = await onSubmitFeedback()
      if (result.success) {
        setToast({
          headerText: t('feedback.submitSuccessMessagHeader'),
          text: t('feedback.submitSuccessMessageText', result),
          intent: 'success'
        })
      } else {
        setToast({
          headerText: t('feedback.submitErrorMessageHeader'),
          text: t('feedback.submitErrorMessageText'),
          intent: 'warning'
        })
      }
      props.onDismiss()
    },
    disabled:
      _.isEmpty(model.$.title) ||
      _.isEmpty(model.$.body) ||
      !model.$.mood ||
      disabled
  }
}

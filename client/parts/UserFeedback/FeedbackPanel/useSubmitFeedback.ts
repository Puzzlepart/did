/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { IPanelProps } from '@fluentui/react'
import { ISubmitProps } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from 'types'
import { isEmpty } from 'underscore'
import $submit_feedback from './submit-feedback.gql'

export const useSubmitFeedback = (
  feedback: UserFeedback,
  panel: IPanelProps
): ISubmitProps => {
  const { t } = useTranslation()
  const [submitFeedback] = useMutation($submit_feedback)
  const [toast, setToast] = useToast(8000, {
    innerStyle: { paddingLeft: 15 }
  })

  /**
   * On submit feedback
   */
  const onSubmitFeedback = useCallback(async () => {
    const { data } = await submitFeedback({
      variables: { feedback }
    })
    return data.result
  }, [feedback])

  return {
    text:t('feedback.submitButtonText'),
    toast,
    onClick: async () => {
      const result = await onSubmitFeedback()
      if (result.success) {
        setToast({
          headerText: t('feedback.submitSuccessMessagHeader'),
          text: t('feedback.submitSuccessMessageText', result),
          type: 'success'
        })
      } else {
        setToast({
          headerText: t('feedback.submitErrorMessageHeader'),
          text: t('feedback.submitErrorMessageText'),
          type: 'severeWarning'
        })
      }
      panel.onDismiss()
    },
    disabled:
      isEmpty(feedback.title) || isEmpty(feedback.body) || !feedback.mood
  }
}

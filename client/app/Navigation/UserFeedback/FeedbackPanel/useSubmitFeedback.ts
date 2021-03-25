/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { IUserMessageProps } from 'components'
import { useToast } from 'components/Toast'
import { IPanelProps, MessageBarType } from '@fluentui/react'
import { IButtonProps } from '@fluentui/react/lib/Button'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from 'types'
import { isEmpty } from 'underscore'
import $submit_feedback from './submit-feedback.gql'

export interface UseSubmitFeedbackReturnType extends IButtonProps {
  toast: IUserMessageProps
}

export const useSubmitFeedback = (
  feedback: UserFeedback,
  panel: IPanelProps
): UseSubmitFeedbackReturnType => {
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
    toast,
    onClick: async () => {
      const result = await onSubmitFeedback()
      if (result.success) {
        setToast({
          headerText: t('feedback.submitSuccessMessagHeader'),
          text: t('feedback.submitSuccessMessageText', result),
          type: MessageBarType.success
        })
      } else {
        setToast({
          headerText: t('feedback.submitErrorMessageHeader'),
          text: t('feedback.submitErrorMessageText'),
          type: MessageBarType.severeWarning
        })
      }
      panel.onDismiss()
    },
    disabled:
      isEmpty(feedback.title) || isEmpty(feedback.body) || !feedback.mood
  }
}

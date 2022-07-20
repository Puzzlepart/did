/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { IPanelProps } from '@fluentui/react'
import { ISubmitProps } from 'components/FormControl'
import { useToast } from 'components/Toast'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import $submit_feedback from './submit-feedback.gql'
import { IFeedbackModel } from './useFeedbackModel'

export const useSubmitFeedback = (
  model: IFeedbackModel,
  panel: IPanelProps
): ISubmitProps => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)
  const [submitFeedback] = useMutation($submit_feedback)
  const [toast, setToast] = useToast(8000, {
    innerStyle: { paddingLeft: 15 }
  })

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
      _.isEmpty(model.$.title) ||
      _.isEmpty(model.$.body) ||
      !model.$.mood ||
      disabled
  }
}

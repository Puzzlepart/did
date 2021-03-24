/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { IUserMessageProps } from 'components'
import { useToast } from 'components/Toast'
import { IPanelProps } from 'office-ui-fabric-react'
import { IButtonProps } from 'office-ui-fabric-react/lib/Button'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from 'types'
import { isEmpty } from 'underscore'
import $submit_feedback from './submit-feedback.gql'

export interface UseSubmitFeedbackReturnType extends IButtonProps {
    toast: IUserMessageProps
}

export const useSubmitFeedback = (feedback: UserFeedback, panel: IPanelProps): UseSubmitFeedbackReturnType => {
    const { t } = useTranslation()
    const [submitFeedback] = useMutation($submit_feedback)
    const [toast, setToast] = useToast(8000)

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
            setToast({ text: t('feedback.submitSuccessMessage', result) })
            panel.onDismiss()
        },
        disabled: isEmpty(feedback.title) || isEmpty(feedback.body) || !feedback.mood
    }
}
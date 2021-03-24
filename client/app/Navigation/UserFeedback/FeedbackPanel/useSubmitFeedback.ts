/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { IPanelProps } from 'office-ui-fabric-react'
import { IButtonProps } from 'office-ui-fabric-react/lib/Button'
import { useCallback } from 'react'
import { UserFeedback } from 'types'
import { isEmpty } from 'underscore'
import $submit_feedback from './submit-feedback.gql'

export const useSubmitFeedback = (feedback: UserFeedback, panel: IPanelProps): IButtonProps => {
    const [submitFeedback] = useMutation($submit_feedback)

    /**
      * On submit feedback
      */
    const onSubmitFeedback = useCallback(async () => {
        const { data } = await submitFeedback({
            variables: { feedback }
        })
        return data
    }, [feedback])

    return {
        onClick: async () => {
            await onSubmitFeedback()
            panel.onDismiss()
        },
        disabled: isEmpty(feedback.title) || isEmpty(feedback.body) || !feedback.mood
    }
}
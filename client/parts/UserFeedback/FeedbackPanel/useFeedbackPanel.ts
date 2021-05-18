/* eslint-disable react-hooks/exhaustive-deps */
import { IPanelProps } from '@fluentui/react'
import { useFormControls } from 'components/FormControl'
import { useEffect } from 'react'
import { useFeedbackModel } from './useFeedbackModel'
import { useSubmitFeedback } from './useSubmitFeedback'

export function useFeedbackPanel(props: IPanelProps) {
  const { model, typeOptions, moodOptions } = useFeedbackModel()
  const register = useFormControls(model)
  const submit = useSubmitFeedback(model.$, props)

  useEffect(model.reset, [props.isOpen])

  return {
    model,
    typeOptions,
    moodOptions,
    register,
    submit
  }
}

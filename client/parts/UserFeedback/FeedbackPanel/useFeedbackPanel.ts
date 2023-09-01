import { IPanelProps } from '@fluentui/react'
import { useFormControls } from 'components/FormControl'
import { useEffect } from 'react'
import { useFeedbackModel } from './useFeedbackModel'
import { useSubmitFeedback } from './useSubmitFeedback'

/**
 * Hook that returns the necessary props for the FeedbackPanel component.
 *
 * @param props - The props passed to the FeedbackPanel component.
 *
 * @returns An object containing the necessary props for the FeedbackPanel component.
 */
export function useFeedbackPanel(props: IPanelProps) {
  const { model, typeOptions, moodOptions } = useFeedbackModel()
  const register = useFormControls(model)
  const submit = useSubmitFeedback(model, props)

  useEffect(model.reset, [props.isOpen])

  return {
    model,
    typeOptions,
    moodOptions,
    register,
    submit
  }
}

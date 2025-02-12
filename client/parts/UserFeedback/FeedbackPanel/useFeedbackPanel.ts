import {
  IFormControlProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from 'types'
import { useLabelOptions } from './useLabelOptions'
import { useMoodOptions } from './useMoodOptions'
import { useSubmitFeedback } from './useSubmitFeedback'
import { IPanelProps } from 'components/Panel'
import { FeedbackPanel } from './FeedbackPanel'

/**
 * Hook that returns the necessary props for the FeedbackPanel component.
 *
 * @param props - The props passed to the FeedbackPanel component.
 *
 * @returns An object containing the necessary props for the FeedbackPanel component.
 */
export function useFeedbackPanel(props: IPanelProps) {
  const { t } = useTranslation()
  const labelOptions = useLabelOptions()
  const moodOptions = useMoodOptions()
  const model = useFormControlModel<keyof UserFeedback, UserFeedback>()
  const register = useFormControls<keyof UserFeedback>(model, FeedbackPanel)
  const submitProps = useSubmitFeedback(props, model)

  const formControlProps: IFormControlProps = {
    id: FeedbackPanel.displayName,
    model,
    submitProps,
    panel: {
      ...props,
      title: t('feedback.headerText')
    }
  }

  return {
    labelOptions,
    moodOptions,
    model,
    register,
    formControlProps
  }
}

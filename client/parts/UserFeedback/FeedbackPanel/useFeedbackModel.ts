import { useAppContext } from 'AppContext'
import { useMap } from 'hooks'
import { UserFeedback } from 'types'
import _ from 'underscore'
import { convertToMap } from 'utils/convertToMap'

const INITIAL_MODEL = {
  title: '',
  body: '',
  labels: ['feedback:suggestion'],
  mood: null
}

/**
 * Hook that returns the feedback model and options for type and mood.
 *
 * @returns An object containing the feedback model, type options, and mood options.
 */
export const useFeedbackModel = () => {
  const { user } = useAppContext()
  const reporter = _.pick(user, 'displayName', 'mail')
  const modelWithReporter: Map<any, any> = convertToMap({
    ...INITIAL_MODEL,
    reporter
  })
  const model = useMap<keyof UserFeedback, UserFeedback>(modelWithReporter)
  return model
}

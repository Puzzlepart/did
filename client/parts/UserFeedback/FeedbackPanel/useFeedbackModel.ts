import { useAppContext } from 'AppContext'
import { useMap } from 'hooks'
import { UserFeedback } from 'types'
import _  from 'underscore'
import { toMap } from 'utils'
import { useMoodOptions } from './useMoodOptions'
import { useTypeOptions } from './useTypeOptions'

const INITIAL_MODEL = {
  title: '',
  body: '',
  labels: ['feedback:suggestion'],
  mood: null
}

export const useFeedbackModel = () => {
  const { user } = useAppContext()
  const reporter = _.pick(user, 'displayName', 'mail')
  const modelWithReporter: Map<any, any> = toMap({
    ...INITIAL_MODEL,
    reporter
  })
  const map = useMap<keyof UserFeedback, UserFeedback>(modelWithReporter)

  const typeOptions = useTypeOptions()
  const moodOptions = useMoodOptions()

  return {
    model: {
      ...map,
      reset: () => map.$set(modelWithReporter)
    },
    typeOptions,
    moodOptions
  } as const
}

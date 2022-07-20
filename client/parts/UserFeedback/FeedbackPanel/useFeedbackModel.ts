import { useAppContext } from 'AppContext'
import { useMap } from 'hooks'
import { UserFeedback } from 'types'
import _ from 'underscore'
import { toMap } from 'utils'
import { useMoodOptions } from './useMoodOptions'
import { useTypeOptions } from './useTypeOptions'

const INITIAL_MODEL = {
  title: '',
  body: '',
  labels: ['feedback:suggestion'],
  mood: null
}

export interface IFeedbackModel {
  readonly reset: () => void
  readonly $set: React.Dispatch<
    React.SetStateAction<Map<keyof UserFeedback, any>>
  >
  readonly $: UserFeedback
  readonly set: (key: keyof UserFeedback, value: any) => void
  readonly value: (key: keyof UserFeedback, _default?: any) => any
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
    } as IFeedbackModel,
    typeOptions,
    moodOptions
  } as const
}

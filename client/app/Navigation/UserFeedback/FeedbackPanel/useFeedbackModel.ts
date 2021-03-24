import { useState } from 'react'
import { UserFeedback } from 'types'
import { useMoodOptions } from './useMoodOptions'
import { useTypeOptions } from './useTypeOptions'

const initialModel = {
  title: '',
  body: '',
  labels: ['feedback:suggestion'],
  mood: null
}

export const useFeedbackModel = () => {
  const [model, setModel] = useState<UserFeedback>(initialModel)

  const initModel = () => setModel(initialModel)

  const typeOptions = useTypeOptions()
  const moodOptions = useMoodOptions()

  return {
    initModel,
    model,
    setTitle: (title: string) => setModel({ ...model, title }),
    setBody: (body: string) => setModel({ ...model, body }),
    setType: (type: string) => setModel({ ...model, labels: [type] }),
    setMood: (mood: string) => setModel({ ...model, mood }),
    typeOptions,
    moodOptions
  }
}

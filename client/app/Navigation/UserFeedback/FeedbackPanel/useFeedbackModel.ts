import { useState } from 'react'
import { UserFeedback } from 'types'
import { useMoodOptions } from './useMoodOptions'
import { useTypeOptions } from './useTypeOptions'

export const useFeedbackModel = () => {
  const [model, setModel] = useState<UserFeedback>({
    title: '',
    body: '',
    labels: ['feedback:suggestion'],
    mood: null
  })

  const typeOptions = useTypeOptions()
  const moodOptions = useMoodOptions()

  return {
    model,
    setTitle: (title: string) => setModel({ ...model, title }),
    setBody: (body: string) => setModel({ ...model, body }),
    setType: (type: string) => setModel({ ...model, labels: [type] }),
    setMood: (mood: string) => setModel({ ...model, mood }),
    typeOptions,
    moodOptions
  }
}

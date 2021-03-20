import { useState } from 'react'
import { LabelInput } from 'types'

const INITIAL_MODEL = {
  name: '',
  description: '',
  color: '#F8E71C'
}

export function useModel(): [
  LabelInput,
  React.Dispatch<React.SetStateAction<LabelInput>>,
  () => void
] {
  const [model, setModel] = useState<LabelInput>(INITIAL_MODEL)
  const reset = () => {
    setModel(INITIAL_MODEL)
  }
  return [model, setModel, reset]
}

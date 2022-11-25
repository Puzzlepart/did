import { IContextualMenuItem } from '@fluentui/react'
import { useMap } from 'hooks'
import { useContext, useState } from 'react'
import { ReportsContext } from '../context'
import { ADD_SAVED_FILTER } from '../reducer/actions'
import { INITIAL_MODEL } from './types'

export function useSaveFilterForm() {
  const { dispatch } = useContext(ReportsContext)
  const { $, set, $set, value } = useMap<
    keyof IContextualMenuItem,
    IContextualMenuItem
  >(INITIAL_MODEL)
  const [inputVisible, setInputVisible] = useState(false)

  /**
   * On save filter
   *
   * @remarks Stringifies the saved filters (including the new one)
   * and sends it to the mutation `updateUserConfiguration`.
   */
  function onSave(): void {
    if (!inputVisible) {
      setInputVisible(true)
      return
    }
    dispatch(ADD_SAVED_FILTER({ model: $ }))
    $set(INITIAL_MODEL)
    setInputVisible(false)
  }

  return { inputVisible, setInputVisible, value, set, onSave } as const
}

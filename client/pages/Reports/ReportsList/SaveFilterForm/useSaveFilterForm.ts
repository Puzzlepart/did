import { IContextualMenuItem } from '@fluentui/react'
import { useMap } from 'hooks'
import { useContext } from 'react'
import { useBoolean } from 'usehooks-ts'
import { ReportsContext } from '../../context'
import { ADD_SAVED_FILTER } from '../../reducer/actions'
import { INITIAL_MODEL } from './types'

export function useSaveFilterForm() {
  const context = useContext(ReportsContext)
  const { $, set, $set, value } = useMap<
    keyof IContextualMenuItem,
    IContextualMenuItem
  >(INITIAL_MODEL)
  const inputVisible = useBoolean(false)

  /**
   * On save filter
   *
   * @remarks Stringifies the saved filters (including the new one)
   * and sends it to the mutation `updateUserConfiguration`.
   */
  function onSave(): void {
    if (!inputVisible.value) {
      inputVisible.setTrue()
      return
    }
    context.dispatch(ADD_SAVED_FILTER({ model: $ }))
    $set(INITIAL_MODEL)
    inputVisible.setFalse()
  }

  const disabled =
    ((value('text')?.length < 2 || !value('iconProps')?.iconName) &&
      inputVisible.value) ||
    !context.state.filterState?.isFiltered

  return { inputVisible, value, set, onSave, disabled }
}

import { IContextualMenuItem } from '@fluentui/react'
import { useMap, useUpdateUserConfiguration } from 'hooks'
import { useContext, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'
import { ReportsContext } from '../../context'
import { ADD_SAVED_FILTER } from '../../reducer/actions'
import { INITIAL_MODEL } from './types'
import _ from 'lodash'

export function useSaveFilterForm() {
  const context = useContext(ReportsContext)
  const { updateUserSettings } = useUpdateUserConfiguration()
  const { $, set, $set, value } = useMap<
    keyof IContextualMenuItem,
    IContextualMenuItem
  >(INITIAL_MODEL)
  const inputVisible = useBoolean(false)

  // eslint-disable-next-line no-console
  console.log('value', value('text'), $)

  /**
   * On save filter handler.
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
    (value('text')?.length < 2 && inputVisible.value) ||
    !context.state.filterState?.isFiltered

  useEffect(() => {
    const user: Record<string, any> = {}
    _.set(user, 'configuration.reports.filters', context.state.savedFilters)
    updateUserSettings(user)
  }, [context.state.savedFilters])

  return { inputVisible, value, set, onSave, disabled }
}

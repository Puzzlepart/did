/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from 'AppContext'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { capitalize } from 'underscore.string'
import { UPDATE_BREADCRUMB } from '../../../app/reducer'
import { ITimesheetState } from '../types'

/**
 * Updates history using `useHistory` based on
 * state changes.
 *
 * @category Timesheet Hooks
 */
export function useTimesheetHistory(state: ITimesheetState) {
  const { t } = useTranslation()
  const history = useHistory()
  const { dispatch } = useAppContext()

  /**
   * Dispatch `UPDATE_BREADCRUMB`
   */
  const dispatchUpdateBreadcrumb = (text: string, level: number, omit = []) =>
    dispatch(
      UPDATE_BREADCRUMB([
        {
          key: text,
          text,
          level
        },
        omit
      ])
    )

  useLayoutEffect(() => {
    if (!state.selectedPeriod) return
    history.push(
      ['/timesheet', state.selectedView, state.selectedPeriod.path].join('/')
    )
    if (state.selectedPeriod) {
      const isSplitWeek = state.periods.length === 2
      if (isSplitWeek) {
        dispatchUpdateBreadcrumb(capitalize(state.selectedPeriod.month), 3)
        dispatchUpdateBreadcrumb(state.selectedPeriod.getName(t), 4)
      } else {
        dispatchUpdateBreadcrumb(state.selectedPeriod.getName(t), 3, [4])
      }
    }
  }, [state.selectedView, state.selectedPeriod])
}

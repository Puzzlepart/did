import { ToolbarProps } from '@fluentui/react-components'
import { useCallback, useMemo } from 'react'
import { useTimesheetContext } from '../context'
import { CHANGE_DATE_RANGE_TYPE, CHANGE_PERIOD } from '../reducer/actions'

/**
 * Custom hook that returns default checked values and a callback function for the ActionBar component.
 *
 * @returns An object containing the checkedValues and onCheckedValueChange function.
 */
export function useActionBar() {
  const { state, dispatch } = useTimesheetContext()
  /**
   * An object containing default checked values for the toolbar.
   * Memoized to prevent unnecessary re-renders.
   */
  const checkedValues: ToolbarProps['checkedValues'] = useMemo(
    () => ({
      dateRange: state.dateRangeType && [state.dateRangeType.toString()],
      period: state.selectedPeriod && [state.selectedPeriod?.id]
    }),
    [state.dateRangeType, state.selectedPeriod?.id]
  )
  /**
   * Callback function for handling changes to checked values in the toolbar.
   *
   * @param event - The event that triggered the change.
   * @param data - The data associated with the change.
   */
  const onCheckedValueChange: ToolbarProps['onCheckedValueChange'] =
    useCallback((_, data) => {
      switch (data?.name) {
        case 'dateRange': {
          const dateRangeType = Number.parseInt(data?.checkedItems[0], 10)
          dispatch(CHANGE_DATE_RANGE_TYPE(dateRangeType))
        }
        case 'period': {
          const periodId = data?.checkedItems[0]
          dispatch(CHANGE_PERIOD({ id: periodId }))
        }
      }
    }, [])
  return { checkedValues, onCheckedValueChange }
}

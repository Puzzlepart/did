import { useAppContext } from 'AppContext'
import { IEventListProps } from 'components'
import { isBrowser } from 'react-device-detect'
import { useTimesheetContext } from '../../context'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useListGroupProps } from './useListGroupProps'

/**
 * Custom hook that returns an object containing additionalColumns andlistGroupProps, and className.
 * `listGroupProps` is an object containing props for the list group component. `additionalColumns` is
 * an array of objects containing props for the additional columns.
 *
 * @returns An object containing additionalColumns, listGroupProps, and className.
 */
export function useOverview() {
  const { subscription } = useAppContext()
  const { state } = useTimesheetContext()
  const additionalColumns = useAdditionalColumns()
  const listGroupProps = useListGroupProps()
  const eventListProps: IEventListProps = {
    hideToolbar: true,
    hideEmptyMessage: true,
    enableShimmer: !!state.loading,
    hidden: !!state.error,
    items: [],
    dateFormat: subscription?.settings?.timesheet?.timeFormat,
    listGroupProps,
    additionalColumns,
    useTimeColumn: isBrowser,
    titleColumn: {
      mobile: {
        displayTime: true
      }
    }
  }
  return {
    eventListProps
  }
}

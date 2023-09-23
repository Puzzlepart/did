import { IEventListProps } from 'components'
import packageFile from 'package'
import { useTimesheetContext } from '../../context'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useListGroupProps } from './useListGroupProps'
import { isBrowser } from 'react-device-detect'

/**
 * Custom hook that returns an object containing additionalColumns andlistGroupProps, and className.
 * `listGroupProps` is an object containing props for the list group component. `additionalColumns` is
 * an array of objects containing props for the additional columns.
 *
 * @returns An object containing additionalColumns, listGroupProps, and className.
 */
export function useOverview() {
  const { state } = useTimesheetContext()
  const additionalColumns = useAdditionalColumns()
  const listGroupProps = useListGroupProps()
  const eventListProps:IEventListProps = {
    hideToolbar: true,
    enableShimmer: !!state.loading,
    hidden: !!state.error,
    items: [],
    dateFormat:packageFile.config.app.TIMESHEET_OVERVIEW_TIME_FORMAT,
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

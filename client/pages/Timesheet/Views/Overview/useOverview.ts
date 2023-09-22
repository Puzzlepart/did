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
  const additionalColumns = useAdditionalColumns()
  const listGroupProps = useListGroupProps()
  return {
    additionalColumns,
    listGroupProps
  }
}

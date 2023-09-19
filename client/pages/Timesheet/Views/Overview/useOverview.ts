import { isMobile } from 'react-device-detect'
import { Overview } from '.'
import styles from './Overview.module.scss'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useListGroupProps } from './useListGroupProps'

/**
 * Custom hook that returns an object containing additionalColumns, listGroupProps, and className.
 * additionalColumns is an array of additional columns to be displayed in the overview.
 * listGroupProps is an object containing props for the list group component.
 * className is a string containing the class names for the root element.
 *
 * @returns An object containing additionalColumns, listGroupProps, and className.
 */
export function useOverview() {
  const additionalColumns = useAdditionalColumns()
  const listGroupProps = useListGroupProps()
  const classNames = [Overview.className]
  if (isMobile) classNames.push(styles.mobile)
  return {
    additionalColumns,
    listGroupProps,
    className: classNames.join(' ')
  }
}

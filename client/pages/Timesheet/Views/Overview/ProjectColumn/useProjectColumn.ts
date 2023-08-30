import { isMobile } from 'react-device-detect'
import { useTimesheetContext } from '../../../context'
import styles from './ProjectColumn.module.scss'

/**
 * Custom hook that returns the state, dispatch and className for the project column component.
 *
 * @returns An object containing the state, dispatch and className.
 */
export function useProjectColumn() {
  const { state, dispatch } = useTimesheetContext()
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`

  return { state, dispatch, className }
}

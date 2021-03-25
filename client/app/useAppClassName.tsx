import { useAppContext } from 'AppContext'
import { isMobile } from 'react-device-detect'

interface IStyles {
  mobile: string
  root: string
  sticky: string
}

/**
 * Returns class name(s) based on device and user settings
 *
 * @param styles - Styles
 *
 * @returns class name based on device and user settings
 */
export function useAppClassName(styles: IStyles) {
  const { getUserConfiguration } = useAppContext()
  const classNames = [styles.root]
  if (isMobile) classNames.push(styles.mobile)
  if (getUserConfiguration<boolean>('ui.stickyNavigation') && !isMobile) {
    classNames.push(styles.sticky)
  }
  return classNames.join(' ')
}

import { useAppContext } from 'AppContext'
import { isMobile } from 'react-device-detect'
import { StyledComponent } from 'types'

interface IStyles {
  mobile?: string
  sticky?: string
}

/**
 * Returns class name(s) based on device and user settings
 *
 * @param component - component to get class name for
 * @param styles - styles to use
 *
 * @returns class name based on device and user settings
 */
export function useAppClassName(component: StyledComponent, styles: IStyles) {
  const { getUserConfiguration } = useAppContext()
  const classNames = [component.className]
  if (isMobile) classNames.push(styles.mobile)
  if (getUserConfiguration<boolean>('ui.stickyNavigation') && !isMobile) {
    classNames.push(styles.sticky)
  }
  return classNames.join(' ')
}

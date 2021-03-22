/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { isMobile } from 'react-device-detect'
import { PAGE_NAVIGATE } from '../../reducer'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'

/**
 * Component logic hook for `<NavItem />`
 *
 * @category Navigation
 */
export function useNavItem(props: INavItemProps) {
  const { dispatch } = useAppContext()
  const [, hasPermission] = usePermissions()
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return {
    className,
    onClick: () => dispatch(PAGE_NAVIGATE()),
    shouldRender: !!props.permission && hasPermission(props.permission)
  }
}

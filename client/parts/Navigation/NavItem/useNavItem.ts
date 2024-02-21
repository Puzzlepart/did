import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { PAGE_NAVIGATE } from '../../../app/reducer'
import { INavItemProps } from './types'

/**
 * Component logic hook for `<NavItem />`
 *
 * @category Navigation
 */
export function useNavItem(props: INavItemProps) {
  const { dispatch } = useAppContext()
  const [, hasPermission] = usePermissions()
  const isActive = location.pathname.startsWith(props.to.pathname)
  return {
    onClick: () => dispatch(PAGE_NAVIGATE()),
    isActive,
    shouldRender: !!props.permission && hasPermission(props.permission)
  }
}

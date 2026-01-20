import { tokens } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { useUserNotifications } from 'parts/UserNotifications/useUserNotifications'

/**
 * Custom hook that provides navigation-related data and functions for
 * the `Navigation` component.
 *
 * @returns An object containing the following properties:
 *   - pages: The available pages for navigation.
 *   - isAuthenticated: A boolean indicating whether the user is authenticated.
 *   - contextValue: The user notifications context value.
 *   - background: The background color for the navigation.
 */
export function useNavigation() {
  const { pages, isAuthenticated, subscription } = useAppContext()
  const contextValue = useUserNotifications()
  const background =
    subscription?.settings?.brand?.navBackground ??
    tokens.colorNeutralBackground2

  return {
    pages,
    isAuthenticated,
    contextValue,
    background
  }
}

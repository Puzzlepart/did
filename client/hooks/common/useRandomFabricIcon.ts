import { useFabricIcons } from './useFabricIcons'

/**
 * Returns a random icon from [@uifabric/icons](https://www.npmjs.com/package/@uifabric/icons)
 *
 * @category React Hook
 */
export function useRandomFabricIcon(): string {
  const icons = useFabricIcons()
  return icons.sort(() => 0.5 - Math.random()).slice(0, 1)[0].iconName
}

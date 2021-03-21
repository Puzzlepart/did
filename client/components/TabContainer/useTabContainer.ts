/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { useMobileBreadcrumb } from '../../app/MobileBreadcrumb'
import { ITabContainerProps } from './types'
import { useTabContainerStyles } from './useTabContainerStyles'

/**
 * Component logic hook for `<TabContainer />`
 *
 * * Uses hook `useTabContainerStyles` to get styles
 * based on device
 * * Uses hook `useMobileBreadcrumb` to update breadcrumb
 * for mobile devices
 *
 * @returns The `ref` and `styles` to be used by the <TabContainer />`
 * component
 * @category TabContainer
 */
export function useTabContainer(
  props: ITabContainerProps
): Partial<ITabContainerProps> {
  const styles = useTabContainerStyles(props)
  const ref = useMobileBreadcrumb({
    level: 2,
    ...props
  })
  return {
    ref,
    styles
  }
}

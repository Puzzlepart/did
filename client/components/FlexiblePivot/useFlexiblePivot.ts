/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { useMobileBreadcrumb } from '../../app/MobileBreadcrumb'
import { IFlexiblePivotProps } from './types'
import { useFlexiblePivotStyles } from './useFlexiblePivotStyles'

/**
 * Component logic hook for `<FlexiblePivot />`
 *
 * * Uses hook `useFlexiblePivotStyles` to get styles
 * based on device
 * * Uses hook `useMobileBreadcrumb` to update breadcrumb
 * for mobile devices
 *
 * @category FlexiblePivot
 * @returns The `ref` and `styles` to be used by the <FlexiblePivot />`
 * component
 */
export function useFlexiblePivot(
  props: IFlexiblePivotProps
): Partial<IFlexiblePivotProps> {
  const styles = useFlexiblePivotStyles(props)
  const ref = useMobileBreadcrumb(props)
  return {
    ref,
    styles
  }
}

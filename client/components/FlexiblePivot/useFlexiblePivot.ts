/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { useMobileBreadcrumb } from '../../app/MobileBreadcrumb'
import { IFlexiblePivotProps } from './types'
import { useFlexiblePivotStyles } from './useFlexiblePivotStyles'

/**
 * Component logic hook for `<FlexiblePivot />`
 *
 * @category FlexiblePivot
 */
export function useFlexiblePivot(props: IFlexiblePivotProps) {
  const styles = useFlexiblePivotStyles(props)
  const ref = useMobileBreadcrumb(props)
  return {
    ref,
    styles
  }
}

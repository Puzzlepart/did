/* eslint-disable tsdoc/syntax */
import {
  IPivotStyleProps,
  IPivotStyles,
  IStyleFunctionOrObject,
  merge
} from 'office-ui-fabric-react'
import { isMobile } from 'react-device-detect'
import { IFlexiblePivotProps } from './types'

/**
 * Returns Pivot styles
 *
 * @param props - Component props
 */
export function useFlexiblePivotStyles({
  styles,
  fixedLinkWidth = false,
  hideIconsMobile = true
}: IFlexiblePivotProps) {
  const styles_: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> = {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }
  if (isMobile) {
    styles_.linkContent = {
      height: 30,
      paddingLeft: 0
    }
    styles_.link = {
      height: 30,
      lineHeight: 30,
      textAlign: 'left',
      opacity: 0.4,
      margin: 0,
      paddingLeft: 0
    }
    styles_.linkIsSelected = {
      height: 30,
      lineHeight: 30,
      textAlign: 'left',
      margin: 0,
      paddingLeft: 0,
      ':before': { display: 'none' }
    }
    if (hideIconsMobile) {
      styles_.icon = { display: 'none' }
    }
    if (fixedLinkWidth) {
      const linkWidth = fixedLinkWidth === true ? '45%' : fixedLinkWidth
      styles_.link.width = linkWidth
      styles_.linkIsSelected.width = linkWidth
    }
  }
  return merge(styles_, styles as any)
}

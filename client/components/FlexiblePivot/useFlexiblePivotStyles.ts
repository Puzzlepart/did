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
  linkHeight = 30,
  hideIconsMobile = true
}: IFlexiblePivotProps) {
  const styles_: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> = {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    itemContainer: {
      paddingTop: 10
    }
  }
  if (!isMobile) return merge(styles_, styles as any)

  const link = {
    height: linkHeight,
    lineHeight: linkHeight,
    textAlign: 'left',
    margin: 0,
    width: 'auto'
  }
  styles_.linkContent = { height: linkHeight }
  styles_.link = {
    ...link,
    opacity: 0.4
  }
  styles_.linkIsSelected = {
    ...link,
    ':before': { display: 'none' },
    ':hover': { backgroundColor: 'transparent' },
    ':active': { backgroundColor: 'transparent' }
  }
  if (hideIconsMobile) {
    styles_.icon = { display: 'none' }
  }
  if (fixedLinkWidth) {
    const linkWidth = fixedLinkWidth === true ? '45%' : fixedLinkWidth
    styles_.link.width = linkWidth
    styles_.linkIsSelected.width = linkWidth
  }
  return merge(styles_, styles as any)
}

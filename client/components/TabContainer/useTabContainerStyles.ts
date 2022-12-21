import {
  IPivotStyleProps,
  IPivotStyles,
  IStyleFunctionOrObject,
  merge
} from '@fluentui/react'
import { isMobile } from 'react-device-detect'
import { ITabContainerProps } from './types'

/**
 * Returns tab container styles
 *
 * @param props Component props
 */
export function useTabContainerStyles(props: ITabContainerProps) {
  const fontSize = {
    [2]: 18,
    [3]: 14
  }[props.level]
  const styles: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> = {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    itemContainer: {
      paddingTop: 10
    },
    link: { fontSize }
  }
  if (!isMobile) return merge(styles, props.styles as any)

  const link = {
    height: props.linkHeight,
    lineHeight: props.linkHeight,
    textAlign: 'left',
    margin: 0,
    width: 'auto'
  }
  styles.linkContent = { height: props.linkHeight }
  styles.link = {
    ...link,
    opacity: 0.4
  }
  styles.linkIsSelected = {
    ...link,
    ':before': { display: 'none' },
    ':hover': { backgroundColor: 'transparent' },
    ':active': { backgroundColor: 'transparent' },
    opacity: 1
  }
  if (props.hideIconsMobile) {
    styles.icon = { display: 'none' }
  }
  if (props.fixedLinkWidth) {
    const linkWidth =
      props.fixedLinkWidth === true ? '45%' : props.fixedLinkWidth
    styles.link.width = linkWidth
    styles.linkIsSelected.width = linkWidth
  }
  return merge(styles, props.styles as any)
}

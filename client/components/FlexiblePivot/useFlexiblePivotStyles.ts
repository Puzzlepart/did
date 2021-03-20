/* eslint-disable tsdoc/syntax */
import {
  IPivotStyleProps,
  IPivotStyles,
  IStyleFunctionOrObject
} from 'office-ui-fabric-react'
import { isMobile } from 'react-device-detect'

/**
 * @ignore
 */
export function useFlexiblePivotStyles() {
  const styles: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: isMobile ? 10 : 0
    }
  }
  if (isMobile) {
    styles.linkContent = { height: 30 }
    styles.link = {
      width: '45%',
      height: 30,
      lineHeight: 30,
      textAlign: 'left',
      opacity: 0.6
    }
    styles.linkIsSelected = {
      width: '45%',
      height: 30,
      lineHeight: 30,
      textAlign: 'left',
      ':before': { display: 'none' }
    }
    styles.icon = { display: 'none' }
  }
  return styles
}

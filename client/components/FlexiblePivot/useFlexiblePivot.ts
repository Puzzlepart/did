/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { useContext, useEffect, useRef } from 'react'
import { find } from 'underscore'
import { IFlexiblePivotProps } from './types'
import { useFlexiblePivotStyles } from './useFlexiblePivotStyles'

/**
 * Component logic hook for `FlexiblePivot`
 *
 * @category FlexiblePivot
 */
export function useFlexiblePivot(props: IFlexiblePivotProps) {
  const ref = useRef(null)
  const { state } = useContext(AppContext)
  const styles = useFlexiblePivotStyles(props)
  useEffect(() => {
    const items = props.items || ref?.current?.props?.children
    const selected = find(items, (item) => {
      const itemKey = item?.props?.itemKey || item.itemKey
      return itemKey === props.selectedKey
    })
    if (state.current?.nav !== selected) {
      state.set({ nav: selected?.props || selected })
    }
  }, [props.selectedKey, props.items])

  return {
    ref,
    styles
  }
}

export { PivotItem } from 'office-ui-fabric-react'

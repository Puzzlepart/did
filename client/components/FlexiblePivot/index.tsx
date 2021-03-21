/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { Pivot } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { renderPivotItems } from './renderPivotItems'
import { IFlexiblePivotProps } from './types'
import { useFlexiblePivot } from './useFlexiblePivot'

/**
 * Flexible `<Pivot >` component
 *
 * Adds styles **display: flex** and **flex-wrap: wrap**
 * to make the `<Pivot >` mobile friendly
 *
 * @category Function Component
 */
export const FlexiblePivot: FunctionComponent<IFlexiblePivotProps> = (
  props: IFlexiblePivotProps
) => {
  const { styles, ref } = useFlexiblePivot(props)
  return (
    <Pivot {...props} ref={ref} styles={styles}>
      {renderPivotItems(props.children, props.itemProps)}
    </Pivot>
  )
}

export { PivotItem } from 'office-ui-fabric-react'
export * from './types'

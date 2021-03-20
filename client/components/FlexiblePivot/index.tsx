/* eslint-disable tsdoc/syntax */
import { IPivotProps, Pivot } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useFlexiblePivotStyles } from './useFlexiblePivotStyles'

/**
 * Flexible `<Pivot >` component
 *
 * Adds styles **display: flex** and **flex-wrap: wrap**
 * to make the `<Pivot >` mobile friendly
 *
 * @category Function Component
 */
export const FlexiblePivot: FunctionComponent<IPivotProps> = (
  props: IPivotProps
) => {
  const styles = useFlexiblePivotStyles()
  return (
    <Pivot {...props} styles={styles}>
      {props.children}
    </Pivot>
  )
}

export { PivotItem } from 'office-ui-fabric-react'

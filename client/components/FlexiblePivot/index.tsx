/* eslint-disable tsdoc/syntax */
import { IPivotProps, Pivot } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'

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
  return (
    <Pivot {...props} styles={{ root: { display: 'flex', flexWrap: 'wrap' } }}>
      {props.children}
    </Pivot>
  )
}

export { PivotItem } from 'office-ui-fabric-react'

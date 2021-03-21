/* eslint-disable tsdoc/syntax */
import { IPivotItemProps, IPivotProps } from 'office-ui-fabric-react'
import { FunctionComponent } from 'react'

export interface IFlexiblePivotProps extends IPivotProps {
  /**
   * Fixed link width
   *
   * Either specify boolean `true` or `false` or
   * specify the actual width. If `true` is specified
   * **45%** is used as the fixed width.
   *
   * @default false
   */
  fixedLinkWidth?: boolean | string | number

  /**
   * Hide icons on mobile devices
   *
   * @default true
   */
  hideIconsMobile?: boolean

  /**
   * Link height on mobile devices
   *
   * @default 30
   */
  linkHeight?: string | number

  /**
   * Item properties that will be shared between
   * all items in the pivot
   */
  itemProps?: IPivotItemProps

  /**
   * Optionally provide the item that are rendered
   * inside the Pivot. This can be used instead of
   * using `useRef` and `children` when that doesn't
   * work as expected.
   */
  items?: IPivotItemProps[]
}

export type FlexiblePivotItem = FunctionComponent<IPivotItemProps>

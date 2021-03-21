/* eslint-disable tsdoc/syntax */
import { FlexiblePivotItem } from 'components'
import { IPivotItemProps } from 'office-ui-fabric-react'
import React from 'react'
import { PermissionScope } from 'security'

/**
 * Defines a page section component
 *
 * @category Pages
 */
export interface IPageSectionComponent extends IPivotItemProps {
  component: FlexiblePivotItem
  permission?: PermissionScope
}

/**
 * Defines a page component
 *
 * @category Pages
 */
export interface IPageComponent extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  iconName?: string
  path: string
  component: JSX.Element
  permission?: PermissionScope
}

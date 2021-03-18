import { IPivotItemProps } from 'office-ui-fabric-react'
import React from 'react'
import { PermissionScope } from 'security'

export interface IPageSectionComponent extends IPivotItemProps {
  component: JSX.Element
  permission?: PermissionScope
}

export interface IPageComponent extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  iconName?: string
  path: string
  component: JSX.Element
  permission?: PermissionScope
}

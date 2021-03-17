import { PERMISSION } from 'config/security'
import { IPivotItemProps } from 'office-ui-fabric-react'
import React from 'react'

export interface IPageSectionComponent extends IPivotItemProps {
  component: JSX.Element
  permission?: PERMISSION
}

export interface IPageComponent extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  iconName?: string
  path: string
  component: JSX.Element
  permission?: PERMISSION
}

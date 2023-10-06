import { Breadcrumb } from '@fluentui/react-breadcrumb-preview'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { renderBreadcrumbItem } from './renderBreadcrumbItem'
import { IBreadcrumbComponentProps } from './types'

export const BreadcrumbComponent: ReusableComponent<
  IBreadcrumbComponentProps
> = (props) => {
  return (
    <div className={props.className}>
      <Breadcrumb size='large'>
        {props.items.map((item) => renderBreadcrumbItem(item, props.items))}
      </Breadcrumb>
    </div>
  )
}

BreadcrumbComponent.displayName = 'Breadcrumb'
BreadcrumbComponent.defaultProps = {
  items: []
}

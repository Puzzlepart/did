import { Breadcrumb } from '@fluentui/react-breadcrumb-preview'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { renderBreadcrumbItem } from './renderBreadcrumbItem'
import { IBreadcrumbComponentProps } from './types'
import styles from './Breadcrumb.module.scss'
import { mergeClasses } from '@fluentui/react-components'

export const BreadcrumbComponent: ReusableComponent<
  IBreadcrumbComponentProps
> = (props) => {
  return (
    <div
      className={mergeClasses(BreadcrumbComponent.className, props.className)}
    >
      <Breadcrumb size='large'>
        {props.items.map((item) => renderBreadcrumbItem(item, props.items))}
      </Breadcrumb>
    </div>
  )
}

BreadcrumbComponent.displayName = 'Breadcrumb'
BreadcrumbComponent.className = styles.breadcrumb
BreadcrumbComponent.defaultProps = {
  items: []
}

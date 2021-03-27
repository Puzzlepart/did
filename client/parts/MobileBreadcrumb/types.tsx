import { IBreadcrumbItem } from '@fluentui/react'
import { PageComponent } from 'pages/types'
import { HTMLAttributes } from 'react'

export interface IMobileBreadcrumbItem extends IBreadcrumbItem {
  level: number
}

export interface IMobileBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  page: PageComponent
}

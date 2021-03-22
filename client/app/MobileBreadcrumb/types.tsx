import { IBreadcrumbItem } from 'office-ui-fabric-react'
import { PageComponent } from 'pages/types'
import { HTMLAttributes } from 'react'

export interface IMobileBreadcrumbItem extends IBreadcrumbItem {
  level: number
}

export interface IMobileBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  page: PageComponent
}

import { IBreadcrumbItem } from 'office-ui-fabric-react'
import { PageComponent } from 'pages/types'

export interface IMobileBreadcrumbItem extends IBreadcrumbItem {
  level: number
}

export interface IMobileBreadcrumbProps {
  page: PageComponent
}

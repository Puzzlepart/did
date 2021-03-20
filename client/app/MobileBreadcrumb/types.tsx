import { IBreadcrumbItem } from 'office-ui-fabric-react'

export interface IMobileBreadcrumbItem extends IBreadcrumbItem {
  level: number
}

export interface IMobileBreadcrumbProps {
  text: string
}

import { PageComponent } from 'pages/types'
import { HTMLAttributes } from 'react'

export interface IMobileBreadcrumbItem {
  key: string | number
  text: string
  onClick?: () => void
  level: number
}

export interface IMobileBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  page: PageComponent
}

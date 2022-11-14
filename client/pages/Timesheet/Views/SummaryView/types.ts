import { Customer, Project } from 'types'

export interface ISummaryViewRow {
  label?: string
  sum?: number
  project?: Project | Record<string, any>
  customer?: Customer | Record<string, any>
  tag?: string
}

import { IPanelProps } from '@fluentui/react'

export interface IReportLinksFormProps extends IPanelProps {
  title?: string
  edit?: any
  onSave?: (report: any) => void
}

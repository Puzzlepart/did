import { IPanelProps } from 'components/Panel'

export interface IReportLinksFormProps extends IPanelProps {
  edit?: any
  onSave?: (report: any) => void
}

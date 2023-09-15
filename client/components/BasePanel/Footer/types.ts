import { IBasePanelProps, IHeaderProps } from '../types'

export interface IFooterProps extends IHeaderProps {
  onDismiss?: IBasePanelProps['onDismiss']
  cancelAction?: boolean
}

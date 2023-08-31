import { IPanelProps } from '@fluentui/react'
import { ButtonProps } from '@fluentui/react-components'

export interface IBasePanelProps extends IPanelProps {
  headerActions?: IBasePanelAction[]
  footerActions?: IBasePanelAction[]
}

export interface IHeaderProps {
  actions?: IBasePanelAction[]
}

export interface IFooterProps {
  actions?: IBasePanelAction[]
}

export interface IBasePanelAction {
  text: string
  title?: ButtonProps['title']
  onClick?: any
  icon?: ButtonProps['icon']
  appearance?: ButtonProps['appearance']
  hidden?: HTMLDivElement['hidden']
  disabled?: ButtonProps['disabled']
}

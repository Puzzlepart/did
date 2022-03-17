import { IPanelProps } from '@fluentui/react'
import { IUserMessageProps } from 'components/UserMessage'

export interface IApiTokenFormProps extends IPanelProps {
  onAdded?: (apiKey: string) => void
}

import { IPanelProps } from '@fluentui/react'
import { IUserMessageProps } from 'components/UserMessage'

export interface IApiTokenFormProps extends IPanelProps {
  setMessage?: (message: IUserMessageProps, duration?: number) => void
  onAdded?: (apiKey: string) => void
}

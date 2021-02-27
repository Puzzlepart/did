import { IUserMessageProps } from 'components/UserMessage'
import { IPanelProps } from 'office-ui-fabric-react'

export interface IApiTokenFormProps extends IPanelProps {
  setMessage?: (message: IUserMessageProps, duration?: number) => void
  onAdded?: (apiKey: string) => void
}

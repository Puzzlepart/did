import { IPanelProps } from '@fluentui/react'

export interface IApiTokenFormProps extends IPanelProps {
  onAdded?: (apiKey: string) => void
}

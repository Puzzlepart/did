export interface IApiKeyDisplayProps {
  label?: string
  apiKey: string
  onKeyCopied?: () => void
  toggleDisplay?: boolean
  displayDuration?: number
}

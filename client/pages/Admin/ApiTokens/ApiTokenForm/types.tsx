import { IPanelProps } from '@fluentui/react'
import { ApiToken } from '../../../../../server/graphql'

export interface IApiTokenFormProps extends IPanelProps {
  /**
   * `onTokenAdded` needs to be passed in `props` until this
   * component is refactored to use `React.Context`.
   */
  onTokenAdded?: (token: ApiToken) => void

  /**
   * `tokens` needs to be passed in `props` until this
   * component is refactored to use `React.Context`.
   */
  tokens?: ApiToken[]
}

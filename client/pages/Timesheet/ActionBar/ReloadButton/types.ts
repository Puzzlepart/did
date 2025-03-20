import { FluentIconName } from 'utils'

export interface IReloadButtonProps {
  /**
   * Refetch the data from the server with cache.
   * 
   * @default false
   */
  cache?: boolean
  
  /**
   * Icon name to use from `@fluentui/react-icons`
   */
  iconName?: FluentIconName
}

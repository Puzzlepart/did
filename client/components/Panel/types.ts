import { DrawerProps } from '@fluentui/react-components/unstable'
import { IDynamicButtonProps } from 'components/DynamicButton'
import { ReusableComponent } from 'components/types'
import { HTMLProps, ReactElement } from 'react'

type IPanelDismissEvent = {
  /**
   * Any arbitrary data that is passed to the dismiss event.
   */
  [key: string]: any

  /**
   * Whether data should be refetched after the panel is dismissed.
   * This is useful when the panel is used to create or update data.
   */
  refetch?: boolean
}

export interface IPanelProps
  extends Pick<DrawerProps, 'open' | 'type' | 'position' | 'size'>,
    Omit<HTMLProps<HTMLDivElement>, 'type' | 'open' | 'size'> {
  /**
   * The title of the panel to be displayed in the header.
   */
  title?: string

  /**
   * The description of the panel to be displayed in the header.
   */
  description?: string

  /**
   * Actions to display in the header of the panel.
   */
  headerActions?: IDynamicButtonProps[]

  /**
   * Additional elements to display in the header of the panel.
   */
  headerElements?: ReactElement

  /**
   * Actions to display in the footer of the panel.
   */
  actions?: IDynamicButtonProps[]

  /**
   * Callback fired when the panel is dismissed.
   *
   * @param event - The event that triggered the dismissal (optional).
   */
  onDismiss?: (event?: IPanelDismissEvent) => void

  /**
   * Close the panel when clicking outside of it (default: `true`).
   */
  lightDismiss?: boolean

  /**
   * The gap between the panel content elements. The body of the panel
   * will have a flexbox layout with `flexDirection: 'column'` and
   * `gap: contentGap` (default: `undefined`).
   */
  contentGap?: number
}

/**
 * A reusable component that displays a panel.
 */
export type PanelComponent<P extends IPanelProps = IPanelProps> =
  ReusableComponent<P>

export const CancelButtonProps: IDynamicButtonProps = {
  text: 'Cancel',
  appearance: 'subtle',
  onClick: () => {}
}

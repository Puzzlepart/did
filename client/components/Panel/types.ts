import { DrawerProps } from '@fluentui/react-components/unstable'
import { IDynamicButtonProps } from 'components/DynamicButton'
import { ReusableComponent } from 'components/types'
import { HTMLProps } from 'react'

type IPanelDismissEvent = any

export interface IPanelProps extends Pick<DrawerProps, 'open' | 'type' | 'position' | 'size'>, Omit<HTMLProps<HTMLDivElement>, 'type' | 'open' | 'size'> {
    /**
     * The title of the panel to be displayed in the header.
     */
    title?: string

    /**
     * The description of the panel to be displayed in the header.
     */
    description?: string

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
}

/**
 * A reusable component that displays a panel.
 */
export type PanelComponent<P extends IPanelProps = IPanelProps> = ReusableComponent<P>

export const CancelButtonProps: IDynamicButtonProps = {
    text: 'Cancel',
    appearance: 'subtle',
    onClick: () => {}
}
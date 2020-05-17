import { IMessageBarProps, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

/**
 * @category UserMessage
 */
export interface IUserMessageProps extends IMessageBarProps {
    /**
     * Text to show in the message
     * 
     * NOTE: Supports markdown
    */
    text?: string;

    /**
     * On click handler for the message
     */
    onClick?: (event: React.MouseEvent<any>) => void;

    /**
     * On dismiss handler for the message
     */
    onDismiss?: () => void;

    /**
     * Type (info, warning, erro etc)
     */
    type?: MessageBarType;

    /**
     * Icon to use if not default for the type
     */
    iconName?: string;

    /**
     * Container style
     */
    containerStyle?: React.CSSProperties;

    /**
     * To flex the message center, speficy a fixed height
     */
    fixedCenter?: number;
}

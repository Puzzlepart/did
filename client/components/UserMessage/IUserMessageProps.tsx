import { MessageBarType, IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar';

/**
 * @category UserMessage
 */
export interface IUserMessageProps extends IMessageBarProps {
    text?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
    onDismiss?: () => void;
    type?: MessageBarType;
    iconName?: string;
    hidden?: boolean;
    style?: React.CSSProperties;
}

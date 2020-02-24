import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IUserMessageProps {
    id?: string;
    text?: string;
    onClick?: (event: React.MouseEvent<any>) => void;
    onDismiss?: () => void;
    type?: MessageBarType;
    iconName?: string;
    hidden?: boolean;
    style?: React.CSSProperties;
    children?: any;
    actions?: JSX.Element;
}

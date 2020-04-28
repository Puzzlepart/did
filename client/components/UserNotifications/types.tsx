import { IIconStyleProps, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IUserNotificationsClassName {
    root: string;
    toggle: {
        root: string;
        icon: string;
        count: string;
    }
    panel: {
        root: string;
        body: string;
        notification: string;
    }
}

export interface IUserNotificationMessageProps extends IMessageBarProps {
    content: JSX.Element;
}

export interface IUserNotificationsProps {
    toggleIcon?: string;
    toggleStyles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
    panelHeaderText?: string;
    className?: IUserNotificationsClassName;
}

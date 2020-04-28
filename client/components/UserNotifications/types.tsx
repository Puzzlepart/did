import { IIconStyleProps, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { IMessageBarProps, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IUserNotificationsClassName {
    root: string;
    toggle: {
        root: string;
        icon: string;
        count: string;
    }
    panel: IUserNotificationsPanelClassName;
}

export interface IUserNotificationMessageProps {
    model: UserNotificationMessageModel;
    className: string;
}

export interface IUserNotificationMessage {
    id: string;
    type: number;
    severity: number;
    text: string;
    moreLink: string;
}

export enum UserNotificationMessageType {
    WEEK_NOT_CONFIRMED,
    SERVICE_ANNOUNCEMENT,
    FEATURE_ANNOUNCEMENT,
}

export enum UserNotificationMessageSeverity {
    LOW,
    MEDIUM,
    HIGH,
}

export class UserNotificationMessageModel {
    public id: string;
    public type: UserNotificationMessageType;
    public severity: UserNotificationMessageSeverity;
    public text: string;
    public moreLink: string;

    /**
     * Constructs a new instance of UserNotificationMessageModel
     * 
     * @param {IUserNotificationMessage} msg The message
     * @param {void} _onDismissCallback On dismiss callback
     */
    constructor(msg: IUserNotificationMessage, private _onDismissCallback: (notificationId: string) => void) {
        this.id = msg.id;
        this.type = msg.type;
        this.severity = msg.severity;
        this.text = msg.text;
        this.moreLink = msg.moreLink;
    }

    private get _messageBarType(): MessageBarType {
        let messageBarType = MessageBarType.info;
        switch (this.type) {
            case UserNotificationMessageType.WEEK_NOT_CONFIRMED: {
                messageBarType = MessageBarType.warning
            }
                break;
            case UserNotificationMessageType.SERVICE_ANNOUNCEMENT: {
                messageBarType = MessageBarType.warning
                if (this.severity === UserNotificationMessageSeverity.HIGH) {
                    messageBarType = MessageBarType.severeWarning;
                }
            }
                break;
        }
        return messageBarType;
    }



    private get _messageBarIconProps(): { iconName: string } {
        let messageBarIconProps = undefined;
        switch (this.type) {
            case UserNotificationMessageType.WEEK_NOT_CONFIRMED: {
                messageBarIconProps = { iconName: 'CalendarWorkWeek' };
            }
                break;
            case UserNotificationMessageType.SERVICE_ANNOUNCEMENT: {
                messageBarIconProps = { iconName: 'Manufacturing' };
            }
                break;
            case UserNotificationMessageType.FEATURE_ANNOUNCEMENT: {
                messageBarIconProps = { iconName: 'BuildQueueNew' };
            }
                break;
        }
        return messageBarIconProps;
    }


    public get messageBarProps(): IMessageBarProps {
        let messageBarProps: IMessageBarProps = {
            itemID: this.id,
            messageBarType: this._messageBarType,
            messageBarIconProps: this._messageBarIconProps,
        }
        if (this.id) {
            messageBarProps.onDismiss = () => this._onDismissCallback(this.id);
        }
        return messageBarProps;
    }
}

export interface IUserNotificationsProps {
    toggleIcon?: string;
    toggleStyles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
    panelHeaderText?: string;
    className?: IUserNotificationsClassName;
}

export interface IUserNotificationsPanelClassName {
    root: string;
    body: string;
    notification: string;
}

export interface IUserNotificationsPanelProps {
    isOpen: boolean;
    headerText: string;
    notifications: UserNotificationMessageModel[];
    className: IUserNotificationsPanelClassName;
    onDismiss: (ev?: React.SyntheticEvent<HTMLElement, Event>) => void;
}
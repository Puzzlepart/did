import { IMessageBarProps, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

/**
 * @category UserNotifications
 */
export interface IUserNotificationMessage {
    id: string;
    type: number;
    severity: number;
    text: string;
    moreLink: string;
}

/**
 * @category UserNotifications
 */
export enum NotificationType {
    WEEK_NOT_CONFIRMED,
    SERVICE_ANNOUNCEMENT,
    FEATURE_ANNOUNCEMENT,
}

/**
 * @category UserNotifications
 */
export enum NotificationSeverity {
    LOW,
    MEDIUM,
    HIGH,
}

/**
 * @category UserNotifications
 */
export class UserNotificationMessageModel {
    public id: string;
    public type: NotificationType;
    public severity: NotificationSeverity;
    public text: string;
    public moreLink: string;

    /**
     * Constructs a new instance of UserNotificationMessageModel
     * 
     * @param {IUserNotificationMessage} msg The message
     */
    constructor(msg: IUserNotificationMessage) {
        this.id = msg.id
        this.type = msg.type
        this.severity = msg.severity
        this.text = msg.text
        this.moreLink = msg.moreLink
    }

    private get _messageBarType(): MessageBarType {
        switch (this.type) {
            case NotificationType.WEEK_NOT_CONFIRMED: {
                return MessageBarType.warning
            }
                break
            case NotificationType.SERVICE_ANNOUNCEMENT: {
                if (this.severity === NotificationSeverity.HIGH) {
                    return MessageBarType.severeWarning
                } else {
                    return MessageBarType.warning
                }
            }
            default: return MessageBarType.info
        }
    }



    private get _messageBarIconProps(): { iconName: string } {
        switch (this.type) {
            case NotificationType.WEEK_NOT_CONFIRMED: {
                return { iconName: 'CalendarWorkWeek' }
            }
                break
            case NotificationType.SERVICE_ANNOUNCEMENT: {
                return { iconName: 'Manufacturing' }
            }
                break
            case NotificationType.FEATURE_ANNOUNCEMENT: {
                return { iconName: 'BuildQueueNew' }
            }
                break
                default: return undefined
        }
    }


    public get messageBarProps(): IMessageBarProps {
        const messageBarProps: IMessageBarProps = {
            itemID: this.id,
            messageBarType: this._messageBarType,
            messageBarIconProps: this._messageBarIconProps,
        }
        return messageBarProps
    }
}
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { IUserNotificationMessageProps } from './types';

export const PLACEHOLDER_PANEL_MESSAGES: IUserNotificationMessageProps[] = [
    {
        messageBarType: MessageBarType.info,
        content: <span>We've just relased a bunch of new features! <a href='#'>Read more here</a></span>,
        messageBarIconProps: { iconName: 'BuildQueueNew' }
    },
    {
        messageBarType: MessageBarType.warning,
        content: <span>You have not confirmed week 13.</span>,
        messageBarIconProps: { iconName: 'CalendarWorkWeek' }
    },
    {
        messageBarType: MessageBarType.warning,
        content: <span>You have not confirmed week 12.</span>,
        messageBarIconProps: { iconName: 'CalendarWorkWeek' }
    },
    {
        messageBarType: MessageBarType.severeWarning,
        content: <span>Did 365 will be down for maintenance today from 16:00 to 19:00.</span>,
        messageBarIconProps: { iconName: 'Manufacturing' }
    },
]
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { IUserNotificationMessageProps } from './types';

export const PLACEHOLDER_PANEL_MESSAGES: IUserNotificationMessageProps[] = [
    /**
     * Source: custom table
     * id is rowkey
     */
    {
        messageBarType: MessageBarType.info,
        content: <span>We've just relased a bunch of new features! <a href='#'>Read more here</a></span>,
        messageBarIconProps: { iconName: 'BuildQueueNew' }
    },

         /**
     * Source: graphql query
     * generate id somehow
     */
    {
        messageBarType: MessageBarType.warning,
        content: <span>You have not confirmed week 13/1.</span>,
        messageBarIconProps: { iconName: 'CalendarWorkWeek' }
    },

      /**
     * Source: graphql query
     * generate id somehow
     */
    {
        messageBarType: MessageBarType.warning,
        content: <span>You have not confirmed week 12/1.</span>,
        messageBarIconProps: { iconName: 'CalendarWorkWeek' }
    },

      /**
     * Source: custom table
     * id is rowkey
     */
    {
        messageBarType: MessageBarType.severeWarning,
        content: <span>Did 365 will be down for maintenance today from 16:00 to 19:00.</span>,
        messageBarIconProps: { iconName: 'Manufacturing' }
    },
]
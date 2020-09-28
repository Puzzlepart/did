import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { IIgnoreEventButton } from './types'
import { TimesheetContext } from '../../types'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MobileView, BrowserView } from 'react-device-detect'

/**
 * @category Timesheet
 */
export const IgnoreEventButton = ({ event }: IIgnoreEventButton): JSX.Element => {
    const { t } = useTranslation()
    const { dispatch } = React.useContext(TimesheetContext)

    const onClick = () => dispatch({
        type: 'IGNORE_EVENT',
        payload: event.id,
    })

    return (
        <>
            <BrowserView renderWithFragment={true}>
                <MessageBarButton
                    text={t('timesheet.ignoreEventButtonLabel')}
                    iconProps={{ iconName: 'Blocked2' }}
                    onClick={onClick} />
            </BrowserView>
            <MobileView renderWithFragment={true}>
                <Icon
                    styles={{ root: { marginLeft: 6, fontSize: 18 } }}
                    iconName='Blocked2'
                    onClick={onClick} />
            </MobileView>
        </>
    )
}

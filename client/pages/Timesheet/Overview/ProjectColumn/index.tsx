import { UserMessage } from 'components/UserMessage'
import { TFunction } from 'i18next'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import { TimesheetContext } from '../../context'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import { IgnoreEventButton } from './IgnoreEventButton'
import { MatchEventPanel } from './MatchEventPanel'
import styles from './ProjectColumn.module.scss'
import { ProjectColumnTooltip } from './ProjectColumnTooltip/ProjectColumnTooltip'
import { IProjectColumnProps } from './types'

/**
 * Get error message
 * 
 * @param {string} code Error code
 * @param {TFunction} t Translate function 
 */
function getErrorMessage(code: string, t: TFunction): [string, MessageBarType] {
    // eslint-disable-next-line default-case
    switch (code) {
        case 'PROJECT_INACTIVE': return [t('timesheet.projectInactiveErrorText'), MessageBarType.error]
        case 'CUSTOMER_INACTIVE': return [t('timesheet.customerInactiveErrorText'), MessageBarType.error]
    }
}

/**
 * @category Timesheet
 */
const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
    const { t } = useTranslation()
    const { dispatch, selectedPeriod } = React.useContext(TimesheetContext)
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    if (!event.project) {
        if (event.error) {
            const [text, type] = getErrorMessage(event.error.code, t)
            return (
                <div className={className}>
                    <UserMessage
                        containerStyle={{ marginTop: 10 }}
                        isMultiline={false}
                        type={type}
                        text={text} />
                </div>
            )
        }
        return (
            <div className={className}>
                <UserMessage
                    containerStyle={{ marginTop: 10 }}
                    isMultiline={false}
                    type={MessageBarType.warning}
                    iconName='TagUnknown'
                    text={t('timesheet.noProjectMatchFoundText')}
                    actions={
                        <div>
                            <MatchEventPanel event={event} />
                            <IgnoreEventButton event={event} />
                        </div>
                    } />
            </div>
        )
    }

    return (
        <TooltipHost
            tooltipProps={{
                onRenderContent: () => <ProjectColumnTooltip project={event.project} />,
            }}
            delay={TooltipDelay.long}
            closeDelay={TooltipDelay.long}
            calloutProps={{ gapSpace: 0 }}>
            <div className={className}>
                <div className={styles.iconContainer}>
                    <Icon iconName={event.project.icon} />
                </div>
                <div className={styles.content}>
                    <div className={styles.link}>
                        <a href={`/projects/search/${event.project.id}`}>{event.project.name}</a>
                    </div>
                    {!isEmpty(event.project.labels) && <Icon iconName='Tag' className={styles.labelIcon} />}
                    {(event.manualMatch && !selectedPeriod.isConfirmed) && (
                        <ClearManualMatchButton
                            onClick={() => dispatch({
                                type: 'CLEAR_MANUAL_MATCH',
                                payload: event.id,
                            })}
                            className={styles.clearButton} />
                    )}
                </div>
            </div>
        </TooltipHost>
    )
}

export default withDefaultProps(ProjectColumn, {})

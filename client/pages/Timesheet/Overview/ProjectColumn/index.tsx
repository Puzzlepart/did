import { UserMessage } from 'components/UserMessage'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'
import * as React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import { TimesheetContext } from '../../TimesheetContext'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import { IgnoreEventButton } from './IgnoreEventButton'
import { MatchEventPanel } from './MatchEventPanel'
import styles from './ProjectColumn.module.scss'
import { ProjectColumnTooltip } from './ProjectColumnTooltip/ProjectColumnTooltip'
import { IProjectColumnProps } from './types'

/**
 * @category Timesheet
 */
const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
    const { t } = useTranslation('timesheet')
    const { dispatch, selectedPeriod } = React.useContext(TimesheetContext)
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    if (!event.project) {
        if (event.error) {
            return (
                <div className={className}>
                    <UserMessage
                        containerStyle={{ marginTop: 10 }}
                        isMultiline={false}
                        type={MessageBarType.severeWarning}
                        iconName='Warning'
                        text={`${t('eventErrorPrefix')} ${event.error.message}`} />
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
                    text={t('noProjectMatchFoundText')}
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
                <div className={styles.content}>
                    <div>
                        <a className={styles.projectLink} href={`/projects/${event.project.id}`}>{event.project.name}</a>
                        <div className={styles.subText}>
                            <span>for </span><a href={`/customers/${event.customer.key}`}><span>{event.customer.name}</span></a>
                        </div>
                    </div>
                    {!isEmpty(event.project.labels) && <Icon iconName='Tag' className={styles.labelIcon} />}
                    {(event.manualMatch && !selectedPeriod.confirmed) && (
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

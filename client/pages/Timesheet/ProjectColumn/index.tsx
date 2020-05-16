import { UserMessage } from 'components/UserMessage'
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import { TimesheetContext } from '../TimesheetContext'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import styles from './ProjectColumn.module.scss'
import { ProjectColumnTooltip } from './ProjectColumnTooltip'
import { ResolveProjectModal } from './ResolveProjectModal'
import { IProjectColumnProps } from './types'

/**
 * @category Timesheet
 */
const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
    const { t } = useTranslation('timesheet')
    const { dispatch, selectedPeriod } = React.useContext(TimesheetContext)
    if (!event.project) {
        if (event.error) {
            return (
                <div className={styles.root}>
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
            <div className={styles.root}>
                <UserMessage
                    containerStyle={{ marginTop: 10 }}
                    isMultiline={false}
                    type={MessageBarType.warning}
                    iconName='TagUnknown'
                    text={t('noProjectMatchFoundText')}
                    actions={
                        <div>
                            <ResolveProjectModal event={event} />
                            <MessageBarButton
                                text={t('ignoreEventButtonLabel')}
                                iconProps={{ iconName: 'Blocked2' }}
                                onClick={() => dispatch({ type: 'IGNORE_EVENT', payload: event.id })} />
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
            <div className={styles.root}>
                <div className={styles.content}>
                    <div>
                        <a href={`/projects/${event.project.id}`}>{event.project.name}</a>
                        <div className={styles.subText}>
                            <span>for </span><a href={`/customers/${event.customer.key}`}><span>{event.customer.name}</span></a>
                        </div>
                    </div>
                    {!isEmpty(event.project.labels) && <Icon iconName='Tag' className={styles.labelIcon} />}
                    {(event.isManualMatch && !selectedPeriod.confirmed) && (
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

/* eslint-disable react/display-name */
import { stringIsNullOrEmpty } from '@pnp/common'
import { EntityLabel } from 'components/EntityLabel'
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
import styles from './ProjectColumn.module.scss'
import { ResolveProjectModal } from './ResolveProjectModal'
import { IClearManualMatchButtonProps, IProjectColumnProps, IProjectColumnTooltipProps } from './types'

/**
 * @category Timesheet
 */
export const ClearManualMatchButton = ({ onClick }: IClearManualMatchButtonProps): JSX.Element => {
    const { t } = useTranslation('timesheet')
    return (
        <div
            className={styles.clearButton}
            title={t('clearProjectMatchTooltipText')}>
            <span onClick={onClick} style={{ cursor: 'pointer' }}>
                <Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} />
            </span>
        </div>
    )
}

/**
 * @category Timesheet
 */
export const ProjectColumnTooltip = ({ project }: IProjectColumnTooltipProps): JSX.Element => {
    return (
        <div className={styles.tooltip}>
            <div className={styles.title}><span>{project.name}</span></div>
            <div className={styles.subTitle}><span>for {project.customer.name}</span></div>
            <div hidden={stringIsNullOrEmpty(project.description)} className={styles.description}>
                <p>{project.description}</p>
            </div>
            {!isEmpty(project.labels) && (
                <div className={styles.labels}>
                    {project.labels.map((label, idx) => <EntityLabel key={idx} label={label} />)}
                </div>
            )}
            <div className={styles.tag}><span>{project.key}</span></div>
        </div>
    )
}

/**
 * @category Timesheet
 */
const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
    const { t } = useTranslation('timesheet')
    const { dispatch } = React.useContext(TimesheetContext)
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
                            <span>for </span><a href={`/customers/${event.customer.id}`}><span>{event.customer.name}</span></a>
                        </div>
                    </div>
                    {!isEmpty(event.project.labels) && <Icon iconName='Tag' className={styles.labelIcon} />}
                    {event.isManualMatch && (
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

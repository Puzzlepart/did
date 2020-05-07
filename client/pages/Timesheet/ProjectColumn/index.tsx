/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { stringIsNullOrEmpty } from '@pnp/common';
import { UserMessage } from 'common/components/UserMessage';
import resource from 'i18n';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import { TimesheetContext } from '../TimesheetContext';
import styles from './ProjectColumn.module.scss';
import { ResolveProjectModal } from './ResolveProjectModal';
import { IClearManualMatchButtonProps, IProjectColumnProps, IProjectColumnTooltipProps } from './types';

/**
 * @category Timesheet
 */
export const ClearManualMatchButton = ({ onClick, hidden }: IClearManualMatchButtonProps): JSX.Element => {
    return (
        <div className={styles.clearButton} title={resource('TIMESHEET.CLEAR_PROJECT_MATCH_TOOLTIP_TEXT')} hidden={hidden}>
            <span onClick={onClick} style={{ cursor: 'pointer' }}><Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} /></span>
        </div>
    );
}

/**
 * @category Timesheet
 */
export const ProjectColumnTooltip = ({ project }: IProjectColumnTooltipProps): JSX.Element => {
    return (
        <div className={styles.tooltip}>
            <div className={styles.title}><span>{project.name}</span></div>
            <div className={styles.subTitle}><span>for {project.customer.name}</span></div>
            <div className={styles.description}>{!stringIsNullOrEmpty(project.description) ? <span>{project.description}</span> : <UserMessage text='No description available.' />}</div>
            <div className={styles.tag}><span>{project.key}</span></div>
        </div>
    );
}

/**
 * @category Timesheet
 */
const ProjectColumn = (props: IProjectColumnProps): JSX.Element => {
    const { dispatch } = React.useContext(TimesheetContext);
    const [showResolveModal, setShowResolveModal] = React.useState<boolean>(false);

    if (!props.event.project) {
        if (props.event.error) {
            return (
                <div className={styles.root}>
                    <UserMessage
                        style={{ marginTop: 10 }}
                        isMultiline={false}
                        type={MessageBarType.severeWarning}
                        iconName='Warning'
                        text={`${resource('TIMESHEET.EVENT_ERROR_PREFIX')} ${props.event.error.message}`} />
                </div>
            );
        }
        return (
            <div className={styles.root}>
                <UserMessage
                    style={{ marginTop: 10 }}
                    isMultiline={false}
                    type={MessageBarType.warning}
                    iconName='TagUnknown'
                    text={resource('TIMESHEET.NO_PROJECT_MATCH_FOUND_TEXT')}
                    actions={
                        <div>
                            <MessageBarButton
                                text={resource('TIMESHEET.RESOLVE_PROJECT_BUTTON_LABEL')}
                                iconProps={{ iconName: 'ReviewResponseSolid' }}
                                onClick={() => setShowResolveModal(true)} />
                            <MessageBarButton
                                text={resource('TIMESHEET.IGNORE_EVENT_BUTTON_LABEL')}
                                iconProps={{ iconName: 'Blocked2' }}
                                onClick={() => dispatch({ type: 'IGNORE_EVENT', payload: props.event.id })} />
                        </div>
                    } />
                <ResolveProjectModal
                    event={props.event}
                    onDismiss={() => setShowResolveModal(false)}
                    isOpen={showResolveModal}
                    onProjectSelected={project => {
                        setShowResolveModal(false);
                        dispatch({ type: 'MANUAL_MATCH', payload: { event: props.event, project } })
                    }} />
            </div>
        );
    }

    return (
        <TooltipHost
            tooltipProps={{
                onRenderContent: () => <ProjectColumnTooltip project={props.event.project} />,
            }}
            delay={TooltipDelay.long}
            closeDelay={TooltipDelay.long}
            calloutProps={{ gapSpace: 0 }}>
            <div className={styles.root}>
                <div className={styles.content}>
                    <div>
                        <a href={`/projects/${props.event.project.id}`}>{props.event.project.name}</a>
                    </div>
                    <div className={styles.subText}>
                        <span>for </span><a href={`/customers/${props.event.customer.id}`}><span>{props.event.customer.name}</span></a>
                    </div>
                </div>
                <ClearManualMatchButton
                    onClick={() => dispatch({ type: 'CLEAR_MANUAL_MATCH', payload: props.event.id })}
                    className={styles.clearButton}
                    hidden={!props.event.isManualMatch} />
            </div>
        </TooltipHost>
    );
}

export default withDefaultProps(ProjectColumn, {})

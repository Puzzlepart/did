
import { stringIsNullOrEmpty } from '@pnp/common';
import { useId } from '@uifabric/react-hooks';
import { UserMessage } from 'common/components/UserMessage';
import resource from 'i18n';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import { ResolveProjectModal } from './ResolveProjectModal';
import { IClearManualMatchButtonProps, IProjectColumnProps, IProjectColumnTooltipProps } from './types';


/**
 * @category EventList
 */
export const ClearManualMatchButton = ({ onClick, hidden, className }: IClearManualMatchButtonProps) => {
    return (
        <div className={className} title={resource('TIMESHEET.CLEAR_PROJECT_MATCH_TOOLTIP_TEXT')} hidden={hidden}>
            <span onClick={onClick} style={{ cursor: 'pointer' }}><Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} /></span>
        </div>
    );
}

/**
 * @category EventList
 */
export const ProjectColumnTooltip = ({ project, className }: IProjectColumnTooltipProps) => {
    return (
        <div className={className.root}>
            <div className={className.title}><span>{project.name}</span></div>
            <div className={className.subTitle}><span>for {project.customer.name}</span></div>
            <div className={className.description}>{!stringIsNullOrEmpty(project.description) ? <span>{project.description}</span> : <UserMessage text='No description available.' />}</div>
            <div className={className.tag}><span>{project.key}</span></div>
        </div>
    );
}

/**
 * @category EventList
 */
const ProjectColumn = (props: IProjectColumnProps) => {
    const tooltipId = useId('tooltip');
    const toggleId = useId('toggle-callout');
    const [showResolveModal, setShowResolveModal] = React.useState<boolean>(false);

    if (!props.event.project) {
        if (props.isLocked) return null;
        if (props.event.error) {
            return (
                <div className={props.className.root}>
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
            <div className={props.className.root}>
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
                                onClick={_ => setShowResolveModal(true)}
                                id={toggleId} />
                            <MessageBarButton
                                text={resource('TIMESHEET.IGNORE_EVENT_BUTTON_LABEL')}
                                iconProps={{ iconName: 'Blocked2' }}
                                onClick={_ => props.onIgnoreEvent(props.event)} />
                        </div>
                    } />
                <ResolveProjectModal
                    event={props.event}
                    onDismiss={() => setShowResolveModal(false)}
                    isOpen={showResolveModal}
                    onProjectSelected={project => {
                        setShowResolveModal(false);
                        props.onManualMatch(props.event, project);
                    }} />
            </div>
        );
    }

    return (
        <TooltipHost
            id={tooltipId}
            tooltipProps={{
                onRenderContent: () => <ProjectColumnTooltip project={props.event.project} className={props.className.tooltip} />,
            }}
            delay={TooltipDelay.long}
            closeDelay={TooltipDelay.long}
            calloutProps={{ gapSpace: 0 }}>
            <div className={props.className.root} aria-describedby={tooltipId}>
                <div className={props.className.content.root}>
                    <div className={props.className.content.text}>
                        <a href={`/projects#${props.event.project.id}`}>{props.event.project.name}</a>
                    </div>
                    <div className={props.className.content.subText}>
                        <span>for </span><a href={`/customers#${props.event.customer.id}`}><span>{props.event.customer.name}</span></a>
                    </div>
                </div>
                <ClearManualMatchButton onClick={() => props.onClearManualMatch(props.event)} className={props.className.clearButton} hidden={props.event.isManualMatch} />
            </div>
        </TooltipHost>
    );
}

export default withDefaultProps(ProjectColumn, {
    className: {
        root: 'c-Timesheet-projectColumn',
        content: {
            root: 'c-Timesheet-projectColumn-content',
            text: 'c-Timesheet-projectColumn-content-text',
            subText: 'c-Timesheet-projectColumn-content-subText',
        },
        clearButton: 'c-Timesheet-projectColumn-clearButton',
        tooltip: {
            root: 'c-Timesheet-projectColumn-tooltip',
            title: 'c-Timesheet-projectColumn-tooltip-title',
            subTitle: 'c-Timesheet-projectColumn-tooltip-subTitle',
            description: 'c-Timesheet-projectColumn-tooltip-description',
            tag: 'c-Timesheet-projectColumn-tooltip-tag',
        }
    }
})

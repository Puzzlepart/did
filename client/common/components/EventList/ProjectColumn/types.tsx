import { IProject, ITimeEntry } from 'interfaces';

/**
 * @category EventList
 */
export interface IProjectColumnTooltipClassName {
    root: string;
    title: string;
    subTitle: string;
    description: string;
    tag: string;
}

/**
 * @category EventList
 */
export interface IProjectColumnClassName {
    root: string;
    content: {
        root: string;
        text: string;
        subText: string;
    },
    clearButton: string;
    tooltip: IProjectColumnTooltipClassName;
}

/**
 * @category EventList
 */
export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * @category EventList
 */
export interface IProjectColumnTooltipProps {
    project: IProject;
    className: IProjectColumnTooltipClassName;
}

/**
 * @category EventList
 */
export interface IProjectColumnProps {
    event: ITimeEntry;

    isLocked?: boolean;

    /**
     * Class names
     */
    className?: IProjectColumnClassName;

    /**
     * Callback for when a project is manually matched for an event
     *
    * @param {ITimeEntry} event Event
    * @param {IProject} project Project
     */
    onManualMatch?: (event: ITimeEntry, project: IProject) => void;

    /**
     * Callback for when the project for an event is unmatched
     *
     * @param {ITimeEntry} event Event
     */
    onClearManualMatch?: (event: ITimeEntry) => void;

    /**
     * Callback for when an event is ignored
     *
     * @param {ITimeEntry} event Event
     */
    onIgnoreEvent?: (event: ITimeEntry) => void;
}

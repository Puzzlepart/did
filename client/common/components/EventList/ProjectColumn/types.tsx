import { IProject, ITimeEntry } from 'interfaces';

export interface IProjectColumnTooltipClassName {
    root: string;
    title: string;
    subTitle: string;
    description: string;
    tag: string;
}

export interface IProjectColumnClassName {
    root: string;
    content: {
        root: string;
        text: string;
        subText: string;
    },
    clear: string;
    tooltip: IProjectColumnTooltipClassName;
}

export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export interface IProjectColumnTooltipProps {
    project: IProject;
    className: IProjectColumnTooltipClassName;
}

export interface IProjectColumnProps {
    event: ITimeEntry;

    isLocked?: boolean;

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

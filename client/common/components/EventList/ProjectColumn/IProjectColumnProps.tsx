import { IProject, ITimeEntry } from 'interfaces';

export interface IProjectColumnProps {
    event: ITimeEntry;

    isLocked?: boolean;

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

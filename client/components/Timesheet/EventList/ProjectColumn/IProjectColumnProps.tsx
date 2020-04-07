import { IProject, ITimeEntry } from 'interfaces';
export interface IProjectColumnProps {
    event: ITimeEntry;
    isConfirmed?: boolean;

    /**
     * Callback for when a project is manually matched for an event
     */
    onManualMatch?: (project: IProject) => void;

    /**
     * Callback for when the project for an event is unmatched
     */
    onClearManualMatch?: (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;

    /**
     * Callback for when the project for an event is ignored
     */
    onIgnoreEvent?: (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

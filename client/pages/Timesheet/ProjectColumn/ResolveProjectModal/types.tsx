import { IProject, ITimeEntry } from 'interfaces';

/**
 * @category EventList
 */
export interface IResolveProjectModalProps {
    event: ITimeEntry;
    isOpen?: boolean;
    onDismiss?: () => void;
    onProjectSelected?: (project: IProject) => void;
}

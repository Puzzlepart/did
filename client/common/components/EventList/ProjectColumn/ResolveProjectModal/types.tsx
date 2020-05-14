import { IProject, ITimeEntry } from 'interfaces';
export interface IResolveProjectModalProps {
    event: ITimeEntry;
    isOpen?: boolean;
    onDismiss?: () => void;
    onProjectSelected?: (project: IProject) => void;
}

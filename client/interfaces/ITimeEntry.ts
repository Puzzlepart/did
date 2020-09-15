import { ICustomer } from './ICustomer'
import { IProject } from './IProject'
import { IEntityLabel } from './IEntityLabel'

/**
 * @category Common
 */
export interface ITimeEntry {
    id: string;
    key: string;
    title: string;
    isOrganizer: boolean;
    project: IProject;
    suggestedProject: IProject;
    customer: ICustomer;
    projectKey: string;
    customerKey: string;
    webLink: string;
    duration: number;
    startDateTime: string;
    endDateTime: string;
    day: string;
    manualMatch?: boolean;
    isIgnored?: boolean;
    error?: { code: string };
    labels?: IEntityLabel[];
}
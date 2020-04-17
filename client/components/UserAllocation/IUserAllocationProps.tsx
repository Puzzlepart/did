import { ITypedHash } from '@pnp/common';
import { ITimeEntry } from './GET_USER_DATA';

export interface IUserAllocationChart {
    column: string;
    title: string;
}

export interface IUserAllocationProps {
    entries?: ITimeEntry[];
    resourceId?: string;
    currentUser?: boolean;
    weekNumber?: number;
    yearNumber?: number;
    charts: ITypedHash<string>;
}

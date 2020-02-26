import { TypedHash } from '@pnp/common';
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
    year?: number;
    charts: TypedHash<string>;
}

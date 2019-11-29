import { IProject } from 'models';

export interface ICustomersState {
    isLoading: boolean;
    error?: any;
    customers?: any[];
    projects?: IProject[];
    selected?: any;
}

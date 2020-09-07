import { ITimeEntriesVariables } from './TIME_ENTRIES'

export interface IReportsQuery {
    key: string;
    name: string;
    iconName: string;
    variables: ITimeEntriesVariables;
}

import gql from 'graphql-tag';
import { ICalEvent } from 'models';

export interface IGetConfirmedEntries {
    entries: ICalEvent[];
}

export const GET_CONFIRMED_ENTRIES_FIELDS = [
    'title',
    'description',
    'customerKey',
    'projectKey',
    'durationHours',
    'durationMinutes',
    'startTime',
    'endTime',
    'weekNumber',
    'yearNumber',
    'webLink',
    'resourceName',
    'resourceEmail',
];

export const GET_CONFIRMED_ENTRIES = gql`
    query($projectKey: String) {
        entries: getConfirmedEntries(projectKey: $projectKey) {
            ${GET_CONFIRMED_ENTRIES_FIELDS.join(',')}
        }
    }
`;
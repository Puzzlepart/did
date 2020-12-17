import MSGraphEvent from './msgraph.event'

export type GetProjectsOptions = { noParse?: boolean; sortBy?: string }

export class AzTimeEntry {
    constructor(
        public projectId: string,
        public manualMatch: boolean,
        public event: MSGraphEvent,
        public labels: string[]
    ) {

    }
}
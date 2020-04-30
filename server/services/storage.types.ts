import { IParseEntitiesOptions } from "../utils/table";

export interface IGetConfirmedTimeEntriesFilters {
    projectId?: string;
    resourceId?: string;
    weekNumber?: number;
    yearNumber?: number;
    startDateTime?: string;
    endDateTime?: string;
}

export interface IEntityOptions extends IParseEntitiesOptions {
    sortBy?: string;
    noParse?: boolean;
}
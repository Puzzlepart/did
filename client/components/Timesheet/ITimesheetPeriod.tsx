export interface ITimesheetPeriod {
    week: number;
    year: number;
    startDateTime?: string;
    endDateTime?: string;
    ignoredKey?: string;
    resolvedKey?: string;
}

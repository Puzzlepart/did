export interface IListGroups {
    fieldName: string;
    groupNames?: string[];
    emptyGroupName?: string;
    totalFunc?: (items: any[]) => string;
}

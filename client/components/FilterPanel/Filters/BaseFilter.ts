export interface IFilterItem {
    key: string;
    value: string;
}

export interface IFilter {
    key: string;
    name: string;
    items: IFilterItem[];
    selected: IFilterItem[];
}

/**
 * @class BaseFilter
 * @abstract
 */
export abstract class BaseFilter {
    constructor(public fieldName: string, public name: string) { }

    public abstract initialize(entries: any[]): IFilter;
}
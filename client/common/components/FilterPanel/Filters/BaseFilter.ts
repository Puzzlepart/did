/**
 * @category FilterPanel
 */
export interface IFilterItem {
    key: string;
    value: string;
}

/**
 * @category FilterPanel
 */
export interface IFilter {
    key: string;
    name: string;
    items: IFilterItem[];
    selected: IFilterItem[];
}

/**
 * @category FilterPanel
 */
export abstract class BaseFilter {
    constructor(public fieldName: string, public name: string) { }

    public abstract initialize(entries: any[]): IFilter;
}
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { useState } from 'react';
import { FilterItem } from './FilterItem';
import { IFilter, IFilterItem } from './Filters';
import { IFilterPanelProps } from './IFilterPanelProps';

/**
 * @category FilterPanel
 */
export const FilterPanel = (props: IFilterPanelProps) => {
    const [filters, setFilters] = useState<IFilter[]>(props.filters.map(f => f.initialize(props.entries)));

    /**
     * On filter updated
     * 
     * @param {IFilter} filter 
     * @param {IFilterItem} item 
     * @param {boolean} checked 
     */
    const onFilterUpdated = (filter: IFilter, item: IFilterItem, checked: boolean) => {
        if (checked) filter.selected.push(item);
        else filter.selected = filter.selected.filter(f => f.key !== item.key);
        let updatedFilters = filters.map(f => {
            if (f.key === filter.key) {
                return filter;
            }
            return f;
        });
        setFilters(updatedFilters)
        props.onFilterUpdated(updatedFilters.filter(filter => filter.selected.length > 0))
    }

    return (
        <Panel
            isOpen={props.isOpen}
            isLightDismiss={true}
            onDismiss={props.onDismiss}>
            {filters
                .filter(filter => filter.items.length > 1)
                .map(filter => (
                    <FilterItem
                        key={filter.key}
                        filter={filter}
                        onFilterUpdated={onFilterUpdated} />
                ))}
        </Panel>
    );
}

export * from './FilterItem';
export * from './Filters';
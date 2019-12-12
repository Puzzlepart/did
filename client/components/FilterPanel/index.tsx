import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IFilter, IFilterItem } from './Filters';
import { IFilterPanelProps } from './IFilterPanelProps';

/**
 * @component FilterPanel
 * @description 
 */
export const FilterPanel = (props: IFilterPanelProps) => {
    const [filters, setFilters] = useState<IFilter[]>(props.filters.map(f => f.initialize(props.entries)));

    /**
     * Filter updated
     * 
     * @param {IFilter} filter 
     * @param {IFilterItem} item 
     * @param {boolean} checked 
     */
    const filterUpdated = (filter: IFilter, item: IFilterItem, checked: boolean) => {
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
            {filters.map(filter => (
                <div key={filter.key}>
                    <h4>{filter.name}</h4>
                    {filter.items.map((item) => (
                        <Checkbox
                            key={item.key}
                            label={item.value}
                            onChange={(_, checked) => filterUpdated(filter, item, checked)} />
                    ))}
                </div>
            ))}
        </Panel>
    );
}
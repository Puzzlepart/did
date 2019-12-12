import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as React from 'react';
import { IFilter, IFilterItem } from '../Filters';

export interface IFilterItemProps {
    filter: IFilter;
    filterUpdated: (filter: IFilter, item: IFilterItem, checked: boolean) => void;
}

/**
 * @component FilterItem
 * @description 
 */
export const FilterItem = ({ filter, filterUpdated }: IFilterItemProps) => {
    let selectedKeys = filter.selected.map(f => f.key);
    return (
        <div key={filter.key} style={{ marginTop: 15 }}>
            <h4>{filter.name}</h4>
            {filter.items.map((item) => (
                <Checkbox
                    key={item.key}
                    label={item.value}
                    checked={selectedKeys.indexOf(item.key) !== -1}
                    onChange={(_, checked) => filterUpdated(filter, item, checked)} />
            ))}
        </div>
    );
}
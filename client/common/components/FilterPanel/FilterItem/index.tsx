import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as React from 'react';
import { IFilterItemProps } from './IFilterItemProps';

/**
 * @category FilterPanel
 */
export const FilterItem = ({ filter, onFilterUpdated: filterUpdated }: IFilterItemProps) => {
    let selectedKeys = filter.selected.map(f => f.key);
    return (
        <div key={filter.key} style={{ marginTop: 15 }}>
            <h4>{filter.name}</h4>
            {filter.items.map(item => (
                <Checkbox
                    key={item.key}
                    label={item.value}
                    checked={selectedKeys.indexOf(item.key) !== -1}
                    onChange={(_, checked) => filterUpdated(filter, item, checked)} />
            ))}
        </div>
    );
}
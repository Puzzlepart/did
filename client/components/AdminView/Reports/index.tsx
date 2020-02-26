import { useQuery } from '@apollo/react-hooks';
import { FilterPanel, BaseFilter, IFilter, MonthFilter, ResourceFilter, YearFilter, WeekFilter } from 'components/FilterPanel';
import { IColumn, List } from 'components/List';
import { UserMessage } from 'components/UserMessage';
import { getValueTyped as value } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import { humanize } from 'underscore.string';
import * as excelUtils from 'utils/exportExcel';
import { generateColumn } from 'utils/generateColumn';
import { GET_CONFIRMED_TIME_ENTRIES } from './GET_CONFIRMED_TIME_ENTRIES';
import { IReportsProps } from './IReportsProps';

/**
 * @component Reports
 * @description Consists of a DetailsList with all confirmed time entries and an export to excel button
 */
export const Reports = ({ skip = ['id', '__typename'], exportFileNameTemplate = 'ApprovedTimeEntries-{0}.xlsx' }: IReportsProps) => {
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined);
    const [filteredEntries, setFilteredEntries] = useState<any[]>(undefined);

    const { loading, error, data } = useQuery(GET_CONFIRMED_TIME_ENTRIES, { fetchPolicy: 'cache-first' });

    let entries = value<any[]>(data, 'result.entries', []).map(entry => ({ ...entry, customer: value(entry, 'customer.name', '') }));


    const columns: IColumn[] = Object.keys(entries[0] || {})
        .filter(f => skip.indexOf(f) === -1)
        .map(fieldName => generateColumn(fieldName, humanize(fieldName), { minWidth: 60, maxWidth: 100 }));

    const filters: BaseFilter[] = [
        new WeekFilter('weekNumber', 'Week'),
        new MonthFilter('month', 'Month'),
        new YearFilter('year', 'Year'),
        new ResourceFilter('resourceName', 'Employee'),
    ]

    /**
     * On export
     * 
     * @param {React.MouseEvent} event Event
     */
    const onExport = (event: React.MouseEvent<any>) => {
        let items: any[];
        switch (event.currentTarget.id) {
            case 'EXPORT_TO_EXCEL_ALL': {
                items = entries;
            };
                break;
            case 'EXPORT_TO_EXCEL_FILTERED': {
                items = filteredEntries;
            };
                break;
        }
        excelUtils.exportExcel(
            items,
            {
                skip,
                fileName: format(exportFileNameTemplate, new Date().getTime()),
                capitalize: true,
            },
        );
    }

    /**
     * On filterr updated in FilterPanel
     * 
     * @param {IFilter[]} filters 
     */
    const onFilterUpdated = (filters: IFilter[]) => {
        let _entries = entries.filter(entry => {
            return filters.filter(f => {
                let selectedKeys = f.selected.map(s => s.key);
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1;
            }).length === filters.length;
        });
        setFilteredEntries(_entries);
    }

    return (
        <div>
            <CommandBar
                hidden={entries.length === 0}
                styles={{ root: { margin: '10px 0 10px 0', padding: 0 } }}
                items={[
                    {
                        id: 'EXPORT_TO_EXCEL_ALL',
                        key: 'EXPORT_TO_EXCEL_ALL',
                        text: 'Export all to Excel',
                        onClick: onExport,
                        iconProps: { iconName: 'ExcelDocument' },
                        disabled: loading || !!error,
                    },
                    {
                        id: 'EXPORT_TO_EXCEL_FILTERED',
                        key: 'EXPORT_TO_EXCEL_FILTERED',
                        text: 'Export to Excel (Filtered)',
                        onClick: onExport,
                        iconProps: { iconName: 'ExcelDocument' },
                        disabled: loading || !!error || filteredEntries === undefined || value(filteredEntries, 'length', 0) === value(entries, 'length', 0),
                    }
                ]}
                farItems={[{
                    key: 'OPEN_FILTER_PANEL',
                    iconProps: { iconName: 'Filter' },
                    iconOnly: true,
                    onClick: () => setFilterPanelOpen(true),
                }]} />
            <List
                hidden={entries.length === 0}
                items={filteredEntries || entries}
                columns={columns}
                enableShimmer={loading} />
            <UserMessage hidden={entries.length > 0 || loading} text={`There's no confirmed time entries at this time.`} />
            {!loading && (
                <FilterPanel
                    isOpen={filterPanelOpen}
                    filters={filters}
                    entries={entries}
                    onDismiss={() => setFilterPanelOpen(false)}
                    onFilterUpdated={onFilterUpdated} />
            )}
        </div>
    );
}
import { useQuery } from '@apollo/react-hooks';
import { FilterPanel, IFilter, UserMessage } from 'common/components';
import List from 'common/components/List';
import { getMonthName, getValueTyped as value } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import { humanize } from 'underscore.string';
import * as excelUtils from 'utils/exportExcel';
import { generateColumn } from 'utils/generateColumn';
import TIME_ENTRIES from './TIME_ENTRIES';
import { IReportsProps } from './IReportsProps';
import { REPORTS_FILTERS } from './REPORTS_FILTERS';

/**
 * Get columns
 * 
 * @param {Object} entry Entry
 * @param {string[]} skip Skip
 * 
 * @category Reports
 */
function getColumns(entry: Object = {}, skip: string[]): IColumn[] {
    return Object.keys(entry)
        .filter(f => skip.indexOf(f) === -1)
        .map(fieldName => generateColumn(fieldName, humanize(fieldName), { minWidth: 60, maxWidth: 100 }));;
}

/**
 * @category Reports
 */
export const Reports = ({ skip = ['id', '__typename', 'monthNumber'], exportFileNameTemplate = 'ApprovedTimeEntries-{0}.xlsx' }: IReportsProps) => {
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined);
    const [subset, setSubset] = useState<any[]>(undefined);

    const { loading, error, data } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, { fetchPolicy: 'cache-first' });

    const timeentries = (data ? data.timeentries : []).map(entry => ({
        ...entry,
        customer: value(entry, 'customer.name', ''),
        month: getMonthName(entry.monthNumber - 1),
    }));

    const columns = getColumns(timeentries[0], skip);

    /**
     * On export
     * 
     * @param {React.MouseEvent} event Event
     */
    const onExport = (event: React.MouseEvent<any>) => {
        let items: any[];
        switch (event.currentTarget.id) {
            case 'EXPORT_TO_EXCEL_ALL': items = timeentries;
                break;
            case 'EXPORT_SUBSET_TO_EXCEL': items = subset;
                break;
        }
        excelUtils.exportExcel(
            items,
            { columns, skip, fileName: format(exportFileNameTemplate, new Date().getTime()) },
        );
    }

    /**
     * On filterr updated in FilterPanel
     * 
     * @param {IFilter[]} filters 
     */
    const onFilterUpdated = (filters: IFilter[]) => {
        let _entries = timeentries.filter(entry => {
            return filters.filter(f => {
                let selectedKeys = f.selected.map(s => s.key);
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1;
            }).length === filters.length;
        });
        setSubset(_entries);
    }


    if (loading) return <ProgressIndicator />;

    return (
        <div>
            <CommandBar
                hidden={timeentries.length === 0}
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
                        id: 'EXPORT_SUBSET_TO_EXCEL',
                        key: 'EXPORT_SUBSET_TO_EXCEL',
                        text: 'Export subset to Excel',
                        onClick: onExport,
                        iconProps: { iconName: 'ExcelDocument' },
                        disabled: loading || !!error || subset === undefined || value(subset, 'length', 0) === value(timeentries, 'length', 0),
                    }
                ]}
                farItems={[{
                    key: 'OPEN_FILTER_PANEL',
                    iconProps: { iconName: 'Filter' },
                    iconOnly: true,
                    onClick: () => setFilterPanelOpen(true),
                }]} />
            <List
                items={subset || timeentries}
                columns={columns}
                enableShimmer={loading} />
            <UserMessage hidden={timeentries.length > 0 || loading} text={`There's no confirmed time entries at this time.`} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={REPORTS_FILTERS}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    );
}
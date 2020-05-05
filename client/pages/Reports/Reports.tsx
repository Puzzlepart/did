import { useQuery } from '@apollo/react-hooks';
import { BaseFilter, FilterPanel, IFilter, MonthFilter, ResourceFilter, UserMessage, WeekFilter, YearFilter } from 'common/components';
import List from 'common/components/List';
import { getMonthName, getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import { humanize } from 'underscore.string';
import * as excelUtils from 'utils/exportExcel';
import { generateColumn as col } from 'utils/generateColumn';
import TIME_ENTRIES from './TIME_ENTRIES';
/**
 * Get columns
 * 
 * @param {Object} entry Entry
 * @param {string[]} skip Skip
 * 
 * @category Reports
 */
function getColumns(entry: Record<string, any> = {}, skip: string[]): IColumn[] {
    return Object.keys(entry)
        .filter(f => skip.indexOf(f) === -1)
        .map(fieldName => col(fieldName, humanize(fieldName), { minWidth: 60, maxWidth: 100 }));;
}

/**
 * @category Reports
 */
export const Reports = () => {
    const filters: BaseFilter[] = [
        new WeekFilter('weekNumber'),
        new MonthFilter('month'),
        new YearFilter('yearNumber'),
        new ResourceFilter('resourceName'),
    ]
    const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(undefined);
    const [subset, setSubset] = useState<any[]>(undefined);

    const { loading, error, data } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, { fetchPolicy: 'cache-first' });

    const timeentries = (data ? data.timeentries : []).map(entry => ({
        ...entry,
        customer: value(entry, 'customer.name', ''),
        month: getMonthName(entry.monthNumber - 1),
    }));

    const columns = getColumns(timeentries[0], ['id', '__typename', 'monthNumber']);

    const onExportExcel = () => {
        excelUtils.exportExcel(
            subset || timeentries,
            {
                columns,
                skip: ['id', '__typename', 'monthNumber'],
                fileName: format('TimeEntries-{0}.xlsx', new Date().toDateString().split(' ').join('-')),
            }
        );
    }

    /**
     * On filterr updated in FilterPanel
     * 
     * @param {IFilter[]} filters 
     */
    const onFilterUpdated = (filters: IFilter[]) => {
        const _entries = timeentries.filter(entry => {
            return filters.filter(f => {
                const selectedKeys = f.selected.map(s => s.key);
                return selectedKeys.indexOf(value(entry, f.key, '')) !== -1;
            }).length === filters.length;
        });
        setSubset(_entries);
    }


    if (loading) return <ProgressIndicator label={'Generating report'} description={'To give you the freshest results, we\'re generating a report from the latest data...'} />;

    return (
        <div>
            <List
                items={subset || timeentries}
                columns={columns}
                enableShimmer={loading}
                commandBar={{
                    items: [
                        {
                            id: 'EXPORT_TO_EXCEL',
                            key: 'EXPORT_TO_EXCEL',
                            text: resource('COMMON.EXPORT_CURRENT_VIEW'),
                            onClick: onExportExcel,
                            iconProps: { iconName: 'ExcelDocument' },
                            disabled: loading || !!error,
                        },
                    ],
                    farItems: [
                        {
                            key: 'OPEN_FILTER_PANEL',
                            iconProps: { iconName: 'Filter' },
                            iconOnly: true,
                            onClick: () => setFilterPanelOpen(true),
                        }
                    ]
                }} />
            <UserMessage hidden={timeentries.length > 0 || loading} text={'There\'s no confirmed time entries at this time.'} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={filters}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    );
}
import { useQuery } from '@apollo/react-hooks';
import { BaseFilter, FilterPanel, IFilter, MonthFilter, ResourceFilter, UserMessage, WeekFilter, YearFilter } from 'common/components';
import List from 'common/components/List';
import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useState } from 'react';
import * as format from 'string-format';
import { exportExcel } from 'utils/exportExcel';
import columns from './columns';
import TIME_ENTRIES from './TIME_ENTRIES';

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

    const timeentries = data ? data.timeentries : [];
    

    const onExportExcel = () => exportExcel(
        subset || timeentries,
        {
            columns: columns(resource),
            fileName: format('TimeEntries-{0}.xlsx', new Date().toDateString().split(' ').join('-')),
        }
    );

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


    if (loading) return (
        <ProgressIndicator
            label={resource('REPORTS.GENERATING_REPORT_LABEL')}
            description={resource('REPORTS.GENERATING_REPORT_DESCRIPTION')} />
    );

    return (
        <div>
            <List
                hidden={timeentries.length === 0 && !loading}
                items={subset || timeentries}
                columns={columns(resource)}
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
            <UserMessage
                hidden={timeentries.length > 0 || loading}
                text={resource('REPORTS.NO_ENTRIES_TEXT')} />
            <FilterPanel
                isOpen={filterPanelOpen}
                filters={filters}
                entries={timeentries}
                onDismiss={() => setFilterPanelOpen(false)}
                onFilterUpdated={onFilterUpdated} />
        </div>
    );
}
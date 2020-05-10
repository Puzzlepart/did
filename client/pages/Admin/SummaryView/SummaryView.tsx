
import { useQuery } from '@apollo/react-hooks';
import { UserMessage } from 'components';
import List from 'components/List';
import resource from 'i18n';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { first, isEmpty } from 'underscore';
import { moment } from 'utils/date';
import { commandBar } from './commandBar';
import { createColumns } from './createColumns';
import { createPeriods } from './createPeriods';
import { createRows } from './createRows';
import { reducer } from './SummaryViewReducer';
import { getScopes } from './SummaryViewScope';
import { getTypes } from './SummaryViewType';
import TIME_ENTRIES from './TIME_ENTRIES';
import { ISummaryViewContext } from './types';


/**
 * @category Admin
 */
export const SummaryView = (): JSX.Element => {
    const scopes = getScopes(resource);
    const types = getTypes(resource);

    const [state, dispatch] = React.useReducer(reducer, {
        year: moment().year(),
        timeentries: [],
        range: 3,
        scope: first(scopes),
        type: first(types),
    });
    const { data, loading } = useQuery<{ timeentries: any[] }>(TIME_ENTRIES, {
        fetchPolicy: 'cache-first',
        variables: { yearNumber: state.year },
    });

    React.useEffect(() => { dispatch({ type: 'DATA_UPDATED', payload: data }) }, [data]);

    const contextValue: ISummaryViewContext = React.useMemo(() => ({
        ...state,
        dispatch,
        scopes,
        types,
    }), [state]);

    const periods = React.useMemo(() => createPeriods(2), []);
    const columns = React.useMemo(() => createColumns(state), [state]);
    const items = React.useMemo(() => createRows(state, columns, resource), [state]);

    return (
        <Pivot
            defaultSelectedKey={moment().year().toString()}
            onLinkClick={item => dispatch({ type: 'CHANGE_YEAR', payload: parseInt(item.props.itemKey) })}
            styles={{ itemContainer: { paddingTop: 10 } }}>
            {periods.map(itemProps => (
                <PivotItem key={itemProps.itemKey} {...itemProps}>
                    <List
                        hidden={!loading && isEmpty(items)}
                        enableShimmer={loading}
                        columns={columns}
                        items={items}
                        commandBar={commandBar(contextValue, items, columns, resource)} />
                    <UserMessage
                        hidden={!isEmpty(items) || loading}
                        text={resource('ADMIN.SUMMARY_NO_TIME_ENTRIES')} />
                </PivotItem>
            ))}
        </Pivot>
    );
}
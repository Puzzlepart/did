
import { List } from 'common/components/List';
import * as React from 'react';
import * as col from './columns';
import { IEventListProps } from './types';
import { withDefaultProps } from 'with-default-props';

/**
 * @category EventList
 */
let EventList = (props: IEventListProps) => {
    const columns = [
        ...col.GetAll(props).filter(col => props.hideColumns.indexOf(col.key) === -1),
        ...props.additionalColumns
    ];

    return (
        <div style={{ marginBottom: 250 }}>
            <List
                enableShimmer={props.enableShimmer}
                columns={columns}
                items={props.events}
                groups={props.groups}
                groupProps={{ showEmptyGroups: props.showEmptyDays }} />
        </div>
    );
}

export default withDefaultProps(
    EventList,
    {
        hideColumns: [],
        additionalColumns: [],
    }
);


export * from './types';


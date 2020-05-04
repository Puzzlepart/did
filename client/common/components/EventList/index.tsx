
import List from 'common/components/List';
import * as React from 'react';
import * as col from './columns';
import { IEventListProps } from './types';
import { withDefaultProps } from 'with-default-props';

/**
 * @category EventList
 */
const EventList = (props: IEventListProps): JSX.Element => {
    const columns = [
        col.Title(props),
        col.Time(props),
        col.Duration(props),
        ...props.additionalColumns
    ];

    return (
        <div style={{ marginBottom: 250 }} hidden={props.hidden}>
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
        additionalColumns: [],
    }
);


export * from './types';



import List from 'common/components/List';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import * as col from './columns';
import styles from './EventList.module.scss';
import { IEventListProps } from './types';

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
        <div className={styles.root}>
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


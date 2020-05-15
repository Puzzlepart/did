
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Admin.module.scss';
import { Labels } from './Labels';
import AdminSummaryView from './SummaryView';
import { Users } from './Users';

/**
 * @category Admin
 */
export const Admin = () => {
    const { t } = useTranslation('ADMIN');
    const history = useHistory();
    const { view } = useParams<{ view: string }>();
    return (
        <div className={styles.root}>
            <Pivot
                defaultSelectedKey={view}
                onLinkClick={item => history.push(`/admin/${item.props.itemKey}`)}>
                <PivotItem
                    className={styles.tab}
                    itemKey='users'
                    headerText={t('USERS')}
                    itemIcon='FabricUserFolder'>
                    <Users />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='summary'
                    headerText={t('SUMMARY')}
                    itemIcon='CalendarWeek'>
                    <AdminSummaryView />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='labels'
                    headerText={t('LABELS')}
                    itemIcon='Label'>
                    <Labels />
                </PivotItem>
            </Pivot>
        </div>
    );
}
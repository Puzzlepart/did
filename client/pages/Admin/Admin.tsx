
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import styles from './Admin.module.scss'
import { Labels } from './Labels'
import { Roles } from './Roles'
import { SummaryView } from './SummaryView'
import { Users } from './Users'
import { ApiTokens } from './ApiTokens'
import { moment } from 'utils/date'

/**
 * @category Admin
 */
export const Admin = () => {
    const { t } = useTranslation('admin')
    const history = useHistory()
    const { view } = useParams<{ view: string }>()

    function onPivotClick({ props }: PivotItem) {
        history.push(`/admin/${props.itemKey}`)
    }

    return (
        <div className={styles.root}>
            <Pivot
                selectedKey={view || 'users'}
                onLinkClick={onPivotClick}>
                <PivotItem
                    className={styles.tab}
                    itemKey='users'
                    headerText={t('users')}
                    itemIcon='FabricUserFolder'>
                    <Users />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='summary'
                    headerText={t('summary')}
                    itemIcon='CalendarWeek'>
                    <SummaryView
                        defaultYear={moment().year()}
                        defaultRange={3} />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='labels'
                    headerText={t('labels')}
                    itemIcon='Label'>
                    <Labels />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='rolesPermissions'
                    headerText={t('rolesPermissions')}
                    itemIcon='SecurityGroup'>
                    <Roles />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='apiTokens'
                    headerText={t('apiTokens')}
                    itemIcon='AzureAPIManagement'>
                    <ApiTokens />
                </PivotItem>
            </Pivot>
        </div>
    )
}
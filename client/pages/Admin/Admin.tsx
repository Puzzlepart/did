
import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import styles from './Admin.module.scss'
import { ApiTokens } from './ApiTokens'
import { Labels } from './Labels'
import { Roles } from './Roles'
import { SubscriptionSettings } from './Subscription'
import { SummaryView } from './SummaryView'
import { Users } from './Users'
import DateUtils from 'utils/date'

export const Admin = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const { view } = useParams<{ view: string }>()
    const history = useHistory()

    const onPivotClick = ({ props }: PivotItem) => history.push(`/admin/${props.itemKey}`)

    return (
        <div className={styles.root}>
            <Pivot
                selectedKey={view || 'users'}
                onLinkClick={onPivotClick}>
                {user.hasPermission(PERMISSION.MANAGE_USERS) && (
                    <PivotItem
                        className={styles.tab}
                        itemKey='users'
                        headerText={t('admin.users')}
                        itemIcon='FabricUserFolder'>
                        <Users />
                    </PivotItem>
                )}
                <PivotItem
                    className={styles.tab}
                    itemKey='summary'
                    headerText={t('admin.summary')}
                    itemIcon='CalendarWeek'>
                    <SummaryView
                        defaultSelectedYear={DateUtils.getYear()}
                        defaultSelectedScope='weekNumber'
                        defaultRange={2} />
                </PivotItem>
                <PivotItem
                    className={styles.tab}
                    itemKey='labels'
                    headerText={t('admin.labels')}
                    itemIcon='Label'>
                    <Labels />
                </PivotItem>
                {user.hasPermission(PERMISSION.MANAGE_ROLESPERMISSIONS) && (
                    <PivotItem
                        className={styles.tab}
                        itemKey='rolesPermissions'
                        headerText={t('admin.rolesPermissions')}
                        itemIcon='SecurityGroup'>
                        <Roles />
                    </PivotItem>
                )}
                {user.hasPermission(PERMISSION.MANAGE_SUBSCRIPTION) && (
                    <PivotItem
                        className={styles.tab}
                        itemKey='subscription'
                        headerText={t('admin.subscriptionSettings')}
                        itemIcon='Subscribe'>
                        <SubscriptionSettings />
                    </PivotItem>
                )}
                <PivotItem
                    className={styles.tab}
                    itemKey='apiTokens'
                    headerText={t('admin.apiTokens')}
                    itemIcon='AzureAPIManagement'>
                    <ApiTokens />
                </PivotItem>
            </Pivot>
        </div>
    )
}
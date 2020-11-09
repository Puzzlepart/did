import { CustomerLink } from 'components/CustomerLink'
import List from 'components/List'
import { TFunction } from 'i18next'
import { Customer } from 'types'
import { Checkbox } from 'office-ui-fabric'
import { IColumn } from 'office-ui-fabric'
import { Icon } from 'office-ui-fabric'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { ICustomerListProps } from './ICustomerListProps'

/**
 * Generate column definitions
 * 
 * @category Customers
 */
export const columns = (t: TFunction): IColumn[] => ([
    col(
        'icon',
        '',
        { maxWidth: 35, minWidth: 35 },
        (customer: Customer) => {
            if (customer.inactive) {
                return (
                    <Icon
                        title={t('customers.inactiveText')}
                        iconName='Warning'
                        styles={{ root: { fontSize: 16, color: '#ffbf00' } }} />
                )
            }
            return <Icon iconName={customer.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />
        },
    ),
    col('key', t('common.keyFieldLabel'), { maxWidth: 120 }),
    col(
        'name',
        t('common.nameFieldLabel'),
        { maxWidth: 300 },
        (customer: Customer) => <CustomerLink customer={customer} />
    ),
])


export const CustomerList = (props: ICustomerListProps) => {
    const { t } = useTranslation()
    const [items, setItems] = useState([...props.items])
    const [showInactive, setShowInactive] = useState(false)

    useEffect(() => setItems([...props.items].filter(p => showInactive ? true : !p.inactive)), [props.items, showInactive])

    return (
        <List
            {...props}
            items={items}
            columns={columns(t)}
            selection={props.selection}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Checkbox
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                checked={showInactive}
                                label={t('common.toggleInactiveText')}
                                onChange={(_event, checked) => setShowInactive(checked)} />
                        ),
                    }
                ],
                farItems: []
            }} />
    )
}

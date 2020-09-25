import { CustomerLink } from 'components/CustomerLink'
import List from 'components/List'
import { TFunction } from 'i18next'
import { ICustomer } from 'interfaces/ICustomer'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
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
        (customer: ICustomer) => {
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
        (customer: ICustomer) => <CustomerLink customer={customer} />
    ),
])

/**
 * @category Customers
 */
export const CustomerList = (props: ICustomerListProps) => {
    const { t } = useTranslation()
    const [items, setItems] = useState([...props.items])

    /**
     * On toggle inactive
     * 
     * @param {React.MouseEvent} _event Event
     * @param {boolean} checked Is checked
     */
    const onToggleInactive = (_event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        setItems([...props.items].filter(customer => checked ? true : !customer.inactive))
    }

    useEffect(() => setItems([...props.items].filter(customer => !customer.inactive)), [props.items])

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
                                label={t('common.toggleInactiveText')}
                                onChange={onToggleInactive} />
                        ),
                    }
                ],
                farItems: []
            }} />
    )
}

import List from 'components/List'
import { TFunction } from 'i18next'
import { ICustomer } from 'interfaces/ICustomer'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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
                return <Icon title={t('inactiveText')} iconName='Warning' styles={{ root: { fontSize: 16, color: '#ffbf00' } }} />
            }
            return <Icon iconName={customer.icon || 'Page'} styles={{ root: { fontSize: 16 } }} />
        },
    ),
    col('key', t('keyLabel'), { maxWidth: 120 }),
    col(
        'name',
        t('nameLabel'),
        { maxWidth: 300 },
        (customer: ICustomer) => <Link to={`/customers/${customer.key}`}>{customer.name}</Link>
    ),
])

/**
 * @category Customers
 */
export const CustomerList = (props: ICustomerListProps) => {
    const { t } = useTranslation(['common', 'customers'])
    const [items, setItems] = React.useState([...props.items])

    /**
     * On toggle inactive
     * 
     * @param {React.MouseEvent} _event Event
     * @param {boolean} checked Is checked
     */
    const onToggleInactive = (_event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => {
        setItems([...props.items].filter(customer => checked ? true : !customer.inactive))
    }

    React.useEffect(() => setItems([...props.items].filter(customer => !customer.inactive)), [props.items])

    return (
        <List
            {...props}
            items={items}
            columns={columns(t)}
            commandBar={{
                items: [
                    {
                        key: 'TOGGLE_INACTIVE',
                        onRender: () => (
                            <Checkbox
                                styles={{ root: { margin: '6px 0 0 8px' } }}
                                label={t('toggleInactiveText')}
                                onChange={onToggleInactive} />
                        ),
                    }
                ],
                farItems: []
            }} />
    )
}
